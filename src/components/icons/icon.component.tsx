import { FC, useEffect, useState } from 'react'

import styles from './icon.component.module.css'
import { FCProps } from '../../types'
import { ReactComponent as FolderIcon } from './folder.svg'
import { ReactComponent as CalendarIcon } from './calendar.svg'

const IconComponent: FC<FCProps & { icon: string }> = ({ icon, as: Tag = 'span', ...otherProps }) => {
    const [state, setState] = useState('3.125rem')

    const noOfElements = 20

    const width = `3.25rem`

    let Component = <></>
    if (icon === 'folder') {
        Component = <FolderIcon width={width} {...otherProps}></FolderIcon>
    }
    if (icon === 'calendar') {
        Component = <CalendarIcon width={width} {...otherProps}></CalendarIcon>
    }

    return <Tag className={styles.wrapper}>{Component}</Tag>
}

export default IconComponent
