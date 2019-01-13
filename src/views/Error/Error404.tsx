import * as React from 'react';

/**
 * Component to render 404 error page
 */
export default class Error404 extends React.Component<{}> {
    /**
     * Render function
     */
    public render() {
        return (
            <React.Fragment>
                <h1>404 :(</h1>
                <div>Page not Found</div>
            </React.Fragment>
        );
    }
}
