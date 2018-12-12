import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { clientService } from '../../_services';
import { history } from '../../_helpers';
import moment from 'moment';
import { clientActions, alertActions } from '../../_actions';
import SearchBox from './../shared/search-box';
import { Badge, Table, TableBody, TableHead, MDBBtn, MDBIcon, MDBCol, MDBRow } from "mdbreact";

class ListClient extends Component {
    displayName = ListClient.name

    constructor(props) {
        super(props);
        this.state = { clients: [], loading: true, pageNumber: 1, hasNextPage: true };
        this.loadClients(1);
    }

    loadClients(pageNumber) {
        clientService.getAll(pageNumber)
            .then(res => {
                let clientsExisting = this.state.clients;
                const { dispatch } = this.props;
                if (res.hasNextPage == true) {
                    this.setState({ hasNextPage: true, pageNumber: res.pageNumber, clients: [...clientsExisting, ...res.data], loading: false });
                } else {
                    this.setState({ hasNextPage: false, pageNumber: res.pageNumber, clients: [...clientsExisting, ...res.data], loading: false });
                }
            },
                error => {
                    const { dispatch } = this.props;
                    dispatch(alertActions.error('Fetch client failed!'));
                    setTimeout(function () {
                        dispatch(alertActions.clear());
                    }, 3000);
                });
    }

    addClient() {
        history.push('/clients/add');
    };

    //OK
    editClient(id) {
        const { dispatch } = this.props;
        let clientEdit = this.state.clients.find(client => {
            return client.id === id;
        });
        dispatch(clientActions.editRequest(clientEdit));
    };

    //Need to change to actions instead of calling service directly
    deleteClient(id) {
        const { dispatch } = this.props;
        clientService.delete(id)
            .then(res => {
                var tmpClients = this.state.clients.filter(client => {
                    return client.id !== id;
                });
                this.setState({
                    clients: tmpClients
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

    renderClients(clients) {
        return (
            <Fragment>

                <MDBRow between>
                    <MDBCol md="6"><SearchBox /></MDBCol>
                    <MDBCol md="2">
                        <MDBBtn onClick={() => { this.addClient() }} color="primary" size="sm">
                            <MDBIcon icon="new" /> Add Client
                        </MDBBtn>
                    </MDBCol>
                </MDBRow>

                <Table responsiveLg striped small>
                    <TableHead color="primary-color" textWhite>
                        <tr>
                            <th>company</th>
                            <th>client&nbsp;type</th>
                            <th>client&nbsp;contact</th>
                            <th>email</th>
                            <th>phone&nbsp;number</th>
                            <th>timezone</th>
                            <th>client&nbsp;since</th>
                            <th>sales&nbsp;contact</th>
                            <th>action</th>
                        </tr>
                    </TableHead>
                    <TableBody>
                        {clients.map(client =>
                            <tr key={client.clientId}>
                                <td><a href={'/clients/' + client.clientId}>{client.name}</a></td>
                                <td>{client.clientType}</td>

                                <td>{client.ccName}</td>
                                <td>{client.ccEmail}</td>
                                <td>{client.ccContactNumber}</td>
                                <td>{client.ccTimeZone}</td>
                                <td>{new moment(client.createdDate).format('YYYY-MM-DD')}
                                </td>
                                <td>{client.salesContact}</td>
                                <td>
                                    <a onClick={() => { this.editClient(client.clientId) }} href="/">Edit</a>&nbsp;<a onClick={() => { this.deleteClient(client.clientId) }} href="/">Delete</a>
                                </td>
                            </tr>
                        )}
                    </TableBody>
                </Table>
                {this.state.hasNextPage &&
                    <button class="load-more-button" onClick={() => { this.loadClients(this.state.pageNumber + 1) }} >load more</button>
                }
            </Fragment>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderClients(this.state.clients);

        let message = (this.props.alertType == 'alert-success' || this.props.alertType == 'alert-danger') ? <p>{this.props.alertMessage}</p> : <p>Nothing</p>;

        return (
            <div>
                <h2>
                    <Badge color="cyan" pill>Clients</Badge>
                    <small className="text-muted"> Manage the clients</small>
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

const connectedFetctDataPage = connect(mapStateToProps)(ListClient);
export { connectedFetctDataPage as ListClient };