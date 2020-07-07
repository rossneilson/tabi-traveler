import React from "react"
import { graphql } from "gatsby"

import "../index.css"

import SEO from "../components/seo"

import Navigation from "../components/Navigation"
import PrintsGrid from "../components/store/PrintsGrid"
import Toggle from "../components/Toggle"

export default function Prints(props) {
  const prints = props.data.allMarkdownRemark.edges

  return (
    <div>
      <SEO
        title={"Print Store | Tabi Traveler"}
        description={"Print store for high quality travel photography prints"}
        lang={props.pageContext.intl.language}
      />

      <Toggle right language={props.pageContext.intl.language} />
      <Navigation
        link1={"portfolio"}
        link2={"blog"}
        language={props.pageContext.intl.language}
      />
      <PrintsGrid prints={prints} />
    </div>
  )
}

export const printsQuery = graphql`
  query getItems($locale: String) {
    allMarkdownRemark(
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
            printPrice
            framedPrice
            path
            locale
            mainImage {
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
