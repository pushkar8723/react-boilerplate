import ControllerBase from 'core/ControllerBase';
import GoogleBooksService from 'services/GoogleBooksService';
import LocalStorageService from 'services/LocalStorageService';
import RoutingService from 'services/RoutingService';

/**
 * Books Ctrl
 */
class BooksCtrl extends ControllerBase<any, any> {
    /**
     * Local Storage Service
     */
    private _localStorageService: LocalStorageService;

    /**
     * Google Book Service
     */
    private _googleBooksService: GoogleBooksService;

    /**
     * Routing Service
     */
    private _routingService: RoutingService;

    constructor(global: any, scope: any, setScope: (scope: any) => void,
                setGlobal: (global: any) => void) {
        super(global, scope, setScope, setGlobal);
        this._localStorageService = new LocalStorageService();
        this._routingService = new RoutingService();
        this._googleBooksService = new GoogleBooksService();
    }

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
        this._googleBooksService.searchBooks(bookName).then(
            (resp: any) => {
                this._setGlobal({ inProgress: false });
                const books = resp.data.items.map((book: any) => {
                    return {
                        authors: book.volumeInfo.authors,
                        id: book.id,
                        publisher: book.volumeInfo.publisher,
                        subtitle: book.volumeInfo.subtitle,
                        thumbnail: book.volumeInfo.imageLinks.thumbnail,
                        title: book.volumeInfo.title,
                    };
                });
                this._setScope({ books });
            },
            (error: any) => {
                this._setGlobal({ inProgress: false });
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
