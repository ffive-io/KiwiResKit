import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { projectService } from '../../_services';
import { history } from '../../_helpers';
import moment from 'moment';
import { clientActions, alertActions } from '../../_actions';
import SearchBox from './../shared/search-box';
import { Badge, Table, TableBody, TableHead, MDBBtn, MDBIcon, MDBCol, MDBRow } from "mdbreact";

class ListProject extends Component {
    displayName = ListProject.name

    constructor(props) {
        super(props);
        this.state = { projects: [], loading: true, pageNumber: 1, hasNextPage: true };
        this.loadProjects(1);
    }

    loadProjects(pageNumber) {
        projectService.getAll(pageNumber)
            .then(res => {
                let projectsExisting = this.state.projects;
                const { dispatch } = this.props;
                if (res.hasNextPage == true) {
                    this.setState({ hasNextPage: true, pageNumber: res.pageNumber, projects: [...projectsExisting, ...res.data], loading: false });
                } else {
                    this.setState({ hasNextPage: false, pageNumber: res.pageNumber, projects: [...projectsExisting, ...res.data], loading: false });
                }
            },
                error => {
                    const { dispatch } = this.props;
                    dispatch(alertActions.error('Fetch project failed!'));
                    setTimeout(function () {
                        dispatch(alertActions.clear());
                    }, 3000);
                });
    }

    addProject() {
        history.push('/projects/add');
    };

    //OK
    editProject(id) {
        const { dispatch } = this.props;
        let projectEdit = this.state.projects.find(project => {
            return project.id === id;
        });
        dispatch(clientActions.editRequest(projectEdit));
    };

    //Need to change to actions instead of calling service directly
    deleteProject(id) {
        const { dispatch } = this.props;
        projectService.delete(id)
            .then(res => {
                var tmpProjects = this.state.projects.filter(project => {
                    return project.id !== id;
                });
                this.setState({
                    projects: tmpProjects
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

    renderProjects(projects) {
        return (
            <Fragment>

                <MDBRow between>
                    <MDBCol md="6"><SearchBox /></MDBCol>
                    <MDBCol md="2">
                        <MDBBtn onClick={() => { this.addProject() }} color="primary" size="sm">
                            <MDBIcon icon="new" /> Add Project
                        </MDBBtn>
                    </MDBCol>
                </MDBRow>

                <Table responsiveLg striped small>
                    <TableHead color="primary-color" textWhite>
                        <tr>
                            <th>project&nbsp;name</th>
                            <th>client&nbsp;name</th>
                            <th>project&nbsp;type</th>
                            <th>platform</th>
                            <th>start&nbsp;date</th>
                            <th>end&nbsp;date</th>
                            <th>operation&nbsp;head</th>
                            <th>project&nbsp;head</th>
                            <th>status</th>
                            <th>resources</th>
                            <th>action</th>
                        </tr>
                    </TableHead>
                    <TableBody>
                        {projects.map(project =>
                            <tr key={project.projectId}>
                                <td><a href={'/projects/' + project.projectId}>{project.projectName}</a></td>
                                <td>{project.clientName}</td>

                                <td>{project.projectType}</td>
                                <td>{project.platform}</td>
                                <td>{new moment(project.startDate).format('YYYY-MM-DD')}</td>
                                <td>{new moment(project.endDate).format('YYYY-MM-DD')}</td>
                                <td>{project.operationHead}</td>
                                <td>{project.projectHead}</td>
                                <td>{project.projectStatus}</td>
                                <td>{project.noOfResource}</td>
                                <td>
                                    <i title="Edit" onClick={() => { this.editProject(project.projectId) }} className="custom-hand fa fa-edit mt-0"></i>&nbsp;
                                    <i title="Delete" onClick={() => { this.deleteProject(project.projectId) }} className="custom-hand fa fa-remove mt-0"></i>
                                </td>
                            </tr>
                        )}
                    </TableBody>
                </Table>
                {this.state.hasNextPage &&
                    <button class="load-more-button">load more</button>
                }
            </Fragment>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderProjects(this.state.projects);

        return (
            <div>
                <h2>
                    <Badge color="cyan" pill>Projects</Badge>
                    <small className="text-muted"> Manage the projects</small>
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

const connectedListProjectPage = connect(mapStateToProps)(ListProject);
export { connectedListProjectPage as ListProject };