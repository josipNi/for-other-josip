export class SubscriptionUtility<T> {
    private nextSubscriptionId = 0
    private readonly _callbacks: { callback: Function; subscription: number }[]
    private state: T
    constructor(state: T) {
        this.state = state
        this._callbacks = []
    }

    subscribe = (callback: Function) => {
        if (this.nextSubscriptionId === Number.MAX_SAFE_INTEGER) {
            this.nextSubscriptionId = 0
        }

        this._callbacks.push({ callback, subscription: this.nextSubscriptionId++ })
        return this.nextSubscriptionId - 1
    }

    unsubscribe = (subscriptionId: number) => {
        let foundIndex: number | null = null
        for (let index = 0; index < this._callbacks.length; index++) {
            const element = this._callbacks[index]
            if (element.subscription === subscriptionId) {
                foundIndex = index
                break
            }
        }
        if (foundIndex === null) {
            throw new Error(`Found an invalid number of subscriptions ${0}`)
        }
        this._callbacks.splice(foundIndex!, 1)
    }

    update = (state: T) => {
        if (Object.is(this.state, state)) {
            return
        }
        this.state = state
        this.notifySubscribers()
    }

    get = (): T => {
        return this.state
    }

    private notifySubscribers = () => {
        for (let callback of this._callbacks) {
            callback.callback(this.state)
        }
    }
}
