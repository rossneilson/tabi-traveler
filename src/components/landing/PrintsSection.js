import React from "react"
import styled from "styled-components"
import { Link } from "gatsby-plugin-intl"

import PrintCard from "../store/PrintCard"
import { urlLocaleFormatting } from "../../utils/formatters"

const FlexWrap = styled.section`
  z-index: 99999;
  margin: auto;
  margin-bottom: 50px;
  display: flex;
  justify-content: space-evenly;
  height: 400px;
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

export default function Blog({ prints, language }) {
  const printCards = []
  prints.map((value, index) => {
    printCards.push(<PrintCard key={index} print={value} isfullpage={false} />)
  })

  return (
    <div
      style={{
        marginTop: "5%",
      }}
    >
      <Link
        to={urlLocaleFormatting(language, "/prints")}
        onClick={() => {
          window.scrollTo(0, 0)
        }}
      >
        <Heading>
          <svg
            style={{ transform: "translateY(6px)" }}
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-building-store"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="#6f81b3"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" />
            <line x1="3" y1="21" x2="21" y2="21" />
            <path d="M3 7v1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1h-18l2 -4h14l2 4" />
            <path d="M5 21v-10.15" />
            <path d="M19 21v-10.15" />
            <path d="M9 21v-4a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v4" />
          </svg>
          Featured Prints
        </Heading>
      </Link>
      <FlexWrap>{printCards}</FlexWrap>
    </div>
  )
}
