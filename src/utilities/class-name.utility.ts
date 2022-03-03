import { HTMLAttributes } from 'react'

export class ClassNameUtility {
    static FromStyles = (
        styles: { [key: string]: string },
        property: string,
        otherProps: HTMLAttributes<HTMLOrSVGElement>,
    ) => {
        return { className: `${styles[property]} ${otherProps.className || ''}` }
    }
}
