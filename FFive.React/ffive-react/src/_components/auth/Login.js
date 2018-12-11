import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import { config } from '../../_helpers';
import { connect } from 'react-redux';
import { userActions } from '../../_actions';
import { Container, Button, Fa, MDBBtn } from 'mdbreact';

class Login extends Component {
    constructor(props) {
        super(props);
        // reset login status
        const { dispatch } = this.props;
        this.state = { accessToken: '', socialUserId: '' };
    }

    onFailure = (error) => {
        console.log(error);
    };

    googleResponse = (response) => {
        const { dispatch } = this.props;
        dispatch(userActions.login(response.accessToken, response.googleId));
    };

    render() {
        const { loggingIn } = this.props;

        return (
            <GoogleLogin
                clientId={config.googleClientId}
                onSuccess={this.googleResponse.bind(this)}
                onFailure={this.onFailure.bind(this)}
                render={renderProps => (
                    <MDBBtn onClick={renderProps.onClick} color="danger">
                        <Fa icon="google-plus" className="pr-1" /> Google +</MDBBtn>
                )}
            />
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