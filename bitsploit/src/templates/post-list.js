import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout";
import SEO from "../components/seo"
import {Pagination} from "../components/pagination";
import Sidebar from "../components/sidebar";


const PostList = ({data, pageContext}) => {
    const { edges: posts } = data.allMarkdownRemark
    return (
        <Layout>
            <div className="gridContainer">
                <div className="postListContainer">
                    <div className="postList">
                        {posts
                            .filter(post => post.node.frontmatter.title.length > 0)
                            .map(({ node: post }) => {
                                return (
                                    <div className="postPreview" key={post.id}>
                                        <Link to={post.frontmatter.path}>
                                            <div className="postPreviewImageDiv">
                                                <img className="postPreviewImage" src={post.frontmatter.image} alt=""/>
                                            </div>
                                            <div className="postPreviewContent">
                                                <Link to={post.frontmatter.path}
                                                      className={'postPreviewTitle'}>{post.frontmatter.title}</Link>
                                                <p className={'postPreviewDate'}>{post.frontmatter.date}</p>
                                                {post.frontmatter.tags.map(tag => (
                                                    <div className={'postPreviewTag'} key={tag}>{tag}</div>
                                                ))}
                                                <p className="postPreviewExcerpt">{post.frontmatter.excerpt}</p>
                                            </div></Link>
                                    </div>
                                )})}
                    </div>
                    <Pagination
                        pageCount={pageContext.pageCount}
                        currentPage={pageContext.currentPage}>
                    </Pagination>
                </div>
                <Sidebar></Sidebar>
            </div>
            <SEO title="Posts" />
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

export default PostList
