import React from "react"
import styled from "styled-components"

import PostCard from "../blog/PostCard"

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

export default function Blog({ posts }) {
  const postCards = []
  posts.map((value, index) => {
    postCards.push(<PostCard key={index} post={value} isFullPage={false} />)
  })

  return (
    <div>
      <Heading>Latest articles</Heading>
      <FlexWrap>{postCards}</FlexWrap>
    </div>
  )
}
