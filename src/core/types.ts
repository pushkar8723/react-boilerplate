import { ComponentType } from 'react';

export enum AccessType {
    ALL = 'all',
    UNAUTHENTICATED = 'unauthenticated',
    AUTHENTICATED = 'authenticated',
}

export interface IRouteState {
    /**
     * Name of the route
     */
    name: string;
    /**
     * Controller for the component
     */
    controller?: any;
    /**
     * Route data object
     */
    data?: {
        /**
         * Allowed access type for the route
         */
        access: AccessType,
        /**
         * Title of the page
         */
        pageTitle: string,
    };
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
