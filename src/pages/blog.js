import React, { useEffect } from "react"
import { graphql } from "gatsby"

import SEO from "../components/common/Seo"
import Navigation from "../components/common/Navigation"
import BlogGrid from "../components/blog/BlogGrid"
import Toggle from "../components/common/Toggle"
import SignUp from "../components/contact/SignUp"
import Tabs from "../components/common/Tabs"

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
  categories.splice(0, 0, "All")
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

  const categories = createListOfCategories(posts)

  const filteredPosts = setFilteredPosts(tab, posts, categories)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div>
      <SEO
        title={
          props.data.site.siteMetadata.blog[props.pageContext.intl.language]
            .title
        }
        description={
          props.data.site.siteMetadata.blog[props.pageContext.intl.language]
            .description
        }
        lang={props.pageContext.intl.language}
        slug={"/blog"}
      />

      <Toggle right language={props.pageContext.intl.language} />
      <Navigation
        link1={"prints"}
        link2={"portfolio"}
        language={props.pageContext.intl.language}
      />
      <Tabs
        options={categories}
        onChange={newValue => {
          setTab(newValue)
        }}
        current={tab}
        scrollable={false}
      />
      <BlogGrid posts={filteredPosts} />
      <SignUp language={props.pageContext.intl.language} />
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
      sort: { fields: frontmatter___date, order: DESC }
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
                gatsbyImageData(
                  width: 1000
                  layout: CONSTRAINED
                  placeholder: BLURRED
                )
              }
            }
          }
        }
      }
    }
    site {
      siteMetadata {
        blog {
          en {
            title
            description
          }
          ja {
            title
            description
          }
        }
      }
    }
  }
`
