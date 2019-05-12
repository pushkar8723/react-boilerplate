import GoogleBooksService from 'services/GoogleBooksService';
import LocalStorage from 'services/LocalStorageService';
import RoutingService from 'services/RoutingService';
import BooksCtrl from 'views/Books/BooksCtrl';
import bookSearchResponse from './BooksSearch.json';

let ctrl: BooksCtrl;
let setScope: () => void;
let setGlobal: () => void;
const authMock = {
    email: 'pushkar8723@gmail.com',
};
jest.mock('services/LocalStorageService');
jest.mock('services/RoutingService');
jest.mock('services/GoogleBooksService');

describe('Books Controller Tests', () => {
    beforeEach(() => {
        setScope = jest.fn();
        setGlobal = jest.fn();
        LocalStorage.mockClear();
        RoutingService.mockClear();
        GoogleBooksService.mockClear();
        ctrl = new BooksCtrl({}, setScope, {}, setGlobal);
    });

    it('Test Update Global Auth', () => {
        const localStorageInstance = LocalStorage.mock.instances[0];
        localStorageInstance.get = jest.fn(() => authMock);
        const getMock = localStorageInstance.get;

        ctrl.updateGlobalAuth();

        expect(getMock.mock.calls.length).toBe(1);
        expect(getMock).toHaveBeenCalledWith('auth');

        expect(setGlobal.mock.calls.length).toBe(1);
        expect(setGlobal).toHaveBeenCalledWith({ auth: authMock });
    });

    it('Test Load Book Success', () => {
        const googleBooksService = GoogleBooksService.mock.instances[0];
        googleBooksService.searchBooks = jest.fn(() =>
            Promise.resolve(bookSearchResponse.response));

        expect.assertions(4);

        const promise = ctrl.loadBook('A song of ice and fire');
        expect(setGlobal).toHaveBeenCalledWith({ inProgress: true });
        expect(googleBooksService.searchBooks).toHaveBeenCalledWith('A song of ice and fire');
        return promise.then(() => {
            expect(setGlobal).toHaveBeenCalledWith({ inProgress: false });
            expect(setScope).toHaveBeenCalledWith({
                books: bookSearchResponse.parsedResp,
            });
        });

    });

    it('Test Load Book Failure', () => {
        const googleBooksService = GoogleBooksService.mock.instances[0];
        googleBooksService.searchBooks = jest.fn(() =>
            Promise.reject('Error'));

        expect.assertions(3);

        const promise = ctrl.loadBook('A song of ice and fire');
        expect(setGlobal).toHaveBeenCalledWith({ inProgress: true });
        expect(googleBooksService.searchBooks).toHaveBeenCalledWith('A song of ice and fire');
        return promise.then(() => {
            expect(setGlobal).toHaveBeenCalledWith({ inProgress: false });
        });

    });

    it('Test Logout', () => {
        const localStorageInstance = LocalStorage.mock.instances[0];
        const removeMock = localStorageInstance.remove;
        const routingServiceInstance = RoutingService.mock.instances[0];
        const goToMock = routingServiceInstance.goTo;

        ctrl.logout();

        expect(setGlobal).toHaveBeenCalledWith({ auth: undefined });
        expect(removeMock).toHaveBeenCalledWith('auth');
        expect(goToMock).toHaveBeenCalledWith('welcome');
    });
});
