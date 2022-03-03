import { ChangeEvent, forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { AfterSetState } from '../../types'
import DraggableComponent from '../draggable/draggable.component'
import styles from './search.component.module.css'

const SearchComponent = forwardRef<Partial<HTMLInputElement>, AfterSetState>(
    ({ children, afterSetState, ...otherProps }, ref) => {
        const [state, setState] = useState('')
        const onChange = (e: ChangeEvent<HTMLInputElement>) => {
            setState(e.target.value)
            afterSetState?.(e.target.value)
        }

        const inputRef = useRef<HTMLInputElement>(null)
        useImperativeHandle(ref, () => ({
            focus: () => {
                inputRef.current?.focus()
            },
        }))

        return (
            <DraggableComponent props={otherProps}>
                <input
                    ref={inputRef}
                    type="text"
                    className={styles.element}
                    placeholder="Spotlight-Search"
                    onChange={onChange}
                    value={state}
                    {...otherProps}
                />
            </DraggableComponent>
        )
    },
)

export default SearchComponent
