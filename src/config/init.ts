import { hashLocationPlugin, servicesPlugin, Transition, UIRouterReact } from '@uirouter/react';
import { AccessType } from 'core/types';
import { ScopeActions } from 'model/scopeReducer';
import { compose, createStore } from 'redux';
import LocalStorageService from 'services/LocalStorageService';
import RoutingService from 'services/RoutingService';
import model from '../model';
import routes from './routes';

const middlewares: any = [];

if (__MODE__  !== 'production' && (window as any).__REDUX_DEVTOOLS_EXTENSION__) {
    middlewares.push((window as any).__REDUX_DEVTOOLS_EXTENSION__());
}

const store = createStore(
  model,
  compose.apply(this, middlewares),
);

const localStorageService = new LocalStorageService();

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
    const title = `${data && data.pageTitle ? `${data.pageTitle} - ` : ''}Pacman`;
    document.title = title;
});

router.transitionService.onBefore({}, (transition: Transition) => {
    const toState = transition.to();
    const auth = localStorageService.get('auth');
    if (toState.data.access === AccessType.AUTHENTICATED && !auth) {
        return transition.router.stateService.target('welcome');
    }
    if (toState.data.access === AccessType.UNAUTHENTICATED && auth) {
        return transition.router.stateService.target('books');
    }

    const fromState = transition.from();
    let stateName = fromState.name;
    while (stateName.length && !toState.name.startsWith(stateName)) {
        store.dispatch({
            scopeName: stateName,
            type: ScopeActions.CLEAR_SOCPE,
        });
        stateName = stateName.split('.').slice(0, -1).join('.');
    }
});

const routingService = new RoutingService();
routingService.setRouter(router);

export { router, store };
