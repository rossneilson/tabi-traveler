import React from "react"
import { FormattedMessage } from "gatsby-plugin-intl"
import styled from "styled-components"

import ScotlandFlag from "../../img/gb-sct.svg"
import JapanFlag from "../../img/jp.svg"
import ItalyFlag from "../../img/it.svg"

const Flags = {
  GBR: ScotlandFlag,
  JPN: JapanFlag,
  ITA: ItalyFlag,
}

const FlexContainer = styled.section`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 25px;
`

const FilterTitle = styled.section`
  width: 65%;
  color: ${props => props.theme.colors.primary};
  font-size: ${props => props.theme.fontSizes.l};
  margin: auto;
`

const SelectedTitle = styled(FilterTitle)`
  font-size: ${props => props.theme.fontSizes.s};
`

const Image = styled.img`
  height: 50px;
  box-shadow: 0px 0px 0px 1px #0000003c;
  margin: 5px auto;
`

const Favourite = styled.section`
  width: 35%;
  display: flex;
  justify-content: space-around;
`

const ResetButton = styled.button`
  transition: 0.2s;
  background-color: ${props => props.theme.colors.secondary};
  display: ${props => (props.filter === "best" ? "" : "")};
  color: white;
  font-size: ${props => props.theme.fontSizes.s};
  width: 35%;
  border: none;
  cursor: pointer;
  margin: 5px auto;
  border-radius: 5px;
  &:disabled {
    background-color: ${props => props.theme.colors.grayBackground};
    cursor: auto;
  }
  &:hover {
    background-color: ${props =>
      props.disabled
        ? props.theme.colors.grayBackground
        : props.theme.colors.primary};
  }
  &:focus {
    background-color: ${props =>
      props.disabled
        ? props.theme.colors.grayBackground
        : props.theme.colors.primary};
  }
`

export default function SelectedFilter({ filter, setFilter }) {
  return (
    <FlexContainer>
      <FilterTitle>
        <FormattedMessage id="portfolio.filter" />
      </FilterTitle>

      <ResetButton
        filter={filter}
        onClick={() => {
          setFilter("best")
        }}
        disabled={filter === "best" ? "true" : null}
      >
        <FormattedMessage id="portfolio.reset" />
      </ResetButton>
      <SelectedTitle>
        <FormattedMessage id="portfolio.selected" />
      </SelectedTitle>
      {filter === "best" ? (
        <Favourite>
          <svg
            style={{ margin: "5px 0px 0px 0px" }}
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="#f79a60"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" />
            <path d="M12 17.75l-6.172 3.245 1.179-6.873-4.993-4.867 6.9-1.002L12 2l3.086 6.253 6.9 1.002-4.993 4.867 1.179 6.873z" />
          </svg>
        </Favourite>
      ) : (
        <div style={{ width: "35%", display: "flex" }}>
          <Image src={Flags[filter]} />
        </div>
      )}
    </FlexContainer>
  )
}
