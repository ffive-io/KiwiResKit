import React, { Component } from 'react';
import { connect } from 'react-redux';
import { platformService } from '../_services';

class FetchData extends Component {
    displayName = FetchData.name

    constructor(props) {
        super(props);
        this.state = { platforms: [], loading: true };
        platformService.getAll()
            .then(res => {
                this.setState({ platforms: res.data, loading: false });
            });
    }

    editPlatform(id) {
        console.log('Edit ' + id);
    };

    deletePlatform(id) {
        console.log('Del ' + id);
    };

    renderPlatorms(platforms) {
        return (
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
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderPlatorms(this.state.platforms);

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
    return {
        loggedIn, email, role
    };
}

const connectedFetctDataPage = connect(mapStateToProps)(FetchData);
export { connectedFetctDataPage as FetchData };