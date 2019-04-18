/**
 * Base for all controller class
 */
class ControllerBase<S, G> {
    /**
     * Global state.
     */
    protected _global: G;

    /**
     * Local state
     */
    protected _scope: S;

    /**
     * Function to set local scope.
     */
    protected _setScope: (scope: S) => void;

    /**
     * Function to set global scope.
     */
    protected _setGlobal: (global: G) => void;

    constructor(global: G, scope: S, setScope: (scope: S) => void,
                setGlobal: (global: G) => void) {
        this._global = global;
        this._scope = scope;
        this._setScope = setScope;
        this._setGlobal = setGlobal;
    }
}

export default ControllerBase;
