import React, { Component } from 'react';
import { connect } from 'react-redux';
import { history } from '../../_helpers';

class CustomAlert extends Component {
    displayName = CustomAlert.name

    constructor(props) {
        super(props);
    };

    setX = setTimeout(() => {
        this.setState({ position: 1 });
    }, 3000);

    handleSubmit = (e) => {
        e.preventDefault();
        const platformName = this.getPlatform.value;
        const data = {
            name: platformName
        };
        console.log(data);
        platformService.add(data)
            .then(res => {
                history.push('/platforms');
            });
    }

    render() {
        return (
            <div>
                <h3>{this.props.alertType}</h3>
                <h3>{this.props.alertMessage}</h3>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { type: alertType, message: alertMessage } = state.alert;
    return {
        alertType, alertMessage
    };
}

const connectedAlertPage = connect(mapStateToProps)(CustomAlert);
export { connectedAlertPage as CustomAlert };