import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout";
import SEO from "../components/seo"
import Sidebar from "../components/sidebar";
import PostList from "../components/postlist";
import {Col, Row} from "antd";


const TaggedPostListPage = ({data, pageContext}) => {
    const { edges: posts } = data.allMarkdownRemark
    return (
        <Layout>
            <h3>Posts tagged: {pageContext.tag}</h3>
            <Row gutter={[{xs: 8, sm: 16, md: 24, lg: 32}, {xs: 8, sm: 16, md: 24, lg: 32}]}>
                <Col xs={24} sm={24} md={12} lg={16} xl={16}>
                <PostList
                    posts={posts}
                    pageContext={pageContext}/>
                </Col>
                <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                <Sidebar/>
                </Col>
            </Row>
            <SEO title="Posts" />
        </Layout>
    )
}

export const postListQuery = graphql`
  query ($tag: String){
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            path
            tags
            excerpt
            image
          }
        }
      }
    }
  }
`

export default TaggedPostListPage
