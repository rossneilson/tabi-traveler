import React, { useState } from "react"
import styled from "styled-components"
import Img from "gatsby-image"

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
  const [selectedImage, setSelectedImage] = useState(images[0])
  const otherImages = []
  images.map((image, index) => {
    if (image !== selectedImage) {
      otherImages.push(
        <Wrap
          key={index}
          onClick={() => {
            setSelectedImage(images[index])
          }}
        >
          <SmallImage
            key={index}
            loading="eager"
            fluid={image.childImageSharp.fluid}
            onClick={() => {
              setSelectedImage(images[index])
            }}
          />
        </Wrap>
      )
    }
  })

  return (
    <Wrapper>
      <MainImage
        loading="eager"
        fluid={selectedImage.childImageSharp.fluid}
        imgStyle={{ objectFit: "contain" }}
      />
      <OtherImages>{otherImages}</OtherImages>
    </Wrapper>
  )
}
