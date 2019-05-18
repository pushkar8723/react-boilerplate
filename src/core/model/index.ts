import { combineReducers } from 'redux';
import globalReducer from './globalReducer';
import scopeReducer from './scopeReducer';
​
export interface IModel<G> {
    /**
     * Global scope. To be passed to all components.
     */
    global: G;
    /**
     * Local scope of each component. Identified by the scope name.
     */
    scopes: {
        [scopeName: string]: any;
    };
}

export default combineReducers({
    global: globalReducer,
    scopes: scopeReducer,
});
