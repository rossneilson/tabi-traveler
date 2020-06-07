import React, { useState, useEffect } from "react"
import styled from "styled-components"
import Img from "gatsby-image"

import { device, deviceMin } from "../../utils/device"

const GridWrap = styled.section`
  width: ${props =>
    props.drawerOpen ? 100 - props.drawerWidth + "%" : "100%"};
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-auto-rows: 350px;
  grid-gap: 0px;
  transition: all 1s;
  grid-auto-flow: dense;
  margin-left: ${props => (props.drawerOpen ? props.drawerWidth + "%" : "0%")};
  @media ${device.mobileM} {
    grid-auto-rows: 500px;
  }
`

const Thumbnail = styled.section`
  transition: all 1s;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
  &:focus {
    opacity: 0.7;
  }
  @media (min-width: 480px) {
    grid-column: ${props => (props.landscape ? "span 2" : "span 1")};
    &:first-child {
      grid-area: 1 / 1 / span 2 / span 2;
    }
    ${"" /* &:nth-child(5n) {
      grid-area: span 2 / span 2;
    } */}
  }
`

const ThumbnailImage = styled(Img)`
  width: 100%;
  height: 100%;
`

export default function Grid({
  images,
  filter,
  setSelectedImage,
  filteredImages,
  setFilteredImages,
  drawerWidth,
  drawerOpen,
}) {
  useEffect(() => {
    if (filter === "best") {
      setFilteredImages(images.filter(e => e.node.frontmatter.best === true))
    } else {
      setFilteredImages(
        images.filter(e => e.node.frontmatter.location === filter)
      )
    }
  }, filter)

  const thumbnails = []

  filteredImages.map((value, index) => {
    console.log("RE")
    console.log(value)
    console.log(value.node.frontmatter.image.absolutePath)
    thumbnails.push(
      <Thumbnail
        onClick={() => {
          console.log(index)
          setSelectedImage(index)
        }}
        landscape={value.node.frontmatter.landscape}
      >
        <ThumbnailImage
          fluid={value.node.frontmatter.image.childImageSharp.fluid}
        />
      </Thumbnail>
    )
  })

  return (
    <GridWrap drawerWidth={drawerWidth} drawerOpen={drawerOpen}>
      {thumbnails}
    </GridWrap>
  )
}