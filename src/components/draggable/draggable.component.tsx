import { FC, useCallback } from 'react'
import { useEffect, useRef } from 'react'
import { FCProps } from '../../types'

import styles from './draggable.component.module.css'

const DraggableComponent: FC<{ header?: JSX.Element | React.ElementType<any>; props?: FCProps }> = ({
    children,
    header,
    props,
}) => {
    const Tag = props?.as || 'div'
    const bodyRef = useRef<HTMLElement>(null)
    const headerRef = useRef<HTMLElement>(null)
    let pos1 = useRef(0),
        pos2 = useRef(0),
        pos3 = useRef(0),
        pos4 = useRef(0)
    const elementDrag = useCallback((e: MouseEvent) => {
        e = e || window.event
        // calculate the new cursor position:
        pos1.current = pos3.current - e.clientX
        pos2.current = pos4.current - e.clientY
        pos3.current = e.clientX
        pos4.current = e.clientY
        // set the element's new position:
        bodyRef.current!.style.top = bodyRef.current!.offsetTop - pos2.current + 'px'
        bodyRef.current!.style.left = bodyRef.current!.offsetLeft - pos1.current + 'px'
    }, [])
    const closeDragElement = useCallback(() => {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null
        document.onmousemove = null
    }, [])

    const dragMouseDown = useCallback(
        (e: MouseEvent) => {
            e = e || window.event
            // get the mouse cursor position at startup:
            pos3.current = e.clientX
            pos4.current = e.clientY
            document.onmouseup = closeDragElement
            // call a function whenever the cursor moves:
            document.onmousemove = elementDrag
        },
        [closeDragElement, elementDrag],
    )

    const dragElement = useCallback(
        (header: HTMLElement, body: HTMLElement) => {
            if (header) {
                /* if present, the header is where you move the DIV from:*/
                header.onmousedown = dragMouseDown
            } else if (body) {
                /* otherwise, move the DIV from anywhere inside the DIV:*/
                body.onmousedown = dragMouseDown
            }
        },
        [dragMouseDown],
    )

    useEffect(() => {
        const header = headerRef.current!
        const body = bodyRef.current!
        dragElement(header, body)
    })
    return (
        <Tag className={styles.body} ref={bodyRef} {...props}>
            {children}
        </Tag>
    )
}

export default DraggableComponent
