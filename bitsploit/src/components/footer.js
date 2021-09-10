import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Footer = ({ siteTitle }) => (
    <div className={'blogFooter'}>
        Copyright © {new Date().getFullYear()} <Link to="/">{siteTitle}</Link>
    </div>
)

Footer.propTypes = {
    siteTitle: PropTypes.string,
}

Footer.defaultProps = {
    siteTitle: ``,
}

export default Footer
