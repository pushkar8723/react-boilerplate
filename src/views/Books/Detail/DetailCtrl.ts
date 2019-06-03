import GoogleBooksService, { IBookDetail } from 'services/GoogleBooksService';
import { ControllerBase } from 'sparkx/core';
import { IGlobal } from '../../../types';

export interface IDetailState {
    /** Book details */
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
        return this._googleBooksService.getBook(id, true).then(
            (resp) => {
                this._setScope({ data: resp.data });
            },
            () => {
                this._setScope({ data: undefined });
            },
        );
    }
}

export default DetailCtrl;
