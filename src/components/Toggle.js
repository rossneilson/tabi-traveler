import React, { useState } from "react"
import styled from "styled-components"
import Switch from "react-switch"
import { changeLocale } from "gatsby-plugin-intl"

const ToggleWrap = styled.section`
  position: ${props => props.position};
  z-index: 9998;
  margin: 15px;
`

const Icon = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 10px;
  color: white;
  padding-right: 2;
`

export default function Toggle({ language, position = "fixed" }) {
  const checkLanguage = () => {
    if (language === "jp") {
      return true
    } else if (language === "en") {
      return false
    }
  }

  const [checked, setChecked] = useState(checkLanguage())

  const changeLanguage = async e => {
    setChecked(!checked)
    await new Promise(r => setTimeout(r, 1))
    if (checked) {
      changeLocale("en")
    } else {
      changeLocale("jp")
    }
  }
  return (
    <ToggleWrap position={position}>
      <label>
        <Switch
          checked={checked}
          onChange={changeLanguage}
          height={30}
          width={80}
          offColor="#8698da"
          onColor="#8698da"
          aria-label="language switch"
          role="button"
          id="language switch"
          aria-pressed={checked}
          uncheckedIcon={<Icon>English</Icon>}
          checkedIcon={<Icon>日本語</Icon>}
        />
      </label>
    </ToggleWrap>
  )
}
