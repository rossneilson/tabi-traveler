import React from "react"
import { graphql } from "gatsby"
import styled, { createGlobalStyle } from "styled-components"
// import Anime, { anime } from "react-anime"

import "../index.css"

import SEO from "../components/common/Seo"

import Navigation from "../components/common/Navigation"
import PrintsGrid from "../components/store/PrintsGrid"
import Toggle from "../components/common/Toggle"
import SignUp from "../components/contact/SignUp"
import Contact from "../components/contact/Contact"

const Intro = styled.section`
  font-size: medium;
  line-height: 1.7;
  padding: 2%;
  border-radius: 10px;
  margin-left: 20%;
  margin-right: 20%;
  @media (pointer: coarse) {
    margin-left: 10%;
    margin-right: 10%;
  }
`

const FAQ = styled.section`
  font-size: medium;
  line-height: 1.7;
  background-color: white;
  padding: 2%;
  border-radius: 10px;
  margin-left: 20%;
  margin-right: 20%;
  margin-top: 5%;
  @media (pointer: coarse) {
    margin-left: 10%;
    margin-right: 10%;
  }
`

const GlobalStyle = createGlobalStyle`
  body {
    background: linear-gradient(0deg, rgba(203,213,225,1) 0%, rgba(203,213,225,1) 37%, rgba(255,255,255,1) 100%);
  }
`

export default function Prints(props) {
  const prints = props.data.prints.edges

  return (
    <div>
      <GlobalStyle />
      <SEO
        title={
          props.data.site.siteMetadata.prints[props.pageContext.intl.language]
            .title
        }
        description={
          props.data.site.siteMetadata.prints[props.pageContext.intl.language]
            .description
        }
        lang={props.pageContext.intl.language}
        slug={"prints"}
      />

      <Toggle
        right
        language={props.pageContext.intl.language}
        position={"absolute"}
      />
      <Navigation
        link1={"portfolio"}
        link2={"blog"}
        language={props.pageContext.intl.language}
      />
      <Intro dangerouslySetInnerHTML={{ __html: props.data.intro.html }} />
      <PrintsGrid prints={prints} />
      <FAQ dangerouslySetInnerHTML={{ __html: props.data.faq.html }} />
      <SignUp language={props.pageContext.intl.language} />
      <Contact footImage1={props.data.footImage1.childImageSharp.fluid} />
    </div>
  )
}

export const printsQuery = graphql`
  query getItems($locale: String) {
    prints: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/(/store/)/" }
        frontmatter: { locale: { eq: $locale } }
      }
      sort: { fields: frontmatter___date, order: ASC }
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
    faq: markdownRemark(
      fileAbsolutePath: { regex: "/(/general/)/" }
      frontmatter: {
        page: { eq: "prints" }
        type: { eq: "faq" }
        locale: { eq: $locale }
      }
    ) {
      html
      frontmatter {
        page
        type
        locale
      }
    }
    intro: markdownRemark(
      fileAbsolutePath: { regex: "/(/general/)/" }
      frontmatter: {
        page: { eq: "prints" }
        type: { eq: "intro" }
        locale: { eq: $locale }
      }
    ) {
      html
      frontmatter {
        page
        type
        locale
      }
    }
    footImage1: file(relativePath: { eq: "footImage.png" }) {
      childImageSharp {
        fluid(maxWidth: 1000, quality: 80) {
          ...GatsbyImageSharpFluid_withWebp_tracedSVG
        }
      }
    }
    site {
      siteMetadata {
        prints {
          en {
            title
            description
          }
          jp {
            title
            description
          }
        }
      }
    }
  }
`
