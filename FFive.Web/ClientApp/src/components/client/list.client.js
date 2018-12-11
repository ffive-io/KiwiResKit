import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clientService } from '../../_services';
import { history } from '../../_helpers';
import { clientActions, alertActions } from '../../_actions';

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
                console.log(res.data);
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

            <div>
                <div id="page-content-wrapper">
                    <div className="container">
                        <div className="client-listing-section">
                            <div className="search-panel">
                                <form>
                                    <div>

                                        <div className="search-input">
                                            <input type="text" className="" id="" placeholder="enter client name" />
                                        </div>
                                        <div className="search-input">
                                            <input type="text" class="" id="" placeholder="enter project name" />
                                        </div>
                                    </div>
                                    <button className="blue-button">search</button>
                                    <button className="clear-button opacity02">clear all</button>
                                </form>
                            </div>
                            <div className="client-listing-panel">
                                <div className="count-head">
                                    <span>1</span> total clients
                                        <button className="green-button" onClick={() => { this.addClient() }} >add client</button>
                                </div>
                                <div class="listing-table-section">
                                    <div class="client-table-head">
                                        <div class="col-tab-1">client id</div>
                                        <div class="col-tab-2">company</div>
                                        <div class="col-tab-3">client type</div>
                                        <div class="col-tab-4">client contact</div>
                                        <div class="col-tab-5">email</div>
                                        <div class="col-tab-6">phone Number</div>
                                        <div class="col-tab-7">time zone</div>
                                        <div class="col-tab-8">client since</div>
                                        <div class="col-tab-9">sales contact</div>
                                        <div class="col-tab-10">action</div>
                                    </div>

                                    {clients.map(client =>

                                        <div class="client-table-rows" key={client.id}>
                                            <div class="row-col-1" data-label="client id">
                                                <span>{client.id}</span>
                                            </div>
                                            <div class="row-col-2" data-label="company">
                                                <span class="blue-color">{client.name}</span>
                                            </div>
                                            <div class="row-col-3" data-label="client contact">
                                                <span>{client.clientType.name}</span>
                                            </div>
                                            <div class="row-col-4" data-label="client contact">
                                                <span>Clay Miller</span>
                                            </div>
                                            <div class="row-col-5" data-label="email">
                                                <span>Clay_miller@gmail.com</span>
                                            </div>
                                            <div class="row-col-6" data-label="phone Number">
                                                <span>+1-454-565-7878</span>
                                            </div>
                                            <div class="row-col-7" data-label="time zone">
                                                <span>EST</span>
                                            </div>
                                            <div class="row-col-8" data-label="client since">
                                                <span>{client.createdAt}</span>
                                            </div>
                                            <div class="row-col-9" data-label="sales contact">
                                                <span>{client.salesContact.firstName + ' ' + client.salesContact.lastName}</span>
                                            </div>
                                            <div class="row-col-10" data-label="action">
                                                <span>
                                                    <a href="" onClick={() => { this.editClient(client.id) }}><img src="images/edit-icon.svg" /></a>
                                                    <a href="" onClick={() => { this.deleteClient(client.id) }} data-toggle="modal" data-target="#delete-client"><img src="images/delete-icon.svg" /></a>
                                                </span>
                                            </div>
                                        </div>
                                    )}

                                    {this.state.hasNextPage &&
                                        <button class="load-more-button">load more</button>
                                    }

                                </div>
                                <div className="modal fade" id="delete-client" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                    <div className="modal-dialog modal-dialog-centered custom-modal" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="exampleModalLongTitle">deactivate client</h5>
                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true"><img src="images/icon-cancel.svg" alt="" /></span>
                                                </button>
                                            </div>
                                            <div className="modal-body">
                                                Would you like to deactivate Mark Allon Agencies?
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="cancel-button" data-dismiss="modal">no</button>
                                                <button type="button" className="blue-button">yes</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>

        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderClients(this.state.clients);

        let message = (this.props.alertType == 'alert-success' || this.props.alertType == 'alert-danger') ? <p>{this.props.alertMessage}</p> : <p>Nothing</p>;

        return (
            <div>
                <h1>Clients</h1>
                <p>Manage the clients: Add, Edit, Delete</p>
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