import React from "react"
import styled from "styled-components"
import ScotlandFlag from "../../img/gb-sct.svg"
import JapanFlag from "../../img/jp.svg"

import StarIcon from "@material-ui/icons/Star"
import Button from "@material-ui/core/Button"

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

const FavouriteIcon = styled(StarIcon)`
  color: #ffb833cf;
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
        <FavouriteIcon />
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
