import { ControllerBase } from '@sparkx/core';
import { RoutingService } from '@sparkx/react';
import GoogleBooksService from 'services/GoogleBooksService';
import LocalStorageService from 'services/LocalStorageService';
import { IGlobal } from '../../types';

export interface IBooksState {
    /**
     * List of books
     */
    books: IBookListItem[];
}

export interface IBookListItem {
    /** Book authors */
    authors: string[];
    /** Book Identifier */
    id: string;
    /** Publisher */
    publisher: string;
    /** Subtitle for the book */
    subtitle: string;
    /** Standard size thumbnail for the book */
    thumbnail?: string;
    /** Book's title */
    title: string;
}

/**
 * Books Ctrl
 */
class BooksCtrl extends ControllerBase<IBooksState, IGlobal> {
    /**
     * Local Storage Service
     */
    private _localStorageService = new LocalStorageService();

    /**
     * Google Book Service
     */
    private _googleBooksService = new GoogleBooksService();

    /**
     * Routing Service
     */
    private _routingService = new RoutingService();

    /**
     * Redirects to Books detailPage.
     *
     * @param bookName
     */
    public loadBook = (bookName: string) => {
        this._routingService.goTo('books.search');
        return this._googleBooksService.searchBooks(bookName).then(
            (resp) => {
                const books = resp.data.items.map((book) => {
                    return {
                        authors: book.volumeInfo.authors,
                        id: book.id,
                        publisher: book.volumeInfo.publisher,
                        subtitle: book.volumeInfo.subtitle,
                        thumbnail: book.volumeInfo.imageLinks &&
                            book.volumeInfo.imageLinks.thumbnail,
                        title: book.volumeInfo.title,
                    };
                });
                this._setScope({ books });
            },
        );
    }

    /**
     * Logs out the user.
     */
    public logout = () => {
        this._setGlobal({ auth: undefined });
        this._localStorageService.remove('auth');
        this._routingService.goTo('welcome');
    }
}

export default BooksCtrl;
