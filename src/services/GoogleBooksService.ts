import { AxiosPromise } from 'axios';
import ServiceBase from 'core/ServiceBase';
import HTTPService from './HTTPService';

interface IISBN {
    type: string;
    identifier: number;
}

interface IBookList {
    items: IBookDetail[];
}

export interface IBookDetail {
    id: string;
    volumeInfo: {
        authors: string[],
        averageRating: number,
        categories: string[],
        description: string,
        imageLinks: {
            thumbnail: string,
        }
        industryIdentifiers: IISBN[],
        pageCount: number,
        publisher: string,
        ratingsCount: number,
        subtitle: string,
        title: string,
    };
}

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
    private httpService = new HTTPService();

    /**
     * API to search for book by name.
     */
    public searchBooks(bookName: string, start: number = 0, items: number = 20)
    : AxiosPromise<IBookList> {
        return this.httpService.get(`${this.endpoint}/volumes`, {
            maxResults: items.toString(),
            q: bookName,
            startIndex: start.toString(),
        });
    }

    /**
     * API to get book by ID
     */
    public getBook(id: string, errorHandled?: boolean): AxiosPromise<IBookDetail> {
        return this.httpService.get(`${this.endpoint}/volumes/${id}`, null, null, { errorHandled });
    }
}

export default GoogleBooksService;
