import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { UIView, UIViewResolves } from '@uirouter/react';
import * as React from 'react';

/**
 * Base view for all routes. This component can be
 * used to decalre ui elements which are common to
 * all routes. Like toolbar and footer.
 */
class AppShell extends React.Component<UIViewResolves> {
    /**
     * Render function
     */
    public render() {
        return (
            <React.Fragment>
                <Grid
                    container={true}
                    direction="column"
                    alignItems="flex-start"
                >
                    <AppBar position="static">
                        <Toolbar>
                            <Typography variant="title" color="inherit">Notes Manager</Typography>
                        </Toolbar>
                    </AppBar>
                    <Grid
                        container={true}
                        xs="auto"
                        direction="column"
                        alignItems="flex-start"
                    >
                        <UIView />
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
}

export default AppShell;
