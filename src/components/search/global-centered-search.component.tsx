import { FC, useCallback, useState } from 'react'

import { FCProps } from '../../types'
import CenteredSearchComponent from './centered-search.component'

const GlobalCenteredSearchComponent: FC<FCProps> = ({ children, ...otherProps }) => {
    const [state, setState] = useState(true)

    document.onkeydown = useCallback(
        (e: KeyboardEvent) => {
            if (e.ctrlKey && e.key === ' ') {
                setState(!state)
            }
            if (e.key === 'Escape') {
                setState(true)
            }
        },
        [state],
    )
    return <>{!state && <CenteredSearchComponent {...otherProps} />}</>
}

export default GlobalCenteredSearchComponent
