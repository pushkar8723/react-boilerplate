import AppShell from 'views/AppShell';
import { Error404 } from 'views/Error';
import Welcome from 'views/Welcome';

/**
 * This is the parent state for the entire application.
 *
 * This state's primary purposes are:
 * 1) Shows the outermost shell (including the navigation and logout for authenticated users)
 * 2) Provide a viewport (ui-view) for a substate to plug into
 */
const appState = {
    component: AppShell,
    name: 'app',
    redirectTo: 'welcome',
};

/**
 * This is the 'welcome' state.  It is the default state (as defined by app.js) if no other state
 * can be matched to the URL.
 */
const welcomeState = {
    component: Welcome,
    data: {
        pageTitle: 'Welcome',
    },
    name: 'welcome',
    parent: 'app',
    url: '/welcome',
};

/**
 * Error state. If the user is routed to an unregister route,
 * then the usere is redirected to this page.
 */
const errorState =  {
    component: Error404,
    data: {
        pageTitle: 'Page Not Found',
    },
    name: '404',
    parent: 'app',
    url: '/notFound',
};

/**
 * This is just a place holder for posts route.
 * It will be lazy loaded when user navigates to any posts route.
 */
const postFutureState = {
    lazyLoad: () => import('views/Post'),
    name: 'posts.**',
    parent: 'app',
    url: '/posts',
};

export default [appState, welcomeState, postFutureState, errorState];
