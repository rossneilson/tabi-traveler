import React from "react"
import styled from "styled-components"

import Toggle from "../Toggle"
import SelectedFilter from "./SelectedFilter"

import Drawer from "@material-ui/core/Drawer"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import Divider from "@material-ui/core/Divider"
import FilterMap from "./FilterMap"

const StyledDrawer = styled(Drawer)`
  & .MuiDrawer-paper {
    width: 30%;
  }
  @media (pointer: coarse) {
    & .MuiDrawer-paper {
      width: 50%;
    }
  }
`

const DrawerHeader = styled.section`
  display: flex;
  justify-content: space-between;
`

const CloseIcon = styled(ChevronLeftIcon)`
  cursor: pointer;
  margin: 5px;
  color: #8698da;
`

export default function FilterDrawer({
  open,
  setOpen,
  language,
  filter,
  setFilter,
}) {
  return (
    <StyledDrawer open={open} anchor="left" variant="persistent">
      <DrawerHeader>
        <Toggle position="relative" language={language} />
        <CloseIcon fontSize="large" onClick={() => setOpen(false)} />
      </DrawerHeader>

      <Divider style={{ marginBottom: "250px" }} />
      <Divider />

      <SelectedFilter filter={filter} setFilter={setFilter} />

      <FilterMap filter={filter} setFilter={setFilter} />
    </StyledDrawer>
  )
}
