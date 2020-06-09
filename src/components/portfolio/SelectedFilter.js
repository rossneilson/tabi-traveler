import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { FormattedMessage } from "gatsby-plugin-intl"
import StarIcon from "@material-ui/icons/Star"
import Button from "@material-ui/core/Button"

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

  if (filter === "GBR") {
    FilteredFlags = (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <ResetButton filter={filter} onClick={() => setFilter("best")}>
          {" "}
          Reset{" "}
        </ResetButton>
        <div style={{ marginRight: "20px" }}>{filter + "(Scotland)"}</div>
      </div>
    )
  } else {
    FilteredFlags = (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <ResetButton filter={filter} onClick={() => setFilter("best")}>
          {" "}
          Reset{" "}
        </ResetButton>
        {filter}
      </div>
    )
  }

  return FilteredFlags
}
