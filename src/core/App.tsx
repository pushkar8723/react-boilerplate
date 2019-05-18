import { Transition } from '@uirouter/core';
import { UIRouter, UIView } from '@uirouter/react';
import { ScopeActions } from 'core/model/scopeReducer';
import * as React from 'react';
import { Provider } from 'react-redux';
import { compose, createStore } from 'redux';
import RoutingService from 'services/RoutingService';
import model from './model';
import { GlobalActions } from './model/globalReducer';

/**
 * Creates a new app with store and router configured.
 */
export function initApp<G>(
    config?: (setGlobal: <K extends keyof G>(payload: Pick<G, K>) => void) => void,
): JSX.Element {
    const routingService = new RoutingService();
    const middlewares: any = [];

    // Adding devtool extension midleware if its a non production build.
    if (__MODE__  !== 'production' && (window as any).__REDUX_DEVTOOLS_EXTENSION__) {
        middlewares.push((window as any).__REDUX_DEVTOOLS_EXTENSION__());
    }

    // Creating store.
    const store = createStore(
      model,
      compose.apply(this, middlewares),
    );

    /**
     * Callback function to update global scope.
     * @param payload
     */
    function configFn<K extends keyof G>(payload: Pick<G, K>) {
        store.dispatch({
            payload,
            scopeName: 'CONFIG',
            type: GlobalActions.UPDATE_GLOBAL,
        });
    }

    // tslint:disable-next-line: no-unused-expression
    config && config(configFn);

    // Registering hook to clear states of previous routes.
    routingService.registerSuccessHook((transition: Transition) => {
        const toState = transition.to();
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

    const router = routingService.getRouter();

    return (
        <Provider store={store}>
            <UIRouter router={router}>
                <UIView />
            </UIRouter>
        </Provider>
    );
}
