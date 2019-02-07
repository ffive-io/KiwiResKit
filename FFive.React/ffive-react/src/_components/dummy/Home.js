import React, { Component } from 'react';
import { connect } from 'react-redux';

class Home extends Component {
    displayName = Home.name

    render() {
        return (
            <div>
                <h1>Under Contruction!!!</h1>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { loggedIn, email, role } = state.authentication;
    return {
        loggedIn, email, role
    };
}

const connectedLoginPage = connect(mapStateToProps)(Home);
export { connectedLoginPage as Home };