import React, { useState } from "react"
import { graphql } from "gatsby"
import styled from "styled-components"
import Img from "gatsby-image"
import { navigate } from "@reach/router"
import loadable from "@loadable/component"
import { FormattedMessage } from "react-intl"

import "../index.css"

import Navigation from "../components/Navigation"
import Footer from "../components/blog/Footer"
import Toggle from "../components/Toggle"
import PurchasePanel from "../components/store/PurchasePanel"
import SEO from "../components/seo"

const ChevronLeftIcon = loadable(() => import("@material-ui/icons/ChevronLeft"))

const BackIcon = styled.section`
  cursor: pointer;
  color: #8698da !important;
  z-index: 99999999;
  position: absolute;
  padding: 10px;
  display: flex;
`
const BackText = styled.section`
  margin-top: 7px;
  font-weight: 400;
  @media (pointer: coarse) {
    display: none !important;
  }
`

const Title = styled.h1`
  margin-left: 10%;
  margin-top: 2%;
  @media (pointer: coarse) {
    margin-left: 10%;
    margin-right: 10%;
  }
`

const ContentWrapper = styled.section`
  display: flex;
  margin: 0% 10% 5% 10%;
`

const ImageSection = styled.section`
  display: flex;
  width: 50%;
  flex-grow: 2;
`

const MainImage = styled(Img)`
  width: 100%;
`

const Markdown = styled.h4`
  line-height: 1.7;
  margin-left: 10%;
`
const FormattedDate = styled.h4`
  margin-left: 10%;
  margin-bottom: 10%;
`

export default function PrintPage({ data, pageContext }) {
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
          <FormattedMessage id="store.back" />
        </BackText>
      </BackIcon>

      <Toggle right language={language} />
      <Navigation
        link1={"portfolio"}
        link2={"blog"}
        language={pageContext.intl.language}
      />

      <Title>{frontmatter.title}</Title>
      <ContentWrapper>
        <ImageSection>
          <MainImage fluid={frontmatter.mainImage.childImageSharp.fluid} />
        </ImageSection>

        <PurchasePanel frontmatter={frontmatter} />
      </ContentWrapper>

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
        products {
          sku
          title
          price
          mkup
        }
        fullImage
        images {
          childImageSharp {
            fluid(maxWidth: 3000) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        mainImage {
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
