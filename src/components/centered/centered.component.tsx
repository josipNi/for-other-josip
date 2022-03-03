import { FC } from 'react'
import { FCProps } from '../../types'
import styles from './centered.component.module.css'

const CenteredComponent: FC<FCProps> = ({ children, as: Tag = 'div', ...otherProps }) => {
    const className = `${styles.wrapper} ${otherProps.className || ''}`
    return (
        <Tag {...otherProps} className={className}>
            {children}
        </Tag>
    )
}
export default CenteredComponent
