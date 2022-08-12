import React from "react"
import { graphql } from "gatsby"
import {Col, Row} from "antd";
import Layout from "../components/layout";
import SEO from "../components/seo"
import Sidebar from "../components/sidebar";
import PostList from "../components/postlist";


const PostListPage = ({data, pageContext}) => {
    const { edges: posts } = data.allMarkdownRemark
    return (
        <Layout>
            {/*<div className="gridContainer">*/}
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
            {/*</div>*/}
            <SEO title="Bitsploit" />
        </Layout>
    )
}

export const postListQuery = graphql`
  query ($skip: Int, $limit: Int){
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: $limit
      skip: $skip
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

export default PostListPage
