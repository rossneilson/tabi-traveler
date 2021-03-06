import React from "react"
import { graphql } from "gatsby"
import styled, { createGlobalStyle } from "styled-components"
import { FormattedMessage } from "gatsby-plugin-intl"

import Navigation from "../components/common/Navigation"
import Toggle from "../components/common/Toggle"
import SignUp from "../components/contact/SignUp"
import Contact from "../components/contact/Contact"
import Welcome from "../img/welcome.svg"

const About = styled.section`
  color: black;
  margin: auto;
  max-width: 580px;
  padding: 40px;
  font-size: ${props => props.theme.fontSizes.m};
  text-align: center;
  line-height: 2;
`
const Image = styled.img`
  max-height: 50vh;
`
const Container = styled.section`
  display: flex;
  justify-content: center;
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
      {/* Set title pls */}
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
      <Container>
        <Image src={Welcome} />
      </Container>
      <SignUp language={props.pageContext.intl.language} />

      <Contact footImage1={props.data.footImage1} />
    </div>
  )
}

export const imageQuery = graphql`
  query getSuccessImage {
    footImage1: file(relativePath: { eq: "footImage.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 1800
          quality: 80
          layout: CONSTRAINED
          placeholder: BLURRED
        )
      }
    }
  }
`
