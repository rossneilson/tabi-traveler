import React from "react"
import { graphql } from "gatsby"
import loadable from "@loadable/component"

import "../index.css"
import "typeface-noto-sans"
import "@openfonts/noto-sans-jp_japanese"

import SEO from "../components/seo"
import Toggle from "../components/Toggle"

import FrontSection from "../components/landing/FrontSection"
import AboutSection from "../components/landing/AboutSection"
import PageLinks from "../components/landing/PageLinks"
const Contact = loadable(() => import("../components/contact/Contact"))

export default function Main(props) {
  console.log(props)

  return (
    <div>
      <SEO
        title={"Tabi Traveler - Photography"}
        description={
          "Photography website for landing page, portfolio, blog and store"
        }
        lang={props.pageContext.intl.language}
      />
      <Toggle language={props.pageContext.intl.language} />

      <FrontSection />
      <AboutSection fuji={props.data.fujiImage.childImageSharp.fluid} />
      <PageLinks
        image1={props.data.image1.childImageSharp.fluid}
        image2={props.data.image2.childImageSharp.fluid}
        image3={props.data.image3.childImageSharp.fluid}
      />
      <Contact />
    </div>
  )
}

export const imageQuery = graphql`
  query {
    fujiImage: file(relativePath: { eq: "fuji.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1800) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    image1: file(relativePath: { eq: "1.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 640) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    image2: file(relativePath: { eq: "2.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 640) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    image3: file(relativePath: { eq: "3.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 640) {
          ...GatsbyImageSharpFluid
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
