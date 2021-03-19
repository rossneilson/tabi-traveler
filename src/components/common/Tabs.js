import React from "react"
import styled from "styled-components"

const Wrapper = styled.section`
  display: flex;
  margin: auto;
  width: 80%;
  justify-content: center;
  overflow: auto;
  white-space: nowrap;
  @media (pointer: coarse) {
    display: ${props => (props.scrollable ? "block" : "flex")};
  }
`

const SingularTab = styled.button`
  transition: 0.2s;
  background-color: white;
  color: ${props => (props.active ? props.theme.colors.primary : "#0000008a")};
  display: flex;
  justify-content: space-around;
  font-size: ${props => props.theme.fontSizes.r};
  font-weight: 500;
  border: none;
  cursor: pointer;
  margin: 5px 0px;
  border-bottom: ${props => (props.active ? "1px solid #516bcc" : "none")};
  transition: 1s;
  padding: 10px 40px;
  @media (pointer: coarse) {
    display: ${props => (props.scrollable ? "block" : "flex")};
    padding: 10px 15px;
  }
`

export default function Tabs({
  options,
  onChange,
  current,
  scrollable = true,
}) {
  const ArrayOfTabs = []

  options.forEach((option, index) => {
    ArrayOfTabs.push(
      <Tab
        onClick={() => onChange(index)}
        value={option}
        index={index}
        current={current}
      />
    )
  })

  return <Wrapper scrollable={scrollable}>{ArrayOfTabs}</Wrapper>
}

function Tab({ value, index, current, onClick }) {
  return (
    <SingularTab onClick={onClick} active={index == current}>
      {value}
    </SingularTab>
  )
}
