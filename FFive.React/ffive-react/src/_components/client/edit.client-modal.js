import React, { Fragment } from 'react';
import { Container, Button, Modal, ModalBody, ModalHeader, ModalFooter, Col, Row, MDBBtn, MDBCol, MDBRow, Input } from 'mdbreact';
import { connect } from 'react-redux';
import { clientService } from '../../_services';
import { alertActions } from '../../_actions';

class EditClientModal extends React.Component {
    constructor(props) {
        super(props);  

        this.state = {
            modal26: false        
        };
    }

    componentDidMount() {
        
    }

    toggle(nr) {        
        let modalNumber = 'modal' + nr
        this.setState({
            [modalNumber]: !this.state[modalNumber],
            location: this.props.client.locationId,
            clientType: this.props.client.clientTypeId,
            salesContact: this.props.client.salesContactId,
            clientName: this.props.client.clientName,
            stateName: this.props.client.state,
            city: this.props.client.city,
            zip: this.props.client.zip,
            streetAddress: this.props.client.streetAddress,
            clientId: this.props.client.clientId
        });
    }

    onFormSubmit = event => {
        event.preventDefault();
        event.target.className += ' was-validated';

        //Client Properties
        const locationId = this.state.location
        const clientTypeId = this.state.clientType;
        const salesContactId = this.state.salesContact;
        const clientName = this.state.clientName;
        const stateName = this.state.stateName;
        const city = this.state.city;
        const zipCode = this.state.zip;
        const streetAddress = this.state.streetAddress;
        const id = this.state.clientId;

        if (clientName && salesContactId && clientTypeId && locationId) {
        } else {
            return;
        }

        const clientData = {
            name: clientName,
            streetAddress,
            state: stateName,
            city,
            zipCode,
            locationId,
            clientTypeId,
            salesContactId,
            id
        };

        const { dispatch } = this.props;
        clientService.update(this.state.clientId, clientData)
            .then(res => {
                console.log(res);
                dispatch(alertActions.success('Client updated successfully'));

                setTimeout(function () {
                    dispatch(alertActions.clear());
                }, 3000);

                this.setState({ modal26: false });
            },
                error => {
                    //Send Alerts
                    dispatch(alertActions.error('Failed'));
                    setTimeout(function () {
                        dispatch(alertActions.clear());
                    }, 3000);
                }
            );

        this.props.onSubmit(clientData);
        
    }

    handleChange = (e) => {
        if (e.target.type == 'checkbox') {
            this.setState({ [e.target.name]: e.target.checked });            
        } else {
            this.setState({ [e.target.name]: e.target.value });
        }
    }

    render() {
        return (
            <Fragment>
                <MDBBtn onClick={() => this.toggle(26)} color="primary" size="sm">Edit Client</MDBBtn>
                <Container>
                    <Modal isOpen={this.state.modal26} toggle={() => this.toggle(26)} size="lg">
                        <ModalHeader toggle={() => this.toggle(26)}>Edit Client</ModalHeader>
                        <ModalBody>
                            <Container>
                                <form id="clientEditForm" className='needs-validation' onSubmit={this.onFormSubmit} noValidate>
                                    <MDBRow>
                                        <MDBCol md="4">
                                            <label htmlFor="clientName" className="form-control-sm">Client Name</label>
                                            <input onChange={this.handleChange} type="text" name="clientName" defaultValue={this.props.client.clientName} id="clientName" className="form-control form-control-sm" placeholder="Client name" required />
                                            <div className="invalid-feedback">Please provide a valid client name.</div>
                                            <div className="valid-feedback">Looks good!</div>
                                        </MDBCol>
                                        <MDBCol md="4">
                                            <label htmlFor="clientType" className="form-control-sm">Client Type:</label>
                                            <select className="form-control form-control-sm" defaultValue={this.props.client.clientTypeId}
                                                onChange={this.handleChange}
                                                name="clientType" id="clientType" required>
                                                {this.props.client.clientTypes.map((clientType) => <option key={clientType.id} value={clientType.id}>{clientType.name}</option>)}
                                            </select>
                                            <div className="invalid-feedback">Please provide a valid client type.</div>
                                            <div className="valid-feedback">Looks good!</div>
                                        </MDBCol>
                                        <MDBCol md="4">
                                            <label htmlFor="salesContact" className="form-control-sm">Sales contact:</label>
                                            <select id="salesContact" className="form-control form-control-sm" defaultValue={this.props.client.salesContactId}
                                                onChange={this.handleChange}
                                                name="salesContact" required>
                                                {this.props.client.preSales.map((preSales) => <option key={preSales.id} value={preSales.id}>{preSales.name}</option>)}
                                            </select>
                                            <div className="invalid-feedback">Please provide a valid sales contact.</div>
                                            <div className="valid-feedback">Looks good!</div>
                                        </MDBCol>
                                    </MDBRow>
                                    <MDBRow>
                                        <MDBCol md="4">
                                            <label htmlFor="streetAddress" className="form-control-sm">Street Address</label>
                                            <input onChange={this.handleChange} type="text" name="streetAddress" id="streetAddress" defaultValue={this.props.client.streetAddress} className="form-control form-control-sm" placeholder="Street Address" />
                                        </MDBCol>
                                        <MDBCol md="4">
                                            <label htmlFor="location" className="form-control-sm">Country:</label>
                                            <select className="form-control form-control-sm" defaultValue={this.props.client.locationId}
                                                onChange={this.handleChange}
                                                name="location" id="location" required>
                                                {this.props.client.locations.map((location) => <option key={location.id} value={location.id}>{location.name}</option>)}
                                            </select>
                                            <div className="invalid-feedback">Please provide a valid country.</div>
                                            <div className="valid-feedback">Looks good!</div>
                                        </MDBCol>
                                        <MDBCol md="4">
                                            <label htmlFor="stateName" className="form-control-sm">State</label>
                                            <input onChange={this.handleChange} type="text" name="stateName" id="stateName" defaultValue={this.props.client.state} className="form-control form-control-sm" placeholder="State" />
                                        </MDBCol>
                                    </MDBRow>
                                    <MDBRow>
                                        <MDBCol md="2">
                                        </MDBCol>
                                        <MDBCol md="4">

                                            <label htmlFor="city" className="form-control-sm">City</label>
                                            <input onChange={this.handleChange} defaultValue={this.props.client.city} type="text" name="city" id="city" className="form-control form-control-sm" placeholder="City" />
                                        </MDBCol>
                                        <MDBCol md="4">
                                            <label htmlFor="zip" className="form-control-sm">Zip</label>
                                            <input onChange={this.handleChange} defaultValue={this.props.client.zip} type="text" name="zip" id="zip" className="form-control form-control-sm" placeholder="Zip" />
                                        </MDBCol>
                                        <MDBCol md="2">
                                        </MDBCol>
                                    </MDBRow>

                                </form>
                            </Container>

                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={() => this.toggle(26)}>Close</Button>{' '}
                            <Button form="clientEditForm" type="submit" color="primary">Save changes</Button>
                        </ModalFooter>
                    </Modal>
                </Container>
            </Fragment>
        );
    }
}

export default EditClientModal;