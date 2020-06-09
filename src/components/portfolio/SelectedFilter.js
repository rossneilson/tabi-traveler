import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { FormattedMessage } from "gatsby-plugin-intl"
import Flag from "react-world-flags"
import StarIcon from "@material-ui/icons/Star"
import Button from "@material-ui/core/Button"

const FavouriteIcon = styled(StarIcon)`
  color: #ffb833cf;
  margin: auto;
`

const FlagIcon = styled(Flag)`
  margin-top: 15px;
  border-style: solid;
  border-width: 1px;
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
        <div style={{ marginRight: "20px" }}>
          <FlagIcon code={filter} width="30" />
          <FlagIcon code={"GB_SCT"} width="30" />
        </div>
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
        <FlagIcon
          style={{ marginRight: "20px" }}
          code={filter}
          width="30"
          fallback={<FavouriteIcon fontSize="large" />}
        />
      </div>
    )
  }

  return FilteredFlags
}
