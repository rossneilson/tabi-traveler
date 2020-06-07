import React from "react"
import styled from "styled-components"
import { FormattedMessage } from "gatsby-plugin-intl"
import { Link } from "gatsby"

const Bar = styled.section`
  display: flex;
  align-items: center;
  width: ${props => (props.vertical ? props.verticalWidth + "%" : "100%")};
  flex-flow: ${props => (props.vertical ? "column" : "wrap")};
  justify-content: ${props => (props.vertical ? "none" : "center")};
  margin-top: ${props => (props.vertical ? "100px" : "none")};
  position: ${props => (props.vertical ? "fixed" : "relative")};
  z-index: 9999;
`
const Home = styled(Link)`
  padding: 1% 3% 3% 3%;
  font-size: 200%;
  color: #8698da;
  background-image: none;
  text-align: center;
  text-shadow: none;
  transition: 1s;
  &:hover {
    color: #5065a3;
  }
  &:focus {
    color: #5065a3;
  }
`

const PageButton = styled(Link)`
  padding: 1% 3% 3% 3%;
  color: #acb8e4;
  font-size: 120%;
  transition: 1s;
  background-image: none;
  text-shadow: none;
  &:hover {
    color: #5065a3;
  }
  &:focus {
    color: #5065a3;
  }
`

export default function Navigation({ link1, link2, vertical, verticalWidth }) {
  return (
    <Bar vertical={vertical} verticalWidth={verticalWidth}>
      <PageButton to={"/" + link1}>
        <FormattedMessage id={"main." + link1} />
      </PageButton>
      <Home to="/">
        <FormattedMessage id="main.title" />
      </Home>
      <PageButton to={"/" + link2}>
        <FormattedMessage id={"main." + link2} />
      </PageButton>
    </Bar>
  )
}
