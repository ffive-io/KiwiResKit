import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { locationBillingRoleService } from '../../_services';
import { history } from '../../_helpers';
import { clientActions, alertActions } from '../../_actions';
import SearchBox from './../shared/search-box';
import { Badge, Table, TableBody, TableHead, MDBBtn, MDBIcon, MDBCol, MDBRow } from "mdbreact";

class ListLocationBillingRole extends Component {
    displayName = ListLocationBillingRole.name

    constructor(props) {
        super(props);
        this.state = { billingRoles: [], loading: true, pageNumber: 1, hasNextPage: true };
        this.loadBillingRoles(1);
    }

    loadBillingRoles(pageNumber) {
        locationBillingRoleService.getAll(pageNumber)
            .then(res => {
                let lbrExisting = this.state.billingRoles;
                const { dispatch } = this.props;
                    this.setState({ hasNextPage: true, pageNumber: res.pageNumber, billingRoles: res, loading: false });
                
            },
                error => {
                    const { dispatch } = this.props;
                    dispatch(alertActions.error('Fetch client failed!'));
                    setTimeout(function () {
                        dispatch(alertActions.clear());
                    }, 3000);
                });
    }

    addLbr() {
        history.push('/billingroles/add');
    };

    //OK
    editLbr(id) {
        const { dispatch } = this.props;
        let lbrEdit = this.state.billingRoles.find(billingRole => {
            return billingRole.id === id;
        });
        dispatch(clientActions.editRequest(lbrEdit));
    };

    //Need to change to actions instead of calling service directly
    deleteLbr(id) {
        const { dispatch } = this.props;
        locationBillingRoleService.delete(id)
            .then(res => {
                var tmpLbrs = this.state.billingRoles.filter(billingRole => {
                    return billingRole.id !== id;
                });
                this.setState({
                    billingRoles: tmpLbrs
                });

                //Send Alerts
                dispatch(alertActions.success('Deleted Successfully'));
                setTimeout(function () {
                    dispatch(alertActions.clear());
                }, 3000);
            }, error => {
                dispatch(alertActions.error('Deleted failed.'));
                setTimeout(function () {
                    dispatch(alertActions.clear());
                }, 3000);
            });
    };

    renderLbrs(billingRoles) {
        return (
            <Fragment>

                <MDBRow between>
                    <MDBCol md="6"><SearchBox /></MDBCol>
                    <MDBCol md="2">
                        <MDBBtn onClick={() => { this.addLbr() }} color="primary" size="sm">
                            <MDBIcon icon="new" /> Add Billing Role
                        </MDBBtn>
                    </MDBCol>
                </MDBRow>

                <Table responsiveLg striped small>
                    <TableHead color="primary-color" textWhite>
                        <tr>
                            <th>project&nbsp;role</th>
                            <th>location</th>
                            <th>rate&nbsp;per&nbsp;hour</th>
                            <th>rate&nbsp;per&nbsp;hour</th>
                            <th>action</th>
                        </tr>
                    </TableHead>
                    <TableBody>
                        {billingRoles.map(billingRole =>
                            <tr key={billingRole.id}>
                                <td><a href={'/billingroles/' + billingRole.id}>{billingRole.billingRole}</a></td>
                                <td>{billingRole.location.name}</td>

                                <td>{billingRole.ratePerHour}</td>
                                <td>{billingRole.ratePerMonth}</td>
                                <td>
                                    <a onClick={() => { this.editLbr(billingRole.id) }} href="/">Edit</a>&nbsp;<a onClick={() => { this.deleteLbr(billingRole.id) }} href="/">Delete</a>
                                </td>
                            </tr>
                        )}
                    </TableBody>
                </Table>
              
            </Fragment>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderLbrs(this.state.billingRoles);

        return (
            <div>
                <h2>
                    <Badge color="cyan" pill>Billing Roles</Badge>
                    <small className="text-muted"> Manage the location-wise billing roles</small>
                </h2>
                {contents}
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { loggedIn, email, role } = state.authentication;
    const { type: alertType, message: alertMessage } = state.alert;
    return {
        loggedIn, email, role, alertType, alertMessage
    };
}

const connectedLbrPage = connect(mapStateToProps)(ListLocationBillingRole);
export { connectedLbrPage as ListLocationBillingRole };