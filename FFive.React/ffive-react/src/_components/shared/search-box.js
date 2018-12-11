import React from "react";
import { Col, Fa, FormInline } from "mdbreact";
//import "./style.css";

class SearchBox extends React.Component {
    render() {
        return (
            <Col md="6">
                <FormInline className="md-form">
                    <Fa icon="search" />
                    <input
                        className="form-control form-control-sm ml-3 w-75"
                        type="text"
                        placeholder="Search"
                        aria-label="Search"
                    />
                </FormInline>
            </Col>
        );
    }
}

export default SearchBox;