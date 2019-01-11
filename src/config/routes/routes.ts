import AppShell from '../../views/AppShell';
import Welcome from '../../views/Welcome';

/**
 * This is the parent state for the entire application.
 *
 * This state's primary purposes are:
 * 1) Shows the outermost chrome (including the navigation and logout for authenticated users)
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
    name: 'welcome',
    parent: 'app',
    url: '/welcome',
};

export default [appState, welcomeState];
