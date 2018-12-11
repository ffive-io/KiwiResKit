import React, { Component } from 'react';
import { connect } from 'react-redux';
import { platformService } from '../../_services';
import { history } from '../../_helpers';
import { platformActions, alertActions } from '../../_actions';

class ListPlatform extends Component {
    displayName = ListPlatform.name

    constructor(props) {
        super(props);
        this.state = { platforms: [], loading: true, pageNumber: 1, hasNextPage: true };
        this.loadPlatform(1);
    }

    loadPlatform(pageNumber) {
        platformService.getAll(pageNumber)
            .then(res => {
                let platformsExisting = this.state.platforms;
                const { dispatch } = this.props;
                if (res.hasNextPage == true) {
                    this.setState({ hasNextPage: true, pageNumber: res.pageNumber, platforms: [...platformsExisting, ...res.data], loading: false });
                } else {
                    this.setState({ hasNextPage: false, pageNumber: res.pageNumber, platforms: [...platformsExisting, ...res.data], loading: false });
                }
            },
                error => {
                    const { dispatch } = this.props;
                    dispatch(alertActions.error('Fetch failed!'));
                    setTimeout(function () {
                        dispatch(alertActions.clear());
                    }, 3000);
                });
    }

    addPlatform() {
        history.push('/platforms/add');
    };

    //OK
    editPlatform(id) {
        const { dispatch } = this.props;
        let platformEdit = this.state.platforms.find(platform => {
            return platform.id === id;
        });
        dispatch(platformActions.editRequest(platformEdit));
    };

    //Need to change to actions instead of calling service directly
    deletePlatform(id) {
        const { dispatch } = this.props;
        platformService.delete(id)
            .then(res => {
                var tmpPlatforms = this.state.platforms.filter(platform => {
                    return platform.id !== id;
                });
                this.setState({
                    platforms: tmpPlatforms
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

    renderPlatforms(platforms) {
        return (
            <div>
                <button onClick={() => { this.addPlatform() }}>Add Platform</button>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Platforms</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {platforms.map(platform =>
                            <tr key={platform.id}>
                                <td>{platform.name}</td>
                                <td>
                                    <button onClick={() => { this.editPlatform(platform.id) }}>Edit</button>
                                    <button onClick={() => { this.deletePlatform(platform.id) }}>Delete</button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                {this.state.hasNextPage &&
                    <button onClick={() => { this.loadPlatform(this.state.pageNumber + 1) }}>Load More...</button>
                }

            </div>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderPlatforms(this.state.platforms);

        let message = (this.props.alertType == 'alert-success' || this.props.alertType == 'alert-danger') ? <p>{this.props.alertMessage}</p> : <p>Nothing</p>;

        return (
            <div>
                <h1>Platforms</h1>
                <p>Manage the plaforms: Add, Edit, Delete</p>
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

const connectedFetctDataPage = connect(mapStateToProps)(ListPlatform);
export { connectedFetctDataPage as ListPlatform };