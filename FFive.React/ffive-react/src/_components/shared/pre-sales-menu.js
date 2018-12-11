import React from "react";
import { NavbarNav, NavItem, NavLink, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Fa } from "mdbreact";

class PreSalesMenu extends React.Component {
    render() {
        return (
            <NavbarNav left>
                <NavItem>
                    <NavLink exact to="/">Dashboard</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/clients">Clients</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/projects">Projects</NavLink>
                </NavItem>
                <NavItem>
                    <Dropdown>
                        <DropdownToggle nav caret>
                            <div className="d-none d-md-inline">Reports</div>
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-default" right>
                            <DropdownItem href="#!">Sales Report</DropdownItem>
                            <DropdownItem href="#!">Another Action</DropdownItem>
                            <DropdownItem href="#!">Something else here</DropdownItem>
                            <DropdownItem href="#!">Something else here</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </NavItem>
            </NavbarNav>
        );
    }
}

export default PreSalesMenu;