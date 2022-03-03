import { FC } from 'react'

import { FCProps } from '../../types'
import { ClassNameUtility } from '../../utilities/class-name.utility'
import styles from './task-bar.component.module.css'

const TaskBarComponent: FC<FCProps> = ({ children, as: Tag = 'div', ...otherProps }) => {
    const className = ClassNameUtility.FromStyles(styles, 'wrapper', otherProps)
    const width = '100%'
    console.log('children', children)

    return <Tag {...className}>{children}</Tag>
}

export default TaskBarComponent
