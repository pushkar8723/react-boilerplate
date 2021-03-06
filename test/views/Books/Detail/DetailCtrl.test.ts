import GoogleBooksService from 'services/GoogleBooksService';
import DetailCtrl from 'views/Books/Detail/DetailCtrl';
import bookDetail from './BookDetail.json';

let ctrl: DetailCtrl;
let setScope: () => void;
let setGlobal: () => void;
jest.mock('services/GoogleBooksService');

describe('Detail Controller Test', () => {
    beforeEach(() => {
        setScope = jest.fn();
        setGlobal = jest.fn();
        GoogleBooksService.mockClear();
        ctrl = new DetailCtrl({}, setScope, {}, setGlobal);
    });

    it('Test Get Book Success', () => {
        const googleBooksService = GoogleBooksService.mock.instances[0];
        googleBooksService.getBook = jest.fn(() =>
            Promise.resolve(bookDetail.response));

        const promise = ctrl.getBook('abc');
        expect.assertions(2);
        expect(googleBooksService.getBook).toHaveBeenCalledWith('abc', true);
        return promise.then(() => {
            expect(setScope).toHaveBeenCalledWith(bookDetail.response);
        });
    });

    it('Test Get Book Failure', () => {
        const googleBooksService = GoogleBooksService.mock.instances[0];
        googleBooksService.getBook = jest.fn(() =>
            Promise.reject('Error'));

        const promise = ctrl.getBook('abc');
        expect.assertions(2);
        expect(googleBooksService.getBook).toHaveBeenCalledWith('abc', true);
        return promise.then(() => {
            expect(setScope).toHaveBeenCalledWith({ data: undefined });
        });
    });
});
