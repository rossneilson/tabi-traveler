import React from "react"
import { createGlobalStyle } from "styled-components"
import loadable from "@loadable/component"

import "../index.css"

import SEO from "../components/seo"

import Navigation from "../components/Navigation"
import Toggle from "../components/Toggle"

const Contact = loadable(() => import("../components/contact/Contact"))

const GlobalStyle = createGlobalStyle`
  body {
    background: #5e6165;
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
      <Navigation link1={"portfolio"} link2={"prints"} />
      <Contact />
    </div>
  )
}
