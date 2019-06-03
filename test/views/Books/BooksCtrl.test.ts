import GoogleBooksService from 'services/GoogleBooksService';
import LocalStorage from 'services/LocalStorageService';
import { RoutingService } from 'sparkx/react';
import BooksCtrl from 'views/Books/BooksCtrl';
import bookSearchResponse from './BooksSearch.json';

let ctrl: BooksCtrl;
let setScope: () => void;
let setGlobal: () => void;
const authMock = {
    email: 'pushkar8723@gmail.com',
};
jest.mock('services/LocalStorageService');
jest.mock('sparkx/react');
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

    it('Test Load Book Success', () => {
        const googleBooksService = GoogleBooksService.mock.instances[0];
        googleBooksService.searchBooks = jest.fn(() =>
            Promise.resolve(bookSearchResponse.response));

        expect.assertions(2);

        const promise = ctrl.loadBook('A song of ice and fire');
        expect(googleBooksService.searchBooks).toHaveBeenCalledWith('A song of ice and fire');
        return promise.then(() => {
            expect(setScope).toHaveBeenCalledWith({
                books: bookSearchResponse.parsedResp,
            });
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
