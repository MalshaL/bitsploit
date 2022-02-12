/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { Row, Col } from 'react-bootstrap';
import "fontsource-euphoria-script";
import "fontsource-quicksand";
import "fontsource-lato";

import Header from "./header"
import Footer from "./footer"
import "./layout.css"
import "./prism-okaidia-modified.css"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
        <Row><Col>
            <Header siteTitle={data.site.siteMetadata.title} />
        </Col></Row>
      <div className={'blogMain'}>
        <main>{children}</main>
      </div>
        <Footer siteTitle={data.site.siteMetadata.title} />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
