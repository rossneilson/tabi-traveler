import React, { useState } from "react"
import styled from "styled-components"
import loadable from "@loadable/component"
import { FormattedMessage } from "react-intl"

import PurchaseTabContent from "./PurchaseTabContent"
import PurchaseForm from "./PurchaseForm"

const Tabs = loadable(() => import("@material-ui/core/Tabs"))
const Tab = loadable(() => import("@material-ui/core/Tab"))

const SelectionSection = styled.section`
  min-width: 50%;
  background: white;
  border-radius: 10px;
  box-shadow: 0px 0px 9px 1px #0000001c;
`
const Radio = styled.label`
  display: block;
  margin-bottom: 10px;
  cursor: pointer;
  font-size: 22px;
`

const Input = styled.input`
  transform: scale(1.5);
  margin-right: 10px;
`

export default function PurchasePanel({
  frontmatter,
  language,
  fileAbsolutePath,
}) {
  const [tab, setTab] = useState(0)
  const [selected, setSelected] = useState(frontmatter.products[0].title)

  const handleSelection = event => {
    setSelected(event.target.value)
  }

  const printOptions = []
  const frameOptions = []

  const printProducts = frontmatter.products
    .filter(product => product.type === "print")
    .map((value, index) => {
      printOptions.push(
        <Radio key={index}>
          <Input
            id={"print" + index}
            type="radio"
            name={value.title}
            value={value.title}
            checked={selected === value.title}
            onChange={() => setSelected(value.title)}
          />
          <label htmlFor={"print" + index}>{value.title}</label>
        </Radio>
      )
      return value
    })
  const framedProducts = frontmatter.products
    .filter(product => product.type === "frame")
    .map((value, index) => {
      frameOptions.push(
        <Radio key={index}>
          <Input
            id={"frame" + index}
            type="radio"
            name="frameOption"
            value={value.title}
            checked={selected === value.title}
            onChange={() => setSelected(value.title)}
          />
          <label htmlFor={"frame" + index}>{value.title}</label>
        </Radio>
      )
      return value
    })

  return (
    <SelectionSection>
      <Tabs
        value={tab}
        onChange={(event, newValue) => {
          setTab(newValue)
          if (newValue === 1) {
            setSelected(framedProducts[0].title)
          } else {
            setSelected(printProducts[0].title)
          }
        }}
        indicatorColor="primary"
        textColor="primary"
        centered
        aria-label="Print only or framed tabs"
      >
        <Tab label={"Print"} />
        <Tab label={"Framed"} />
      </Tabs>
      <PurchaseTabContent value={tab} index={0}>
        <PurchaseForm
          frontmatter={frontmatter}
          itemOptions={printOptions}
          tab={tab}
          language={language}
          fileAbsolutePath={fileAbsolutePath}
          selected={
            frontmatter.products.filter(
              product => product.title === selected
            )[0]
          }
        />
      </PurchaseTabContent>
      <PurchaseTabContent value={tab} index={1}>
        <PurchaseForm
          frontmatter={frontmatter}
          itemOptions={frameOptions}
          setSelected={handleSelection}
          language={language}
          fileAbsolutePath={fileAbsolutePath}
          selected={
            frontmatter.products.filter(
              product => product.title === selected
            )[0]
          }
        />
      </PurchaseTabContent>
    </SelectionSection>
  )
}
