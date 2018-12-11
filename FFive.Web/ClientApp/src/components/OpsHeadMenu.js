import React, { Component } from 'react';
import { NavMenu } from './NavMenu';
import { Glyphicon, Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const OpsHeadMenu = () => {
    return (
        <Nav>
            <LinkContainer to={'/'} exact>
                <NavItem>
                    <Glyphicon glyph='home' /> Dashboardaaa
                        </NavItem>
            </LinkContainer>
            <LinkContainer to={'/counter'}>
                <NavItem>
                    <Glyphicon glyph='education' /> Admin
                        </NavItem>
            </LinkContainer>
            <LinkContainer to={'/fetchdata'}>
                <NavItem>
                    <Glyphicon glyph='th-list' /> Fetch data
                        </NavItem>
            </LinkContainer>
        </Nav>
    );
}

export default OpsHeadMenu;