import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { resourceService, projectService, allocationTypeService, projectResourceService } from '../../_services';
import { history } from '../../_helpers';
import { resourceActions, alertActions } from '../../_actions';
import SearchBox from './../shared/search-box';
import { MDBCard, MDBCardHeader, MDBCardBody, Badge, Table, TableBody, TableHead, MDBBtn, MDBIcon, MDBCol, MDBRow, Modal, ModalHeader, ModalBody, ModalFooter, Input, Button } from "mdbreact";
import momentPropTypes from 'react-moment-proptypes';
import moment from 'moment';
import 'react-dates/initialize';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';

class ListResource extends Component {
    displayName = ListResource.name

    constructor(props) {
        super(props);

        this.state = {
            billingRoles: [], allocationTypes: [], projects: [], resources: [], loading: true, pageNumber: 1, hasNextPage: true, noOfResources: 0,
            allocationEndDate: moment().add(1, 'months'), allocationStartDate: moment(), focusedAsd: false, focusedAed: false, projectId: '', projectSelectionDisabled: false,
            tabSelected: 'My', formAction: '', deleteAllocationId: ''
        };
        this.loadMyResources(1);
    }

    toggleTab = (tab) => {
        if (tab === 'My') {
            this.setState({ tabSelected: 'My', resources: [] })
            this.loadMyResources(1);
        } else {
            this.setState({ tabSelected: 'All', resources: [] });
            this.loadResources(1);
        }
    }

    loadMyResources(pageNumber) {
        resourceService.getMyResources(pageNumber)
            .then(res => {
                let resourcesExisting = this.state.resources;
                const { dispatch } = this.props;
                var hNext = res.data.length == 10 ? true : false;
                this.setState({ noOfResources: res.totalItems, hasNextPage: hNext, pageNumber: res.pageNumber, resources: [...resourcesExisting, ...res.data], loading: false });
            },
                error => {
                    const { dispatch } = this.props;
                    dispatch(alertActions.error('Resource listing failed!'));
                    this.setState({
                        hasNextPage: false
                    });

                    setTimeout(function () {
                        dispatch(alertActions.clear());
                    }, 3000);
                });
    }

    loadResources(pageNumber) {
        resourceService.getAll(pageNumber)
            .then(res => {
                let resourcesExisting = this.state.resources;
                const { dispatch } = this.props;
                var hNext = res.data.length == 10 ? true : false;
                this.setState({ noOfResources: res.totalItems, hasNextPage: hNext, pageNumber: res.pageNumber, resources: [...resourcesExisting, ...res.data], loading: false });
            },
                error => {
                    const { dispatch } = this.props;
                    dispatch(alertActions.error('Resource listing failed!'));
                    this.setState({
                        hasNextPage: false
                    });

                    setTimeout(function () {
                        dispatch(alertActions.clear());
                    }, 3000);
                });
    }

    loadMore = (pageNumber) => {
        if (this.state.tabSelected === 'My') {
            this.loadMyResources(pageNumber);
        } else {
            this.loadResources(pageNumber);
        }
    }

    componentDidMount() {
        projectService.getAllProjects()
            .then(res => {
                this.setState({
                    projects: [{ id: '', name: 'Please Select' }, ...res]
                });
            }, error => {
                this.setState({
                    projects: [{ id: '', name: 'Please Select' }]
                });
            });

        allocationTypeService.getAll()
            .then(res => {
                this.setState({
                    allocationTypes: [{ id: '', name: 'Please Select' }, ...res]
                });
            }, error => {
                this.setState({
                    allocationTypes: [{ id: '', name: 'Please Select' }]
                });
            });
    }

    loadBillingRole = (projectId, callback) => {
        projectService.GetAllBillingRolesByProjectId(projectId)
            .then(res => {
                this.setState({
                    billingRoles: [{ id: '', name: 'Please Select' }, ...res]
                });
                callback();
            }, error => {
                this.setState({
                    billingRoles: [{ id: '', name: 'Please Select' }]
                });
                callback();
            });
    }

    addResource() {
        history.push('/resources/add');
    };

    toggle(nr, resourceId, resourceName) {
        const { id: projectId } = this.props.match.params;
        if (projectId) {
            this.setState({
                projectId,
                projectSelectionDisabled: true
            });
            this.loadBillingRole(projectId, () => { });
        } else {
            this.setState({
                projectId: '',
                projectSelectionDisabled: false
            });
        }

        let modalNumber = 'modal' + nr;
        this.setState({
            [modalNumber]: !this.state[modalNumber],
            formAction: 'add',
            selecteResourceId: resourceId,
            selecteResourceName: resourceName,
            projectLocationBillingRoleDisabled: false,
            allocationTypeSelectionDisabled: false,
            projectLocationBillingRoleId: '',
            allocationTypeId: '',
            projectResourceId: '',
            allocationPercent: '',
            allocationStartDate: moment(),
            allocationEndDate: moment().add(1, 'months')
        });
    }

    deleteAllocationModal = (nr, projectResourceId) => {
        let modalNumber = 'modal' + nr;
        this.setState({
            [modalNumber]: !this.state[modalNumber],
            deleteAllocationId: projectResourceId
        });
    }

    deleteAllocation = () => {
        projectResourceService.delete(this.state.deleteAllocationId)
            .then(res => {
                const { dispatch } = this.props;
                dispatch(alertActions.success('Resource allocation deleted successfully'));

                setTimeout(function () {
                    dispatch(alertActions.clear());
                }, 3000);

                this.setState({
                    modal16: !this.state['modal16']
                });
            },
                error => {
                    const { dispatch } = this.props;
                    dispatch(alertActions.error('Failed'));
                    setTimeout(function () {
                        dispatch(alertActions.clear());
                    }, 3000);
                }
            );
    }

    editAllocation = (nr, resourceId, resourceName, projectId, projectResourceId, projectLocationBillingRoleId, allocationTypeId, allocationPercentage, allocationStartDate, allocationEndDate) => {
        this.loadBillingRole(projectId, () => {
            let modalNumber = 'modal' + nr

            if (new moment(allocationStartDate) < moment().startOf('month')) {
                //Disable startDate and percentage
            }

            this.setState({
                [modalNumber]: !this.state[modalNumber],
                formAction: 'edit',
                selecteResourceId: resourceId,
                selecteResourceName: resourceName,
                projectSelectionDisabled: true,
                projectId,
                projectLocationBillingRoleDisabled: true,
                allocationTypeSelectionDisabled: true,
                projectLocationBillingRoleId,
                allocationTypeId,
                projectResourceId,
                allocationPercent: allocationPercentage,
                allocationStartDate,
                allocationEndDate
            });
        });
    }

    assignResource = (e) => {
        console.log('here2');
        e.preventDefault();
        e.target.className += ' was-validated';

        const projectId = this.state.projectId;
        const allocationTypeId = this.state.allocationTypeId;
        const allocationPercent = this.state.allocationPercent;
        const projectLocationBillingRoleId = this.state.projectLocationBillingRoleId;
        const allocationStartDate = this.state.allocationStartDate.startOf('day').format('YYYY-MM-DD');
        const allocationEndDate = this.state.allocationEndDate.startOf('day').format('YYYY-MM-DD');
        const status = 'Active';
        console.log('here');
        if (projectId && allocationTypeId && allocationPercent && projectLocationBillingRoleId && allocationStartDate && allocationEndDate) {
        } else {
            return;
        }
        console.log('here1');
        const postData = {
            projectResourceId: this.state.projectResourceId,
            projectId,
            resourceId: this.state.selecteResourceId,
            allocationTypeId,
            allocationPercent,
            projectLocationBillingRoleId,
            allocationStartDate,
            allocationEndDate,
            status
        }

        console.log(postData);

        if (this.state.formAction == 'add') {
            projectResourceService.add(postData)
                .then(res => {
                    const { dispatch } = this.props;
                    dispatch(alertActions.success('Resource assigned successfully'));

                    setTimeout(function () {
                        dispatch(alertActions.clear());
                    }, 3000);

                    this.toggle(15);
                    history.push('/projects/' + this.state.projectId);
                },
                    error => {
                        const { dispatch } = this.props;
                        dispatch(alertActions.error('Failed'));
                        setTimeout(function () {
                            dispatch(alertActions.clear());
                        }, 3000);
                    }
                );
        } else {
            projectResourceService.update(this.state.projectResourceId, postData)
                .then(res => {
                    const { dispatch } = this.props;
                    dispatch(alertActions.success('Allocation updated successfully'));

                    setTimeout(function () {
                        dispatch(alertActions.clear());
                    }, 3000);

                    this.toggle(15);
                    history.push('/projects/' + this.state.projectId);
                },
                    error => {
                        const { dispatch } = this.props;
                        dispatch(alertActions.error('Failed'));
                        setTimeout(function () {
                            dispatch(alertActions.clear());
                        }, 3000);
                    }
                );
        }
    }

    handleChange = (e) => {
        if (e.target.type == 'checkbox') {
            this.setState({ [e.target.name]: e.target.checked });
        } else {
            this.setState({ [e.target.name]: e.target.value });
        }

        if (e.target.name == 'projectId') {
            if (e.target.value) {
                this.loadBillingRole(e.target.value, () => { });
            } else {
                this.setState({ billingRoles: [{ id: '', name: 'Please Select' }] });
            }
        }
    }

    //OK
    editResource(id) {
        const { dispatch } = this.props;
        let resourceEdit = this.state.resources.find(resource => {
            return resource.id === id;
        });
        dispatch(resourceActions.editRequest(resourceEdit));
    };

    //Need to change to actions instead of calling service directly
    deleteResource(id) {
        const { dispatch } = this.props;
        resourceService.delete(id)
            .then(res => {
                var tmpResources = this.state.resources.filter(client => {
                    return client.id !== id;
                });
                this.setState({
                    resources: tmpResources
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

    renderResources(resources) {
        return (
            <Fragment>

                <MDBRow between>
                    <MDBCol md="6"><SearchBox /></MDBCol>
                    <MDBCol md="2">
                    </MDBCol>
                </MDBRow>

                <MDBCard narrow>
                    <MDBCardHeader className="view view-cascade gradient-card-header blue-gradient d-flex justify-content-between align-items-center py-2 mx-4 mb-3">
                        <div>
                            <MDBBtn outline rounded size="sm" onClick={() => { this.toggleTab('My') }} color="white" className="px-2">
                                <i className="fa fa-th-large mt-0"></i> My
                            </MDBBtn>
                            <MDBBtn outline rounded size="sm" onClick={() => { this.toggleTab('All') }} color="white" className="px-2">
                                <i className="fa fa-columns mt-0"></i> All1
                            </MDBBtn>
                        </div>
                        <a href="#" className="white-text mx-3">{this.state.tabSelected} Resources ({this.state.noOfResources})</a>
                        <div>
                            <MDBBtn onClick={() => { this.addResource() }} outline rounded size="sm" color="white" className="px-2">
                                <i className="fa fa-plus mt-0"></i> Add Resource
                            </MDBBtn>
                        </div>
                    </MDBCardHeader>
                    <MDBCardBody cascade>

                        <Table responsiveLg striped small>
                            <TableHead color="primary-color" textWhite>
                                <tr>
                                    <th>name</th>
                                    <th>designation</th>
                                    <th>skills</th>
                                    <th>reporting&nbsp;manager</th>
                                    <th>resource&nbsp;owner</th>
                                    <th>projects</th>
                                    <th>allocation&nbsp;%</th>
                                    <th>start&nbsp;date</th>
                                    <th>end&nbsp;date</th>
                                    <th>billing&nbsp;type</th>
                                    <th>action</th>
                                </tr>
                            </TableHead>
                            <TableBody>
                                {resources.map(resource =>
                                    <tr key={resource.resourceId}>
                                        {console.log(resource.resourceId)}
                                        <td><a href={'/resources/' + resource.resourceId}>{resource.name}</a></td>
                                        <td>{resource.designation}</td>

                                        <td>{resource.skill}</td>
                                        <td>{resource.reportingManager}</td>
                                        <td>{resource.resourceOwner}</td>
                                        <td colSpan="5">
                                            <Table borderless responsiveLg small>
                                                <TableBody>
                                                    {resource.allocatedProjects && resource.allocatedProjects.map(project =>
                                                        <tr key={project.projectResourceId}>
                                                            <td><a href={'/projects/' + project.projectId}>{project.projectName}</a></td>
                                                            <td>{project.allocationPercentage}</td>
                                                            <td>{new moment(project.startDate).format('YYYY-MM-DD')}</td>
                                                            <td>{new moment(project.endDate).format('YYYY-MM-DD')}</td>
                                                            <td>{project.allocationType}</td>
                                                            <td>
                                                                <i title="Edit" onClick={() => { this.editAllocation(15, resource.resourceId, resource.name, project.projectId, project.projectResourceId, project.projectLocationBillingRoleId, project.allocationTypeId, project.allocationPercentage, new moment(project.startDate), new moment(project.endDate)) }} className="custom-hand fa fa-edit mt-0"></i>&nbsp;

                                                                {new moment(project.startDate) >= moment().startOf('month') &&
                                                                    <i title="Delete" onClick={() => { this.deleteAllocationModal(16, project.projectResourceId) }} className="custom-hand fa fa-remove mt-0"></i>
                                                                }
                                                            </td>
                                                        </tr>
                                                    )}
                                                </TableBody>
                                            </Table>
                                        </td>
                                        <td>

                                            <i title="Assign Resource" onClick={() => this.toggle(15, resource.resourceId, resource.name)} className="custom-hand fa fa-plus mt-0"></i>
                                        </td>
                                    </tr>
                                )}
                            </TableBody>
                        </Table>

                    </MDBCardBody>
                </MDBCard>
                {
                    this.state.hasNextPage &&
                    <button className="load-more-button" onClick={() => { this.loadMore(this.state.pageNumber + 1) }} > load more</button>
                }

                <Modal isOpen={this.state.modal15} toggle={() => this.toggle(15)} centered size="lg">
                    <ModalHeader toggle={() => this.toggle(15)}>Assign Resource - {this.state.selecteResourceName}</ModalHeader>
                    <ModalBody>
                        <form id="assignResourceForm" className='needs-validation' onSubmit={this.assignResource} noValidate>

                            <MDBRow>
                                <MDBCol md="6">
                                    <label htmlFor="projectId" className="form-control-sm">Project:</label>
                                    <select className="form-control form-control-sm"
                                        onChange={this.handleChange}
                                        disabled={this.state.projectSelectionDisabled}
                                        value={this.state.projectId}
                                        name="projectId" id="projectId" required>
                                        {this.state.projects.map((project) => <option key={project.id} value={project.id}>{project.name}</option>)}
                                    </select>
                                    <div className="invalid-feedback">Please select a project.</div>
                                    <div className="valid-feedback">Looks good!</div>
                                </MDBCol>
                                <MDBCol md="6">
                                    <label htmlFor="allocationTypeId" className="form-control-sm">Billing Type:</label>
                                    <select className="form-control form-control-sm"
                                        onChange={this.handleChange}
                                        disabled={this.state.allocationTypeSelectionDisabled}
                                        value={this.state.allocationTypeId}
                                        name="allocationTypeId" id="allocationTypeId" required>
                                        {this.state.allocationTypes.map((allocationType) => <option key={allocationType.id} value={allocationType.id}>{allocationType.name}</option>)}
                                    </select>
                                    <div className="invalid-feedback">Please select billing type.</div>
                                    <div className="valid-feedback">Looks good!</div>

                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol md="6">
                                    <label htmlFor="allocationPercent" className="form-control-sm">Allocation Percent:</label>
                                    <input onChange={this.handleChange} type="number" min="25" max="100" name="allocationPercent" id="allocationPercent"
                                        defaultValue={this.state.allocationPercent}
                                        className="form-control form-control-sm" placeholder="Allocation Percentage" required />
                                    <div className="invalid-feedback">Please provide valid allocation percentage(25-100).</div>
                                    <div className="valid-feedback">Looks good!</div>
                                </MDBCol>
                                <MDBCol md="6">
                                    <label htmlFor="projectLocationBillingRoleId" className="form-control-sm">Billing Role:</label>
                                    <select className="form-control form-control-sm"
                                        onChange={this.handleChange}
                                        disabled={this.state.projectLocationBillingRoleDisabled}
                                        value={this.state.projectLocationBillingRoleId}
                                        name="projectLocationBillingRoleId" id="projectLocationBillingRoleId" required>
                                        {this.state.billingRoles.map((billingRole) => <option key={billingRole.id} value={billingRole.id}>{billingRole.name}</option>)}
                                    </select>
                                    <div className="invalid-feedback">Please select billing role.</div>
                                    <div className="valid-feedback">Looks good!</div>

                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol md="6">
                                    <label htmlFor="allocationStartDate" className="form-control-sm">Start Date</label>
                                    <SingleDatePicker id="allocationStartDate"
                                        placeholder='Select a date'
                                        showClearDate={true}
                                        showDefaultInputIcon={true}
                                        isOutsideRange={() => false}
                                        small={true}
                                        date={this.state.allocationStartDate}
                                        focused={this.state.focusedAsd}
                                        numberOfMonths={1}
                                        onDateChange={date => this.setState({ allocationStartDate: date })}
                                        onFocusChange={({ focused }) => this.setState({ focusedAsd: focused })} />
                                </MDBCol>
                                <MDBCol md="6">
                                    <label htmlFor="allocationEndDate" className="form-control-sm">End Date</label>
                                    <SingleDatePicker id="allocationEndDate"
                                        placeholder='Select a date'
                                        showClearDate={true}
                                        showDefaultInputIcon={true}
                                        isOutsideRange={() => false}
                                        small={true}
                                        date={this.state.allocationEndDate}
                                        focused={this.state.focusedAed}
                                        numberOfMonths={1}
                                        onDateChange={date => this.setState({ allocationEndDate: date })}
                                        onFocusChange={({ focused }) => this.setState({ focusedAed: focused })}
                                    />
                                </MDBCol>
                            </MDBRow>

                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={() => this.toggle(15)}>Close</Button>
                        <Button form="assignResourceForm" type="submit" color="primary">Save changes</Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.modal16} toggle={() => this.toggle(16)} centered size="md">
                    <ModalHeader toggle={() => this.toggle(16)}>Delete Allocation</ModalHeader>
                    <ModalBody>
                        <div>Do you want to delete this allocation?</div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={() => this.toggle(16)}>No</Button>
                        <Button color="primary" onClick={() => { this.deleteAllocation() }} >Yes</Button>
                    </ModalFooter>
                </Modal>

            </Fragment >
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderResources(this.state.resources);

        let message = (this.props.alertType == 'alert-success' || this.props.alertType == 'alert-danger') ? <p>{this.props.alertMessage}</p> : <p>Nothing</p>;

        return (
            <div>
                <h2>
                    <Badge color="cyan" pill>Resources</Badge>
                    <small className="text-muted"> Manage the resources</small>
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

const connectedResourcePage = connect(mapStateToProps)(ListResource);
export { connectedResourcePage as ListResource };