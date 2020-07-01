import React from "react"
import { graphql } from "gatsby"
import loadable from "@loadable/component"

import "../index.css"

import SEO from "../components/seo"

import Navigation from "../components/Navigation"
import BlogGrid from "../components/blog/BlogGrid"
import Toggle from "../components/Toggle"

const Tabs = loadable(() => import("@material-ui/core/Tabs"))
const Tab = loadable(() => import("@material-ui/core/Tab"))

const createListOfCategories = posts => {
  const categories = []
  posts.map((value, index) => {
    if (!categories.includes(value.node.frontmatter.category)) {
      categories.push(value.node.frontmatter.category)
    }
  })
  categories.sort(function (a, b) {
    if (a < b) {
      return -1
    }
    if (b > a) {
      return 1
    }
    return 0
  })
  categories.splice(0, 0, "all")
  return categories
}

const setFilteredPosts = (tab, posts, categories) => {
  var filteredPosts = []
  if (tab === 0) {
    filteredPosts = posts
  } else {
    posts.map((value, index) => {
      if (value.node.frontmatter.category === categories[tab]) {
        filteredPosts.push(value)
      }
    })
  }
  return filteredPosts
}

export default function Blog(props) {
  const [tab, setTab] = React.useState(0)

  const posts = props.data.allMarkdownRemark.edges

  const tabsArray = []
  var filteredPosts = posts

  const categories = createListOfCategories(posts)

  categories.map((cat, index) => {
    tabsArray.push(<Tab label={cat} key={index} />)
  })

  filteredPosts = setFilteredPosts(tab, posts, categories)

  return (
    <div>
      <SEO
        title={"Blog"}
        description={
          "Blog page for articles about international travel locations experiences and accomodation"
        }
        lang={props.pageContext.intl.language}
      />

      <Toggle right language={props.pageContext.intl.language} />
      <Navigation link1={"prints"} link2={"portfolio"} />
      <Tabs
        value={tab}
        onChange={(event, newValue) => {
          setTab(newValue)
        }}
        indicatorColor="primary"
        textColor="primary"
        centered
        aria-label="blog category tabs"
      >
        {tabsArray}
      </Tabs>
      <BlogGrid posts={filteredPosts} />
    </div>
  )
}

export const postsQuery = graphql`
  query getPosts($locale: String) {
    allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/(/blog/)/" }
        frontmatter: { locale: { eq: $locale } }
      }
      sort: { fields: frontmatter___date, order: ASC }
    ) {
      edges {
        node {
          frontmatter {
            path
            locale
            title
            location
            category
            date
            SEO
            image {
              childImageSharp {
                fluid(maxWidth: 3000) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`
