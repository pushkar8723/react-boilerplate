/**
 * Base for all services to extend.
 * It ensures that all services are singleton.
 */
export default class ServiceBase {
    /**
     * Maintains the map of instance of the services.
     */
    private static instance: {
        [serviceName: string]: any,
    } = {};

    constructor() {
        if (ServiceBase.instance[this.constructor.name]) {
            return ServiceBase.instance[this.constructor.name];
        }
        ServiceBase.instance[this.constructor.name] = this;
    }
}
