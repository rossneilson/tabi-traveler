import React from "react"
import styled from "styled-components"
import { FormattedMessage } from "gatsby-plugin-intl"
import { Link } from "gatsby-plugin-intl"
import Img from "gatsby-image"

import { urlLocaleFormatting } from "../../utils/formatters"

const FlexWrap = styled.section`
  display: flex;
  flex-wrap: wrap;
  max-width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
`

const StyledLink = styled(Link)`
  width: 33.333333%;
  min-width: 350px;
  text-shadow: none;
  flex-grow: 2;
`

const Card = styled.section`
  background-color: black;
  font-size: 200%;
  width: 100%;
  height: 500px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Image = styled(Img)`
  width: 100%;
  height: 500px;
  opacity: 0.7;
  transition: 1s;
  &:hover {
    opacity: 1;
    transform: scaleY(1.01);
  }
  &:focus {
    opacity: 1;
    transform: scaleY(1.01);
  }
`

const Content = styled.section`
  opacity: 1;
`

export default function PageLinks({ image1, image2, image3, language }) {
  return (
    <FlexWrap>
      <StyledLink to={urlLocaleFormatting(language, "/portfolio")}>
        <Card>
          <Image loading="eager" fluid={image1} />
          <Content style={{ position: "absolute" }}>
            <FormattedMessage id="main.portfolio" />
          </Content>
        </Card>
      </StyledLink>
      <StyledLink to={urlLocaleFormatting(language, "/blog")}>
        <Card>
          <Image loading="eager" fluid={image2} />
          <Content style={{ position: "absolute" }}>
            <FormattedMessage id="main.blog" />
          </Content>
        </Card>
      </StyledLink>
      <StyledLink to={urlLocaleFormatting(language, "/prints")}>
        <Card>
          <Image loading="eager" fluid={image3} />
          <Content style={{ position: "absolute" }}>
            <FormattedMessage id="main.prints" />
          </Content>
        </Card>
      </StyledLink>
    </FlexWrap>
  )
}
