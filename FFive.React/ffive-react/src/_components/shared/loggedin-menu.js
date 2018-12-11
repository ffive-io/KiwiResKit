import React from "react";
import { NavbarNav, NavItem, NavLink, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Fa } from "mdbreact";
import { connect } from 'react-redux';
import { userActions } from '../../_actions';

class LoggedInMenu extends React.Component {
    logout = () => {
        this.props.dispatch(userActions.logout());
    };

    render() {
        return (
            <NavbarNav right>
                <NavItem>
                    <NavLink className="waves-effect waves-light" to="#!"><Fa icon="twitter" /></NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className="waves-effect waves-light" to="#!"><Fa icon="google-plus" /></NavLink>
                </NavItem>
                <NavItem>
                    <Dropdown>
                        <DropdownToggle nav caret>
                            <Fa icon="user" />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-default" right>
                            <DropdownItem href="#!">Profile</DropdownItem>
                            <DropdownItem href="/" onClick={this.logout}>Logout</DropdownItem>
                            <DropdownItem href="#!">Something else here</DropdownItem>
                            <DropdownItem href="#!">Something else here</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </NavItem>
            </NavbarNav>
        );
    }
}

export default LoggedInMenu;