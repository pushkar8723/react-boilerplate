import { UIRouterReact } from '@uirouter/react';
import RoutingService from 'services/RoutingService';

let service: RoutingService;
jest.mock('@uirouter/react');

describe('Test Routing Service', () => {
    beforeEach(() => {
        service = new RoutingService();
    });

    it('Test Register Routes', () => {
        const routerInstance = UIRouterReact.mock.instances[0];
        routerInstance.stateRegistry = {
            register: jest.fn(),
        };
        service.registerRoutes([{}, {}, {}]);
        expect(routerInstance.stateRegistry.register.mock.calls.length).toBe(3);
    });

    it('Test Set Initial Route', () => {
        const routerInstance = UIRouterReact.mock.instances[0];
        routerInstance.urlService = {
            rules: {
                initial: jest.fn(),
            },
        };
        service.setInitialState('stateName');
        expect(routerInstance.urlService.rules.initial).toHaveBeenCalledWith({
            state: 'stateName',
        });
    });

    it('Test Set 404 state', () => {
        const routerInstance = UIRouterReact.mock.instances[0];
        routerInstance.urlService = {
            rules: {
                otherwise: jest.fn(),
            },
        };
        service.set404State('stateName');
        expect(routerInstance.urlService.rules.otherwise).toHaveBeenCalledWith({
            state: 'stateName',
        });
    });

    it('Test Go To', () => {
        const routerInstance = UIRouterReact.mock.instances[0];
        routerInstance.stateService = {
            go: jest.fn(),
        };
        service.goTo('stateName', { mock: 'param' });
        expect(routerInstance.stateService.go).toHaveBeenCalledWith('stateName', { mock: 'param' });
    });

    it('Test Get Router', () => {
        const routerInstance = UIRouterReact.mock.instances[0];
        const returnedInstance = service.getRouter();
        expect(returnedInstance).toBe(routerInstance);
    });

    it('Test Register Before Hook', () => {
        const routerInstance = UIRouterReact.mock.instances[0];
        routerInstance.transitionService = {
            onBefore: jest.fn(),
        };
        const mockFn = jest.fn();
        service.registerBeforeHook(mockFn);
        expect(routerInstance.transitionService.onBefore).toHaveBeenCalledWith(
            {}, mockFn,
        );
    });

    it('Test Register Success Hook', () => {
        const routerInstance = UIRouterReact.mock.instances[0];
        routerInstance.transitionService = {
            onSuccess: jest.fn(),
        };
        const mockFn = jest.fn();
        service.registerSuccessHook(mockFn);
        expect(routerInstance.transitionService.onSuccess).toHaveBeenCalledWith(
            {}, mockFn,
        );
    });
});
