const fs = require("fs-extra")
const path = require("path")

// exports.onPostBuild = () => {
//   fs.copySync(
//     path.join(__dirname, "/src/locales"),
//     path.join(__dirname, "/public/locales")
//   )
// }

// pages locale
exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions
  deletePage(page)
  // You can access the variable "locale" in your page queries now
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
  // Query for markdown nodes to use in creating pages.
  // You can query for whatever data you want to create pages for e.g.
  // products, portfolio items, landing pages, etc.
  // Variables can be added as the second function parameter
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
      console.log("errors")
      throw result.errors
    }

    // Create blog post pages.
    result.data.allMarkdownRemark.edges.forEach(edge => {
      const path = edge.node.frontmatter.path

      createPage({
        // Path for this page — required
        path: path,
        component: BlogPostTemplate,
        context: {
          slug: path,
        },
      })
    })
  })
}
