import React, { Fragment } from 'react';
import { Container, Button, Modal, ModalBody, ModalHeader, ModalFooter, Col, Row, MDBBtn, MDBCol, MDBRow, Input } from 'mdbreact';
import { connect } from 'react-redux';

class AddClientContactModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modal16: false
        };
    }

    toggle(nr) {
        let modalNumber = 'modal' + nr
        this.setState({
            [modalNumber]: !this.state[modalNumber]
        });
    }

    onFormSubmit = event => {
        event.preventDefault();
        event.target.className += ' was-validated';

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

        if (title && firstName && email && clocationId) {
        } else {
            return;
        }

        const clientContactData = {
            title: title,
            firstName: firstName,
            lastName: lastName,
            email: email,
            contactNumber: contactNumber,
            skypeId: skypeId,
            isPointOfContact: false,
            streetAddress: cstreetAddress,
            state: cstateName,
            city: ccity,
            zipCode: czipCode,
            locationId: clocationId,
            timeZone: timezone,
            designation: designation,
        };
        this.props.onSubmit(clientContactData);
        this.toggle(16);
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

    copyAddress = () => {
        window.document.getElementById('cstreetAddress').value = this.props.contact.streetAddress == undefined ? '' : this.props.contact.streetAddress;
        window.document.getElementById('clocation').value = this.props.contact.locationId == undefined ? '' : this.props.contact.locationId;
        window.document.getElementById('cstateName').value = this.props.contact.state == undefined ? '' : this.props.contact.state;
        window.document.getElementById('ccity').value = this.props.contact.city == undefined ? '' : this.props.contact.city;
        window.document.getElementById('czip').value = this.props.contact.zip == undefined ? '' : this.props.contact.zip;

        this.setState({ cstreetAddress: window.document.getElementById('cstreetAddress').value });
        this.setState({ clocation: window.document.getElementById('clocation').value });
        this.setState({ cstateName: window.document.getElementById('cstateName').value });
        this.setState({ ccity: window.document.getElementById('ccity').value });
        this.setState({ czip: window.document.getElementById('czip').value });
    }

    render() {
        return (
            <Fragment>
                <MDBBtn onClick={() => this.toggle(16)} color="primary" size="sm">Add Contact</MDBBtn>
                <Container>
                    <Modal isOpen={this.state.modal16} toggle={() => this.toggle(16)} size="lg">
                        <ModalHeader toggle={() => this.toggle(16)}>Add Client Contact</ModalHeader>
                        <ModalBody>
                            <Container>
                                <form id="clientContactForm" className='needs-validation' onSubmit={this.onFormSubmit} noValidate>
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
                                            <select className="form-control form-control-sm" onChange={this.handleChange}
                                                name="clocation" id="clocation" required>
                                                {this.props.contact.locations.map((location) => <option key={location.id} value={location.id}>{location.name}</option>)}
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
                                            <Button color="primary" hidden type="submit">Save changes</Button>
                                        </MDBCol>
                                    </MDBRow>
                                </form>
                            </Container>

                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={() => this.toggle(16)}>Close</Button>{' '}
                            <Button form="clientContactForm" type="submit" color="primary">Save changes</Button>
                        </ModalFooter>
                    </Modal>
                </Container>
            </Fragment>
        );
    }
}

export default AddClientContactModal;