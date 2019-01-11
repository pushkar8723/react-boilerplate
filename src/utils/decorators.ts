import { registerRoute } from '../config/router';

export function route(url) {
    return (target: Element) => {
        registerRoute(target.name, url, target);
    };
}
