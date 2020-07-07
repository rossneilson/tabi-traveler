import React, { useState } from "react"
import styled from "styled-components"
import loadable from "@loadable/component"
import { FormattedMessage } from "react-intl"
import { loadStripe } from "@stripe/stripe-js"

import PurchaseTabContent from "./PurchaseTabContent"

const Button = loadable(() => import("@material-ui/core/Button"))
const Tabs = loadable(() => import("@material-ui/core/Tabs"))
const Tab = loadable(() => import("@material-ui/core/Tab"))
const Radio = loadable(() => import("@material-ui/core/Radio"))
const RadioGroup = loadable(() => import("@material-ui/core/RadioGroup"))
const FormControlLabel = loadable(() =>
  import("@material-ui/core/FormControlLabel")
)
const FormControl = loadable(() => import("@material-ui/core/FormControl"))

const SelectionSection = styled.section`
  width: 50%;
  border-radius: 10px;
  box-shadow: 0px 0px 9px 1px #0000001c;
`
const TotalSection = styled.section`
  display: flex;
  justify-content: space-around;
  margin-top: 50px;
`
const BuyButton = styled(Button)`
  background-color: #f79a60;
  color: white;
  &:hover {
    background-color: #5065a3;
  }
  &:focus {
    background-color: #5065a3;
  }
  width: 25%;
`

export default function PurchasePanel({ frontmatter }) {
  const [tab, setTab] = useState(0)
  const [selected, setSelected] = useState("type1")
  console.log(frontmatter)

  const handleSelection = event => {
    setSelected(event.target.value)
  }

  const handleBuy = async event => {
    console.log("buying")
    const response = await fetch("/.netlify/functions/purchase", {
      body: JSON.stringify({ test: true }),
      method: "POST",
    })

    const stripe = await loadStripe(
      "pk_test_51H1z1WLdKK5sOT6pjvjbdqVZVE8gQLdXmZzTwBvhpPCUucRWjejKw6cEmiq5Scw9oenQVGiVVoRGnsmr1B9OAQ6c007lhc3Miz"
    )
    const jsonResp = await response.json()
    stripe.redirectToCheckout({ sessionId: jsonResp.sessionId })
  }

  return (
    <SelectionSection>
      <Tabs
        value={tab}
        onChange={(event, newValue) => {
          setTab(newValue)
        }}
        indicatorColor="primary"
        textColor="primary"
        centered
        aria-label="Print only or framed tabs"
      >
        <Tab label={"Print"} />
        <Tab label={"Framed"} />
      </Tabs>
      {/* TODO: make programatic and get prices and skus from md */}
      <PurchaseTabContent value={tab} index={0}>
        <FormControl component="options">
          <RadioGroup
            aria-label="types of prints"
            name="printType"
            value={selected}
            onChange={handleSelection}
          >
            <FormControlLabel
              value={"type1"}
              control={<Radio color="primary" />}
              label="Print type 1"
            />
            <FormControlLabel
              value={"type2"}
              control={<Radio color="primary" />}
              label="Print type 2"
            />
          </RadioGroup>
        </FormControl>
        <TotalSection>
          <h1>Price: £{frontmatter.printPrice}</h1>
          <BuyButton onClick={handleBuy}>Buy now</BuyButton>
        </TotalSection>
      </PurchaseTabContent>
      <PurchaseTabContent value={tab} index={1}>
        <FormControl component="options">
          <RadioGroup
            aria-label="types of frames"
            name="frameType"
            value={selected}
            onChange={handleSelection}
          >
            <FormControlLabel
              value={"frame1"}
              control={<Radio color="primary" />}
              label="Frame type 1"
            />
            <FormControlLabel
              value={"frame2"}
              control={<Radio color="primary" />}
              label="Frame type 2"
            />
          </RadioGroup>
        </FormControl>
        <h1>Price: £{frontmatter.framedPrice}</h1>
      </PurchaseTabContent>
    </SelectionSection>
  )
}
