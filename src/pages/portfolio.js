import React, { useState, useEffect } from "react"
import { graphql } from "gatsby"
import styled from "styled-components"
import MenuIcon from "@material-ui/icons/Menu"

import "../index.css"
import "typeface-noto-sans"

import SEO from "../components/seo"

import Navigation from "../components/Navigation"
import FilterDrawer from "../components/portfolio/FilterDrawer"
import Grid from "../components/portfolio/Grid"
import ImageView from "../components/portfolio/ImageView"

const BurgerIcon = styled(MenuIcon)`
  position: fixed;
  z-index: 99999;
  color: #8698da;
  margin: 2%;
  display: ${props => (!props.show ? "" : "none")};
  cursor: pointer;
`

export default function Portfolio(props) {
  console.log(props)
  // const isMobile = useMediaQuery({ query: "(orientation: portrait)" })
  const [filter, setFilter] = useState("best")
  const [selectedImage, setSelectedImage] = useState(null)
  const [filteredImages, setFilteredImages] = useState([])

  // const [drawerWidth, setDrawerWidth] = useState(isMobile ? 60 : 30)
  const [drawerOpen, setDrawerOpen] = useState(false)

  // useEffect(() => {
  //   setDrawerWidth(isMobile ? 50 : 30)
  // }, [isMobile])

  return (
    <div>
      <SEO
        title={"Tabi Traveler - Portfolio"}
        description={"Portfolio page for the best international travel photos"}
        lang={props.pageContext.intl.language}
      />
      <BurgerIcon
        fontSize="large"
        onClick={() => setDrawerOpen(true)}
        show={drawerOpen}
      />

      <Navigation
        vertical={drawerOpen}
        // verticalWidth={drawerWidth}
        link1={"prints"}
        link2={"blog"}
      />
      <FilterDrawer
        // drawerWidth={drawerWidth}
        open={drawerOpen}
        setOpen={setDrawerOpen}
        filter={filter}
        setFilter={setFilter}
        language={props.pageContext.intl.language}
      />
      <Grid
        // drawerWidth={drawerWidth}
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
      filter: { frontmatter: { page: { eq: "portfolio" } } }
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
              absolutePath
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
