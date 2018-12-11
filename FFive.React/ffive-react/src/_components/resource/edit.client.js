import React, { Component } from 'react';
import { connect } from 'react-redux';
import { platformActions } from '../../_actions';
import { history } from '../../_helpers';

class EditPlatform extends Component {
    displayName = EditPlatform.name

    constructor(props) {
        super(props);
        this.state = {
            platformName: this.props.platform.name,
            platformId: this.props.platform.id,
            loading: true
        };
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const platformName = this.getPlatform.value;
        const data = {
            name: platformName,
            id: this.state.platformId
        };

        const { dispatch } = this.props;
        dispatch(platformActions.edit(data));
    }

    handleCancel = (e) => {
        e.preventDefault();
        history.push('/platforms');
    }

    render() {
        return (
            <div>
                <h1>Edit Platform</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>Platform:</label>
                    <input required type="text" defaultValue={this.state.platformName} ref={(input) => this.getPlatform = input} placeholder="Enter platform name" />
                    <br /><br />
                    <button>Update</button>
                    <button onClick={this.handleCancel} type="button">Cancel</button>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { loggedIn, email, role } = state.authentication;
    const { platform } = state.platforms;
    return {
        loggedIn, email, role, platform
    };
}

const connectedFetctDataPage = connect(mapStateToProps)(EditPlatform);
export { connectedFetctDataPage as EditPlatform };