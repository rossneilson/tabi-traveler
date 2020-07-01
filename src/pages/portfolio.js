import React, { useState } from "react"
import { graphql } from "gatsby"
import styled from "styled-components"
import loadable from "@loadable/component"

import "../index.css"
import "typeface-noto-sans"

import SEO from "../components/seo"

import Navigation from "../components/Navigation"
import FilterDrawer from "../components/portfolio/FilterDrawer"
import Grid from "../components/portfolio/ImageGrid"
import ImageView from "../components/portfolio/ImageView"

const MenuIcon = loadable(() => import("@material-ui/icons/Menu"))

const BurgerIcon = styled(MenuIcon)`
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

export default function Portfolio(props) {
  const [filter, setFilter] = useState("best")
  const [selectedImage, setSelectedImage] = useState(null)
  const [filteredImages, setFilteredImages] = useState([])

  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <div>
      <SEO
        title={"Portfolio"}
        description={"Portfolio page for the best international travel photos"}
        lang={props.pageContext.intl.language}
      />
      <BurgerIcon
        fontSize="large"
        onClick={() => setDrawerOpen(true)}
        show={drawerOpen}
      />

      <Navigation vertical={drawerOpen} link1={"prints"} link2={"blog"} />
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
      <ImageView
        filteredImages={filteredImages}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
      />
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
                fluid(maxWidth: 1000) {
                  ...GatsbyImageSharpFluid
                }
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
        title
      }
    }
  }
`
