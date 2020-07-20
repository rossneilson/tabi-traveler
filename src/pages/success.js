import React from "react"
import styled, { createGlobalStyle } from "styled-components"
import loadable from "@loadable/component"
import { FormattedMessage } from "react-intl"

import "../index.css"

import Navigation from "../components/common/Navigation"
import Toggle from "../components/common/Toggle"

const Contact = loadable(() => import("../components/contact/Contact"))

const About = styled.section`
  color: white;
  margin: auto;
  max-width: 580px;
  padding: 40px;
  font-size: 150%;
  text-align: center;
  line-height: 2;
`

const GlobalStyle = createGlobalStyle`
  body {
    background: #5e6165;
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
      <Contact />
    </div>
  )
}
