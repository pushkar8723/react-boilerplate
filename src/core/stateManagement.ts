import { IModel } from 'model';
import { GlobalActions } from 'model/globalReducer';
import scopeReducer, { ScopeActions } from 'model/scopeReducer';
import { ComponentType } from 'react';
import { connect } from 'react-redux';
import ControllerBase from './ControllerBase';
import { IRouteState } from './types';

/**
 * Takes in payload to genrate global actions.
 * When dispatched, this action will update the global state.
 * It also takes in scope name which is not stored in state,
 * however it may help in debugging which component updated the
 * global scope in case of any conflict.
 *
 * @param scopeName
 * @param payload
 */
function updateGlobalStore(scopeName: string, payload: any) {
    return {
        payload,
        scopeName,
        type: GlobalActions.UPDATE_GLOBAL,
    };
}

/**
 * Takes in scope name and payload to update the scope with
 * given name.
 *
 * @param scopeName
 * @param payload
 */
function updateScopeStore(scopeName: string, payload: any) {
    return {
        payload,
        scopeName,
        type: ScopeActions.UPDATE_SCOPE,
    };
}

enum storeType {
    GLOBAL = 'GLOBAL',
    SCOPE = 'SCOPE',
}

interface IPayloadType {
    /**
     * Payload sent by controller.
     */
    payload: any;
    /**
     * Type of payload.
     */
    type: storeType;
}

/**
 * Function to be invoked by controllers if they want to
 * update global store.
 *
 * @param payload
 */
function setGlobal(payload: any): IPayloadType {
    return {
        payload,
        type: storeType.GLOBAL,
    };
}

/**
 * Function to be invoked by controllers if they want to
 * update local scope.
 * @param payload
 */
function setScope(payload: any): IPayloadType {
    return {
        payload,
        type: storeType.SCOPE,
    };
}

/**
 * Maps payload type to action.
 *
 * @param scopeName
 * @param payloadType
 */
function mapPayloadToAction(scopeName: string, payloadType: IPayloadType) {
    switch (payloadType && payloadType.type) {
    case storeType.GLOBAL:
        return updateGlobalStore(scopeName, payloadType.payload);
    case storeType.SCOPE:
        return updateScopeStore(scopeName, payloadType.payload);
    default:
        return {
            scopeName,
            type: 'NOOP',
        };
    }
}

interface IDispatchObj {
    [name: string]: () => void;
}

/**
 * Wraps all exported functions by controller to dispatch.
 *
 * @param controller
 * @param scopeName
 */
function mapCtrl(controller: any) {
    const functionNames = Object.keys(controller).filter((name: string) => name[0] !== '_');
    return functionNames.reduce(
        (prev: IDispatchObj, name: any) => {
            return {
                ...prev,
                [name]: controller[name],
            };
        },
        {},
    );
}

/**
 * Returns a scope with parent scopes attached in prototype of scope object.
 *
 * @param state
 * @param scopeName
 */
function getScope(state: IModel, scopeName: string) {
    const scope = {
        ...state.scopes[scopeName],
    };
    const parentScopeName = scopeName.split('.').slice(0, -1).join('.');
    if (parentScopeName.length > 0) {
        scope.__proto__ = getScope(state, parentScopeName);
    }
    return scope;
}

/**
 * Binds Model in Redux to component and controller.
 *
 * @param scopeName
 * @param component
 * @param controller
 */
export function bindMVC<S, G>(component: ComponentType, scopeName: string,
                              controller?: ControllerBase<S, G>) {
    return connect(
        (state: IModel): any => {
            return {
                global: state.global,
                scope: getScope(state, scopeName),
            };
        },
        (dispatch: any) => {
            return { dispatch };
        },
        (stateProps: any, dispatchProps: any, ownProps: any) => {
            const dispatch = dispatchProps.dispatch;
            let ctrl: ControllerBase<S, G>;
            if (controller) {
                ctrl = new controller(
                    stateProps.scope,
                    (scope: S) => dispatch(mapPayloadToAction(scopeName, setScope(scope))),
                    stateProps.global,
                    (global: S) => dispatch(mapPayloadToAction(scopeName, setGlobal(global))),
                );
            }
            return {
                ...ownProps,
                ...stateProps,
                ...(controller
                    ? mapCtrl(ctrl)
                    : null),
            };
        },
    )(component);
}

/**
 * Takes in a route state and returns transformed state that can be
 * plugged into UI router.
 *
 * @param routeState
 */
export function createRoute(routeState: IRouteState) {
    return {
        component: routeState.component
            ? bindMVC(routeState.component, routeState.name, routeState.controller)
            : null,
        data: routeState.data,
        lazyLoad: routeState.lazyLoad,
        name: routeState.name,
        redirectTo: routeState.redirectTo,
        url: routeState.url,
    };
}
