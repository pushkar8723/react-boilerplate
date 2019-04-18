const defaultState = {};
export enum GlobalActions {
    UPDATE_GLOBAL = 'UPDATE_GLOBAL',
}

interface IAction {
    /**
     * Action Identifier.
     */
    type: GlobalActions;
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
export default function globalReducer(state: any = defaultState, action: IAction) {
    switch (action.type) {
    case GlobalActions.UPDATE_GLOBAL:
        return {
            ...state,
            ...action.payload,
        };
    default:
        return state;
    }
}
