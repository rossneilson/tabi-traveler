import React from "react"
import styled from "styled-components"

import PrintCard from "./PrintCard"

const GridWrap = styled.section`
  margin: auto;
  margin-top: 50px;
  margin-bottom: 100px;
  width: 80%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-auto-rows: 350px;
  column-gap: 5%;
  row-gap: 50px;
  transition: all 1s;
  grid-auto-flow: dense;
`

export default function Grid({ prints }) {
  const printCards = []

  prints.map((value, index) => {
    printCards.push(<PrintCard index={index} print={value} isFullPage />)
  })

  return (
    <GridWrap>
      {/* Description / intro to shop international etc */}
      {printCards}
    </GridWrap>
  )
}
