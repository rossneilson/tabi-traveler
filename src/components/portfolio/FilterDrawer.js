import React from "react"
import loadable from "@loadable/component"
import styled from "styled-components"

import Toggle from "../common/Toggle"
import SelectedFilter from "./SelectedFilter"

const FilterMap = loadable(() => import("./FilterMap"))

const Wrapper = styled.section`
  width: ${props => (props.open ? "30%" : "0%")};
  transition: 1s;
  position: fixed;

  @media (pointer: coarse) {
    width: ${props => (props.open ? "50%" : "0%")};
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
const Divider = styled.section`
  width: 100vh;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
`

export default function FilterDrawer({
  open,
  setOpen,
  language,
  filter,
  setFilter,
}) {
  return (
    <Wrapper open={open}>
      {open ? (
        <div>
          <DrawerHeader>
            <Toggle position="relative" language={language} />
            <CloseIcon onClick={() => setOpen(false)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-chevron-left"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#8698da"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
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
        </div>
      ) : (
        <div />
      )}
    </Wrapper>
  )
}
