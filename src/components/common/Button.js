import React, { useState } from "react"
import styled from "styled-components"
import loadable from "@loadable/component"

const CircularProgress = loadable(() =>
  import("@material-ui/core/CircularProgress")
)

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
  
  &:focus {
    background-color: ${props =>
      props.disabled ? props.primaryColour : props.secondaryColour};
  }
`

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
        {clicked && loader ? <CircularProgress color="secondary" /> : icon}
      </div>
    </StyledButton>
  )
}
