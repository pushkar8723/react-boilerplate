import * as React from 'react';
import { GoogleLogin } from 'react-google-login';
import Notification, { NOTIFICATION_POSITION } from 'sleek-ui/Notification';
import styledComponents from 'styled-components';
import logoPng from '../../images/logo.png';

const Page = styledComponents.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: linear-gradient(160deg, transparent 80vh, #F3F4F5 80vh, white 100vh),
        linear-gradient(to bottom, #F3F4F5 160px, white 50vh), white;
`;

const LoginContainer = styledComponents.div`
    height: 280px;
    width: 280px;
    background-color: #fff;
    box-shadow: rgba(0,0,0,0.2) 0 1px 2px;
    border-radius: 2px;
    padding: 10px;
    text-align: center;
    display: flex;
    flex-direction: column;
`;

const WelcomeTextContainer = styledComponents.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    align-items: center;
    justify-content: center;
`;

const LogoImage = styledComponents.img`
    width: 150px;
    height: 150px;
    margin-bottom: -50px;
    z-index: 1;
`;

interface IWelcomeProps {
    /**
     * Logs in the user
     */
    login: (response: any) => void;
}

/**
 * Test class
 */
class Welcome extends React.Component<IWelcomeProps, {}> {
    /**
     * Shows error notification in case of failed login attempt.
     */
    private showError = (response: any) => {
        Notification.add(NOTIFICATION_POSITION.TOP_RIGHT, {
            content: response.error,
            state: 'danger',
            title: 'Login Failed',
        });
    }
    /**
     * Render method for test component.
     */
    public render() {
        return (
            <Page>
                <LogoImage src={logoPng} />
                <LoginContainer>
                    <h1>Books</h1>
                    <WelcomeTextContainer>
                        <h4>Welcome!</h4>
                        <h5>Login using your Google ID to continue.</h5>
                    </WelcomeTextContainer>
                    <div>
                        <hr/>
                        <GoogleLogin
                            // tslint:disable-next-line
                            clientId='957313973766-bqf56eeu9v5uek2d9ftlaq94h3q3tknd.apps.googleusercontent.com'
                            onSuccess={this.props.login}
                            onFailure={this.showError}
                            buttonText="Login with Google"
                        />
                    </div>
                </LoginContainer>
            </Page>
        );
    }
}

export default Welcome;
