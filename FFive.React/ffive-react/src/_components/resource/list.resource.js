import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { resourceService } from '../../_services';
import { history } from '../../_helpers';
import { resourceActions, alertActions } from '../../_actions';
import SearchBox from './../shared/search-box';
import { Badge, Table, TableBody, TableHead, MDBBtn, MDBIcon, MDBCol, MDBRow } from "mdbreact";

class ListResource extends Component {
    displayName = ListResource.name

    constructor(props) {
        super(props);
        this.state = { resources: [], loading: true, pageNumber: 1, hasNextPage: true };
        this.loadResources(1);
    }

    loadResources(pageNumber) {
        console.log('page', pageNumber);
        resourceService.getAll(pageNumber)
            .then(res => {
                console.log(res);
                let resourcesExisting = this.state.resources;
                const { dispatch } = this.props;
                if (res.hasNextPage == true) {
                    this.setState({ hasNextPage: true, pageNumber: res.pageNumber, resources: [...resourcesExisting, ...res.data], loading: false });
                } else {
                    this.setState({ hasNextPage: false, pageNumber: res.pageNumber, resources: [...resourcesExisting, ...res.data], loading: false });
                }
            },
                error => {
                    const { dispatch } = this.props;
                    dispatch(alertActions.error('Resource listing failed!'));
                    setTimeout(function () {
                        dispatch(alertActions.clear());
                    }, 3000);
                });
    }

    addResource() {
        history.push('/resources/add');
    };

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
                        <MDBBtn onClick={() => { this.addResource() }} color="primary" size="sm">
                            <MDBIcon icon="new" /> Add Resource
                        </MDBBtn>
                    </MDBCol>
                </MDBRow>

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
                                <td><a href={'/resources/' + resource.resourceId}>{resource.name}</a></td>
                                <td>{resource.designation}</td>

                                <td>{resource.skill}</td>
                                <td>{resource.reportingManager}</td>
                                <td>{resource.resourceOwner}</td>
                                <td colSpan="5">
                                    <Table borderless responsiveLg small>
                                        <TableBody>
                                            {resource.allocatedProjects && resource.allocatedProjects.map(project =>
                                                <tr key={project.projectId}>
                                                    <td><a href={'/projects/' + project.projectId}>{project.projectName}</a></td>
                                                    <td>{project.allocationPercentage}</td>
                                                    <td>{project.startDate}</td>
                                                    <td>{project.endDate}</td>
                                                    <td>{project.allocationType}</td>
                                                </tr>
                                            )}
                                        </TableBody>
                                    </Table>
                                </td>
                                <td>
                                    Action
                                </td>
                            </tr>
                        )}
                    </TableBody>
                </Table>
                {
                    this.state.hasNextPage &&
                    <button className="load-more-button" onClick={() => { this.loadResources(this.state.pageNumber + 1) }} > load more</button>
                }
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