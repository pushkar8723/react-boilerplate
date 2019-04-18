import * as React from 'react';
import styledComponents from 'styled-components';
import noPageGif from '../../images/noPage.gif';

const Container = styledComponents.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    flex-direction: column;
    background: linear-gradient(160deg, transparent 80vh, #F3F4F5 80vh, white 100vh),
        linear-gradient(to bottom, #F3F4F5 160px, white 50vh), white;
`;

const Paper = styledComponents.div`
    width: 320px;
    background-color: #fff;
    box-shadow: rgba(0,0,0,0.2) 0 1px 2px;
    border-radius: 2px;
    padding: 10px;
    text-align: center;

    & > img {
        max-width: 100%;
    }
`;

/**
 * Component to render 404 error page
 */
export default class Error404 extends React.Component<{}> {
    /**
     * Render function
     */
    public render() {
        return (
            <Container>
                <Paper>
                    <img src={noPageGif} />
                    <h3>404 - Page not found :(</h3>
                    <a href="/">Go Home</a>
                </Paper>
            </Container>
        );
    }
}
