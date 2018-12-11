import React from "react";
import { NavbarNav, NavItem, NavLink, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Fa } from "mdbreact";

class LoggedOutMenu extends React.Component {
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
                    <NavLink className="waves-effect waves-light" to={'/login'}>Login</NavLink>
                </NavItem>
            </NavbarNav>
        );
    }
}

export default LoggedOutMenu;