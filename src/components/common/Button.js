import React, { useState } from "react"
import styled from "styled-components"

import Anime, { anime } from "react-anime"

const StyledButton = styled.button`
  background-color: ${props => props.primaryColour};
  letter-spacing: 2.5px;
  color: ${props => (props.disabled ? "null" : "white")};
  height: 60px;
  justify-content: space-around;
  font-size: large;
  font-weight: 500;
  width: 30%;
  flex-grow: 1;
  border: none;
  display: inline-block;
  cursor: ${props => (props.disabled ? "null" : "pointer")};
  border-radius: 5px;
  &:hover {
    background-color: ${props =>
      props.disabled ? props.primaryColour : props.secondaryColour};
  }
  &:focus {
    background-color: ${props =>
      props.disabled ? props.primaryColour : props.secondaryColour};
  }
`

const StyledBox = styled.section`
  position: relative;
  width: 6px;
  height: 6px;
  margin: 1px;
  display: inline-block;
  background-color: white;
`

const animeProperties = {
  translateY: [
    { value: 20, duration: 500 },
    { value: 0, duration: 800 },
  ],
  rotate: {
    value: "1turn",
  },
  borderRadius: 50,
  direction: "alternate",
  easing: "easeInOutQuad",
  delay: () => {
    return anime.random(0, 1000)
  },
  loop: true,
  elasticity: 200,
}

export default function Button({
  handleClick,
  value,
  loader,
  icon,
  text,
  primaryColour,
  secondaryColour,
}) {
  const [clicked, setClicked] = useState(false)

  return (
    <StyledButton
      disabled={!value}
      onClick={() => {
        setClicked(true)
        handleClick()
      }}
      primaryColour={primaryColour}
      secondaryColour={secondaryColour}
    >
      <div style={{ display: "flex", justifyContent: "center" }}>
        {text}
        {clicked && loader ? (
          <Anime {...animeProperties}>
            <StyledBox />
            <StyledBox />
            <StyledBox />
            <StyledBox />
          </Anime>
        ) : (
          icon
        )}
      </div>
    </StyledButton>
  )
}
