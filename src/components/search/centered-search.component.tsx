import { FC, KeyboardEventHandler, useCallback, useEffect, useRef, useState } from 'react'
import { FCProps } from '../../types'
import CenteredComponent from '../centered/centered.component'
import SearchComponent from './search.component'

const CenteredSearchComponent: FC<FCProps> = (props) => {
    const ref = useRef<Partial<HTMLInputElement>>(null)
    const [state, setState] = useState('')
    const search = useCallback(async () => {
        const promises: Promise<any>[] = []
        console.log(state)

        promises.push(Promise.resolve('found-users'))
        promises.push(Promise.resolve('found-components'))
        const result = await Promise.all(promises)
        if (result.length === 0) {
            window.open('https://www.google.com/search?q=' + encodeURIComponent(state))
        }
    }, [state])

    const onKeyDown: KeyboardEventHandler<HTMLOrSVGElement> = useCallback(
        (e) => {
            if (e.key === 'Enter') {
                e.stopPropagation()
                search()
            }
        },
        [search],
    )
    useEffect(() => {
        ref.current?.focus?.()
    }, [])

    return (
        <CenteredComponent>
            <SearchComponent ref={ref} {...props} onKeyDown={onKeyDown} afterSetState={setState} />
        </CenteredComponent>
    )
}

export default CenteredSearchComponent
