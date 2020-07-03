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

const BackgroundImage = styled(Img)`
  position: absolute !important;
  top: 0;
  left: 0;
  width: 100%;
  z-index: -2;
  height: 100vh;
`
const Nav = styled(Navigation)`
  color: white !important;
`
const Gradient = styled.section`
  background: rgb(0, 0, 0);
  background: ${props =>
    "linear-gradient( 0deg,rgb(255 255 255) 0%,rgb(255 255 255 / " +
    props.offset +
    "%)" +
    props.offset +
    "%,rgb(0 0 0 / 45%) 65%,rgb(0 0 0 / 85%) 100%)"};
  position: absolute !important;
  top: 0;
  left: 0;
  width: 100%;
  z-index: -1;
  height: 100vh;
`

const Category = styled.section`
  background-color: #ffffff45;
  padding: 5px;
  margin-left: 25%;
  margin-top: 40px;
  justify-content: center;
  display: flex;
  border-radius: 10px;
  width: 100px;
  color: white;
  @media (pointer: coarse) {
    margin-left: 10%;
  }
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

export default function BlogPost({ data, pageContext }) {
  const [offset, setOffset] = useState(10)

  const listener = e => {
    if (!(window.pageYOffset > 900)) {
      setOffset(window.pageYOffset * 0.15 + 10)
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", listener)
    return () => {
      window.removeEventListener("scroll", listener)
    }
  })

  const { frontmatter, html } = data.posts
  const { language } = pageContext

  return (
    <div>
      <SEO
        title={frontmatter.title + " | Tabi Traveler"}
        description={frontmatter.SEO}
        lang={frontmatter.locale}
      />
      <BackgroundImage fluid={frontmatter.image.childImageSharp.fluid} />
      <Gradient offset={offset} />
      <BackIcon
        onClick={() => navigate("../../" + frontmatter.locale + "/blog")}
      >
        <ChevronLeftIcon fontSize="large" />
        <BackText>
          <FormattedMessage id="blog.back" />
        </BackText>
      </BackIcon>

      <Toggle right language={language} position={"absolute"} />
      <Nav
        link1={"prints"}
        link2={"portfolio"}
        colour={"white"}
        language={pageContext.intl.language}
      />
      <Category>{frontmatter.category}</Category>
      <Title>{frontmatter.title}</Title>
      <Location>{frontmatter.location}</Location>
      <FormattedDate>
        {new Intl.DateTimeFormat(language === "en" ? "en-GB" : "ja-JP", {
          year: "numeric",
          month: "long",
          day: "2-digit",
        }).format(new Date(frontmatter.date))}
      </FormattedDate>
      <Markdown dangerouslySetInnerHTML={{ __html: html }} />
      <Footer image={data.image.childImageSharp.fluid} />
    </div>
  )
}

export const query = graphql`
  query Posts($slug: String, $locale: String) {
    posts: markdownRemark(
      fileAbsolutePath: { regex: "/(/blog/)/" }
      frontmatter: { path: { eq: $slug }, locale: { eq: $locale } }
    ) {
      html
      frontmatter {
        path
        locale
        title
        location
        category
        date
        image {
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
