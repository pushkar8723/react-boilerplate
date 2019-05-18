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
    protected _setScope: <K extends keyof S>(scope: Pick<S, K>) => void;

    /**
     * Function to set global scope.
     */
    protected _setGlobal: <K extends keyof G>(global: Pick<G, K>) => void;

    constructor(scope: S, setScope: <K extends keyof S>(scope: Pick<S, K>) => void,
                global: G, setGlobal: <K extends keyof G>(global: Pick<G, K>) => void) {
        this._global = global;
        this._scope = scope;
        this._setScope = setScope;
        this._setGlobal = setGlobal;
    }
}

export default ControllerBase;
