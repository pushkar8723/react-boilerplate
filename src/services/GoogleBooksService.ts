import ServiceBase from 'core/ServiceBase';
import HTTPService from './HTTPService';

/**
 * Service for Google Books apis.
 */
class GoogleBooksService extends ServiceBase {
    /**
     * Google Books Endpoint for apis.
     */
    private endpoint = 'https://www.googleapis.com/books/v1';

    /**
     * Reference for HTTP service.
     */
    private httpService: HTTPService;

    constructor() {
        super();
        this.httpService = new HTTPService();
    }

    /**
     * API to search for book by name.
     */
    public searchBooks(bookName: string, start: number = 0, items: number = 20) {
        return this.httpService.get(`${this.endpoint}/volumes`, {
            maxResults: items.toString(),
            q: bookName,
            startIndex: start.toString(),
        });
    }

    /**
     * API to get book by ID
     */
    public getBook(id: string) {
        return this.httpService.get(`${this.endpoint}/volumes/${id}`);
    }
}

export default GoogleBooksService;
