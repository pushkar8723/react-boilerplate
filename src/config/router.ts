import { hashLocationPlugin, servicesPlugin, UIRouterReact } from '@uirouter/react';
import routes from './routes';

// Create a new instance of the Router
const router = new UIRouterReact();
router.plugin(servicesPlugin);
router.plugin(hashLocationPlugin);

export default router;

/**
 * Function to dynamically insert a state in router.
 *
 * @param {string} name Name of the state
 * @param {string} url URL of the route
 * @param {Element} component Component in state
 * @returns {void}
 */
export function registerRoute(name: string, url: string, component: React.ReactNode) {
    router.stateRegistry.register({
        component,
        name,
        url,
    });
}

routes.forEach(state => router.stateRegistry.register(state));

// Global config for router
router.urlService.rules.initial({ state: 'welcome' });

// // Register the "requires auth" hook with the TransitionsService
// import reqAuthHook from './global/requiresAuth.hook';
// router.transitionService.onBefore(reqAuthHook.criteria, reqAuthHook.callback, {priority: 10});
