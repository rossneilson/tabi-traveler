import React, { useState } from "react"
import styled from "styled-components"
import { GatsbyImage as Img, getImage } from "gatsby-plugin-image"

const Wrapper = styled.section`
  width: 100%;
  transition: all 1s;
  background: ;
`

const MainImage = styled(Img)`
  width: 100%;
  height: auto;
`

const SmallImage = styled(Img)`
  width: 100%;
  cursor: pointer;
  z-index: 9999;
  margin: 5px;
`

const Wrap = styled.section`
  width: 100%;
  cursor: pointer;
  z-index: 9999;
  margin: 5px;
`

const OtherImages = styled.section`
  height: 20%;
  display: flex;
  width: 100%;
  overflow: auto;
`

export default function ProductImages({ images }) {
  const [selectedImage, setSelectedImage] = useState(getImage(images[0]))
  const otherImages = []
  images.map((image, index) => {
    var imageData = getImage(image)
    if (imageData !== selectedImage) {
      otherImages.push(
        <Wrap
          key={index}
          onClick={() => {
            setSelectedImage(getImage(images[index]))
          }}
        >
          <SmallImage
            key={index}
            // fluid={image.childImageSharp.fluid}
            image={imageData}
            onClick={() => {
              setSelectedImage(getImage(images[index]))
            }}
          />
        </Wrap>
      )
    }
  })

  return (
    <Wrapper>
      <MainImage
        // fluid={selectedImage.childImageSharp.fluid}
        image={selectedImage}
        imgStyle={{ objectFit: "contain" }}
      />
      <OtherImages>{otherImages}</OtherImages>
    </Wrapper>
  )
}
