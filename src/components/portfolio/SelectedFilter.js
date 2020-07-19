import React from "react"
import styled from "styled-components"
import loadable from "@loadable/component"
import ScotlandFlag from "../../img/gb-sct.svg"
import JapanFlag from "../../img/jp.svg"

const Button = loadable(() => import("@material-ui/core/Button"))

const Flags = {
  GBR: ScotlandFlag,
  JPN: JapanFlag,
}

const FlexContainer = styled.section`
  display: flex;
  justify-content: space-between;
`

const Image = styled.img`
  width: 80px;
  border-style: solid;
  border-width: thin;
`

const FavouriteIcon = styled.svg`
  margin: auto;
`

const ResetButton = styled(Button)`
  background-color: #f79a60;
  color: white;
  display: ${props => (props.filter === "best" ? "none" : "flex")};
  margin: 4px;
  align-self: flex-start;
  &:hover {
    background-color: #5065a3;
  }
  &:focus {
    background-color: #5065a3;
  }
`

export default function SelectedFilter({ filter, setFilter }) {
  var FilteredFlags

  if (filter === "best") {
    FilteredFlags = (
      <FlexContainer>
        <FavouriteIcon
          xmlns="http://www.w3.org/2000/svg"
          class="icon icon-tabler icon-tabler-star"
          width="40"
          height="40"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="#f79a60"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
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
