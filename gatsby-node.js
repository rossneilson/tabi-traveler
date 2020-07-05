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

// blog posts
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  const BlogPostTemplate = path.resolve(`src/templates/BlogPost.js`)
  return graphql(
    `
      query MyQuery {
        allMarkdownRemark(
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

    result.data.allMarkdownRemark.edges.forEach(edge => {
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

// prints
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  const PrintPageTemplate = path.resolve(`src/templates/PrintPage.js`)
  return graphql(
    `
      query MyQuery {
        allMarkdownRemark(
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
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    result.data.allMarkdownRemark.edges.forEach(edge => {
      const path = edge.node.frontmatter.path

      createPage({
        path: path,
        component: PrintPageTemplate,
        context: {
          slug: path,
        },
      })
    })
  })
}
