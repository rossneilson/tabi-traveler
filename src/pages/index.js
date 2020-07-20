import React from "react"
import { graphql } from "gatsby"
import loadable from "@loadable/component"
import { createGlobalStyle } from "styled-components"

import "../index.css"
import "typeface-noto-sans"

import SEO from "../components/common/Seo"
import Toggle from "../components/common/Toggle"

import FrontSection from "../components/landing/FrontSection"
import AboutSection from "../components/landing/AboutSection"
import BlogSection from "../components/landing/BlogSection"
import PrintsSection from "../components/landing/PrintsSection"
const Contact = loadable(() => import("../components/contact/Contact"))

const GlobalStyle = createGlobalStyle`
  body {
    background: linear-gradient(0deg, rgba(203,213,225,1) 0%, rgba(203,213,225,1) 37%, rgba(255,255,255,1) 70%);
  }
`
export default function Main(props) {
  return (
    <div>
      <GlobalStyle />
      <SEO
        title={"Tabi Traveler"}
        description={"Travel photographer international couple"}
        lang={props.pageContext.intl.language}
      />
      <Toggle language={props.pageContext.intl.language} />

      <FrontSection language={props.pageContext.intl.language} />
      <AboutSection fuji={props.data.fujiImage.childImageSharp.fluid} />
      <PrintsSection
        prints={props.data.prints.edges}
        language={props.pageContext.intl.language}
      />
      <BlogSection
        posts={props.data.blogPosts.edges}
        language={props.pageContext.intl.language}
      />
      <Contact footImage1={props.data.footImage1.childImageSharp.fluid} />
    </div>
  )
}

export const imageQuery = graphql`
  query getData($locale: String) {
    fujiImage: file(relativePath: { eq: "fuji.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1800) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    footImage1: file(relativePath: { eq: "download-5-edit.png" }) {
      childImageSharp {
        fluid(maxWidth: 1800) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    blogPosts: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/(/blog/)/" }
        frontmatter: { locale: { eq: $locale } }
      }
      sort: { fields: frontmatter___date, order: ASC }
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
                fluid(maxWidth: 3000) {
                  ...GatsbyImageSharpFluid
                }
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
      sort: { fields: frontmatter___date, order: ASC }
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
                fluid(maxHeight: 500) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`
