import React from "react"
import styled from "styled-components"
import { FormattedMessage } from "gatsby-plugin-intl"
import { StaticImage } from "gatsby-plugin-image"

import { device } from "../../utils/device"

const Wrap = styled.section`
  width: 100%;
  height: 105vh;
  position: relative;
  background-size: cover;
  font-size: ${props => props.theme.fontSizes.s};
  @media ${device.laptop} {
    padding: 4% 0% 4% 0%;
    min-height: 100vh;
    height: auto;
  }
`
const FujiImage = styled.section`
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
const ProfileImage = styled.section`
  float: right;
  width: 150px !important;
  @media (pointer: coarse) {
    width: 100px !important;
  }
`
const About = styled.section`
  background: white;
  color: ${props => props.theme.colors.primary700};
  box-shadow: 0px 0px 9px 1px #000000a1;
  text-align: left;
  margin-top: 5%;
  margin-left: 8%;
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

const Title = styled.p`
  padding-bottom: 10px;
  margin: 0px;
`
const CTA = styled.button`
  text-align: center;
  padding: 12px;
  background-color: ${props => props.theme.colors.secondary};
  font-weight: 500;
  color: ${props => props.theme.colors.primary800} !important;
  margin-left: 5%;
  width: 30%;
  min-width: 200px;
  border-radius: 5px;
  transition: 0.5s;
  text-shadow: none;
  border-style: none;
  cursor: pointer;
  z-index: 99999;
  &:hover {
    background: ${props => props.theme.colors.primary600};
    color: ${props => props.theme.colors.secondary} !important;
  }
  &:focus {
    background: ${props => props.theme.colors.primary600};
    color: ${props => props.theme.colors.secondary} !important;
  }
`

export default function AboutSection({}) {
  return (
    <Wrap>
      <FujiImage>
        <StaticImage
          src="../../img/fuji.jpg"
          alt="Mount fuji picture"
          width={1800}
          layout="constrained"
        />
      </FujiImage>

      <About>
        <Title style={{ fontSize: "200%" }}>
          <svg
            style={{ transform: "translateY(10px)", marginRight: "4px" }}
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#5065a3"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <rect x="4" y="4" width="16" height="16" rx="2" />
            <line x1="8" y1="4" x2="8" y2="20" />
            <line x1="16" y1="4" x2="16" y2="20" />
            <line x1="4" y1="8" x2="8" y2="8" />
            <line x1="4" y1="16" x2="8" y2="16" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="16" y1="8" x2="20" y2="8" />
            <line x1="16" y1="16" x2="20" y2="16" />
          </svg>
          <FormattedMessage id="about.title" />
        </Title>
        <div
          style={{
            borderTop: "1px solid #5065A3",
            width: "200px",
            marginBottom: "30px",
          }}
        />
        <ProfileImage>
          <StaticImage
            src="../../img/footerImage.jpg"
            alt="Profile image"
            width={300}
            layout="constrained"
          />
        </ProfileImage>

        <p>
          <FormattedMessage id="about.1" />
        </p>
        <p>
          <FormattedMessage id="about.2" />
        </p>
        <p>
          <FormattedMessage id="about.3" />
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
