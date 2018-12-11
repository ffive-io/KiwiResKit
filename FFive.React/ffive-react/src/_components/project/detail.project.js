import React, { Component } from 'react';
import { connect } from 'react-redux';
import { projectService, locationBillingRoleService, projectLocationBillingRoleService } from '../../_services';
import { history } from '../../_helpers';
import { alertActions } from '../../_actions';
import { Input, Badge, MDBIcon, Table, TableBody, TableHead, MDBCol, MDBRow, MDBCard, MDBCardBody, Modal, ModalHeader, ModalBody, ModalFooter, MDBCardHeader, MDBBtn, MDBContainer, Button } from "mdbreact";

class DetailProject extends Component {
    displayName = DetailProject.name

    constructor(props) {
        super(props);
        this.state = {
            project: {}, resources: [], modal14: false, billingRoles: []
        };
    }

    handleChange = (e, id) => {
        let tmpBillingRoleIndex = this.state.billingRoles.findIndex(brole => {
            return brole.billingRoleId == id;
        });

        let tmpBillingRole = this.state.billingRoles.find(brole => {
            return brole.billingRoleId == id;
        });

        if (e.target.checked === true) {
            tmpBillingRole.selected = true;
        } else {
            tmpBillingRole.selected = false;
        }

        let updatedBillingRoles = [
            ...this.state.billingRoles.slice(0, tmpBillingRoleIndex),
            tmpBillingRole,
            ...this.state.billingRoles.slice(tmpBillingRoleIndex + 1),
        ];
        this.setState({ billingRoles: updatedBillingRoles });
    }

    saveBillingRoles = (e) => {
        let tmpProjLocBillRoles = this.state.billingRoles.filter(item => {
            return item.selected == true;
        })

        let projLocBillRoles = tmpProjLocBillRoles.map(item => {
            return {
                projectId: this.state.project.projectId,
                locationBillingRoleId: item.billingRoleId,
                ratePerHour: item.ratePerHour,
                ratePerMonth: item.ratePerMonth
            };
        })
        projectLocationBillingRoleService.add(projLocBillRoles)
            .then(res => {
                const { dispatch } = this.props;
                dispatch(alertActions.success('Billing roles added successfully!'));
                this.toggle(14);
                setTimeout(function () {
                    dispatch(alertActions.clear());
                }, 3000);
            },
                error => {
                    const { dispatch } = this.props;
                    dispatch(alertActions.error('Some error occurred!'));
                    setTimeout(function () {
                        dispatch(alertActions.clear());
                    }, 3000);
                });
    }

    toggle(nr) {
        let modalNumber = 'modal' + nr
        this.setState({
            [modalNumber]: !this.state[modalNumber]
        });
    }

    componentDidMount() {
        const { id: projectId } = this.props.match.params;
        projectService.getById(projectId)
            .then(res => {
                this.setState({
                    projectId,
                    project: res,
                    resources: res.projectResources
                });

                locationBillingRoleService.getAll()
                    .then(res => {
                        let newBillingRole = res.map(brole => {
                            let isSelected = this.state.project.projectLocationBillingRoles.find(br => {
                                return br.locationBillingRoleId == brole.id;
                            });
                            let x = false;
                            if (isSelected) {
                                x = true;
                            }
                            return {
                                billingRoleId: brole.id,
                                billingRole: brole.billingRole,
                                locationId: brole.locationId,
                                location: brole.location.name,
                                ratePerHour: brole.ratePerHour,
                                ratePerMonth: brole.ratePerMonth,
                                selected: x
                            };
                        })
                        var newSelectedBRole = newBillingRole.filter(nbrole => {
                            return nbrole.selected == true;
                        })
                        this.setState({ hasNextPage: true, pageNumber: res.pageNumber, billingRoles: newBillingRole, loading: false });
                    },
                        error => {
                            const { dispatch } = this.props;
                            dispatch(alertActions.error('Fetch client failed!'));
                            setTimeout(function () {
                                dispatch(alertActions.clear());
                            }, 3000);
                        });
            }, error => {
                console.log('errr');
            });
    }

    onAddClientContact = clientContact => {
        var finalClientContact = { clientId: this.state.clientId, ...clientContact };
        const { dispatch } = this.props;
    }

    addProject = () => {
        history.push('/projects/' + this.state.projectId + '/assign');
    }

    render() {
        return (

            <MDBContainer>
                <h2><Badge color="cyan" pill>Project</Badge>
                </h2>

                <MDBCard border="primary" className="m-3" >
                    <MDBCardHeader>{this.state.project.projectName}</MDBCardHeader>
                    <MDBCardBody className="text-dark">
                        <MDBRow>
                            <MDBCol sm="4">
                                <MDBRow>
                                    <MDBCol sm="6">
                                        <div className="float-right">Client:</div><br />
                                        <div className="float-right">Project Type:</div><br />
                                        <div className="float-right">Platform:</div><br />
                                    </MDBCol>
                                    <MDBCol sm="6">
                                        <div className="float-left">
                                            {this.state.project.clientName}<br />
                                            {this.state.project.projectType}<br />
                                            {this.state.project.platform}</div>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCol>
                            <MDBCol sm="4">
                                <MDBRow>
                                    <MDBCol sm="6">
                                        <div className="float-right">Start Date:</div><br />
                                        <div className="float-right">End Date:</div><br />
                                        <div className="float-right">Status:</div><br />                                    </MDBCol>
                                    <MDBCol sm="6">
                                        <div className="float-left">
                                            {this.state.project.startDate}<br />
                                            {this.state.project.endDate}<br />
                                            {this.state.project.projectStatus}</div>                                    </MDBCol>
                                </MDBRow>
                            </MDBCol>
                            <MDBCol sm="4">
                                <MDBRow>
                                    <MDBCol sm="6">
                                        <div className="float-right">Ops Head:</div><br />
                                        <div className="float-right">Prj Head:</div><br />
                                        <div className="float-right"></div><br />                                    </MDBCol>
                                    <MDBCol sm="6">
                                        <div className="float-left">
                                            {this.state.project.operationHead}<br />
                                            {this.state.project.projectHead}<br />
                                        </div>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCol>
                        </MDBRow>
                        <MDBRow between>
                            <MDBCol sm="3">
                                <MDBBtn color="primary" size="sm">Edit</MDBBtn>
                            </MDBCol>
                            <MDBCol sm="3">
                                <MDBBtn onClick={() => this.toggle(14)} color="primary" size="sm">
                                    <MDBIcon icon="new" /> Assign Billing Roles
                                </MDBBtn>
                            </MDBCol>
                        </MDBRow>

                    </MDBCardBody>
                </MDBCard>

                <MDBRow>
                    <MDBCol sm="12">
                        <hr />
                    </MDBCol>
                </MDBRow>
                <MDBRow between>
                    <MDBCol sm="3">
                        <p>{this.state.resources.length + ' resource(s) allocated'}</p>
                    </MDBCol>
                    <MDBCol sm="3">
                        <MDBBtn onClick={() => this.toggle(15)} color="primary" size="sm">
                            <MDBIcon icon="new" /> Assign Resource
                        </MDBBtn>
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol sm="12">
                        <Table responsiveLg striped small>
                            <TableHead color="primary-color" textWhite>
                                <tr>
                                    <th>project&nbsp;role</th>
                                    <th>billing&nbsp;type</th>
                                    <th>name</th>
                                    <th>designation</th>
                                    <th>allocation&nbsp;%</th>
                                    <th>start&nbsp;date</th>
                                    <th>end&nbsp;date</th>
                                    <th>reporting&nbsp;manager</th>
                                    <th>resource&nbsp;owner</th>
                                    <th>action</th>
                                </tr>
                            </TableHead>
                            <TableBody>
                                {this.state.resources.map(resource =>
                                    <tr key={resource.resourceId}>
                                        <td>{resource.projectRole}</td>
                                        <td>{resource.billingType}</td>
                                        <td>{resource.resourceName}</td>
                                        <td>{resource.designation}</td>
                                        <td>{resource.allocationPercentage}</td>
                                        <td>{resource.allocationStartDate}</td>
                                        <td>{resource.allocationEndDate}</td>
                                        <td>{resource.reportingManager}</td>
                                        <td>{resource.resourceOwner}</td>
                                        <td>action</td>
                                    </tr>
                                )}
                            </TableBody>
                        </Table>
                    </MDBCol>
                </MDBRow>
                <Modal isOpen={this.state.modal14} toggle={() => this.toggle(14)} centered>
                    <ModalHeader toggle={() => this.toggle(14)}>Assign Billing Role</ModalHeader>
                    <ModalBody>
                        <Table responsiveLg striped small>
                            <TableHead color="primary-color" textWhite>
                                <tr>
                                    <th>project&nbsp;role</th>
                                    <th>location</th>
                                    <th>rate&nbsp;per&nbsp;hour</th>
                                    <th>rate&nbsp;per&nbsp;hour</th>
                                    <th>select</th>
                                </tr>
                            </TableHead>
                            <TableBody>
                                {this.state.billingRoles.map(billingRole =>
                                    <tr key={billingRole.billingRoleId}>
                                        <td><a href={'/billingroles/' + billingRole.billingRoleId}>{billingRole.billingRole}</a></td>
                                        <td>{billingRole.location}</td>
                                        <td>{billingRole.ratePerHour}</td>
                                        <td>{billingRole.ratePerMonth}</td>
                                        <td>
                                            <Input onChange={(e) => { this.handleChange(e, billingRole.billingRoleId) }} type="checkbox" defaultChecked={billingRole.selected} id={`billing-${billingRole.id}`} name={`billing-${billingRole.id}`} />
                                        </td>
                                    </tr>
                                )}
                            </TableBody>
                        </Table>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={() => this.toggle(14)}>Close</Button>
                        <Button color="primary" onClick={(e) => this.saveBillingRoles(e)}>Save changes</Button>
                    </ModalFooter>
                </Modal>

            </MDBContainer>
        );
    }
}

function mapStateToProps(state) {
    const { loggedIn, email, role } = state.authentication;
    return {
        loggedIn, email, role
    };
}

const connectedDetailProjectPage = connect(mapStateToProps)(DetailProject);
export { connectedDetailProjectPage as DetailProject };