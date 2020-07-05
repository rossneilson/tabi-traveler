import React from "react"
import styled from "styled-components"

import PostCard from "../blog/PostCard"

const GridWrap = styled.section`
  background: #5e6165;
  z-index: 99999;
  margin: auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-auto-rows: 350px;
  column-gap: 5%;
  row-gap: 5%;
  transition: all 1s;
  grid-auto-flow: dense;
  padding: 50px;
`

export default function Blog({ posts }) {
  const postCards = []
  posts.map((value, index) => {
    postCards.push(<PostCard key={index} post={value} isFullPage={false} />)
  })

  return <GridWrap>{postCards}</GridWrap>
}
