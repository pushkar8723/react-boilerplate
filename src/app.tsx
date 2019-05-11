import { Transition } from '@uirouter/core';
import routes from 'config/routes';
import { initApp } from 'core/App';
import { AccessType } from 'core/types';
import * as ReactDOM from 'react-dom';
import LocalStorageService from 'services/LocalStorageService';
import RoutingService from 'services/RoutingService';
import './styles/main.css';

const localStorageService = new LocalStorageService();
const routingService = new RoutingService();

// Register routes.
routingService.registerRoutes(routes);

// Setting starting route.
routingService.setInitialState('welcome');

// Setting fallback route.
routingService.set404State('404');

// Register hook for page title.
routingService.registerSuccessHook((transition: Transition) => {
    const { data } = transition.router.globals.current;
    const title = `${data && data.pageTitle ? `${data.pageTitle} - ` : ''}Books`;
    document.title = title;
});

// Register hook for authentication check.
routingService.registerBeforeHook((transition: Transition) => {
    const toState = transition.to();
    const auth = localStorageService.get('auth');
    if (toState.data.access === AccessType.AUTHENTICATED && !auth) {
        return transition.router.stateService.target('welcome');
    }
    if (toState.data.access === AccessType.UNAUTHENTICATED && auth) {
        return transition.router.stateService.target('books');
    }
});
​
ReactDOM.render(initApp(), document.getElementById('root'));
