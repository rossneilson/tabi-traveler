import React, { useState } from "react"
import styled from "styled-components"
import { changeLocale } from "gatsby-plugin-intl"

const Wrap = styled.section`
  position: ${props => props.position};
  z-index: 999999999;
  margin: 10px;
  margin-right: 10px;
  right: ${props => (props.right ? 0 : null)};
  @media (pointer: coarse) {
    margin-top: ${props => (props.right ? "0%" : null)};
  }
`

const SubMenu = styled.ul`
  position: absolute;
  list-style: none;
  z-index: 999999999;
  margin-left: -0.5rem;
  @media (pointer: coarse) {
    background-color: #8698da;
    margin-left: 0.1rem;
  }
`

const MenuItem = styled.li`
  cursor: pointer;
  z-index: 999999999;
  padding: 5px;
  @media (pointer: coarse) {
    color: white;
  }
`

const LanguageText = styled.a`
  color: ${props => (props.colour ? props.colour : "#8698da")};
  @media (pointer: coarse) {
    color: white;
  }
`

export default function Toggle({
  position = "fixed",
  right = false,
  colour = "#8698da",
}) {
  const [showLanguages, setShowLanguages] = useState(false)

  return (
    <Wrap
      position={position}
      right={right}
      onClick={() => {
        setShowLanguages(true)
      }}
      onMouseEnter={() => {
        setShowLanguages(true)
      }}
      onMouseLeave={() => {
        setShowLanguages(false)
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-language"
        width="48"
        height="48"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke={colour}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" />
        <path d="M5 7h7m-2 -2v2a5 8 0 0 1 -5 8m1 -4a7 4 0 0 0 6.7 4" />
        <path d="M11 19l4 -9l4 9m-.9 -2h-6.2" />
      </svg>
      {showLanguages && (
        <SubMenu>
          <MenuItem
            colour={colour}
            onClick={() => {
              changeLocale("en")
            }}
          >
            <LanguageText colour={colour}>English</LanguageText>
          </MenuItem>
          <MenuItem
            colour={colour}
            onClick={() => {
              changeLocale("ja")
            }}
          >
            <LanguageText colour={colour}>日本語</LanguageText>
          </MenuItem>
        </SubMenu>
      )}
    </Wrap>
  )
}
