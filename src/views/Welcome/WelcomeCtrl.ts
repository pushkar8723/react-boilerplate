import ControllerBase from 'core/ControllerBase';
import { IGlobal } from 'core/types';
import LocalStorageService from 'services/LocalStorageService';
import RoutingService from 'services/RoutingService';

/**
 * Welcome Controller
 */
class WelcomeCtrl extends ControllerBase<undefined, IGlobal> {
    /**
     * Local storage service
     */
    private _storage: LocalStorageService = new LocalStorageService();

    /**
     * Routing Service
     */
    private _routingService: RoutingService = new RoutingService();

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
