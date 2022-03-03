import { Layout } from 'react-grid-layout'
export class GridLayoutApi {
    static BASE_URL = '/api/grid-layout'
    get = async (): Promise<Layout[]> => {
        const data = await fetch(`${process.env.REACT_APP_API_URL}/grid-layout`)
        return await data.json()
    }
}
