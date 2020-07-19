import React from "react"
import styled from "styled-components"

import PrintCard from "../store/PrintCard"

const FlexWrap = styled.section`
  z-index: 99999;
  margin: auto;
  margin-bottom: 50px;
  display: flex;
  justify-content: space-evenly;
  height: 350px;
  width: 100%;
  padding: 10px;
  @media (pointer: coarse) {
    flex-direction: column;
    height: auto;
  }
`

const Heading = styled.h1`
  color: #6f81b3;
  margin-left: 4%;
`

export default function Blog({ prints }) {
  const printCards = []
  prints.map((value, index) => {
    printCards.push(<PrintCard key={index} print={value} isFullPage={false} />)
  })

  return (
    <dev>
      <Heading>Featured Prints</Heading>
      <FlexWrap>{printCards}</FlexWrap>
    </dev>
  )
}
