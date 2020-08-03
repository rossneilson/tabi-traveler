import React from "react"
import styled from "styled-components"
import { FormattedMessage } from "react-intl"
import Img from "gatsby-image"

import { device } from "../../utils/device"

const Wrap = styled.section`
  width: 100%;
  height: 100vh;
  position: relative;
  background-size: cover;
  font-size: 110%;
  @media ${device.laptop} {
    padding: 4% 0% 4% 0%;
    min-height: 100vh;
    height: auto;
  }
`
const AboutImage = styled(Img)`
  width: 70%;
  height: 70%;
  float: right;
  z-index: 1;
  margin-top: 6%;
  @media ${device.tablet} {
    width: 100%;
    height: 40%;
    float: none;
    margin-top: none;
  }
`
const About = styled.section`
  background: white;
  color: #5065a3;
  box-shadow: 0px 0px 9px 1px #000000a1;
  text-align: left;
  margin-top: 10%;
  margin-left: 5%;
  max-width: 580px;
  position: absolute;
  padding: 40px;
  z-index: 999;
  @media ${device.tablet} {
    margin: 5%;
    margin-top: -90px;
    position: inherit;
  }
`
const CTA = styled.button`
  text-align: center;
  padding: 12px;
  background: #f79a60;
  color: white !important;
  margin-left: 35%;
  border-radius: 5px;
  transition: 0.5s;
  text-shadow: none;
  border-style: none;
  cursor: pointer;
  z-index: 99999;
  &:hover {
    background: #5065a3;
  }
  &:focus {
    background: #5065a3;
  }
`

export default function AboutSection({ fuji }) {
  return (
    <Wrap>
      <AboutImage fluid={fuji} />
      <About>
        <p style={{ fontSize: "200%" }}>
          <FormattedMessage id="about.title" />
        </p>
        <div
          style={{
            borderTop: "1px solid #5065A3",
            width: "100px",
            marginBottom: "4  0px",
          }}
        />
        <p>
          <FormattedMessage id="about.1" />
        </p>
        <p>
          <FormattedMessage id="about.2" />
        </p>
        <p>
          <FormattedMessage id="about.3" />
        </p>
        <p>
          <FormattedMessage id="about.4" />
        </p>
        <p style={{ marginTop: "30px", marginBottom: "20px" }}>
          <FormattedMessage id="about.5" />
        </p>
        <CTA onClick={() => window.scrollTo(0, 99999)}>
          <FormattedMessage id="about.contact" />
        </CTA>
      </About>
    </Wrap>
  )
}
