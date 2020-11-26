import React from "react"
import styled from "styled-components"
import { GatsbyImage as Img } from "gatsby-plugin-image/compat"
import { Link } from "gatsby-plugin-intl"

import { urlLocaleFormatting } from "../../utils/formatters"

const Wrapper = styled(Link)`
  width: 100%;
  z-index: 999;
  max-width: ${props => (props.isfullpage ? "null" : "380px")};
  overflow: hidden;
  transition: all 1s;
  background-color: white;
  color: #5065a3;
  cursor: pointer;
  border-radius: 5px;
  margin: 0% 2.5% 0% 2.5%;
  box-shadow: 0px 0px 15px 1px #0000003c;
  &:hover {
    opacity: 0.7;
    transform: translateY(-15px);
  }
  &:focus {
    opacity: 0.7;
  }
  @media (pointer: coarse) {
    margin: 0% 2.5% 5% 2.5%;
    max-width: 100%;
    width: auto;
  }
  @media (min-width: 480px) {
    &:first-child {
      ${props =>
        props.isfullpage
          ? "grid-area: 1 / 1 / span 2 / span 2"
          : "grid-area: 1 / 1 / span 1 / span 1"}
    }
  }
`
const Title = styled.h2`
  color: #5065a3;
  margin-bottom: 5px;
`

const Image = styled(Img)`
  height: 45%;
  z-index: -1;
  @media (pointer: coarse) {
    height: 35%;
  }
`

const Category = styled.p`
  background-color: #ffffffb0;
  padding: 4px;
  justify-content: center;
  display: flex;
  border-radius: 10px;
  width: 100px;
  color: black;
  position: absolute;
  margin: 10px;
  font-size: 0.6rem;
  line-height: 1.1;
`

const Description = styled.section`
  padding: 20px;
  color: #5065a3;
`

const Extra = styled.section`
  @media (pointer: coarse) {
    display: none;
  }
`

const OpenFab = styled.section`
  float: right;
  background-color: #699bbf;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 8px 20px -6px #000000ab;
  @media (pointer: coarse) {
    margin-bottom: 15px;
  }
`

export default function PostCard({ post, index, isfullpage }) {
  const { frontmatter } = post.node
  var desc = null

  if (index === 0 && isfullpage) {
    desc = (
      <Extra>
        <h3>{frontmatter.location}</h3>
        <h4>{frontmatter.SEO}</h4>
      </Extra>
    )
  }

  return (
    <Wrapper
      isfullpage={isfullpage}
      to={urlLocaleFormatting(frontmatter.locale, "/" + frontmatter.path)}
      onClick={() => {
        window.scrollTo(0, 0)
      }}
    >
      <Category>{frontmatter.category}</Category>
      <Image loading="eager" fluid={frontmatter.image.childImageSharp.fluid} />
      <Description>
        <Title>{frontmatter.title}</Title>
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-chevron-right"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#ffffff"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" />
            <polyline points="9 6 15 12 9 18" />
          </svg>
        </OpenFab>
      </Description>
    </Wrapper>
  )
}
