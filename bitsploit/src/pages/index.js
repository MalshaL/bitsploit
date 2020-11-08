import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

export default function IndexPage ({data}) {
    const { edges: posts } = data.allMarkdownRemark
    return (
        <Layout>
            <div className="postList">
                {posts
                    .filter(post => post.node.frontmatter.title.length > 0)
                    .map(({ node: post }) => {
                        return (
                            <div className="postPreview" key={post.id}>
                                <h2>
                                    <Link
                                        to={post.frontmatter.path}
                                        className={'postPreviewTitle'}>{post.frontmatter.title}</Link>
                                </h2>
                                <h3>{post.frontmatter.date}</h3>
                                <p>{post.excerpt}</p>
                            </div>
                        )
                    })}
            </div>

            <SEO title="Home" />

            <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
                <Image />
            </div>
        </Layout>
    )
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          excerpt(pruneLength: 250)
          id
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            path
          }
        }
      }
    }
  }
`
