import React from "react"
import styled from "styled-components"
import Img from "gatsby-image"
import { navigate } from "@reach/router"
import loadable from "@loadable/component"

import { urlLocaleFormatting } from "../../utils/formatters"

const Wrapper = styled.section`
  width: 100%;
  z-index: 999;
  overflow: hidden;
  transition: all 1s;
  background-color: ${props => (props.colour ? props.colour : "white")};
  cursor: pointer;
  border-radius: 5px;
  box-shadow: 0px 0px 15px 1px #0000003c;
  &:hover {
    opacity: 0.7;
    transform: scale(1.05);
  }
  &:focus {
    opacity: 0.7;
  }
`

const Image = styled(Img)`
  height: 100%;
  z-index: -1;
  @media (pointer: coarse) {
    height: 35%;
  }
`

const Description = styled.section`
  padding: 20px;
`

export default function PrintCard({ print, index }) {
  const { frontmatter } = print.node

  return (
    <Wrapper
      onClick={() => {
        navigate(
          urlLocaleFormatting(frontmatter.locale, "../../" + frontmatter.path)
        )
        window.scrollTo(0, 0)
      }}
    >
      <Image fluid={frontmatter.mainImage.childImageSharp.fluid} />
      <Description>
        <h2>{frontmatter.title}</h2>£{frontmatter.basePrice}-
        {frontmatter.framedPrice}
      </Description>
    </Wrapper>
  )
}
