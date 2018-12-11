import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';


export default class AutoSuggestCustom extends React.Component {
    constructor() {
        super();
        this.state = {
            value: '',
            suggestions: []
        };
    };

    escapeRegexCharacters = (str) => {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    getSuggestions = (value) => {
        const escapedValue = this.escapeRegexCharacters(value.trim());
        if (escapedValue === '') {
            return [];
        }
        const regex = new RegExp('^' + escapedValue, 'i');
        return this.inputData.filter(item => regex.test(item.name));
    }

    getSuggestionValue = (suggestion) => {
        return suggestion.name;
    }

    renderSuggestion = (suggestion) => {
        return (
            <span>{suggestion.name}</span>
        );
    }

    onSuggestionSelected = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
        const { id, onSuggestionSelected } = this.props;
        onSuggestionSelected(suggestion);
    }

    onChange = (_, { newValue }) => {
        const { id, onChange } = this.props;
        this.setState({
            value: newValue
        });

        onChange(id, newValue);
    };

    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: this.getSuggestions(value)
        });
    };

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    render() {
        const { id, placeholder, data } = this.props;
        this.inputData = data;
        const { value, suggestions } = this.state;
        const inputProps = {
            placeholder,
            value,
            onChange: this.onChange
        };

        return (
            <Autosuggest className="form-control form-control-sm"
                id={id}
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={this.getSuggestionValue}
                renderSuggestion={this.renderSuggestion}
                onSuggestionSelected={this.onSuggestionSelected}
                inputProps={inputProps}
            />
        );
    }
}