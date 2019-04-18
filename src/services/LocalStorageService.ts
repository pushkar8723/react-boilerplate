import ServiceBase from 'core/ServiceBase';

/**
 * Service for localStorage management.
 */
export default class LocalStorageService extends ServiceBase {
    /**
     * Returns the value for the given key.
     */
    public get = (key: string) => {
        return JSON.parse(localStorage.getItem(key));
    }

    /**
     * Sets the value of given key to given data.
     */
    public set = (key: string, data: any) => {
        localStorage.setItem(key, JSON.stringify(data));
    }

    /**
     * Removes the given key from local storage.
     */
    public remove = (key: string) => {
        localStorage.removeItem(key);
    }
}
