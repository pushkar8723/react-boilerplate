import ControllerBase from 'core/ControllerBase';
import LocalStorageService from 'services/LocalStorageService';
import RoutingService from 'services/RoutingService';

/**
 * Welcome Controller
 */
class WelcomeCtrl extends ControllerBase<any, any> {
    /**
     * Local storage service
     */
    private _storage: LocalStorageService;

    /**
     * Routing Service
     */
    private _routingService: RoutingService;

    constructor(global: any, scope: any, setScope: (scope: any) => void,
                setGlobal: (global: any) => void) {
        super(global, scope, setScope, setGlobal);
        this._storage = new LocalStorageService();
        this._routingService = new RoutingService();
    }

    /**
     * Logs in the user.
     */
    public login = (response: any) => {
        this._storage.set('auth', response.profileObj);
        this._routingService.goTo('books');
        this._setGlobal({
            auth: response.profileObj,
        });
    }
}

export default WelcomeCtrl;
