import { createContext, FC } from 'react'
import { AllApis } from '../apis'

export const ApiContext = createContext<AllApis | null>(null)
export const ApiContextProvider: FC<{ apis: AllApis }> = ({ apis, children }) => {
    return <ApiContext.Provider value={apis}>{children}</ApiContext.Provider>
}
