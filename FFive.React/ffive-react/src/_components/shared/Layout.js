import React, { Component, Fragment } from "react";
import FooterPage from './Footer';
import { NavbarPage } from './Navbar';
import { MDBContainer, MDBRow, MDBCol, MDBAlert } from "mdbreact";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Layout extends Component {
    render() {
        const { alert } = this.props;
        return (
            <Fragment>
                <NavbarPage />
                <MDBContainer>
                    {alert.message &&
                        <MDBAlert color={alert.type} dismiss>{alert.message}</MDBAlert>
                    }
                    <MDBRow className="h-100">
                        <MDBCol md="12">{this.props.children}</MDBCol>
                    </MDBRow>
                </MDBContainer>
                <FooterPage />
            </Fragment>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

export default withRouter(
    connect(mapStateToProps)(Layout)
);