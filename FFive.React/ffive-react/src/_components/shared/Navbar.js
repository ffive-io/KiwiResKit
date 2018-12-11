import React from "react";
import { Navbar, NavbarBrand, NavbarNav, NavItem, NavLink, NavbarToggler, Collapse, FormInline, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Fa } from "mdbreact";
import { connect } from 'react-redux';
import { userActions } from '../../_actions';

import OpsHeadMenu from './ops-head-menu';
import PreSalesMenu from './pre-sales-menu';
import PublicMenu from './public-menu';
import AdminMenu from './admin-menu';
import LoggedInMenu from './loggedin-menu';
import LoggedOutMenu from './loggedout-menu';

class NavbarPage extends React.Component {
    state = {
        isOpen: false
    };

    toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }

    render() {
        var menu;
        if (this.props.role === "opshead") {
            menu = <OpsHeadMenu />;
        } else if (this.props.role === "admin") {
            menu = <AdminMenu />;
        } else if (this.props.role === "presales") {
            menu = <PreSalesMenu />;
        } else {
            menu = <PublicMenu />;
        }

        var loginMenu;
        if (this.props.loggedIn) {
            loginMenu = <LoggedInMenu props={this.props} />;
        } else {
            loginMenu = <LoggedOutMenu props={this.props} />
        }

        return (
            <Navbar color="blue" dark expand="md">
                <NavbarBrand>
                    <img src="/images/resourcekit-logo.png" alt="logo" />
                </NavbarBrand>
                <NavbarToggler
                    onClick={this.toggleCollapse}
                />
                <Collapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
                    {menu}
                    {loginMenu}
                </Collapse>
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
})(NavbarPage);
export { connectedNavPage as NavbarPage };