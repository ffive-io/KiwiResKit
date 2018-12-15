import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { history } from '../../_helpers';
import { resourceService, skillsetService, userService } from '../../_services';
import { alertActions } from '../../_actions';
import { Badge, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, Input } from 'mdbreact';
import AutoSuggestCustom from '../shared/auto-complete-component';
import momentPropTypes from 'react-moment-proptypes';
import moment from 'moment';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';

class AddResource extends Component {
    displayName = AddResource.name

    constructor(props) {
        super(props);
        this.state = {
            joiningDate: moment(), releavingDate: moment(), resource: {}, roles: [], managers: [], skillsets: [], resourceOwners: [], loading: true, clientSaved: false
        };
    }

    componentDidMount() {
        resourceService.getAllNames()
            .then(res => {
                this.setState({
                    managers: [{ id: '', name: 'Please Select' }, ...res]
                });
            }, error => {
                this.setState({
                    managers: [{ id: '', name: 'Please Select' }]
                });
            });
        resourceService.getAllResourceOwnerNames()
            .then(res => {
                this.setState({
                    resourceOwners: [{ id: '', name: 'Please Select' }, ...res]
                });
            }, error => {
                this.setState({
                    resourceOwners: [{ id: '', name: 'Please Select' }]
                });
            });
        skillsetService.getAll(1)
            .then(res => {
                this.setState({
                    skillsets: [{ id: '', name: 'Please Select' }, ...res.data]
                });
            }, error => {
                this.setState({
                    skillsets: [{ id: '', name: 'Please Select' }]
                });
            });

        userService.getAllRoles()
            .then(res => {
                this.setState({
                    roles: [{ id: '', name: 'Please Select' }, ...res]
                });
            }, error => {
                this.setState({
                    roles: [{ id: '', name: 'Please Select' }]
                });
            });
    }

    handleChange = (e) => {
        if (e.target.type == 'checkbox') {
            this.setState({ [e.target.name]: e.target.checked });
        } else {
            this.setState({ [e.target.name]: e.target.value });
        }
    }

    onChangeRO = (id, newValue) => {
        this.setState({
            resourceOwnerId: ''
        });
    }

    onSuggestionSelectedRO = (suggestion) => {
        this.setState({
            resourceOwnerId: suggestion.id
        });
    }

    onChangeRM = (id, newValue) => {
        this.setState({
            managerId: ''
        });
    }

    onSuggestionSelectedRM = (suggestion) => {
        this.setState({
            managerId: suggestion.id
        });
    }

    handleAddClient = (e) => {
        e.preventDefault();
        e.target.className += ' was-validated';

        console.log(this.state.managerId);
        //Resource Properties
        const firstName = this.state.resourceFirstName
        const lastName = this.state.resourceLastName;
        const designation = this.state.designation;
        const email = this.state.email;
        const phonenumber = this.state.contactNumber;
        const department = this.state.department;
        const managerId = this.state.managerId;
        const resourceOwnerId = this.state.resourceOwnerId;
        const skillsetId = this.state.skillset;
        const joiningDate = this.state.joiningDate;
        const relievingDate = this.state.releavingDate;
        const vocationPlan = this.state.leavePlan;
        const createLogin = this.state.enablePortalAccess;
        const roleId = this.state.role;
        const isResourceOwner = this.state.isResourceOwner;
        const empCode = this.state.empCode;


        if (firstName && designation && email && department && managerId && joiningDate && empCode) {
        } else {
            return;
        }

        const { dispatch } = this.props;

        const resourceData = {
            firstName,
            lastName,
            designation,
            email,
            phonenumber,
            department,
            managerId,
            resourceOwnerId,
            skillsetId,
            joiningDate,
            relievingDate,
            vocationPlan,
            empCode,
            createLogin,
            roleId,
            isResourceOwner
        };

        resourceService.add(resourceData)
            .then(res => {
                //Send Alerts
                dispatch(alertActions.success('Resource added successfully'));
                history.push('/resources/');
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

    render() {
        return (
            <div>
                <h2>
                    <Badge color="cyan" pill>Add Resource</Badge>
                </h2>
                <MDBCard>
                    <MDBCardBody>
                        <form className='needs-validation' onSubmit={this.handleAddClient} noValidate>
                            <h3>Resource Info</h3>
                            <MDBRow>
                                <MDBCol md="4">
                                    <label htmlFor="resourceFirstName" className="form-control-sm">First Name</label>
                                    <input onChange={this.handleChange} type="text" name="resourceFirstName" id="resourceFirstName" className="form-control form-control-sm" placeholder="First name" required />
                                    <div className="invalid-feedback">Please provide a valid first name.</div>
                                    <div className="valid-feedback">Looks good!</div>
                                </MDBCol>
                                <MDBCol md="4">
                                    <label htmlFor="resourceLastName" className="form-control-sm">Last Name</label>
                                    <input onChange={this.handleChange} type="text" name="resourceLastName" id="resourceLastName" className="form-control form-control-sm" placeholder="Last name" />
                                </MDBCol>
                                <MDBCol md="4">
                                    <label htmlFor="designation" className="form-control-sm">Designation</label>
                                    <input onChange={this.handleChange} type="text" name="designation" id="designation" className="form-control form-control-sm" placeholder="Designation" required />
                                    <div className="invalid-feedback">Please provide a valid designation.</div>
                                    <div className="valid-feedback">Looks good!</div>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol md="4">
                                    <label htmlFor="email" className="form-control-sm">Email</label>
                                    <input onChange={this.handleChange} type="email" name="email" id="email" className="form-control form-control-sm" placeholder="Email" required />
                                    <div className="invalid-feedback">Please provide a valid email.</div>
                                    <div className="valid-feedback">Looks good!</div>
                                </MDBCol>
                                <MDBCol md="4">
                                    <label htmlFor="contactNumber" className="form-control-sm">Contact Number</label>
                                    <input onChange={this.handleChange} type="text" name="contactNumber" id="contactNumber" className="form-control form-control-sm" placeholder="Contact Number" />
                                </MDBCol>
                                <MDBCol md="4">
                                    <label htmlFor="department" className="form-control-sm">Department</label>
                                    <input onChange={this.handleChange} type="text" name="department" id="department" className="form-control form-control-sm" placeholder="Department" required />
                                    <div className="invalid-feedback">Please provide a valid department.</div>
                                    <div className="valid-feedback">Looks good!</div>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol md="4">
                                    <label htmlFor="managerId" className="form-control-sm">Reporting Manager</label>
                                    <AutoSuggestCustom
                                        id="managerId"
                                        placeholder="Search Manager"
                                        data={this.state.managers}
                                        onChange={this.onChangeRM}
                                        onSuggestionSelected={this.onSuggestionSelectedRM}
                                    />
                                </MDBCol>
                                <MDBCol md="4">
                                    <label htmlFor="resourceOwnerId" className="form-control-sm">Resource Owner</label>
                                    <AutoSuggestCustom
                                        id="resourceOwnerId"
                                        placeholder="Search Resource Owner"
                                        data={this.state.resourceOwners}
                                        onChange={this.onChangeRO}
                                        onSuggestionSelected={this.onSuggestionSelectedRO}
                                    />
                                </MDBCol>
                                <MDBCol md="4">
                                    <label htmlFor="skillset" className="form-control-sm">Skillset:</label>
                                    <select className="form-control form-control-sm"
                                        onChange={this.handleChange}
                                        name="skillset" id="skillset" required>
                                        {this.state.skillsets.map((skillset) => <option key={skillset.id} value={skillset.id}>{skillset.name}</option>)}
                                    </select>
                                    <div className="invalid-feedback">Please provide a skillset.</div>
                                    <div className="valid-feedback">Looks good!</div>

                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol md="4">
                                    <label htmlFor="joiningDate" className="form-control-sm">Joining Date</label>
                                    <SingleDatePicker id="joiningDate"
                                        placeholder='Select a date'
                                        showClearDate={true}
                                        showDefaultInputIcon={true}
                                        isOutsideRange={() => false}
                                        small={true}
                                        date={this.state.joiningDate}
                                        focused={this.state.focusedJd}
                                        numberOfMonths={1}
                                        onDateChange={date => this.setState({ joiningDate: date })}
                                        onFocusChange={({ focused }) => this.setState({ focusedJd: focused })}
                                    />

                                </MDBCol>
                                <MDBCol md="4">
                                    <label htmlFor="releavingDate" className="form-control-sm">Releaving Date</label>
                                    <SingleDatePicker id="releavingDate"
                                        placeholder='Select a date'
                                        showClearDate={true}
                                        showDefaultInputIcon={true}
                                        isOutsideRange={() => false}
                                        small={true}
                                        date={this.state.releavingDate}
                                        focused={this.state.focusedRd}
                                        numberOfMonths={1}
                                        onDateChange={date => this.setState({ releavingDate: date })}
                                        onFocusChange={({ focused }) => this.setState({ focusedRd: focused })}
                                    />
                                </MDBCol>
                                <MDBCol md="4">
                                    <label htmlFor="leavePlan" className="form-control-sm">Leave Plan</label>
                                    <input onChange={this.handleChange} type="text" name="leavePlan" id="leavePlan" className="form-control form-control-sm" placeholder="Leave Plan" />
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol md="4">
                                    <label htmlFor="empCode" className="form-control-sm">Employee Code</label>
                                    <input onChange={this.handleChange} type="text" name="empCode" id="empCode" className="form-control form-control-sm" placeholder="Employee Code" required />
                                    <div className="invalid-feedback">Please provide a valid employee code.</div>
                                    <div className="valid-feedback">Looks good!</div>
                                </MDBCol>
                                <MDBCol md="4">
                                </MDBCol>
                                <MDBCol md="4">
                                </MDBCol>
                            </MDBRow>
                            <hr />
                            <h3>Advanced</h3>

                            <MDBRow>
                                <MDBCol md="4">
                                    <Input className="form-control-sm" onChange={this.handleChange} label="Enable Login" filled type="checkbox" id="enablePortalAccess" name="enablePortalAccess" />
                                </MDBCol>

                                {this.state.enablePortalAccess &&
                                    (
                                        <Fragment>
                                            <MDBCol md="4">
                                                <label htmlFor="role" className="form-control-sm">Role:</label>
                                                <select className="form-control form-control-sm"
                                                    onChange={this.handleChange}
                                                    name="role" id="role" required>
                                                    {this.state.roles.map((role) => <option key={role.id} value={role.id}>{role.name}</option>)}
                                                </select>
                                                <div className="invalid-feedback">Please provide a role.</div>
                                                <div className="valid-feedback">Looks good!</div>
                                            </MDBCol>
                                            <MDBCol md="4">
                                                <Input className="form-control-sm" onChange={this.handleChange} label="Resource Owner" filled type="checkbox" id="isResourceOwner" name="isResourceOwner" />
                                            </MDBCol>

                                        </Fragment>)

                                }

                            </MDBRow>
                            <MDBRow>
                                <MDBCol md="4">
                                </MDBCol>
                                <MDBCol md="4">
                                </MDBCol>
                                <MDBCol md="2">
                                    <MDBBtn color="cyan" onClick={() => { history.push('/resources'); }} type="button" size="sm">Cancel</MDBBtn>
                                </MDBCol>
                                <MDBCol md="2">
                                    <MDBBtn color="cyan" type="submit" size="sm">Add Resource</MDBBtn>
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

const connectedAddResourcePage = connect(mapStateToProps)(AddResource);
export { connectedAddResourcePage as AddResource };