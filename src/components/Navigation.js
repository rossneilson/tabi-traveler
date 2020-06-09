import React from "react"
import styled from "styled-components"
import { FormattedMessage } from "gatsby-plugin-intl"
import { Link } from "gatsby"

const BarHorizontal = styled.section`
  display: flex;
  align-items: center;
  width: 100%;
  flex-flow: wrap;
  justify-content: center;
  margin-top: none;
  position: relative;
  z-index: 9999;
`
const BarVertical = styled.section`
  display: flex;
  align-items: center;
  width: ${props => props.verticalWidth + "%"};
  flex-flow: column;
  justify-content: none;
  margin-top: 100px;
  position: fixed;
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
    <div>
      {!vertical ? (
        <BarHorizontal>
          <PageButton to={"/" + link1}>
            <FormattedMessage id={"main." + link1} />
          </PageButton>
          <Home to="/">
            <FormattedMessage id="main.title" />
          </Home>
          <PageButton to={"/" + link2}>
            <FormattedMessage id={"main." + link2} />
          </PageButton>
        </BarHorizontal>
      ) : (
        <BarVertical verticalWidth={verticalWidth}>
          <PageButton to={"/" + link1}>
            <FormattedMessage id={"main." + link1} />
          </PageButton>
          <Home to="/">
            <FormattedMessage id="main.title" />
          </Home>
          <PageButton to={"/" + link2}>
            <FormattedMessage id={"main." + link2} />
          </PageButton>
        </BarVertical>
      )}
    </div>
  )
}
