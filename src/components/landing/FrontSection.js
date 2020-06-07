import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { createUseStyles } from "react-jss"
import { FormattedMessage } from "gatsby-plugin-intl"
import { Link } from "gatsby"

import frame from "../../images/frame.webp"
import main from "../../images/mainImage.jpg"

import { device, deviceMin } from "../../utils/device"

const useStyles = createUseStyles({
  frame: {
    width: "auto",
    background: "url(" + frame + ") bottom left",
    backgroundRepeat: "no-repeat",
    textAlign: "right",
    minHeight: "100vh",
    height: "auto",
    webkitBackgroundSize: "cover",
    mozBackgroundSize: "cover",
    oBackgroundSize: "cover",
    backgroundSize: "cover",
    position: "relative",
    zIndex: 999,
  },
  main: {
    width: "100%",
    background: "url(" + main + ") bottom left",
    backgroundRepeat: "no-repeat",
    textAlign: "right",
    minHeight: "100vh",
    height: "auto",
    webkitBackgroundSize: "cover",
    mozBackgroundSize: "cover",
    oBackgroundSize: "cover",
    backgroundSize: "cover",
    position: "relative",
  },
})

const Navigation = styled.section`
  width: 19%;
  display: flex;
  flex-direction: column;
  align-items: right;
  justify-content: center;
  position: absolute;
  z-index: 9999;
  @media ${deviceMin.mobileS} {
    width: 38%;
  }
  @media ${deviceMin.mobileM} {
    width: 42%;
  }
  @media ${deviceMin.mobileL} {
    width: 40%;
  }
  @media ${deviceMin.tablet} {
    width: 30%;
  }
  @media ${deviceMin.laptop} {
    width: 28%;
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
  margin-top: 10px;
  padding: 20px;
  margin-bottom: 20px;
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
  @media ${deviceMin.mobileS} {
    padding: 5px;
  }
  @media ${deviceMin.mobileM} {
    padding: 15px;
  }
  @media ${deviceMin.mobileL} {
    padding: 30px;
  }
`

export default function FrontSection({}) {
  const classes = useStyles()
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
    <div>
      <div
        className={classes.main}
        offset={offset / 1.6}
        style={{ backgroundPositionY: offset / 1.6 }}
      >
        <div className={classes.frame}>
          <Navigation>
            <Title>
              <FormattedMessage id="main.title" />
            </Title>
            <Desc>
              <FormattedMessage id="main.names" />
              <br />
              <FormattedMessage id="main.desc" />
            </Desc>
            <PageButton to="/portfolio">
              <FormattedMessage id="main.portfolio" />
            </PageButton>
            <PageButton to="/blog">
              <FormattedMessage id="main.blog" />
            </PageButton>
            <PageButton to="/prints">
              <FormattedMessage id="main.prints" />
            </PageButton>
            <PageButton to="/contact">
              <FormattedMessage id="main.contact" />
            </PageButton>
          </Navigation>
        </div>
      </div>
    </div>
  )
}
