import { AxiosPromise } from 'axios';
import { ServiceBase } from 'sparkx/core';
import { HTTPService } from 'sparkx/services';

interface IISBN {
    /**
     * Type of ISBN
     */
    type: string;
    /**
     * ISBN number
     */
    identifier: number;
}

interface IBookList {
    /**
     * Items in list
     */
    items: IBookDetail[];
}

export interface IBookDetail {
    /**
     * Book ID
     */
    id: string;
    /**
     * Book info
     */
    volumeInfo: {
        /**
         * Authors
         */
        authors: string[],
        /**
         * Average Rating
         */
        averageRating: number,
        /**
         * Book categories
         */
        categories: string[],
        /**
         * Description for book
         */
        description: string,
        /**
         * Thumbnails for the book
         */
        imageLinks: {
            /**
             * Standard size thumbnail
             */
            thumbnail: string,
        }
        /**
         * ISBN numbers
         */
        industryIdentifiers: IISBN[],
        /**
         * Number of pages in book
         */
        pageCount: number,
        /**
         * Publisher for the book
         */
        publisher: string,
        /**
         * Book's rating
         */
        ratingsCount: number,
        /**
         * Book's subtitle
         */
        subtitle: string,
        /**
         * Book's title
         */
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
