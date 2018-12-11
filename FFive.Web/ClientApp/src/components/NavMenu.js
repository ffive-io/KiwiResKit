import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Glyphicon, Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './NavMenu.css';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import OpsHeadMenu from './OpsHeadMenu';

class NavMenu extends Component {
    displayName = NavMenu.name

    logout = () => {
        this.props.dispatch(userActions.logout());
    };

    render() {
        var loginLabel = this.props.loggedIn ? 'Logout ' + this.props.email : 'Login';
        var loginButton = <LinkContainer to={'/login'}>
            <NavItem>
                <Glyphicon glyph='education' /> {loginLabel}
            </NavItem>
        </LinkContainer>;
        var logoutButton = <LinkContainer onClick={this.logout} to={'/login'}>
            <NavItem>
                <Glyphicon glyph='education' /> {loginLabel}
            </NavItem>
        </LinkContainer>;

        var buttonLogin;
        if (this.props.loggedIn) {
            buttonLogin = logoutButton;
        } else {
            buttonLogin = loginButton;
        }

        var preSalesMenu =
            <Nav>
                <LinkContainer to={'/'} exact>
                    <NavItem>
                        <Glyphicon glyph='home' /> Dashboard
                        </NavItem>
                </LinkContainer>
                <LinkContainer to={'/counter'}>
                    <NavItem>
                        <Glyphicon glyph='education' /> Counter
                        </NavItem>
                </LinkContainer>
                <LinkContainer to={'/platforms'}>
                    <NavItem>
                        <Glyphicon glyph='th-list' /> Platforms
                        </NavItem>
                </LinkContainer>
                <LinkContainer to={'/clients'}>
                    <NavItem>
                        <Glyphicon glyph='th-list' /> Clients
                        </NavItem>
                </LinkContainer>
                {buttonLogin}
            </Nav>;

        var adminMenu =
            <Nav>
                <LinkContainer to={'/'} exact>
                    <NavItem>
                        <Glyphicon glyph='home' /> Dashboard
                        </NavItem>
                </LinkContainer>
                <LinkContainer to={'/counter'}>
                    <NavItem>
                        <Glyphicon glyph='education' /> Admin
                        </NavItem>
                </LinkContainer>
                <LinkContainer to={'/platforms'}>
                    <NavItem>
                        <Glyphicon glyph='th-list' /> Platforms
                        </NavItem>
                </LinkContainer>
                <LinkContainer to={'/clients'}>
                    <NavItem>
                        <Glyphicon glyph='th-list' /> Clients
                        </NavItem>
                </LinkContainer>
                {buttonLogin}
            </Nav>;

        var publicMenu =
            <Nav>
                <LinkContainer to={'/'} exact>
                    <NavItem>
                        <Glyphicon glyph='home' /> Dashboard
                        </NavItem>
                </LinkContainer>
                {buttonLogin}
            </Nav>;

        var menu;
        if (this.props.role === "opshead") {
            menu = preSalesMenu;
        } else if (this.props.role === "admin") {
            menu = adminMenu;
        } else {
            menu = publicMenu;
        }

        return (
            <Navbar inverse fixedTop fluid collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to={'/'}>FFive.Web</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>

                    {menu}

                </Navbar.Collapse>
            </Navbar>
        );
    }
}

function mapStateToProps(state) {
    const { loggedIn, email, role } = state.authentication;
    return {
        loggedIn, email, role
    };
}

const connectedNavPage = connect(mapStateToProps, null, null, {
    pure: false
})(NavMenu);
export { connectedNavPage as NavMenu };