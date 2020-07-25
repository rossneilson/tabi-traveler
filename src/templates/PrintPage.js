import React from "react"
import { graphql } from "gatsby"
import styled, { createGlobalStyle } from "styled-components"
import { navigate } from "@reach/router"
import { FormattedMessage } from "react-intl"

import "../index.css"

import Navigation from "../components/common/Navigation"
import Footer from "../components/blog/Footer"
import Toggle from "../components/common/Toggle"
import PurchasePanel from "../components/store/PurchasePanel"
import ProductImages from "../components/store/ProductImages"
import SEO from "../components/common/Seo"

const GlobalStyle = createGlobalStyle`
  body {
    background: linear-gradient(0deg, rgba(203,213,225,1) 0%, rgba(203,213,225,1) 37%, rgba(255,255,255,1) 70%);
  }
`

const BackIcon = styled.section`
  cursor: pointer;
  color: #8698da;
  z-index: 99999999;
  position: absolute;
  padding-left: 10px;
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
  color: #8698da;
  @media (pointer: coarse) {
    margin-left: 10%;
    margin-right: 10%;
  }
`

const ContentWrapper = styled.section`
  display: flex;
  margin: 0% 10% 5% 10%;
  flex-direction: row;
  @media (pointer: coarse) {
    flex-direction: column;
  }
`

const ImageSection = styled.section`
  display: flex;
  min-width: 50%;
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
  const { frontmatter, html, fileAbsolutePath } = data.print
  const { language } = pageContext

  return (
    <div>
      <GlobalStyle />
      <SEO
        title={"Print - " + frontmatter.title + " | Tabi Traveler"}
        description={frontmatter.desc}
        lang={frontmatter.locale}
      />
      <BackIcon
        onClick={() => navigate("../../" + frontmatter.locale + "/prints")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-arrow-back-up"
          width="36"
          height="36"
          viewBox="0 0 24 24"
          strokeWidth="1"
          stroke="#8698da"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" />
          <path d="M9 13l-4 -4l4 -4m-4 4h11a4 4 0 0 1 0 8h-1" />
        </svg>
        <BackText>
          <FormattedMessage id="store.back" />
        </BackText>
      </BackIcon>

      <Toggle right language={language} position={"absolute"} />
      <Navigation
        link1={"portfolio"}
        link2={"blog"}
        language={pageContext.intl.language}
      />

      <Title>{frontmatter.title}</Title>
      <ContentWrapper>
        <ImageSection>
          <ProductImages images={frontmatter.images} />
        </ImageSection>

        <PurchasePanel
          language={language}
          frontmatter={frontmatter}
          fileAbsolutePath={fileAbsolutePath}
        />
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
      fileAbsolutePath
      frontmatter {
        title
        desc
        date
        path
        locale
        products {
          sku
          title
          type
          size
          price
        }
        fullImage {
          childImageSharp {
            fluid {
              originalImg
            }
          }
        }
        images {
          childImageSharp {
            fluid(maxWidth: 1000) {
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
