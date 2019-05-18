import { UIViewInjectedProps } from '@uirouter/react';
import { ComponentType } from 'react';
import ControllerBase from './ControllerBase';

export enum AccessType {
    ALL = 'all',
    UNAUTHENTICATED = 'unauthenticated',
    AUTHENTICATED = 'authenticated',
}

export interface IRouteState<D> {
    /**
     * Name of the route
     */
    name: string;
    /**
     * Controller for the component
     */
    controller?: ControllerBase<any, any>;
    /**
     * Route data object
     */
    data?: D;
    /**
     * Component to be rendered.
     */
    component?: ComponentType;
    /**
     * url for the route.
     */
    url?: string;
    /**
     * Redirection State.
     */
    redirectTo?: string;
    /**
     * Lazy loaded function
     */
    lazyLoad?: () => Promise<any>;
}

export interface IInjectedProps<G, S> extends UIViewInjectedProps {
    global: G;
    scope: S;
}

export interface IGlobal {
    auth: any;
    inProgress: boolean;
}
