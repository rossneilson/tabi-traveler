import React from "react"
import loadable from "@loadable/component"
import styled from "styled-components"

import Toggle from "../common/Toggle"
import SelectedFilter from "./SelectedFilter"

const Drawer = loadable(() => import("@material-ui/core/Drawer"))
const Divider = loadable(() => import("@material-ui/core/Divider"))
const FilterMap = loadable(() => import("./FilterMap"))

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

const CloseIcon = styled.section`
  cursor: pointer;
  margin: 10px;
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
        <CloseIcon onClick={() => setOpen(false)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-chevron-left"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="#8698da"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" />
            <polyline points="15 6 9 12 15 18" />
          </svg>
        </CloseIcon>
      </DrawerHeader>

      <Divider style={{ marginBottom: "250px" }} />
      <Divider />

      <SelectedFilter filter={filter} setFilter={setFilter} />

      <FilterMap filter={filter} setFilter={setFilter} />
    </StyledDrawer>
  )
}
