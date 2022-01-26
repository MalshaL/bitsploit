import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout";
import SEO from "../components/seo"
import Sidebar from "../components/sidebar";
import PostList from "../components/postlist";


const TaggedPostListPage = ({data, pageContext}) => {
    const { edges: posts } = data.allMarkdownRemark
    return (
        <Layout>
            <h3>Posts tagged: {pageContext.tag}</h3>
            <div className="gridContainer">
                <PostList
                    posts={posts}
                    pageContext={pageContext}/>
                <Sidebar/>
            </div>
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
