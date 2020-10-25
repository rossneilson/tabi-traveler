import React, { useState } from "react"
import styled from "styled-components"

import PurchaseTabContent from "./PurchaseTabContent"
import PurchaseForm from "./PurchaseForm"
import Tabs from "../common/Tabs"

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
        current={tab}
        onChange={event => {
          setTab(event)
          if (event === 1) {
            setSelected(framedProducts[0].title)
          } else {
            setSelected(printProducts[0].title)
          }
        }}
        options={["Print", "Framed"]}
        scrollable={false}
      />
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
