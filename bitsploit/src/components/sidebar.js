import {graphql, Link, useStaticQuery} from "gatsby"
import PropTypes from "prop-types"
import React from "react"

export default function Sidebar() {
    const data = useStaticQuery(graphql`
      query {
        allMarkdownRemark {
          edges {
            node {
              frontmatter {
                tags
              }
            }
          }
        }
      }
    `)
    let allTags = [];
    data.allMarkdownRemark.edges.forEach(({ node }) => {
        allTags = allTags.concat(node.frontmatter.tags)
    })
    const mergeDedupe = (arr) => {
        return [...new Set([].concat(...arr))];
    }
    const uniqueTags = mergeDedupe(allTags)
    console.log(uniqueTags)
    return (
        <div className="sidebar">
            <div className="aboutSidebar">
                <p>About</p>
            </div>
            <div className="tagCloud">
                <p>Tag Cloud</p>
                {uniqueTags.map(tag => {
                    return (
                        <div className={'postPreviewTag'} key={tag}>{tag}</div>
                    )
                })}
            </div>
        </div>
    )
}

// export const tagListQuery = graphql`
//   query {
//     allMarkdownRemark {
//       edges {
//         node {
//           frontmatter {
//             tags
//           }
//         }
//       }
//     }
//   }
// `
