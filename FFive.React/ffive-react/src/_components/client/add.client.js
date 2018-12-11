import React, { Component } from 'react';
import { connect } from 'react-redux';
import { history } from '../../_helpers';
import { clientService, clientTypeService, userService, locationService, clientContactService } from '../../_services';
import { alertActions } from '../../_actions';
import { Badge, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, Input } from 'mdbreact';

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

    copyAddress = () => {
        window.document.getElementById('cstreetAddress').value = this.state.streetAddress == undefined ? '' : this.state.streetAddress;
        window.document.getElementById('clocation').value = this.state.location == undefined ? '' : this.state.location;
        window.document.getElementById('cstateName').value = this.state.stateName == undefined ? '' : this.state.stateName;
        window.document.getElementById('ccity').value = this.state.city == undefined ? '' : this.state.city;
        window.document.getElementById('czip').value = this.state.zip == undefined ? '' : this.state.zip;

        this.setState({ cstreetAddress: window.document.getElementById('cstreetAddress').value });
        this.setState({ clocation: window.document.getElementById('clocation').value });
        this.setState({ cstateName: window.document.getElementById('cstateName').value });
        this.setState({ ccity: window.document.getElementById('ccity').value });
        this.setState({ czip: window.document.getElementById('czip').value });
    }

    handleChange = (e) => {
        if (e.target.type == 'checkbox') {
            this.setState({ [e.target.name]: e.target.checked });
            if (e.target.name == 'sameAddress' && e.target.checked == true) {
                this.copyAddress();
            }
        } else {
            this.setState({ [e.target.name]: e.target.value });
        }
    }

    handleAddClient = (e) => {
        e.preventDefault();
        e.target.className += ' was-validated';

        //Client Properties
        const locationId = this.state.location
        const clientTypeId = this.state.clientType;
        const salesContactId = this.state.salesContact;
        const clientName = this.state.clientName;
        const stateName = this.state.stateName;
        const city = this.state.city;
        const zipCode = this.state.zip;
        const streetAddress = this.state.streetAddress;

        //Client Contact Properties
        const title = this.state.title;
        const firstName = this.state.firstName;
        const email = this.state.email;
        const lastName = this.state.lastName;
        const designation = this.state.designation;
        const contactNumber = this.state.contactNumber;
        const skypeId = this.state.skypeId;
        const timezone = this.state.timezone;

        //Client Contact Address Properties
        const clocationId = this.state.clocation
        const cstateName = this.state.cstateName;
        const ccity = this.state.ccity;
        const czipCode = this.state.czip;
        const cstreetAddress = this.state.cstreetAddress;

        if (locationId && clientTypeId && salesContactId && clientName && title && firstName && email) {
        } else {
            return;
        }

        const { dispatch } = this.props;

        const clientData = {
            name: clientName,
            streetAddress,
            state: stateName,
            city,
            zipCode,
            locationId,
            clientTypeId,
            salesContactId
        };

        clientService.add(clientData)
            .then(res => {
                //Send Alerts

                const clientContactData = {
                    title: title,
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    contactNumber: contactNumber,
                    skypeId: skypeId,
                    isPointOfContact: true,
                    streetAddress: cstreetAddress,
                    state: cstateName,
                    city: ccity,
                    zipCode: czipCode,
                    locationId: clocationId,
                    timeZone: timezone,
                    designation: designation,
                    clientId: res.id
                };

                clientContactService.add(clientContactData)
                    .then(contactRes => {
                        console.log(contactRes);
                        dispatch(alertActions.success('Client added successfully'));

                        setTimeout(function () {
                            dispatch(alertActions.clear());
                        }, 3000);

                        history.push('/clients');
                    },
                        error => {
                            //Send Alerts
                            dispatch(alertActions.error('Failed'));
                            setTimeout(function () {
                                dispatch(alertActions.clear());
                            }, 3000);
                        }
                    );

                dispatch(alertActions.success('Client added successfully'));

                setTimeout(function () {
                    dispatch(alertActions.clear());
                }, 3000);
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

    handleCancelClick = (e) => {
        history.push('/clients');
    }

    render() {
        return (
            <div>
                <h2>
                    <Badge color="cyan" pill>Add Client</Badge>
                </h2>
                <MDBCard>
                    <MDBCardBody>
                        <form className='needs-validation' onSubmit={this.handleAddClient} noValidate>
                            <h3>Client Info</h3>
                            <MDBRow>
                                <MDBCol md="4">
                                    <label htmlFor="clientName" className="form-control-sm">Client Name</label>
                                    <input onChange={this.handleChange} type="text" name="clientName" id="clientName" className="form-control form-control-sm" placeholder="Client name" required />
                                    <div className="invalid-feedback">Please provide a valid client name.</div>
                                    <div className="valid-feedback">Looks good!</div>
                                </MDBCol>
                                <MDBCol md="4">
                                    <label htmlFor="clientType" className="form-control-sm">Client Type:</label>
                                    <select className="form-control form-control-sm" value={this.state.client.clientType}
                                        onChange={this.handleChange}
                                        name="clientType" id="clientType" required>
                                        {this.state.clientTypes.map((clientType) => <option key={clientType.id} value={clientType.id}>{clientType.name}</option>)}
                                    </select>
                                    <div className="invalid-feedback">Please provide a valid client type.</div>
                                    <div className="valid-feedback">Looks good!</div>
                                </MDBCol>
                                <MDBCol md="4">
                                    <label htmlFor="salesContact" className="form-control-sm">Sales contact:</label>
                                    <select id="salesContact" className="form-control form-control-sm" value={this.state.client.preSales}
                                        onChange={this.handleChange}
                                        name="salesContact" required>
                                        {this.state.preSales.map((preSales) => <option key={preSales.id} value={preSales.id}>{preSales.name}</option>)}
                                    </select>
                                    <div className="invalid-feedback">Please provide a valid sales contact.</div>
                                    <div className="valid-feedback">Looks good!</div>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol md="4">
                                    <label htmlFor="streetAddress" className="form-control-sm">Street Address</label>
                                    <input onChange={this.handleChange} type="text" name="streetAddress" id="streetAddress" className="form-control form-control-sm" placeholder="Street Address" />
                                </MDBCol>
                                <MDBCol md="4">
                                    <label htmlFor="location" className="form-control-sm">Country:</label>
                                    <select className="form-control form-control-sm" value={this.state.client.location}
                                        onChange={this.handleChange}
                                        name="location" id="location" required>
                                        {this.state.locations.map((location) => <option key={location.id} value={location.id}>{location.name}</option>)}
                                    </select>
                                    <div className="invalid-feedback">Please provide a valid country.</div>
                                    <div className="valid-feedback">Looks good!</div>
                                </MDBCol>
                                <MDBCol md="4">
                                    <label htmlFor="stateName" className="form-control-sm">State</label>
                                    <input onChange={this.handleChange} type="text" name="stateName" id="stateName" className="form-control form-control-sm" placeholder="State" />
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol md="2">
                                </MDBCol>
                                <MDBCol md="4">

                                    <label htmlFor="city" className="form-control-sm">City</label>
                                    <input onChange={this.handleChange} type="text" name="city" id="city" className="form-control form-control-sm" placeholder="City" />
                                </MDBCol>
                                <MDBCol md="4">
                                    <label htmlFor="zip" className="form-control-sm">Zip</label>
                                    <input onChange={this.handleChange} type="text" name="zip" id="zip" className="form-control form-control-sm" placeholder="Zip" />
                                </MDBCol>
                                <MDBCol md="2">
                                </MDBCol>
                            </MDBRow>
                            <hr />
                            <h3>Primary Contact</h3>
                            <h5>Info</h5>

                            <MDBRow>
                                <MDBCol md="4">
                                    <label htmlFor="title" className="form-control-sm">Title</label>
                                    <input onChange={this.handleChange} type="text" name="title" id="title" className="form-control form-control-sm" placeholder="Title" required />
                                    <div className="invalid-feedback">Please provide a valid title.</div>
                                    <div className="valid-feedback">Looks good!</div>
                                </MDBCol>
                                <MDBCol md="4">
                                    <label htmlFor="firstName" className="form-control-sm">First Name</label>
                                    <input onChange={this.handleChange} type="text" name="firstName" id="firstName" className="form-control form-control-sm" placeholder="First Name" required />
                                    <div className="invalid-feedback">Please provide a valid first name.</div>
                                    <div className="valid-feedback">Looks good!</div>                                </MDBCol>
                                <MDBCol md="4">
                                    <label htmlFor="lastName" className="form-control-sm">Last Name</label>
                                    <input onChange={this.handleChange} type="text" name="lastName" id="lastName" className="form-control form-control-sm" placeholder="Last Name" />
                                </MDBCol>
                            </MDBRow>

                            <MDBRow>
                                <MDBCol md="4">
                                    <label htmlFor="designation" className="form-control-sm">Designation</label>
                                    <input onChange={this.handleChange} type="text" name="designation" id="designation" className="form-control form-control-sm" placeholder="Designation" />
                                </MDBCol>
                                <MDBCol md="4">
                                    <label htmlFor="email" className="form-control-sm">Email</label>
                                    <input onChange={this.handleChange} type="email" name="email" id="email" className="form-control form-control-sm" placeholder="Email" required />
                                    <div className="invalid-feedback">Please provide a valid email.</div>
                                    <div className="valid-feedback">Looks good!</div>                                </MDBCol>
                                <MDBCol md="4">
                                    <label htmlFor="contactNumber" className="form-control-sm">Contact Number</label>
                                    <input onChange={this.handleChange} type="text" name="contactNumber" id="contactNumber" className="form-control form-control-sm" placeholder="Contact Number" />
                                </MDBCol>
                            </MDBRow>

                            <MDBRow>
                                <MDBCol md="2">
                                </MDBCol>
                                <MDBCol md="4">
                                    <label htmlFor="skypeId" className="form-control-sm">Skype Id</label>
                                    <input onChange={this.handleChange} type="text" name="skypeId" id="skypeId" className="form-control form-control-sm" placeholder="Skype Id" />
                                </MDBCol>
                                <MDBCol md="4">
                                    <label htmlFor="timezone" className="form-control-sm">Timezone</label>
                                    <input onChange={this.handleChange} type="timezone" name="timezone" id="timezone" className="form-control form-control-sm" placeholder="Timezone" />
                                </MDBCol>
                                <MDBCol md="2">
                                </MDBCol>
                            </MDBRow>
                            <hr />

                            <MDBRow>
                                <MDBCol md="6">
                                    <h5>Address</h5>
                                </MDBCol>
                                <MDBCol md="6">
                                    <Input className="form-control-sm" onChange={this.handleChange} label="Same as client info" filled type="checkbox" id="sameAddress" name="sameAddress" />
                                </MDBCol>
                            </MDBRow>

                            <MDBRow>
                                <MDBCol md="4">
                                    <label htmlFor="cstreetAddress" className="form-control-sm">Street Address</label>
                                    <input onChange={this.handleChange} type="text" name="cstreetAddress" id="cstreetAddress" className="form-control form-control-sm" placeholder="Street Address" />
                                </MDBCol>
                                <MDBCol md="4">
                                    <label htmlFor="clocation" className="form-control-sm">Country:</label>
                                    <select className="form-control form-control-sm" value={this.state.client.location}
                                        onChange={this.handleChange}
                                        name="clocation" id="clocation" required>
                                        {this.state.locations.map((location) => <option key={location.id} value={location.id}>{location.name}</option>)}
                                    </select>
                                    <div className="invalid-feedback">Please provide a valid country.</div>
                                    <div className="valid-feedback">Looks good!</div>
                                </MDBCol>
                                <MDBCol md="4">
                                    <label htmlFor="cstateName" className="form-control-sm">State</label>
                                    <input onChange={this.handleChange} type="text" name="cstateName" id="cstateName" className="form-control form-control-sm" placeholder="State" />
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol md="2">
                                </MDBCol>
                                <MDBCol md="4">

                                    <label htmlFor="ccity" className="form-control-sm">City</label>
                                    <input onChange={this.handleChange} type="text" name="ccity" id="ccity" className="form-control form-control-sm" placeholder="City" />
                                </MDBCol>
                                <MDBCol md="4">
                                    <label htmlFor="czip" className="form-control-sm">Zip</label>
                                    <input onChange={this.handleChange} type="text" name="czip" id="czip" className="form-control form-control-sm" placeholder="Zip" />
                                </MDBCol>
                                <MDBCol md="2">
                                </MDBCol>
                            </MDBRow>

                            <MDBRow>
                                <MDBCol md="4">
                                </MDBCol>
                                <MDBCol md="4">
                                </MDBCol>
                                <MDBCol md="2">
                                    <MDBBtn color="cyan" onClick={this.handleCancelClick} type="button" size="sm">Cancel</MDBBtn>
                                </MDBCol>
                                <MDBCol md="2">
                                    <MDBBtn color="cyan" type="submit" size="sm">Add Client</MDBBtn>
                                </MDBCol>
                            </MDBRow>

                        </form>
                    </MDBCardBody>
                </MDBCard>
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