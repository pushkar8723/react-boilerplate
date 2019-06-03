import LocalStorage from 'services/LocalStorageService';
import { RoutingService } from 'sparkx/react';
import WelcomeCtrl from 'views/Welcome/WelcomeCtrl';

let ctrl;
let setScope;
let setGlobal: () => void;
const mockData = {
    email: 'pushkar8723@gmail.com',
    familyName: 'Anand',
    givenName: 'Pushkar',
    name: 'Pushkar Anand',
};
jest.mock('sparkx/react');
jest.mock('services/LocalStorageService');

describe('Welcome Controller Tests', () => {
    beforeEach(() => {
        RoutingService.mockClear();
        setScope = jest.fn();
        setGlobal = jest.fn();
        ctrl = new WelcomeCtrl({}, setScope, {}, setGlobal);
        ctrl.login({ profileObj: mockData });
    });

    it('Test Local Storage Update', () => {
        const localStorageInstance = LocalStorage.mock.instances[0];
        const setMock = localStorageInstance.set;

        expect(setMock.mock.calls.length).toBe(1);
        expect(setMock).toHaveBeenCalledWith('auth', mockData);
    });

    it('Test Login Redirect', () => {
        const routingServiceInstance = RoutingService.mock.instances[0];
        const goToMock = routingServiceInstance.goTo;

        expect(goToMock.mock.calls.length).toBe(1);
        expect(goToMock).toHaveBeenCalledWith('books');
    });

    it('Test Login to update Global auth', () => {
        expect(setGlobal.mock.calls.length).toBe(1);
        expect(setGlobal).toHaveBeenCalledWith({ auth: mockData });
    });
});
