import { createRoute } from 'sparkx/react';
import { Error404 } from 'views/Error';
import { Welcome, WelcomeCtrl } from 'views/Welcome';
import { AccessType } from '../types';

/**
 * This is the 'welcome' state.  It is the default state (as defined by app.js) if no other state
 * can be matched to the URL.
 */
const welcomeState = createRoute({
    component: Welcome,
    controller: WelcomeCtrl,
    data: {
        access: AccessType.UNAUTHENTICATED,
        pageTitle: 'Welcome',
    },
    name: 'welcome',
    url: '/welcome',
});

/**
 * Error state. If the user is routed to an unregister route,
 * then the usere is redirected to this page.
 */
const errorState = createRoute({
    component: Error404,
    data: {
        access: AccessType.ALL,
        pageTitle: 'Page Not Found',
    },
    name: '404',
    url: '/notFound',
});

/**
 * This is just a place holder for posts route.
 * It will be lazy loaded when user navigates to any posts route.
 */
const booksFutureState = createRoute({
    lazyLoad: () => import('views/Books'/* webpackChunkName: "books" */),
    name: 'books.**',
    url: '/books',
});

export default [welcomeState, booksFutureState, errorState];
