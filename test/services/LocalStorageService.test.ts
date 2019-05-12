import LocalStorageService from 'services/LocalStorageService';

let service: LocalStorageService;

describe('Test Local Storage Service', () => {
    beforeEach(() => {
        service = new LocalStorageService();
    });

    it('Test Get', () => {
        const spy = jest.spyOn(Storage.prototype, 'getItem');
        service.get('auth');
        expect(spy).toHaveBeenCalledWith('auth');
    });

    it('Test Set', () => {
        const spy = jest.spyOn(Storage.prototype, 'setItem');
        const mockObj = { a: 'b' };
        service.set('auth', mockObj);
        expect(spy).toHaveBeenCalledWith('auth', JSON.stringify(mockObj));
    });

    it('Test Remove', () => {
        const spy = jest.spyOn(Storage.prototype, 'removeItem');
        service.remove('auth');
        expect(spy).toHaveBeenCalledWith('auth');
    });
});
