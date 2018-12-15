import React, { Component, Fragment } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBAlert } from "mdbreact";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class BaseLayout extends Component {
    render() {
        const { alert } = this.props;
        return (
            <Fragment>
                
                    {alert.message &&
                        <MDBAlert color={alert.type} dismiss>{alert.message}</MDBAlert>
                    }
                    {this.props.children}
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
    connect(mapStateToProps)(BaseLayout)
);