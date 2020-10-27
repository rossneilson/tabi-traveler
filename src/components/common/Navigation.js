import React from "react"
import styled from "styled-components"
import { Link, FormattedMessage } from "gatsby-plugin-intl"

import { urlLocaleFormatting } from "../../utils/formatters"

const BarHorizontal = styled.section`
  display: flex;
  align-items: center;
  width: 100%;
  flex-flow: wrap;
  justify-content: center;
  margin-top: 15px;
  position: relative;
  z-index: 9999;
  @media (pointer: coarse) {
    margin-bottom: 15px;
  }
`
const BarVertical = styled.section`
  display: flex;
  align-items: center;
  width: 30%;
  flex-flow: column;
  justify-content: none;
  margin-top: 100px;
  position: fixed;
  z-index: 9999;
  @media (pointer: coarse) {
    width: 50%;
  }
`

const Home = styled(Link)`
  padding: 1% 3% 3% 3%;
  font-size: 200%;
  color: ${props => (props.colour ? props.colour : "#506acc")};
  background-image: none;
  text-align: center;
  text-shadow: none;
  transition: 1s;
  &:hover {
    color: #98aae0;
  }
  &:focus {
    color: #98aae0;
  }
`

const PageButton = styled(Link)`
  padding: 1% 3% 3% 3%;
  color: ${props => (props.colour ? props.colour : "#506acc")};
  font-size: 120%;
  transition: 1s;
  background-image: none;
  text-shadow: none;
  &:hover {
    color: #98aae0;
  }
  &:focus {
    color: #98aae0;
  }
`
export default function Navigation({
  link1,
  link2,
  colour,
  vertical,
  language,
}) {
  return (
    <div>
      {!vertical ? (
        <BarHorizontal>
          <PageButton
            colour={colour}
            to={urlLocaleFormatting(language, "/" + link1)}
          >
            <FormattedMessage id={"main." + link1} />
          </PageButton>
          <Home colour={colour} to={urlLocaleFormatting(language, "/")}>
            <FormattedMessage id="main.title" />
          </Home>
          <PageButton
            colour={colour}
            to={urlLocaleFormatting(language, "/" + link2)}
          >
            <FormattedMessage id={"main." + link2} />
          </PageButton>
        </BarHorizontal>
      ) : (
        <BarVertical>
          <PageButton to={urlLocaleFormatting(language, "/" + link1)}>
            <FormattedMessage id={"main." + link1} />
          </PageButton>
          <Home to={urlLocaleFormatting(language, "/")}>
            <FormattedMessage id="main.title" />
          </Home>
          <PageButton to={urlLocaleFormatting(language, "/" + link2)}>
            <FormattedMessage id={"main." + link2} />
          </PageButton>
        </BarVertical>
      )}
    </div>
  )
}
