import React, { useEffect } from "react"
import styled from "styled-components"
import Img from "gatsby-image"
import { Link } from "gatsby"

import { urlLocaleFormatting } from "../../utils/formatters"

const Wrapper = styled(Link)`
  width: 100%;
  max-width: 380px;
  z-index: 999;
  overflow: hidden;
  transition: all 1s;
  background-color: white;
  color: #5065a3;
  cursor: pointer;
  border-radius: 5px;
  margin: 0% 2.5% 0% 2.5%;
  box-shadow: 0px 0px 15px 1px #0000003c;
  &:hover {
    opacity: 0.9;
    transform: translateY(-15px);
  }
  &:focus {
    opacity: 0.7;
  }
  @media (pointer: coarse) {
    height: 400px;
    width: auto;
    margin: 0% 2.5% 5% 2.5%;
  }
`

const Image = styled(Img)`
  height: 60%;
  @media (pointer: coarse) {
    height: 70%;
  }
`

const Title = styled.h2`
  color: #5065a3;
`

const Description = styled.section`
  padding: 20px;
`

export default function PrintCard({ print, index }) {
  const { frontmatter } = print.node
  const arrayOfPrices = frontmatter.products.map(product => product.price)
  const max = Math.max(...arrayOfPrices)
  const min = Math.min(...arrayOfPrices)

  return (
    <Wrapper
      to={urlLocaleFormatting(frontmatter.locale, "../../" + frontmatter.path)}
      onClick={() => {
        window.scrollTo(0, 0)
      }}
    >
      <Image fluid={frontmatter.mainImage.childImageSharp.fluid} />
      <Description>
        <Title>{frontmatter.title}</Title>£{min / 100}-{max / 100}
      </Description>
    </Wrapper>
  )
}
