import React from "react"
import { graphql } from "gatsby"

import SEO from "../components/common/Seo"
import Toggle from "../components/common/Toggle"

import FrontSection from "../components/landing/FrontSection"
import AboutSection from "../components/landing/AboutSection"
import BlogSection from "../components/landing/BlogSection"
import PrintsSection from "../components/landing/PrintsSection"
import SignUp from "../components/contact/SignUp"
import Contact from "../components/contact/Contact"

export default function Main(props) {
  return (
    <div>
      <SEO
        title={
          props.data.site.siteMetadata[props.pageContext.intl.language].title
        }
        description={
          props.data.site.siteMetadata[props.pageContext.intl.language]
            .description
        }
        lang={props.pageContext.intl.language}
      />
      <Toggle language={props.pageContext.intl.language} />
      <FrontSection language={props.pageContext.intl.language} />
      <AboutSection />
      <SignUp language={props.pageContext.intl.language} />
      <PrintsSection
        prints={props.data.prints.edges}
        language={props.pageContext.intl.language}
      />
      <BlogSection
        posts={props.data.blogPosts.edges}
        language={props.pageContext.intl.language}
      />
      <Contact />
    </div>
  )
}

export const imageQuery = graphql`
  query getData($locale: String) {
    blogPosts: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/(/blog/)/" }
        frontmatter: { locale: { eq: $locale } }
      }
      sort: { fields: frontmatter___date, order: DESC }
      limit: 4
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
    prints: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/(/store/)/" }
        frontmatter: { locale: { eq: $locale } }
      }
      sort: { fields: frontmatter___date, order: DESC }
      limit: 3
    ) {
      edges {
        node {
          frontmatter {
            title
            date
            path
            locale
            products {
              sku
              title
              type
              size
              price
            }
            mainImage {
              childImageSharp {
                gatsbyImageData(
                  width: 500
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
`
