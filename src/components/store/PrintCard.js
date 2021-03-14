import React from "react"
import styled from "styled-components"
import { GatsbyImage as Img, getImage } from "gatsby-plugin-image"
import { Link } from "gatsby-plugin-intl"

import { urlLocaleFormatting } from "../../utils/formatters"

const Wrapper = styled(Link)`
  width: 100%;
  max-width: 380px;
  z-index: 999;
  overflow: hidden;
  transition: all 0.3s;
  background-color: white;
  color: ${props => props.theme.colors.primary600};
  cursor: pointer;
  border-radius: 5px;
  margin: 0% 2.5% 0% 2.5%;
  box-shadow: 0px 0px 15px 1px #0000003c;
  &:hover {
    box-shadow: 0px 0px 20px 9px #0000003c;
    transform: translateY(-5px);
  }
  &:focus {
    box-shadow: 0px 0px 20px 9px #0000003c;
    transform: translateY(-5px);
  }
  @media (pointer: coarse) {
    height: 400px;
    width: auto;
    max-width: 100%;
    margin: 0% 2.5% 5% 2.5%;
  }
`

const Image = styled(Img)`
  height: 60%;
  @media (pointer: coarse) {
    height: 60%;
  }
`

const Title = styled.h2`
  color: ${props => props.theme.colors.primary600};
`

const Description = styled.section`
  padding: 20px;
`

export default function PrintCard({ print, index }) {
  const { frontmatter } = print.node
  const arrayOfPrices = frontmatter.products.map(product => product.price)
  const min = Math.min(...arrayOfPrices)
  const imageData = getImage(frontmatter.mainImage)
  return (
    <Wrapper
      data-sal="slide-up"
      to={urlLocaleFormatting(frontmatter.locale, "/" + frontmatter.path)}
      onClick={() => {
        window.scrollTo(0, 0)
      }}
    >
      <Image image={imageData} />
      <Description>
        <Title>{frontmatter.title}</Title>From £{min / 100}
      </Description>
    </Wrapper>
  )
}
