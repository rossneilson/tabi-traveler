import React from "react"
import styled from "styled-components"
import Img from "gatsby-image"
import { navigate } from "@reach/router"
import loadable from "@loadable/component"

import { urlLocaleFormatting } from "../../utils/formatters"

const Fab = loadable(() => import("@material-ui/core/Fab"))
const ChevronRightIcon = loadable(() =>
  import("@material-ui/icons/ChevronRight")
)

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
  @media (min-width: 480px) {
    &:first-child {
      ${props =>
        props.isFullPage
          ? "grid-area: 1 / 1 / span 2 / span 2"
          : "grid-area: 1 / 1 / span 1 / span 1"}
    }
  }
`

const Image = styled(Img)`
  height: 45%;
  z-index: -1;
  @media (pointer: coarse) {
    height: 35%;
  }
`

const Category = styled.section`
  background-color: #ffffffb0;
  padding: 2px;
  justify-content: center;
  display: flex;
  border-radius: 10px;
  width: 100px;
  color: black;
  position: absolute;
  margin: 10px;
`

const Description = styled.section`
  padding: 20px;
`

const Extra = styled.section`
  @media (pointer: coarse) {
    display: none;
  }
`

const OpenFab = styled(Fab)`
  float: right;
`

export default function PostCard({ post, index, isFullPage, colour }) {
  const { frontmatter } = post.node
  var desc = null

  if (index === 0 && isFullPage) {
    desc = (
      <Extra>
        <h3>{frontmatter.location}</h3>
        <h4>{frontmatter.SEO}</h4>
      </Extra>
    )
  }

  return (
    <Wrapper
      isFullPage={isFullPage}
      colour={colour}
      onClick={() => {
        navigate(
          urlLocaleFormatting(frontmatter.locale, "../../" + frontmatter.path)
        )
      }}
    >
      <Category>{frontmatter.category}</Category>
      <Image fluid={frontmatter.image.childImageSharp.fluid} />
      <Description>
        <h2>{frontmatter.title}</h2>
        {desc}
        {new Intl.DateTimeFormat(
          frontmatter.locale === "en" ? "en-GB" : "ja-JP",
          {
            year: "numeric",
            month: "long",
            day: "2-digit",
          }
        ).format(new Date(frontmatter.date))}
        <OpenFab color="primary" aria-label="open">
          <ChevronRightIcon />
        </OpenFab>
      </Description>
    </Wrapper>
  )
}
