import React from "react";
import { Col, Container, Row, Footer } from "mdbreact";

class FooterPage extends React.Component {
    render() {
        return (

            <footer className="footer">
                <div className="container">
                    <span className="custom-footer">&copy; {new Date().getFullYear()} Copyright:{" "}
                        <a href="https://kiwitech.com"> kiwitech.com </a></span>

                </div>
            </footer>

        );
    }
}

export default FooterPage;