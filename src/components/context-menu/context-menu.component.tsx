import { FC } from 'react'
import { FCProps } from '../../types'

const ContextMenuComponent: FC<FCProps> = ({ children, as: Tag = 'div', ...otherProps }) => {
    return <Tag {...otherProps}>{children}</Tag>
}

export default ContextMenuComponent
