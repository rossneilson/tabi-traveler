import React, { useState } from "react"
import { graphql } from "gatsby"
import styled from "styled-components"

import "../index.css"

import SEO from "../components/common/Seo"

import Navigation from "../components/common/Navigation"
import FilterDrawer from "../components/portfolio/FilterDrawer"
import Grid from "../components/portfolio/ImageGrid"
import ImageView from "../components/portfolio/ImageView"
import SignUp from "../components/contact/SignUp"

const BurgerIcon = styled.section`
  position: fixed;
  z-index: 99999;
  color: #8698da;
  margin: 2%;
  margin-top: 1%;
  display: ${props => (!props.show ? "" : "none")};
  cursor: pointer;
  @media (pointer: coarse) {
    margin-top: 0;
  }
`

const Wrapper = styled.section`
  display: flex;
`

export default function Portfolio(props) {
  const [filter, setFilter] = useState("best")
  const [selectedImage, setSelectedImage] = useState(null)
  const [filteredImages, setFilteredImages] = useState([])

  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <div>
      <SEO
        title={
          props.data.site.siteMetadata.portfolio[
            props.pageContext.intl.language
          ].title
        }
        description={
          props.data.site.siteMetadata.portfolio[
            props.pageContext.intl.language
          ].description
        }
        lang={props.pageContext.intl.language}
        slug={"portfolio"}
      />
      <BurgerIcon onClick={() => setDrawerOpen(true)} show={drawerOpen}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-menu"
          width="44"
          height="44"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="#8698da"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" />
          <line x1="4" y1="8" x2="20" y2="8" />
          <line x1="4" y1="16" x2="20" y2="16" />
        </svg>
      </BurgerIcon>

      <Navigation
        vertical={drawerOpen}
        link1={"prints"}
        link2={"blog"}
        language={props.pageContext.intl.language}
      />
      <Wrapper>
        <FilterDrawer
          open={drawerOpen}
          setOpen={setDrawerOpen}
          filter={filter}
          setFilter={setFilter}
          language={props.pageContext.intl.language}
        />
        <Grid
          drawerOpen={drawerOpen}
          filter={filter}
          images={props.data.images.edges}
          setSelectedImage={setSelectedImage}
          filteredImages={filteredImages}
          setFilteredImages={setFilteredImages}
        />
      </Wrapper>
      <ImageView
        filteredImages={filteredImages}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
      />
      <SignUp language={props.pageContext.intl.language} />
    </div>
  )
}

export const imageQuery = graphql`
  query {
    images: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/(/portfolio/)/" }
        frontmatter: { page: { eq: "portfolio" } }
      }
    ) {
      edges {
        node {
          html
          frontmatter {
            best
            location
            image {
              childImageSharp {
                gatsbyImageData(
                  maxHeight: 600
                  quality: 90
                  layout: CONSTRAINED
                  placeholder: BLURRED
                )
              }
            }
            page
            landscape
          }
          fileAbsolutePath
        }
      }
    }
    site {
      siteMetadata {
        portfolio {
          en {
            title
            description
          }
          ja {
            title
            description
          }
        }
      }
    }
  }
`
