import React, { useState, useEffect } from "react"
import { graphql } from "gatsby"
import styled from "styled-components"
import Img from "gatsby-image"
import { navigate } from "@reach/router"
import loadable from "@loadable/component"
import { FormattedMessage } from "gatsby-plugin-intl"

import "../index.css"

import Navigation from "../components/Navigation"
import Footer from "../components/blog/Footer"
import Toggle from "../components/Toggle"
import SEO from "../components/seo"

const ChevronLeftIcon = loadable(() => import("@material-ui/icons/ChevronLeft"))

const BackIcon = styled.section`
  cursor: pointer;
  color: white !important;
  z-index: 99999999;
  position: absolute;
  padding: 10px;
  display: flex;
`
const BackText = styled.section`
  margin-top: 7px;
  @media (pointer: coarse) {
    display: none !important;
  }
`

const MainImage = styled(Img)`
  width: 100%;
  height: 100vh;
`
const Nav = styled(Navigation)`
  color: white !important;
`

const Title = styled.h1`
  color: white;
  margin-left: 25%;
  margin-right: 25%;
  margin-top: 2%;
  @media (pointer: coarse) {
    margin-left: 10%;
    margin-right: 10%;
  }
`

const Location = styled.h2`
  color: white;
  margin-left: 25%;
  margin-right: 25%;
  @media (pointer: coarse) {
    margin-left: 10%;
    margin-right: 10%;
  }
`

const FormattedDate = styled.h4`
  color: white;
  margin-left: 25%;
  margin-right: 25%;
  @media (pointer: coarse) {
    margin-left: 10%;
    margin-right: 10%;
  }
`

const Markdown = styled.section`
  font-size: medium;
  line-height: 1.7;
  padding: 2%;
`

export default function PrintPage({ data, pageContext }) {
  console.log(data)
  const { frontmatter, html } = data.print
  const { language } = pageContext

  return (
    <div>
      <SEO
        title={"Print - " + frontmatter.title + " | Tabi Traveler"}
        description={null}
        lang={frontmatter.locale}
      />
      <BackIcon
        onClick={() => navigate("../../" + frontmatter.locale + "/prints")}
      >
        <ChevronLeftIcon fontSize="large" />
        <BackText>
          <FormattedMessage id="blog.back" />
        </BackText>
      </BackIcon>

      <Toggle right language={language} position={"absolute"} />
      <Nav
        link1={"portfolio"}
        link2={"blog"}
        colour={"white"}
        language={pageContext.intl.language}
      />
      <MainImage fluid={frontmatter.mainImage.childImageSharp.fluid} />
      <Title>{frontmatter.title}</Title>
      <Location>{frontmatter.printPrice}</Location>
      <Markdown dangerouslySetInnerHTML={{ __html: html }} />
      <FormattedDate>
        {new Intl.DateTimeFormat(language === "en" ? "en-GB" : "ja-JP", {
          year: "numeric",
          month: "long",
          day: "2-digit",
        }).format(new Date(frontmatter.date))}
      </FormattedDate>
      <Footer image={data.image.childImageSharp.fluid} />
    </div>
  )
}

export const query = graphql`
  query Print($slug: String, $locale: String) {
    print: markdownRemark(
      fileAbsolutePath: { regex: "/(/store/)/" }
      frontmatter: { path: { eq: $slug }, locale: { eq: $locale } }
    ) {
      html
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
        image2 {
          childImageSharp {
            fluid(maxWidth: 3000) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        image3 {
          childImageSharp {
            fluid(maxWidth: 3000) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        image4 {
          childImageSharp {
            fluid(maxWidth: 3000) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        image5 {
          childImageSharp {
            fluid(maxWidth: 3000) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
    image: file(relativePath: { eq: "footerImage.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
