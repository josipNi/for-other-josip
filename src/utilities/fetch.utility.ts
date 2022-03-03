import { LocalStorageUtility } from './local-storage.utility'

export class FetchApiHttpError extends Error {
    public static AuthorizationHeader = {}

    public readonly _serverErrorText: Promise<object | string>
    public readonly _status: number
    constructor(response: Response, public readonly _isJson: boolean) {
        super(response.statusText.length > 0 ? response.statusText : `Error ${response.status}`)
        this.name = FetchApiHttpError.name
        Object.setPrototypeOf(this, FetchApiHttpError.prototype)
        this._status = response.status
        if (_isJson) {
            this._serverErrorText = response.json()
        } else {
            this._serverErrorText = response.text()
        }
    }
}

class FetchApi {
    getDefaultHeaders = () => {
        return { ...this.getAuthorization() }
    }
    get = (url: string, options: any = null) => {
        let init: RequestInit = {
            method: 'GET',
            credentials: 'omit',
            headers: this.getDefaultHeaders(),
        }

        let requestUrl = url
        if (options) {
            if (options.params) {
                requestUrl = this.addQueryParams(url, options.params)
            }
            if (options.headers) {
                init = this.addHeaders(init, options.headers)
            }
        }

        const { promise, cancel } = this.cancellableFetch(requestUrl, init)
        return {
            // todo add blob check and maybe generic error check ?? :S
            promise: promise.then((r) => (this.isJsonResponse(r) ? r.json() : [])),
            cancel,
        }
    }

    post = (url: string, body: any = null, options: any = null) => {
        let init: RequestInit = {
            method: 'POST',
            credentials: 'omit',
            headers: this.getDefaultHeaders(),
        }

        if (body) {
            init = this.addBody(init, body)
        }

        if (options && options.headers) {
            init = this.addHeaders(init, options.headers)
        }

        const { promise, cancel } = this.cancellableFetch(url, init)
        return {
            promise: promise.then((r) => {
                return this.isJsonResponse(r) ? r.json() : r
            }),
            cancel,
        }
    }

    addQueryParams = (url: string, params: { [key: string]: any }) => {
        const urlSearchParams = new URLSearchParams()

        for (const key of Object.keys(params)) {
            const value = params[key]
            if (Array.isArray(value)) {
                for (const v of value) {
                    urlSearchParams.append(key, v.toString())
                }
            } else {
                urlSearchParams.append(key, value.toString())
            }
        }

        return url + '?' + urlSearchParams.toString()
    }

    addHeaders = (init: RequestInit, headers: Headers): RequestInit => {
        const withHeaders = { ...init }
        if (!withHeaders.headers) {
            withHeaders.headers = {}
        }
        withHeaders.headers = { ...withHeaders.headers, ...headers }
        return withHeaders
    }

    addBody = (init: RequestInit, body: Body) => {
        const withBody = { ...init }
        if (typeof body === 'object') {
            if (body instanceof FormData) {
                withBody.body = body
            } else {
                withBody.body = JSON.stringify(body)
                withBody.headers = {
                    ...withBody.headers,
                    'Content-Type': 'application/json',
                }
            }
        } else {
            withBody.body = JSON.stringify(body)
            withBody.headers = {
                ...withBody.headers,
                'Content-Type': 'application/json',
            }
        }
        return withBody
    }

    cancellableFetch = (input: RequestInfo, init: RequestInit) => {
        const controller = new AbortController()
        const promise = fetch(input, { ...init, signal: controller.signal }).then(this.handleFetchErrors)

        return { promise, cancel: () => controller.abort() }
    }

    handleFetchErrors = async (response: Response) => {
        if (!response.ok) {
            const isJson = this.isJsonResponse(response)
            throw new FetchApiHttpError(response, isJson)
        }
        return response
    }

    isJsonResponse = (response: Response) => {
        const contentType = response.headers.get('Content-type')
        return !!(
            contentType &&
            (contentType.indexOf('application/json') >= 0 || contentType.indexOf('application/problem+json') >= 0)
        )
    }

    getAuthorization = () => {
        const user = LocalStorageUtility.Retrieve('')
        // if (user?.token) {
        //     return { Authorization: `${user.token}` }
        // }
        return {}
    }
}

export default new FetchApi()
