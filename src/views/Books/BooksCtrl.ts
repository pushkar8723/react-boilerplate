import ControllerBase from 'core/ControllerBase';
import { IGlobal } from 'core/types';
import GoogleBooksService from 'services/GoogleBooksService';
import LocalStorageService from 'services/LocalStorageService';
import RoutingService from 'services/RoutingService';
import Notification, { NOTIFICATION_POSITION } from 'sleek-ui/Notification';

export interface IBooksState {
    books: IBookListItem[];
}

export interface IBookListItem {
    authors: string[];
    id: string;
    publisher: string;
    subtitle: string;
    thumbnail?: string;
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
     * Updates the global auth from localstorage.
     */
    public updateGlobalAuth = () => {
        const auth = this._localStorageService.get('auth');
        return this._setGlobal({
            auth,
        });
    }

    /**
     * Redirects to Books detailPage.
     *
     * @param bookName
     */
    public loadBook = (bookName: string) => {
        this._setGlobal({ inProgress: true });
        this._routingService.goTo('books.search');
        return this._googleBooksService.searchBooks(bookName).then(
            (resp) => {
                this._setGlobal({ inProgress: false });
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
            () => {
                this._setGlobal({ inProgress: false });
                Notification.add(NOTIFICATION_POSITION.TOP_RIGHT, {
                    content: 'Search request failed. If error persists, contact admin.',
                    state: 'danger',
                    title: 'Unable to search. Try again.',
                });
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
