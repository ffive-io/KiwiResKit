import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import { config } from '../_helpers';
import { connect } from 'react-redux';
import { userActions } from '../_actions';

class Login extends Component {
    constructor(props) {
        super(props);
        // reset login status
        const { dispatch } = this.props;
        this.state = { accessToken: '', socialUserId: '' };
    }

    onFailure = (error) => {
        alert(error);
    };

    googleResponse = (response) => {
        const { dispatch } = this.props;
        dispatch(userActions.login(response.accessToken, response.googleId));
    };

    render() {
        const { loggingIn } = this.props;

        return (

            <div className="login-height">
                <div className="login-height">
                    <div className="main-bg-section">
                        <div className="login-panel">
                            <div className="logo-div">
                                <img src="images/resourcekit-login-logo.png" className="logo" />
                            </div>
                            <div className="sign_in_btn">

                                <GoogleLogin
                                    clientId={config.googleClientId}
                                    onSuccess={this.googleResponse.bind(this)}
                                    onFailure={this.onFailure.bind(this)}
                                    render={renderProps => (
                                        <button type="" class="btn-social" onClick={renderProps.onClick}><span><img src="images/google-plus.png" /></span>Sign In with KiwiTech Id</button>
                                    )}
                                />

                                <p className="problem_login">Problem Logging In? <a href="mailto:IT@kiwitech.com" target="_top" className="contact_us">Contact Us</a></p>
                            </div>
                        </div>
                    </div>
                    <footer className="kit_footer">
                        <div className="col-xs-12 text-center">
                            <div className="copy_info"> © 2018 KiwiTech</div>
                        </div>
                    </footer>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { loggedIn } = state.authentication;
    return {
        loggedIn
    };
}

const connectedLoginPage = connect(mapStateToProps)(Login);
export { connectedLoginPage as Login };