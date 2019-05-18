import { Transition } from '@uirouter/core';
import routes from 'config/routes';
import { initApp } from 'core/App';
import { AccessType, IGlobal } from 'core/types';
import * as ReactDOM from 'react-dom';
import HTTPService from 'services/HTTPService';
import LocalStorageService from 'services/LocalStorageService';
import RoutingService from 'services/RoutingService';
import Notification, { NOTIFICATION_POSITION } from 'sleek-ui/Notification';
import './styles/main.css';

const localStorageService = new LocalStorageService();
const routingService = new RoutingService();
const httpService = new HTTPService();
​
ReactDOM.render(
    initApp<IGlobal>(
        (setGlobal) => {
            // Set auth in global scope if present in localstorage.
            const auth = localStorageService.get('auth');
            if (auth) {
                setGlobal({
                    auth,
                });
            }

            const interceptor = httpService.getInterceptors();

            // Register request handler interceptor
            interceptor.request.use(
                (response: any) => {
                    setGlobal({ inProgress: true });
                    return response;
                },
            );

            // Register response handler interceptor
            interceptor.response.use(
                (response: any) => {
                    setGlobal({ inProgress: false });
                    return response;
                },
                (error: any) => {
                    setGlobal({ inProgress: false });
                    if (!error.config.errorHandled) {
                        Notification.add(NOTIFICATION_POSITION.TOP_RIGHT, {
                            content: 'Request failed. If error persists, contact admin.',
                            state: 'danger',
                            title: 'Oops! Something went wrong',
                        });
                    }
                    return error;
                },
            );

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
                const authObj = localStorageService.get('auth');
                if (toState.data.access === AccessType.AUTHENTICATED && !authObj) {
                    return transition.router.stateService.target('welcome');
                }
                if (toState.data.access === AccessType.UNAUTHENTICATED && authObj) {
                    return transition.router.stateService.target('books');
                }
            });
        }),
    document.getElementById('root'),
);
