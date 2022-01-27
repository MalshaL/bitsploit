/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// implement Gatsby’s Node.js APIs to customize and extend default settings affecting the build process

// programmatically create pages
const path = require("path")
const { createFilePath } = require("gatsby-source-filesystem")

exports.createPages = async ({ actions, graphql, reporter }) => {
    const { createPage } = actions
    const blogPostTemplate = path.resolve(`src/templates/blog-post.js`)
    const result = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              path
              external
            }
          }
        }
      }
      tagsGroup: allMarkdownRemark(limit: 2000) {
        group(field: frontmatter___tags) {
          fieldValue
        }
      }
    }
  `)
    if (result.errors) {
        reporter.panicOnBuild(`Error while running GraphQL query.`)
        return
    }
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        if (node.frontmatter.external === 'false') {
            createPage({
                path: node.frontmatter.path,
                component: blogPostTemplate,
                context: {} // additional data can be passed via context
            })
        }
    })

    // Create blog-list pages
    const posts = result.data.allMarkdownRemark.edges
    const postsPerPage = 6
    const numPages = Math.ceil(posts.length / postsPerPage)
    Array.from({ length: numPages }).forEach((_, i) => {
        let pagePath = i === 0 ? `/` : `/${i + 1}`
        createPage({
            path: pagePath,
            component: path.resolve("./src/templates/homepage.js"),
            context: {
                limit: postsPerPage,
                skip: i * postsPerPage,
                pageCount: numPages,
                currentPage: i + 1,
            },
        })
    })

    // create tagged posts pages
    // Extract tag data from query
    const tags = result.data.tagsGroup.group
    const tagTemplate = path.resolve("src/templates/tagged-posts.js")
    // Make tag pages
    tags.forEach(tag => {
        createPage({
            path: `/tags/`+tag.fieldValue,
            component: tagTemplate,
            context: {
                tag: tag.fieldValue,
            },
        })
    })
}
