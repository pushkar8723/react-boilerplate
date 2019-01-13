import { hashLocationPlugin, servicesPlugin, Transition, UIRouterReact } from '@uirouter/react';
import routes from './routes';

// Create a new instance of the Router
const router = new UIRouterReact();
router.plugin(servicesPlugin);
router.plugin(hashLocationPlugin);
routes.forEach(state => router.stateRegistry.register(state));

// Global config for router
router.urlService.rules.initial({ state: 'welcome' });

// Error page to show if the url doesn't match any route
router.urlService.rules.otherwise({ state: '404' });

// Register the page title hook with the TransitionsService
router.transitionService.onSuccess({}, (transition: Transition) => {
    const { data } = transition.router.globals.current;
    const title = `${data && data.pageTitle ? `${data.pageTitle} - ` : ''}Notes Manager`;
    document.title = title;
});

export default router;
