export class TokenUtility {
    static Decode<T>(token: string): T {
        if (token.includes('Bearer ')) {
            token.replace('Bearer ', '')
        }
        return JSON.parse(atob(token.split('.')[1] || ''))
    }
}
