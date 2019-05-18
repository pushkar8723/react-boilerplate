import ControllerBase from 'core/ControllerBase';
import { IGlobal } from 'core/types';
import GoogleBooksService, { IBookDetail } from 'services/GoogleBooksService';

export interface IDetailState {
    data: IBookDetail;
}

/**
 * Detail Controller
 */
class DetailCtrl extends ControllerBase<IDetailState, IGlobal> {
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
            (resp) => {
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
