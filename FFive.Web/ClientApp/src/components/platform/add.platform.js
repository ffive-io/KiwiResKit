import React, { Component } from 'react';
import { connect } from 'react-redux';
import { platformService } from '../../_services';
import { history } from '../../_helpers';

class AddPlatform extends Component {
    displayName = AddPlatform.name

    constructor(props) {
        super(props);
        this.state = {
            platforms: {}, loading: true
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const platformName = this.getPlatform.value;
        const data = {
            name: platformName
        };

        platformService.add(data)
            .then(res => {
                history.push('/platforms');
            });
    }

    render() {
        return (
            <div>
                <h1>Add Platform</h1>

                <form onSubmit={this.handleSubmit}>

                    <label>Platform:</label>
                    <input required type="text" ref={(input) => this.getPlatform = input} placeholder="Enter platform name" />
                    <br /><br />
                    <button>Add</button>
                </form>
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

const connectedFetctDataPage = connect(mapStateToProps)(AddPlatform);
export { connectedFetctDataPage as AddPlatform };