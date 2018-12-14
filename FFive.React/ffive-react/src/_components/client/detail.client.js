import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clientService, clientTypeService, userService, locationService, clientContactService } from '../../_services';
import { history } from '../../_helpers';
import moment from 'moment';
import { alertActions } from '../../_actions';
import { Badge, MDBIcon, Table, TableBody, TableHead, MDBCol, MDBRow, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardHeader, MDBBtn, MDBContainer } from "mdbreact";
import AddClientContactModal from './add.client-contact-modal';

class DetailClient extends Component {
    displayName = DetailClient.name

    constructor(props) {
        super(props);
        this.state = {
            clientId: '',
            clientName: '',
            streetAddress: '',
            city: '',
            state: '',
            country: '',
            locationId: '',
            zip: '',
            since: '',
            clientType: '',
            salesRep: '',
            numberOfProjects: 0,
            clientContacts: [],
            projects: [],
            locations: []
        };
    }

    componentDidMount() {
        const { id: clientId } = this.props.match.params;
        clientService.getById(clientId)
            .then(res => {
                this.setState({
                    clientName: res.name, streetAddress: res.streetAddress, city: res.city, state: res.state,
                    country: res.location.name, zip: res.zipCode, locationId: res.location.id,
                    since: res.createdAt, clientType: res.clientType.name,
                    salesRep: res.salesContact.firstName + ' ' + res.salesContact.lastName,
                    clientContacts: res.clientContacts,
                    projects: res.projects,
                    numberOfProjects: res.projects.length,
                    clientId: res.id
                });
            }, error => {
                console.log('errr');
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
    }

    onAddClientContact = clientContact => {
        var finalClientContact = { clientId: this.state.clientId, ...clientContact };
        const { dispatch } = this.props;
        clientContactService.add(finalClientContact)
            .then(contactRes => {
                dispatch(alertActions.success('Client contact added successfully'));
                this.setState({
                    clientContacts: [...this.state.clientContacts, contactRes]
                });
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

    addProject = () => {
        history.push('/clients/' + this.state.clientId + '/projects/add');
    }

    render() {
        return (

            <MDBContainer>
                <h2><Badge color="cyan" pill>Client</Badge>
                </h2>


                
                <MDBCard border="primary" className="m-3" >
                    <MDBCardHeader>{this.state.clientName}</MDBCardHeader>
                    <MDBCardBody className="text-dark">
                        <MDBCardTitle>Address</MDBCardTitle>
                        <MDBRow>
                            <MDBCol sm="4">
                                <p className="mb-0">{this.state.streetAddress}<br />
                                    {this.state.city}<br />
                                    {this.state.state}<br />
                                    {this.state.country + ', ' + this.state.zip}</p>
                            </MDBCol>
                            <MDBCol sm="8">
                                <MDBRow>
                                    <MDBCol sm="6">
                                        <div className="float-right">Since:</div><br />
                                        <div className="float-right">Client Type:</div><br />
                                        <div className="float-right">Sales Rep:</div><br />
                                        <div className="float-right">No of projects:</div>
                                    </MDBCol>
                                    <MDBCol sm="6">
                                        <div className="float-left">{new moment(this.state.since).format('YYYY-MM-DD')}<br />
                                            {this.state.clientType}<br />
                                            {this.state.salesRep}<br />
                                            {this.state.numberOfProjects}</div>

                                    </MDBCol>
                                </MDBRow>
                            </MDBCol>

                        </MDBRow>

                        <MDBBtn color="primary" size="sm">Edit</MDBBtn>
                    </MDBCardBody>
                </MDBCard>

                <MDBRow>
                    <MDBCol sm="12">
                        <hr />
                    </MDBCol>
                </MDBRow>
                <MDBRow between>
                    <MDBCol sm="3">
                        <p>{this.state.clientContacts.length + ' client contacts'}</p>
                    </MDBCol>
                    <MDBCol sm="3">
                        <AddClientContactModal onSubmit={this.onAddClientContact} contact={this.state} />
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol sm="12">

                        <Table responsiveLg striped>
                            <TableHead color="primary-color" textWhite>
                                <tr>
                                    <th>contact&nbsp;name</th>
                                    <th>designation</th>
                                    <th>email</th>
                                    <th>contact&nbsp;number</th>
                                    <th>skype&nbsp;id</th>
                                    <th>timezone</th>
                                    <th>point&nbsp;of&nbsp;contact</th>
                                    <th>action</th>
                                </tr>
                            </TableHead>
                            <TableBody>
                                {this.state.clientContacts.map(clientContact =>

                                    <tr key={clientContact.id}>
                                        <td>{clientContact.firstName + ' ' + clientContact.lastName}</td>
                                        <td>{clientContact.designation}</td>
                                        <td>{clientContact.email}</td>
                                        <td>{clientContact.contactNumber}</td>
                                        <td>{clientContact.skypeId}</td>
                                        <td>{clientContact.timezone}</td>
                                        <td>{clientContact.isPointOfContact ? 'Yes' : 'No'}</td>
                                        <td>action</td>
                                    </tr>
                                )}
                            </TableBody>
                        </Table>
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol sm="12">
                        <hr />
                    </MDBCol>
                </MDBRow>
                <MDBRow between>
                    <MDBCol sm="3">
                        <p>{this.state.projects.length + ' projects'}</p>
                    </MDBCol>
                    <MDBCol sm="3">
                        <MDBBtn onClick={() => { this.addProject() }} color="primary" size="sm">
                            <MDBIcon icon="new" /> Add Project
                        </MDBBtn>
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol sm="12">
                        <Table responsiveLg striped>
                            <TableHead color="primary-color" textWhite>
                                <tr>
                                    <th>project&nbsp;name</th>
                                    <th>platforms</th>
                                    <th>project&nbsp;type</th>
                                    <th>project&nbsp;poc</th>
                                    <th>start&nbsp;date</th>
                                    <th>end&nbsp;date</th>
                                    <th>status</th>
                                    <th>action</th>
                                </tr>
                            </TableHead>
                            <TableBody>
                                {this.state.projects.map(project =>
                                    <tr key={project.id}>
                                        <td><a href={'/projects/' + project.id}>{project.name}</a></td>
                                        <td>{project.platform.name}</td>
                                        <td>{project.projectType.name}</td>
                                        <td>{project.clientContact.firstName + ' ' + project.clientContact.lastName}</td>
                                        <td>{new moment(project.startDate).format('YYYY-MM-DD')}</td>
                                        <td>{new moment(project.endDate).format('YYYY-MM-DD')}</td>
                                        <td>{project.status}</td>
                                        <td>action</td>
                                    </tr>
                                )}
                            </TableBody>
                        </Table>

                    </MDBCol>
                </MDBRow>
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

const connectedFetctDataPage = connect(mapStateToProps)(DetailClient);
export { connectedFetctDataPage as DetailClient };