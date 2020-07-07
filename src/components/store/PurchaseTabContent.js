import React from "react"
import styled from "styled-components"

const Wrapper = styled.section`
  width: 100%;
  padding: 30px;
`

export default function TabContent({ children, value, index }) {
  return <Wrapper hidden={value !== index}>{children}</Wrapper>
}
