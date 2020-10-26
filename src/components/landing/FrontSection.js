import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { FormattedMessage } from "react-intl"
import { Link } from "gatsby-plugin-intl"

import main from "../../img/mainImage.jpg"

import { device, deviceMin } from "../../utils/device"
import { urlLocaleFormatting } from "../../utils/formatters"
var isSafari

if (typeof window !== "undefined") {
  isSafari =
    navigator.vendor &&
    navigator.vendor.indexOf("Apple") > -1 &&
    navigator.userAgent &&
    navigator.userAgent.indexOf("CriOS") == -1 &&
    navigator.userAgent.indexOf("FxiOS") == -1
} else {
  isSafari = true
}

const Main = styled.div`
  width: 100%;
  background: ${props => "url(" + props.main + ") bottom left"};
  background-repeat: no-repeat;
  text-align: right;
  min-height: 100vh;
  height: auto;
  background-size: cover;
  position: relative;
`

const Frame = styled.div`
  width: auto;
  background: ${props => "url(" + props.frame + ") bottom left"};
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
    width: 35%;
  }
  @media (min-height: 600px) {
    width: 36%;
  }
  @media (min-height: 700px) {
    width: 38%;
  }
  @media (min-height: 800px) {
    width: 48%;
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
`

const Desc = styled.h3`
  font-size: 130%;
  color: #8698da;
  @media ${device.mobileS} {
    margin-top: 10px;
  }
`

const PageButton = styled(Link)`
  padding: 20px;
  color: #acb8e4;
  font-size: 120%;
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
      <Main main={main} style={{ backgroundPositionY: offset / 1.6 }}>
        <Frame
          frame={
            isSafari
              ? require("../../img/frame.png")
              : require("../../img/frame.webp")
          }
        >
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
