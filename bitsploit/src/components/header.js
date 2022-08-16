import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { Container, Navbar, Nav } from 'react-bootstrap';
import {SocialIcons} from "./social-icons";

const Header = ({ siteTitle }) => (
  <header className={'blogHeader'}>
    <h1 className={"blogTitle"}>
        <Link to="/">{siteTitle}</Link>
    </h1>

    <Navbar className={'blogNav'} expand={'md'}>
        <Container>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
            <Nav.Link className={'blogNavLink'} as={Link} to="/">HOME</Nav.Link>
            {/*<Nav.Link className={'blogNavLink'} as={Link} to="/about">ABOUT</Nav.Link>*/}
        </Nav>
        </Navbar.Collapse>
            <SocialIcons className={'headerIcons'}/>
        </Container>
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
