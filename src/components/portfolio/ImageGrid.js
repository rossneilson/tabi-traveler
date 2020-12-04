import React, { useEffect } from "react"
import styled from "styled-components"
import { GatsbyImage as Img, getImage } from "gatsby-plugin-image"

const GridWrap = styled.section`
  width: ${props => (props.drawerOpen ? 100 - 30 + "%" : "100%")};
  ${"" /* width: 100%; */}
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-auto-rows: 350px;
  grid-gap: 0px;
  transition: all 1s;
  grid-auto-flow: dense;
  margin-left: ${props => (props.drawerOpen ? "30%" : "0%")};
  @media (pointer: coarse) {
    margin-left: ${props => (props.drawerOpen ? "50%" : "0%")};
    grid-template-columns: repeat(auto-fill, minmax(45%, 1fr));
    grid-auto-rows: auto;
  }
`

const Thumbnail = styled.section`
  transition: all 1s;
  cursor: pointer;
  grid-column: ${props => (props.landscape ? "span 2" : "span 1")};

  &:hover {
    opacity: 0.7;
  }
  &:focus {
    opacity: 0.7;
  }
  @media (min-width: 480px) {
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
  drawerOpen,
}) {
  useEffect(() => {
    if (filter === "best") {
      setFilteredImages(
        images
          .filter(e => e.node.frontmatter.best === true)
          .sort(() => {
            return 0.5 - Math.random()
          })
      )
    } else {
      setFilteredImages(
        images
          .filter(e => e.node.frontmatter.location === filter)
          .sort(() => {
            return 0.5 - Math.random()
          })
      )
    }
  }, [filter])

  const thumbnails = []

  filteredImages.map((value, index) => {
    const imageData = getImage(value.node.frontmatter.image)
    thumbnails.push(
      <Thumbnail
        key={index}
        onClick={() => {
          setSelectedImage(index)
        }}
        landscape={value.node.frontmatter.landscape}
      >
        <ThumbnailImage image={imageData} />
      </Thumbnail>
    )
  })

  return <GridWrap drawerOpen={drawerOpen}>{thumbnails}</GridWrap>
}
