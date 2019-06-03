export interface IGlobal {
    /**
     * Auth object
     */
    auth: any;
    /**
     * Flag to denote if any api is in progress
     */
    inProgress: boolean;
}

export enum AccessType {
    ALL = 'all',
    UNAUTHENTICATED = 'unauthenticated',
    AUTHENTICATED = 'authenticated',
}
