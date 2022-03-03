import { FC } from 'react'
import { FCProps } from '../../types'

import styles from './modal.component.module.css'
const ModalComponent: FC<FCProps> = ({ children, ...otherProps }) => {
    console.log('modal')
    return (
        <div className={styles.wrapper} {...otherProps}>
            <div className={styles.children}>{children}</div>
        </div>
    )
}

export default ModalComponent
