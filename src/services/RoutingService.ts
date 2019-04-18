import { UIRouterReact } from '@uirouter/react';
import ServiceBase from 'core/ServiceBase';

/**
 * Routing Service.
 * For easy managemet of routes.
 */
export default class RoutingService extends ServiceBase {
    /**
     * Router instance.
     */
    private router: any;

    /**
     * Method to set router.
     */
    public setRouter = (router: UIRouterReact) => {
        this.router = router;
    }

    /**
     * Redirects to the given state.
     */
    public goTo = (stateName: string, stateParams?: any) => {
        this.router.stateService.go(stateName, stateParams);
    }
}
