import ControllerBase from 'core/ControllerBase';
import GoogleBooksService from 'services/GoogleBooksService';

/**
 * Detail Controller
 */
class DetailCtrl extends ControllerBase<any, any> {
    /**
     * Google Book Service
     */
    private _googleBooksService = new GoogleBooksService();

    /**
     * Retrives the book with the given Id
     * @param id
     */
    public getBook = (id: string) => {
        this._setGlobal({ inProgress: true });
        return this._googleBooksService.getBook(id).then(
            (resp: any) => {
                this._setGlobal({ inProgress: false });
                this._setScope({ data: resp.data });
            },
            () => {
                this._setGlobal({ inProgress: false });
                this._setScope({ data: undefined });
            },
        );
    }
}

export default DetailCtrl;
