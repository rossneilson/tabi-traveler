import React from "react"
import styled from "styled-components"
import { FormattedMessage } from "gatsby-plugin-intl"
import { Link } from "gatsby"
import Img from "gatsby-image"

import { device, deviceMin } from "../../utils/device"

const Wrap = styled.section`
  font-family: Noto Sans JP;
  width: 100%;
  height: 100vh;
  position: relative;
  background: #3b3d40;
  background-size: cover;
  @media ${device.laptop} {
    padding: 4% 0% 4% 0%;
  }
  @media ${deviceMin.mobileS} {
    height: 130vh;
  }
  @media ${deviceMin.mobileM} {
    height: 115vh;
  }
  @media ${deviceMin.tablet} {
    height: 90vh;
  }
  @media ${deviceMin.laptopL} {
    height: 100vh;
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
  text-align: left;
  margin-top: 10%;
  margin-left: 5%;
  max-width: 580px;
  position: absolute;
  padding: 40px;
  z-index: 999;
  @media ${device.tablet} {
    margin: 5%;
    top: 18%;
  }
`
const CTA = styled(Link)`
  text-align: center;
  padding: 12px;
  background: #f79a60;
  color: white;
  margin-top: 120px;
  margin-left: 35%;
  border-radius: 5px;
  transition: 0.5s;
  text-shadow: none;
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
        <CTA to="/contact">
          <FormattedMessage id="about.contact" />
        </CTA>
      </About>
    </Wrap>
  )
}