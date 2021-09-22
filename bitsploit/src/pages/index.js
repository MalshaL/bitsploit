import React from "react";
import Layout from "../components/layout";
import {graphql, Link} from "gatsby";
import SEO from "../components/seo";
import {Pagination} from "../components/pagination";


export default function IndexPage({data}) {
    const { edges: posts } = data.allMarkdownRemark
    const numPages = 2
    return (
        <Layout>
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
                pageCount={numPages}
                currentPage={1}>
            </Pagination>
            <SEO title="Home" />
        </Layout>
    )
}

export const indexQuery = graphql`
  query {
    allMarkdownRemark (
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 6
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
