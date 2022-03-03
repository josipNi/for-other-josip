import { ElementType, HTMLAttributes } from 'react'

export interface FCProps extends HTMLAttributes<HTMLOrSVGElement> {
    as?: ElementType
}

export interface AfterSetState extends FCProps {
    afterSetState: (value: any) => void
}
