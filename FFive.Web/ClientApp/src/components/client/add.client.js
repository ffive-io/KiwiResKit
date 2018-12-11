import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clientService, clientTypeService, userService, locationService } from '../../_services';
import { history } from '../../_helpers';
import { alertActions } from '../../_actions';

class AddClient extends Component {
    displayName = AddClient.name

    constructor(props) {
        super(props);
        this.state = {
            client: {}, clientTypes: [], preSales: [], locations: [], loading: true, clientSaved: false
        };
    }

    componentDidMount() {
        clientTypeService.getAll(1)
            .then(res => {
                this.setState({
                    clientTypes: [{ id: '', name: 'Please Select' }, ...res.data]
                });
            }, error => {
                this.setState({
                    clientTypes: [{ id: '', name: 'Please Select' }]
                });
            });

        locationService.getAll(1)
            .then(res => {
                this.setState({
                    locations: [{ id: '', name: 'Please Select' }, ...res.data]
                });
            }, error => {
                this.setState({
                    locations: [{ id: '', name: 'Please Select' }]
                });
            });

        userService.getAllByRoleName('presales')
            .then(res => {
                var newPresales = res.data.map(elem => {
                    return {
                        id: elem.id,
                        name: elem.firstName + ' ' + elem.lastName
                    };
                });

                this.setState({
                    preSales: [{ id: '', name: 'Please Select' }, ...newPresales]
                });
            }, error => {
                this.setState({
                    preSales: [{ id: '', name: 'Please Select' }]
                });
            });
    }

    saveClientContact = (e) => {
        e.preventDefault();
        const { dispatch } = this.props;
        const title = this.getTitle.value;
        const poc = this.getPOC.checked;

        const cc = {
            title,
            poc
        };

        console.log(cc);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { dispatch } = this.props;
        const clientName = this.getClient.value;
        const streetAddress = this.getStreetAddress.value;
        const stateName = this.getStateName.value;
        const city = this.getCity.value;
        const zipCode = this.getZip.value;
        const locationId = this.state.selectedLocationId;
        const clientTypeId = this.state.selectedClientTypeId;
        const salesContactId = this.state.selectedSalesContactId;
        const data = {
            name: clientName,
            streetAddress,
            state: stateName,
            city,
            zipCode,
            locationId,
            clientTypeId,
            salesContactId
        };

        clientService.add(data)
            .then(res => {
                console.log(res);
                //Send Alerts
                dispatch(alertActions.success('Client added successfully'));

                this.setState({
                    currentClient: res,
                    clientSaved: true
                });

                setTimeout(function () {
                    dispatch(alertActions.clear());
                }, 3000);

                //history.push('/clients');
            },
                error => {
                    //Send Alerts
                    dispatch(alertActions.error('Failed'));
                    setTimeout(function () {
                        dispatch(alertActions.clear());
                    }, 3000);
                }
            );
    }

    render() {
        var clientInfo =
            <form onSubmit={this.handleSubmit}>
                <h3><b>Client Info</b> | Client Contacts</h3>
                <label>Client Name:</label>
                <input required type="text" ref={(input) => this.getClient = input} placeholder="Enter client name" />
                <label>Client Type:</label>
                <select value={this.state.client.clientType}
                    onChange={(e) => this.setState({ selectedClientTypeId: e.target.value, clientTypevalidationError: e.target.value === "" ? "You must select a client type" : "" })}>
                    {this.state.clientTypes.map((clientType) => <option key={clientType.id} value={clientType.id}>{clientType.name}</option>)}
                </select>
                <div style={{ color: 'red', marginTop: '5px' }}>
                    {this.state.clientTypevalidationError}
                </div>

                <label>Sales contact:</label>
                <select value={this.state.client.preSales}
                    onChange={(e) => this.setState({ selectedSalesContactId: e.target.value, preSalesvalidationError: e.target.value === "" ? "You must select a pre sales member" : "" })}>
                    {this.state.preSales.map((preSales) => <option key={preSales.id} value={preSales.id}>{preSales.name}</option>)}
                </select>
                <div style={{ color: 'red', marginTop: '5px' }}>
                    {this.state.preSalesvalidationError}
                </div>

                <label>Street Address:</label>
                <input required type="text" ref={(input) => this.getStreetAddress = input} placeholder="Enter street address" />

                <label>Country:</label>
                <select value={this.state.client.location}
                    onChange={(e) => this.setState({ selectedLocationId: e.target.value, locationvalidationError: e.target.value === "" ? "You must select a country" : "" })}>
                    {this.state.locations.map((location) => <option key={location.id} value={location.id}>{location.name}</option>)}
                </select>
                <div style={{ color: 'red', marginTop: '5px' }}>
                    {this.state.locationvalidationError}
                </div>

                <label>State:</label>
                <input required type="text" ref={(input) => this.getStateName = input} placeholder="Enter state" />
                <label>City:</label>
                <input required type="text" ref={(input) => this.getCity = input} placeholder="Enter city" />

                <label>Zip:</label>
                <input required type="text" ref={(input) => this.getZip = input} placeholder="Enter Zip" />
                <br /><br />
                <button>Add</button>
            </form>;

        var clientContactInfo =
            <form onSubmit={this.saveClientContact}>
                <h3>Client Info | <b>Client Contacts</b></h3>
                <label>Title:</label>
                <input required type="text" ref={(input) => this.getTitle = input} placeholder="Title" />
                <label>First Name:</label>
                <input required type="text" ref={(input) => this.getFirstName = input} placeholder="First name" />
                <label>Last Name:</label>
                <input required type="text" ref={(input) => this.getLastName = input} placeholder="Last name" />
                <label>Designaton:</label>
                <input type="text" ref={(input) => this.getDesignation = input} placeholder="Designation" />
                <label>Email:</label>
                <input type="text" ref={(input) => this.getEmail = input} placeholder="Email" />
                <label>Contact Number:</label>
                <input type="text" ref={(input) => this.getContactNumber = input} placeholder="Contact number" />
                <label>Skype Id:</label>
                <input type="text" ref={(input) => this.getSkypeId = input} placeholder="Skype Id" />
                <label>Timezone:</label>
                <input type="text" ref={(input) => this.getTimezone = input} placeholder="Timezone" />

                <label>Point of contact:</label>
                <input type="checkbox" ref={(input) => this.getPOC = input} />

                <hr />

                <label>Street Address:</label>
                <input required type="text" ref={(input) => this.getStreetAddress = input} placeholder="Enter street address" />

                <label>Country:</label>
                <select value={this.state.client.location}
                    onChange={(e) => this.setState({ selectedLocationId: e.target.value, locationvalidationError: e.target.value === "" ? "You must select a country" : "" })}>
                    {this.state.locations.map((location) => <option key={location.id} value={location.id}>{location.name}</option>)}
                </select>
                <div style={{ color: 'red', marginTop: '5px' }}>
                    {this.state.locationvalidationError}
                </div>

                <label>State:</label>
                <input required type="text" ref={(input) => this.getStateName = input} placeholder="Enter state" />
                <label>City:</label>
                <input required type="text" ref={(input) => this.getCity = input} placeholder="Enter city" />

                <label>Zip:</label>
                <input required type="text" ref={(input) => this.getZip = input} placeholder="Enter Zip" />
                <br /><br />
                <button>Add Contact</button>
            </form>;

        var content;
        if (this.state.clientSaved == false) {
            content = clientContactInfo;
        } else if (this.props.role === "admin") {
            content = clientInfo;
        }

        return (
            <div>
                <h1>Add Client</h1>

                {content}
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

const connectedFetctDataPage = connect(mapStateToProps)(AddClient);
export { connectedFetctDataPage as AddClient };