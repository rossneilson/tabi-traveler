import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { FormattedMessage } from "gatsby-plugin-intl"
import { Link } from "gatsby-plugin-intl"

import main from "../../img/mainImage.jpg"
import frame from "../../img/frame.png"

import { device, deviceMin } from "../../utils/device"
import { urlLocaleFormatting } from "../../utils/formatters"

const Main = styled.div`
  width: 100%;
  background: ${props => "url(" + main + ") bottom left"};
  background-repeat: no-repeat;
  text-align: right;
  min-height: 100vh;
  height: auto;
  background-size: cover;
  position: relative;
`

const Frame = styled.div`
  width: auto;
  background: ${props => "url(" + frame + ") bottom left"};
  background-repeat: no-repeat;
  text-align: right;
  min-height: 100vh;
  height: auto;
  background-size: cover;
  position: relative;
  z-index: 999;
`

const Navigation = styled.section`
  width: 19%;
  display: flex;
  flex-direction: column;
  align-items: right;
  justify-content: center;
  position: absolute;
  z-index: 9999;
  @media (min-height: 400px) {
    width: 35%;
  }
  @media (min-height: 500px) {
    width: 37%;
  }
  @media (min-height: 600px) {
    width: 38%;
  }
  @media (min-height: 700px) {
    width: 38%;
  }
  @media (min-height: 800px) {
    width: 45%;
  }
  @media ${deviceMin.tablet} {
    width: 30%;
  }
  @media ${deviceMin.laptop} {
    width: 20%;
  }
  @media ${deviceMin.laptopL} {
    width: 19%;
  }
`
const Title = styled.h1`
  margin-top: 60px;
  color: #8698da;
  @media ${device.mobileS} {
    margin-top: 50px;
    font-size: 180% !important;
  }
  @media (min-height: 500px) {
    margin-top: 50px;
    font-size: 280%;
  }
  @media (min-height: 600px) {
    font-size: 350%;
  }
`

const Desc = styled.h2`
  font-size: 130%;
  color: #8698da;
  @media ${device.mobileS} {
    margin-top: 10px;
  }
`

const PageButton = styled(Link)`
  padding: 20px;
  color: #acb8e4;
  font-size: 130%;
  text-align: right;
  transition: 1s;
  background-image: none;
  text-shadow: none;
  &:hover {
    color: #5065a3;
  }
  &:focus {
    color: #5065a3;
  }
`

export default function FrontSection({ language }) {
  const [offset, setOffset] = useState(0)

  const listener = e => {
    if (!(window.pageYOffset > 900)) {
      setOffset(window.pageYOffset)
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", listener)
    return () => {
      window.removeEventListener("scroll", listener)
    }
  })

  return (
    <div style={{ height: "100vh" }}>
      <Main style={{ backgroundPositionY: offset / 1.6 }}>
        <Frame>
          <Navigation>
            <Title>
              <FormattedMessage id="main.title" />
            </Title>
            <Desc>
              <FormattedMessage id="main.names" />
              <br />
              <FormattedMessage id="main.desc" />
            </Desc>
            <PageButton to={urlLocaleFormatting(language, "/portfolio")}>
              <FormattedMessage id="main.portfolio" />
            </PageButton>
            <PageButton to={urlLocaleFormatting(language, "/blog")}>
              <FormattedMessage id="main.blog" />
            </PageButton>
            <PageButton to={urlLocaleFormatting(language, "/prints")}>
              <FormattedMessage id="main.prints" />
            </PageButton>
            <PageButton to={urlLocaleFormatting(language, "/contact")}>
              <FormattedMessage id="main.contact" />
            </PageButton>
          </Navigation>
        </Frame>
      </Main>
    </div>
  )
}
