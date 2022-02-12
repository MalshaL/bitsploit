import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout";
import SEO from "../components/seo"
import Sidebar from "../components/sidebar";
import PostList from "../components/postlist";


const PostListPage = ({data, pageContext}) => {
    const { edges: posts } = data.allMarkdownRemark
    return (
        <Layout>
            <div className="gridContainer">
                <PostList
                    posts={posts}
                    pageContext={pageContext}/>
                <Sidebar/>
            </div>
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
