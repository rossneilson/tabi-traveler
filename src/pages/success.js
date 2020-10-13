import React from "react"
import styled, { createGlobalStyle } from "styled-components"
import loadable from "@loadable/component"
import { FormattedMessage } from "react-intl"

import "../index.css"

import Navigation from "../components/common/Navigation"
import Toggle from "../components/common/Toggle"
import SignUp from "../components/contact/SignUp"

const Contact = loadable(() => import("../components/contact/Contact"))

const About = styled.section`
  color: black;
  margin: auto;
  max-width: 580px;
  padding: 40px;
  font-size: 150%;
  text-align: center;
  line-height: 2;
`

const GlobalStyle = createGlobalStyle`
  body {
    background: linear-gradient(0deg, rgba(203,213,225,1) 0%, rgba(203,213,225,1) 37%, rgba(255,255,255,1) 100%);
  }
`

export default function ContactPage(props) {
  return (
    <div>
      <GlobalStyle />
      <Toggle right language={props.pageContext.intl.language} />
      <Navigation
        language={props.pageContext.intl.language}
        link1={"portfolio"}
        link2={"blog"}
      />
      <About>
        <FormattedMessage id="store.successMessage" />
        <br />
        <FormattedMessage id="store.contactUs" />
      </About>
      <SignUp language={props.pageContext.intl.language} />
      <Contact footImage1={props.data.footImage1.childImageSharp.fluid} />
    </div>
  )
}

export const imageQuery = graphql`
  query getSuccessImage {
    footImage1: file(relativePath: { eq: "footImage.png" }) {
      childImageSharp {
        fluid(maxWidth: 1800, quality: 80) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`
