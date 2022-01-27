import {graphql, Link, useStaticQuery} from "gatsby"
import React from "react"
import {SocialIcons} from "./social-icons";

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
    return (
        <div className="sidebar">
            <div className="aboutSidebar">
                <div className="authorImageDiv">
                    <img className="authorImage"
                         src="https://user-images.githubusercontent.com/10103699/150982674-35b56056-877e-4bc3-b3af-cdd24f2d2fe5.jpg"
                         alt="author"/>
                </div>
                <p className={'authorHeading'}>Malsha Ranawaka</p>
                <p className={'sidebarContent'}>Software Engineer and Data Analyst,
                    creating content that makes learning new concepts easy and fun.</p>
                <SocialIcons/>
            </div>
            <div className="tagCloud">
                <p className={'sidebarHeading'}>Tag Cloud</p>
                {uniqueTags.map(tag => {
                    const postPath = "/tags/"+tag
                    return (
                        <div className={'postPreviewTag'} key={tag}>
                            <Link to={postPath} className={'postPreviewTagText'}>{tag}</Link>
                        </div>
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
