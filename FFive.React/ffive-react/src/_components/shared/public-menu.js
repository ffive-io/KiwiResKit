import React from "react";
import { NavbarNav, NavItem, NavLink, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Fa } from "mdbreact";

class PublicMenu extends React.Component {
    render() {
        return (
            <NavbarNav left>
                <NavItem>
                    <NavLink exact to="/">Home</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="#!">About</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="#!">Contact Us</NavLink>
                </NavItem>
            </NavbarNav>
        );
    }
}

export default PublicMenu;