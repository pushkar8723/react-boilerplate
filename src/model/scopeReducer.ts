const defaultState = {};
export enum ScopeActions {
    UPDATE_SCOPE = 'UPDATE_SCOPE',
    CLEAR_SOCPE = 'CLEAR_SCOPE',
}

interface IAction {
    /**
     * Action Identifier.
     */
    type: ScopeActions;
    /**
     * Name of the scope to be updated.
     */
    scopeName: string;
    /**
     * Payload for global state.
     */
    payload: any;
}

/**
 * Reducer for global state.
 * This state will be made available to all components.
 *
 * @param state
 * @param action
 */
export default function scopeReducer(state: any = defaultState, action: IAction) {
    switch (action.type) {
    case ScopeActions.UPDATE_SCOPE:
        return {
            ...state,
            [action.scopeName]: {
                ...state[action.scopeName],
                ...action.payload,
            },
        };
    case ScopeActions.CLEAR_SOCPE:
        return {
            ...state,
            [action.scopeName]: undefined,
        };
    default:
        return state;
    }
}
