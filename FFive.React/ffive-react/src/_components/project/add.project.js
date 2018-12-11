import React from 'react';
import { Container, Badge, MDBBtn, MDBCol, MDBRow } from 'mdbreact';
import { connect } from 'react-redux';
import momentPropTypes from 'react-moment-proptypes';
import moment from 'moment';
import { history } from '../../_helpers';
import { alertActions } from '../../_actions';
import { projectService, userService, platformService, projectTypeService, techstackService, clientService } from '../../_services';
import 'react-dates/initialize';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';

class AddProject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            plannedStartDate: moment(), plannedEndDate: moment(), actualStartDate: moment(), actualEndDate: moment(),
            focusedPsd: false, focusedPed: false, focusedAsd: false, focusedAed: false,
            opsHeads: [], platforms: [], projectTypes: [], techstacks: [], projectHeads: [], clientId: null, clientContacts: []
        };
    }

    componentDidMount() {
        const { id: clientId } = this.props.match.params;
        clientService.getById(clientId)
            .then(res => {
                var newClientContacts = res.clientContacts.map(elem => {
                    return {
                        id: elem.id,
                        name: elem.firstName + ' ' + elem.lastName
                    };
                });

                this.setState({
                    clientContacts: [{ id: '', name: 'Please Select' }, ...newClientContacts],
                    clientName: res.name,
                    clientId: res.id
                });
            }, error => {
                this.setState({
                    clientContacts: [],
                    clientName: null,
                    clientId: null
                });
                console.log('errr');
            });

        platformService.getAll(1)
            .then(res => {
                this.setState({
                    platforms: [{ id: '', name: 'Please Select' }, ...res.data]
                });
            }, error => {
                this.setState({
                    platforms: [{ id: '', name: 'Please Select' }]
                });
            });

        projectTypeService.getAll(1)
            .then(res => {
                this.setState({
                    projectTypes: [{ id: '', name: 'Please Select' }, ...res.data]
                });
            }, error => {
                this.setState({
                    projectTypes: [{ id: '', name: 'Please Select' }]
                });
            });

        techstackService.getAll(1)
            .then(res => {
                this.setState({
                    techstacks: [{ id: '', name: 'Please Select' }, ...res.data]
                });
            }, error => {
                this.setState({
                    techstacks: [{ id: '', name: 'Please Select' }]
                });
            });

        userService.getAllByRoleName('projecthead')
            .then(res => {
                var newProjectHeads = res.data.map(elem => {
                    return {
                        id: elem.id,
                        name: elem.firstName + ' ' + elem.lastName
                    };
                });
                this.setState({
                    projectHeads: [{ id: '', name: 'Please Select' }, ...newProjectHeads]
                });
            }, error => {
                this.setState({
                    projectHeads: [{ id: '', name: 'Please Select' }]
                });
            });

        userService.getAllByRoleName('opshead')
            .then(res => {
                var newOpsHeads = res.data.map(elem => {
                    return {
                        id: elem.id,
                        name: elem.firstName + ' ' + elem.lastName
                    };
                });
                this.setState({
                    opsHeads: [{ id: '', name: 'Please Select' }, ...newOpsHeads]
                });
            }, error => {
                this.setState({
                    projectHeads: [{ id: '', name: 'Please Select' }]
                });
            });
    }

    onCancelClick = event => {
        history.push('/clients/' + this.state.clientId);
    }

    onFormSubmit = event => {
        event.preventDefault();
        event.target.className += ' was-validated';

        const name = this.state.projectName;
        const startDate = this.state.plannedStartDate;
        const endDate = this.state.plannedEndDate;
        const actualStartDate = this.state.actualStartDate;
        const actualEndDate = this.state.actualEndDate;
        const platformId = this.state.platform;
        const projectTypeId = this.state.projectType;
        const clientId = this.state.clientId;
        const clientContactId = this.state.clientContact;
        const techstackId = this.state.techStack;
        const projectHeadId = this.state.projectHead;
        const overview = this.state.projectOverview;
        const operationHeadId = this.state.opsHead;

        if (name && platformId && projectTypeId && clientId && clientContactId && techstackId) {
        } else {
            return;
        }

        const projectObj = {
            name,
            startDate,
            endDate,
            actualStartDate,
            actualEndDate,
            platformId,
            projectTypeId,
            clientId,
            clientContactId,
            techstackId,
            projectHeadId,
            overview,
            operationHeadId
        }

        projectService.add(projectObj)
            .then(res => {
                const { dispatch } = this.props;
                dispatch(alertActions.success('project added successfully'));

                setTimeout(function () {
                    dispatch(alertActions.clear());
                }, 3000);

                history.push('/clients/' + this.state.clientId);
            },
                error => {
                    const { dispatch } = this.props;
                    dispatch(alertActions.error('Failed'));
                    setTimeout(function () {
                        dispatch(alertActions.clear());
                    }, 3000);
                }
            );

        return;
    }

    handleChange = (e) => {
        if (e.target.type == 'checkbox') {
            this.setState({ [e.target.name]: e.target.checked });
        } else {
            this.setState({ [e.target.name]: e.target.value });
        }
    }

    render() {
        const { focusedPsd, focusedPed, focusedAsd, focusedAed, plannedStartDate, plannedEndDate, actualStartDate, actualEndDate } = this.state;
        const clientName = this.state.clientName;
        return (
            <Container>
                <h2><Badge color="cyan" pill>Add Project</Badge>
                </h2>
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
                            <input defaultValue={clientName} type="text" readOnly name="clientName" id="clientName" className="form-control form-control-sm" placeholder="Client Name" />
                            <div className="invalid-feedback">Please provide a client name.</div>
                            <div className="valid-feedback">Looks good!</div>

                        </MDBCol>
                        <MDBCol md="4">
                            <label htmlFor="clientContact" className="form-control-sm">Client POC</label>
                            <select className="form-control form-control-sm" onChange={this.handleChange}
                                name="clientContact" id="clientContact" required>
                                {this.state.clientContacts.map((clientContact) => <option key={clientContact.id} value={clientContact.id}>{clientContact.name}</option>)}
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
                                {this.state.platforms.map((platform) => <option key={platform.id} value={platform.id}>{platform.name}</option>)}
                            </select>
                            <div className="invalid-feedback">Please provide a platform.</div>
                            <div className="valid-feedback">Looks good!</div>
                        </MDBCol>
                        <MDBCol md="4">
                            <label htmlFor="projectType" className="form-control-sm">Project Type</label>
                            <select className="form-control form-control-sm" onChange={this.handleChange}
                                name="projectType" id="projectType" required>
                                {this.state.projectTypes.map((projectType) => <option key={projectType.id} value={projectType.id}>{projectType.name}</option>)}
                            </select>
                            <div className="invalid-feedback">Please provide a project type.</div>
                            <div className="valid-feedback">Looks good!</div>
                        </MDBCol>
                        <MDBCol md="4">
                            <label htmlFor="techStack" className="form-control-sm">Tech-Stack</label>
                            <select className="form-control form-control-sm" onChange={this.handleChange}
                                name="techStack" id="techStack" required>
                                {this.state.techstacks.map((techstack) => <option key={techstack.id} value={techstack.id}>{techstack.name}</option>)}
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
                                {this.state.projectHeads.map((projectHead) => <option key={projectHead.id} value={projectHead.id}>{projectHead.name}</option>)}
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
                                date={this.state.plannedStartDate}
                                focused={this.state.focusedPsd}
                                numberOfMonths={1}
                                onDateChange={date => this.setState({ plannedStartDate: date })}
                                onFocusChange={({ focused }) => this.setState({ focusedPsd: focused })} />
                        </MDBCol>
                        <MDBCol md="4">
                            <label htmlFor="plannedEndDate" className="form-control-sm">Planned End Date</label>
                            <SingleDatePicker id="plannedEndDate"
                                placeholder='Select a date'
                                showClearDate={true}
                                showDefaultInputIcon={true}
                                isOutsideRange={() => false}
                                small={true}
                                date={this.state.plannedEndDate}
                                focused={this.state.focusedPed}
                                numberOfMonths={1}
                                onDateChange={date => this.setState({ plannedEndDate: date })}
                                onFocusChange={({ focused }) => this.setState({ focusedPed: focused })}
                            />
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md="4">
                            <label htmlFor="opsHead" className="form-control-sm">Ops Head</label>
                            <select className="form-control form-control-sm" onChange={this.handleChange}
                                name="opsHead" id="opsHead">
                                {this.state.opsHeads.map((opsHead) => <option key={opsHead.id} value={opsHead.id}>{opsHead.name}</option>)}
                            </select>
                            <div className="invalid-feedback">Please provide a ops head.</div>
                            <div className="valid-feedback">Looks good!</div>
                        </MDBCol>
                        <MDBCol md="4">
                            <label htmlFor="actualStartDate" className="form-control-sm">Actual Start Date</label>
                            <SingleDatePicker id="actualStartDate"
                                placeholder='Select a date'
                                showClearDate={true}
                                showDefaultInputIcon={true}
                                isOutsideRange={() => false}
                                small={true}
                                date={this.state.actualStartDate}
                                focused={this.state.focusedAsd}
                                numberOfMonths={1}
                                onDateChange={date => this.setState({ actualStartDate: date })}
                                onFocusChange={({ focused }) => this.setState({ focusedAsd: focused })}
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
                                date={this.state.actualEndDate}
                                focused={this.state.focusedAed}
                                numberOfMonths={1}
                                onDateChange={date => this.setState({ actualEndDate: date })}
                                onFocusChange={({ focused }) => this.setState({ focusedAed: focused })} />

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

                    <MDBRow>
                        <MDBCol md="8">

                        </MDBCol>
                        <MDBCol md="2">
                            <MDBBtn onClick={this.onCancelClick} color="cyan" type="button" size="sm">Cancel</MDBBtn>
                        </MDBCol>
                        <MDBCol md="2">
                            <MDBBtn color="cyan" type="submit" size="sm">Add Client</MDBBtn>
                        </MDBCol>
                    </MDBRow>
                </form>
            </Container>
        );
    }
}

function mapStateToProps(state) {
    const { loggedIn, email, role } = state.authentication;
    return {
        loggedIn, email, role
    };
}

const connectedAddProjectPage = connect(mapStateToProps)(AddProject);
export { connectedAddProjectPage as AddProject };