import React from "react";
import { Navbar, NavbarBrand, NavbarNav, NavItem, NavLink, NavbarToggler, Collapse, FormInline, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Container } from "mdbreact";

class NavbarPage extends React.Component {
    state = {
        collapseID: ""
    };

    toggleCollapse = collapseID => () =>
        this.setState(prevState => ({
            collapseID: prevState.collapseID !== collapseID ? collapseID : ""
        }));

    render() {
        return (
            <Container>
                <Navbar color="red" dark expand="md" style={{ marginTop: "20px" }}>
                    <NavbarBrand>
                        <strong className="white-text">Navbar</strong>
                    </NavbarBrand>
                    <NavbarToggler
                        onClick={this.toggleCollapse("navbarCollapse3")}
                    />
                    <Collapse id="navbarCollapse3" isOpen={this.state.collapseID} navbar>
                        <NavbarNav left>
                            <NavItem active>
                                <NavLink to="#!">Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="#!">Features</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="#!">Pricing</NavLink>
                            </NavItem>
                            <NavItem>
                                <Dropdown>
                                    <DropdownToggle nav caret>
                                        <div className="d-none d-md-inline">Dropdown</div>
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                        <DropdownItem href="#!">Action</DropdownItem>
                                        <DropdownItem href="#!">Another Action</DropdownItem>
                                        <DropdownItem href="#!">Something else here</DropdownItem>
                                        <DropdownItem href="#!">Something else here</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </NavItem>
                        </NavbarNav>
                        <NavbarNav right>
                            <NavItem>
                                <FormInline waves>
                                    <div className="md-form my-0">
                                        <input
                                            className="form-control mr-sm-2"
                                            type="text"
                                            placeholder="Search"
                                            aria-label="Search"
                                        />
                                    </div>
                                </FormInline>
                            </NavItem>
                        </NavbarNav>
                    </Collapse>
                </Navbar>
                <Navbar color="secondary-color" dark expand="md" style={{ marginTop: "20px" }}>
                    <NavbarBrand>
                        <strong className="white-text">Navbar</strong>
                    </NavbarBrand>
                    <NavbarToggler
                        onClick={this.toggleCollapse("navbarCollapse3")}
                    />
                    <Collapse id="navbarCollapse3" isOpen={this.state.collapseID} navbar>
                        <NavbarNav left>
                            <NavItem active>
                                <NavLink to="#!">Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="#!">Features</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="#!">Pricing</NavLink>
                            </NavItem>
                            <NavItem>
                                <Dropdown>
                                    <DropdownToggle nav caret>
                                        <div className="d-none d-md-inline">Dropdown</div>
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                        <DropdownItem href="#!">Action</DropdownItem>
                                        <DropdownItem href="#!">Another Action</DropdownItem>
                                        <DropdownItem href="#!">Something else here</DropdownItem>
                                        <DropdownItem href="#!">Something else here</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </NavItem>
                        </NavbarNav>
                        <NavbarNav right>
                            <NavItem>
                                <FormInline waves>
                                    <div className="md-form my-0">
                                        <input
                                            className="form-control mr-sm-2"
                                            type="text"
                                            placeholder="Search"
                                            aria-label="Search"
                                        />
                                    </div>
                                </FormInline>
                            </NavItem>
                        </NavbarNav>
                    </Collapse>
                </Navbar>
                <Navbar color="default-color" light expand="md" style={{ marginTop: "20px" }}>
                    <NavbarBrand>
                        <strong className="white-text">Navbar</strong>
                    </NavbarBrand>
                    <NavbarToggler
                        onClick={this.toggleCollapse("navbarCollapse3")}
                    />
                    <Collapse id="navbarCollapse3" isOpen={this.state.collapseID} navbar>
                        <NavbarNav left>
                            <NavItem active>
                                <NavLink to="#!">Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="#!">Features</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="#!">Pricing</NavLink>
                            </NavItem>
                            <NavItem>
                                <Dropdown>
                                    <DropdownToggle nav caret>
                                        <div className="d-none d-md-inline">Dropdown</div>
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                        <DropdownItem href="#!">Action</DropdownItem>
                                        <DropdownItem href="#!">Another Action</DropdownItem>
                                        <DropdownItem href="#!">Something else here</DropdownItem>
                                        <DropdownItem href="#!">Something else here</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </NavItem>
                        </NavbarNav>
                        <NavbarNav right>
                            <NavItem>
                                <FormInline waves>
                                    <div className="md-form my-0">
                                        <input
                                            className="form-control mr-sm-2"
                                            type="text"
                                            placeholder="Search"
                                            aria-label="Search"
                                        />
                                    </div>
                                </FormInline>
                            </NavItem>
                        </NavbarNav>
                    </Collapse>
                </Navbar>
            </Container>

        );
    }
}

export default NavbarPage;