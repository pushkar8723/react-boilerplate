import { registerRoute } from '../config/router';

/**
 * Decorator to dnamically register route.
 * @param url
 */
export function route(url: string) {
    return (target: Element) => {
        registerRoute(target.name, url, target);
    };
}
