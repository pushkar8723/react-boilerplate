import GoogleBooksService from 'services/GoogleBooksService';
import { HTTPService } from 'sparkx/services';

let service: GoogleBooksService;
const endpoint = 'https://www.googleapis.com/books/v1';
jest.mock('sparkx/services');

describe('Test Google Books Service', () => {
    beforeEach(() => {
        HTTPService.mockClear();
        service = new GoogleBooksService();
    });

    it('Test Search Books', () => {
        const httpServiceInstance = HTTPService.mock.instances[0];
        service.searchBooks('test');
        expect(httpServiceInstance.get).toHaveBeenCalledWith(`${endpoint}/volumes`, {
            maxResults: '20',
            q: 'test',
            startIndex: '0',
        });
    });

    it('Test Search Books pagination', () => {
        const httpServiceInstance = HTTPService.mock.instances[0];
        service.searchBooks('test', 2, 10);
        expect(httpServiceInstance.get).toHaveBeenCalledWith(`${endpoint}/volumes`, {
            maxResults: '10',
            q: 'test',
            startIndex: '2',
        });
    });

    it('Test Get Book', () => {
        const httpServiceInstance = HTTPService.mock.instances[0];
        service.getBook('test');
        expect(httpServiceInstance.get).toHaveBeenCalledWith(
            `${endpoint}/volumes/test`, null, null,
            { errorHandled: undefined },
        );
    });
});
