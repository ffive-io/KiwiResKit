import React, { Component } from 'react';
import { connect } from 'react-redux';
import { platformService } from '../../_services';
import { history } from '../../_helpers';
import AutoSuggestCustom from '../shared/auto-complete-component';

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

    onChange(id, newValue) {
        console.log(`${id} changed to ${newValue}`);
    }

    onSuggestionSelected(suggestion) {
        console.log('suggestion', suggestion);
    }


    render() {
        const languages = [
            {
                name: 'C',
                id: '1972'
            },
            {
                name: 'C#',
                id: '2000'
            },
            {
                name: 'C++',
                id: '1983'
            },
            {
                name: 'Clojure',
                id: '2007'
            },
            {
                name: 'Elm',
                id: '2012'
            },
            {
                name: 'Go',
                id: '2009'
            },
            {
                name: 'Haskell',
                id: '1990'
            },
            {
                name: 'Java',
                id: '1995'
            },
            {
                name: 'Javascript',
                id: '1995'
            },
            {
                name: 'Perl',
                id: '1987'
            }
        ];

        return (
            <div>
                <h1>Add Platform</h1>

                <form onSubmit={this.handleSubmit}>
                    <AutoSuggestCustom 
                        id="type-c"
                        placeholder="Type 'c'"
                        data={languages}
                        onChange={this.onChange}
                        onSuggestionSelected={this.onSuggestionSelected}
                    />
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