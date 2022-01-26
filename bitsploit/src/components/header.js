import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { Navbar, Nav } from 'react-bootstrap';
import {SocialIcons} from "./social-icons";

const Header = ({ siteTitle }) => (
  <header className={'blogHeader'}>
    <h1 className={"blogTitle"}>
        <Link to="/">{siteTitle}</Link>
    </h1>

    <Navbar className={'blogNav'}>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
            <Nav.Link className={'blogNavLink'} as={Link} to="/">HOME</Nav.Link>
            <Nav.Link className={'blogNavLink'} as={Link} to="/about">ABOUT</Nav.Link>
        </Nav>
            <SocialIcons className={'headerIcons'}/>
        </Navbar.Collapse>
    </Navbar>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
