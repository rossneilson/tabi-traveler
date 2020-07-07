const fs = require("fs-extra")
const path = require("path")

// pages locale
exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions
  deletePage(page)
  createPage({
    ...page,
    context: {
      ...page.context,
      locale: page.context.intl.language,
    },
  })
}

exports.createPages = ({ graphql, actions }) => {
  console.log("CREATING PRINTS")
  const { createPage } = actions
  const PrintPageTemplate = path.resolve(`src/templates/PrintPage.js`)
  const BlogPostTemplate = path.resolve(`src/templates/BlogPost.js`)
  return graphql(
    `
      query MyQuery {
        prints: allMarkdownRemark(
          filter: { fileAbsolutePath: { regex: "/(/store/)/" } }
        ) {
          edges {
            node {
              frontmatter {
                path
              }
            }
          }
        }
        blog: allMarkdownRemark(
          filter: { fileAbsolutePath: { regex: "/(/blog/)/" } }
        ) {
          edges {
            node {
              frontmatter {
                path
              }
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Prints
    result.data.prints.edges.forEach(edge => {
      const path = edge.node.frontmatter.path

      createPage({
        path: path,
        component: PrintPageTemplate,
        context: {
          slug: path,
        },
      })
    })

    // Blog posts
    result.data.blog.edges.forEach(edge => {
      const path = edge.node.frontmatter.path

      createPage({
        path: path,
        component: BlogPostTemplate,
        context: {
          slug: path,
        },
      })
    })
  })
}
