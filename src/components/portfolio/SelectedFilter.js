import React from "react"
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
  display: flex;
  justify-content: space-between;
`

const Image = styled.img`
  width: 80px;
  height: 50px;
`

const FavouriteIcon = styled.svg`
  margin: auto;
`

const ResetButton = styled.button`
  transition: 0.2s;
  background-color: ${props => props.theme.colors.secondary};
  display: ${props => (props.filter === "best" ? "none" : "flex")};
  align-self: flex-start;
  color: white;
  height: 40px;
  justify-content: space-around;
  font-size: ${props => props.theme.fontSizes.m};
  font-weight: 500;
  min-width: 15%;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  margin: 4px;
  &:hover {
    background-color: ${props => props.theme.colors.primary};
  }
  &:focus {
    background-color: ${props => props.theme.colors.primary};
  }
`

export default function SelectedFilter({ filter, setFilter }) {
  var FilteredFlags

  if (filter === "best") {
    FilteredFlags = (
      <FlexContainer>
        <FavouriteIcon
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-star"
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
        </FavouriteIcon>
      </FlexContainer>
    )
  } else {
    FilteredFlags = (
      <FlexContainer>
        <ResetButton filter={filter} onClick={() => setFilter("best")}>
          Reset
        </ResetButton>
        <Image src={Flags[filter]} />
      </FlexContainer>
    )
  }

  return FilteredFlags
}
