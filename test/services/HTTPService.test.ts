import axios from 'axios';
import HTTPService from 'services/HTTPService';

let service: HTTPService;
const mockParam = { q: 'value' };
const mockHeader = { 'test-key': 'value' };
const mockData = { a: 'b' };
const expectedHeader = {
    'content-type': 'application/json',
    'test-key': 'value',
};
jest.mock('axios');

describe('Test HTTP Service', () => {
    beforeEach(() => {
        axios.mockClear();
        service = new HTTPService();
    });

    it('Test Set Headers', () => {
        service.setHeaders(mockHeader);
        expect(service.headers).toStrictEqual(mockHeader);
    });

    it('Test Append Header', () => {
        service.appendHeader('test-key', 'value');
        expect(service.headers).toStrictEqual(expectedHeader);
    });

    it('Test Remove Header', () => {
        service.appendHeader('test-key', 'value');
        expect(service.headers).toStrictEqual(expectedHeader);
        service.removeHeader('test-key');
        expect(service.headers).toStrictEqual({
            ...expectedHeader,
            'test-key': undefined,
        });
    });

    it('Test Get Interceptors', () => {
        axios.interceptors = jest.fn();
        const returnedInterceptors = service.getInterceptors();
        expect(returnedInterceptors).toBe(axios.interceptors);
    });

    it('Test Request', () => {
        service.request({
            headers: mockHeader,
            method: 'GET',
            params: mockParam,
            url: '/',
        });
        expect(axios).toHaveBeenCalledWith({
            headers: expectedHeader,
            method: 'GET',
            params: mockParam,
            url: '/',
        });
    });

    it('Test Get', () => {
        service.get('/', mockParam, mockHeader);
        expect(axios).toHaveBeenCalledWith({
            headers: expectedHeader,
            method: 'GET',
            params: mockParam,
            url: '/',
        });
    });

    it('Test Post', () => {
        service.post('/', mockData, mockParam, mockHeader);
        expect(axios).toHaveBeenCalledWith({
            data: mockData,
            headers: expectedHeader,
            method: 'POST',
            params: mockParam,
            url: '/',
        });
    });

    it('Test Put', () => {
        service.put('/', mockData, mockParam, mockHeader);
        expect(axios).toHaveBeenCalledWith({
            data: mockData,
            headers: expectedHeader,
            method: 'PUT',
            params: mockParam,
            url: '/',
        });
    });

    it('Test Delete', () => {
        service.delete('/', mockData, mockParam, mockHeader);
        expect(axios).toHaveBeenCalledWith({
            data: mockData,
            headers: expectedHeader,
            method: 'DELETE',
            params: mockParam,
            url: '/',
        });
    });
});
