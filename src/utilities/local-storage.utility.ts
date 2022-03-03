/**
 * Simple retrieve/store objects to local storage in JSON format
 */
export class LocalStorageUtility {
    /**
     * Retrieve data from local storage
     *
     * @param key The key to retrieve from
     */
    public static Retrieve<T>(key: string): T | undefined {
        try {
            const serialized = localStorage.getItem(key)
            if (serialized === null) {
                return undefined
            }
            return JSON.parse(serialized)
        } catch (err) {
            return undefined
        }
    }

    /**
     * Save data to local storage
     *
     * @param key The key to store to
     * @param item The data to save
     */
    public static Store<T>(key: string, item: T) {
        try {
            const serialized = JSON.stringify(item)
            localStorage.setItem(key, serialized)
        } catch (err) {}
    }

    /**
     * Remove data from local storage
     *
     * @param key They to remove from
     */
    public static Remove(key: string) {
        localStorage.removeItem(key)
    }
}
