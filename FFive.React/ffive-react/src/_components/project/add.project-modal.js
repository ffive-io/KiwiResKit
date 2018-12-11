import React from 'react';
import { Container, Button, Modal, ModalBody, ModalHeader, ModalFooter, Col, Row, MDBBtn, MDBCol, MDBRow, Input } from 'mdbreact';
import { connect } from 'react-redux';
import momentPropTypes from 'react-moment-proptypes';
import moment from 'moment';
import 'react-dates/initialize';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';

class AddProjectModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal17: false, date: moment(), focused: false
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
        this.toggle(17);
    }

    handleChange = (e) => {
        if (e.target.type == 'checkbox') {
            this.setState({ [e.target.name]: e.target.checked });
            if (e.target.name == 'sameAddress' && e.target.checked == true) {
                //this.copyAddress();
            }
        } else {
            this.setState({ [e.target.name]: e.target.value });
        }
    }

    onDateChange = date => {
        console.log('sss', date);
        this.setState({ date });
    };

    onFocusChange = ({ focused }) => {
        this.setState({ focused });
    };

    resetDate = () => {
        this.setState({ date: null });
    };

    render() {
        const { focused, date } = this.state;
        return (
            <Container>
                <MDBBtn onClick={() => this.toggle(17)} color="primary" size="sm">Add Project</MDBBtn>
                <Modal isOpen={this.state.modal17} toggle={() => this.toggle(17)} size="lg">
                    <ModalHeader toggle={() => this.toggle(17)}>Add Project</ModalHeader>
                    <ModalBody>
                        <Container>
                            <form id="projectForm" className='needs-validation' onSubmit={this.onFormSubmit} noValidate>
                                <MDBRow>
                                    <MDBCol md="4">
                                        <label htmlFor="projectName" className="form-control-sm">Project Name</label>
                                        <input onChange={this.handleChange} type="text" name="projectName" id="projectName" className="form-control form-control-sm" placeholder="Project Name" required />
                                        <div className="invalid-feedback">Please provide a project name.</div>
                                        <div className="valid-feedback">Looks good!</div>

                                    </MDBCol>
                                    <MDBCol md="4">
                                        <label htmlFor="clientName" className="form-control-sm">Client</label>
                                        <input onChange={this.handleChange} type="text" name="clientName" id="clientName" className="form-control form-control-sm" placeholder="Client Name" required />
                                        <div className="invalid-feedback">Please provide a client name.</div>
                                        <div className="valid-feedback">Looks good!</div>

                                    </MDBCol>
                                    <MDBCol md="4">
                                        <label htmlFor="clientPoc" className="form-control-sm">Client POC</label>
                                        <select className="form-control form-control-sm" onChange={this.handleChange}
                                            name="clientPoc" id="clientPoc" required>
                                            {this.props.contact.locations.map((location) => <option key={location.id} value={location.id}>{location.name}</option>)}
                                        </select>
                                        <div className="invalid-feedback">Please provide a client point of contact.</div>
                                        <div className="valid-feedback">Looks good!</div>
                                    </MDBCol>
                                </MDBRow>

                                <MDBRow>
                                    <MDBCol md="4">
                                        <label htmlFor="platform" className="form-control-sm">Platform</label>
                                        <select className="form-control form-control-sm" onChange={this.handleChange}
                                            name="platform" id="platform" required>
                                            {this.props.contact.locations.map((location) => <option key={location.id} value={location.id}>{location.name}</option>)}
                                        </select>
                                        <div className="invalid-feedback">Please provide a platform.</div>
                                        <div className="valid-feedback">Looks good!</div>
                                    </MDBCol>
                                    <MDBCol md="4">
                                        <label htmlFor="projectType" className="form-control-sm">Project Type</label>
                                        <select className="form-control form-control-sm" onChange={this.handleChange}
                                            name="projectType" id="projectType" required>
                                            {this.props.contact.locations.map((location) => <option key={location.id} value={location.id}>{location.name}</option>)}
                                        </select>
                                        <div className="invalid-feedback">Please provide a project type.</div>
                                        <div className="valid-feedback">Looks good!</div>
                                    </MDBCol>
                                    <MDBCol md="4">
                                        <label htmlFor="techStack" className="form-control-sm">Tech-Stack</label>
                                        <select className="form-control form-control-sm" onChange={this.handleChange}
                                            name="techStack" id="techStack" required>
                                            {this.props.contact.locations.map((location) => <option key={location.id} value={location.id}>{location.name}</option>)}
                                        </select>
                                        <div className="invalid-feedback">Please provide a tech-stack.</div>
                                        <div className="valid-feedback">Looks good!</div>

                                    </MDBCol>

                                </MDBRow>

                                <MDBRow>
                                    <MDBCol md="4">
                                        <label htmlFor="projectHead" className="form-control-sm">Project Head</label>
                                        <select className="form-control form-control-sm" onChange={this.handleChange}
                                            name="projectHead" id="projectHead" required>
                                            {this.props.contact.locations.map((location) => <option key={location.id} value={location.id}>{location.name}</option>)}
                                        </select>
                                        <div className="invalid-feedback">Please provide a project head.</div>
                                        <div className="valid-feedback">Looks good!</div>
                                    </MDBCol>
                                    <MDBCol md="4">
                                        <label htmlFor="plannedStartDate" className="form-control-sm">Planned Start Date</label>
                                        <SingleDatePicker id="plannedStartDate"
                                            placeholder='Select a date'
                                            showClearDate={true}
                                            showDefaultInputIcon={true}
                                            isOutsideRange={() => false}
                                            small={true}
                                            date={date}
                                            focused={focused}
                                            numberOfMonths={1}
                                            onDateChange={this.onDateChange}
                                            onFocusChange={this.onFocusChange}
                                            onNextMonthClick={this.resetDate}
                                            onPrevMonthClick={this.resetDate}
                                        />
                                    </MDBCol>
                                    <MDBCol md="4">
                                        <label htmlFor="plannedEndDate" className="form-control-sm">Planned End Date</label>
                                        <SingleDatePicker id="plannedEndDate"
                                            placeholder='Select a date'
                                            showClearDate={true}
                                            showDefaultInputIcon={true}
                                            isOutsideRange={() => false}
                                            small={true}
                                            date={date}
                                            focused={focused}
                                            numberOfMonths={1}
                                            onDateChange={this.onDateChange}
                                            onFocusChange={this.onFocusChange}
                                            onNextMonthClick={this.resetDate}
                                            onPrevMonthClick={this.resetDate}
                                        />
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow>
                                    <MDBCol md="4">

                                    </MDBCol>
                                    <MDBCol md="4">
                                        <label htmlFor="actualStartDate" className="form-control-sm">Actual Start Date</label>
                                        <SingleDatePicker id="actualStartDate"
                                            placeholder='Select a date'
                                            showClearDate={true}
                                            showDefaultInputIcon={true}
                                            isOutsideRange={() => false}
                                            small={true}
                                            date={date}
                                            focused={focused}
                                            numberOfMonths={1}
                                            onDateChange={this.onDateChange}
                                            onFocusChange={this.onFocusChange}
                                            onNextMonthClick={this.resetDate}
                                            onPrevMonthClick={this.resetDate}
                                        />
                                    </MDBCol>
                                    <MDBCol md="4">
                                        <label htmlFor="actualEndDate" className="form-control-sm">Actual End Date</label>
                                        <SingleDatePicker id="actualEndDate"
                                            placeholder='Select a date'
                                            showClearDate={true}
                                            showDefaultInputIcon={true}
                                            isOutsideRange={() => false}
                                            small={true}
                                            date={date}
                                            focused={focused}
                                            numberOfMonths={1}
                                            onDateChange={this.onDateChange}
                                            onFocusChange={this.onFocusChange}
                                            onNextMonthClick={this.resetDate}
                                            onPrevMonthClick={this.resetDate}
                                        />
                                    </MDBCol>
                                </MDBRow>

                                <hr />

                                <MDBRow>
                                    <MDBCol md="12">
                                        <label htmlFor="projectOverview" className="form-control-sm">Project Overview</label>
                                        <textarea className="form-control" onChange={this.handleChange} id="projectOverview" name="projectOverview" />
                                    </MDBCol>
                                </MDBRow>

                                <MDBRow>
                                    <MDBCol md="12">
                                        <label htmlFor="attachFiles" className="form-control-sm">Project Overview</label>
                                        <input type="file" className="form-control" onChange={this.handleChange} id="attachFiles" name="attachFiles" />
                                    </MDBCol>
                                </MDBRow>

                            </form>
                        </Container>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={() => this.toggle(17)}>Close</Button>{' '}
                        <Button form="clientContactForm" type="submit" color="primary">Save changes</Button>
                    </ModalFooter>
                </Modal>
            </Container>
        );
    }
}

export default AddProjectModal;