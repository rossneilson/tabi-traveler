import React from "react"
import { graphql } from "gatsby"
import { createGlobalStyle } from "styled-components"

import "../index.css"

import SEO from "../components/common/Seo"

import Navigation from "../components/common/Navigation"
import Toggle from "../components/common/Toggle"
import SignUp from "../components/contact/SignUp"
import Contact from "../components/contact/Contact"

const GlobalStyle = createGlobalStyle`
body {
  background: linear-gradient(0deg, rgba(203,213,225,1) 0%, rgba(203,213,225,1) 37%, rgba(255,255,255,1) 70%);
}
`

export default function ContactPage(props) {
  return (
    <div>
      <GlobalStyle />
      <SEO
        title={"Contact | Tabi Traveler"}
        description={"Contact page for any queries regarding us"}
        lang={props.pageContext.intl.language}
      />

      <Toggle right language={props.pageContext.intl.language} />
      <Navigation
        language={props.pageContext.intl.language}
        link1={"portfolio"}
        link2={"prints"}
      />
      <br />
      <SignUp />
      <Contact footImage1={props.data.footImage1.childImageSharp.fluid} />
    </div>
  )
}

export const imageQuery = graphql`
  query getContactImage {
    footImage1: file(relativePath: { eq: "footImage.png" }) {
      childImageSharp {
        fluid(maxWidth: 1800, quality: 80) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`
