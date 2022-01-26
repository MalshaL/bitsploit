import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout";


export default function Template({ data }) {
    const { markdownRemark } = data // data.markdownRemark holds your post data
    const { frontmatter, html } = markdownRemark
    return (
        <Layout>
            <div className={'postDiv'}>
                <p className={'postTitle'}>{frontmatter.title}</p>
                <p className={'postDate'}>{frontmatter.date}</p>
                <div className={'postTagList'}>
                {frontmatter.tags.map(tag => (
                    <div className={'postTag'} key={tag}>{tag}</div>
                ))}
                </div>
                <div
                    className="postContent"
                    dangerouslySetInnerHTML={{ __html: html }}
                />
            </div>
        </Layout>
    )
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        tags
      }
    }
  }
`
