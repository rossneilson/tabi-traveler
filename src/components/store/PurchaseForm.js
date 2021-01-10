import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { useIntl } from "gatsby-plugin-intl"
import countriesJson from "../../utils/countries.json"
import { createCheckout } from "../../utils/purchase"
import Button from "../common/Button"

const Pricing = require("../../utils/pricing")

const TotalSection = styled.section`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-top: 50px;
`
const Total = styled.section`
  width: 70%;
  min-width: 250px;
  flex-grow: 1;
`

const Select = styled.select`
  margin: 10% 0% 0% 10%;
  transform: scale(1.3);
`

const countryOptions = [
  <option id={"empty"} key={"empty"} value={null}></option>,
]
countriesJson.countries.forEach(country => {
  countryOptions.push(
    <option key={country.isoCode} id={country.isoCode} value={country.name}>
      {country.name}
    </option>
  )
})

export default function PurchasePanel({
  frontmatter,
  itemOptions,
  tab,
  selected,
  language,
  fileAbsolutePath,
}) {
  const intl = useIntl()
  const [country, setCountry] = useState()
  const [shipping, setShipping] = useState()

  const getCountryCode = targetCountry => {
    return targetCountry
      ? countriesJson.countries.filter(x => x.name === targetCountry)[0].isoCode
      : null
  }

  useEffect(() => {
    setCountry(null)
  }, [tab])

  useEffect(() => {
    setShipping(
      country
        ? Pricing.calculateShipping(
            getCountryCode(country),
            selected.type,
            selected.size
          )
        : null
    )
  }, [selected])

  const handleBuy = async event => {
    createCheckout(
      getCountryCode(country),
      selected,
      frontmatter,
      fileAbsolutePath,
      language
    )
  }

  return (
    <div>
      {itemOptions}
      <label htmlFor="select country">Country:</label>
      <Select
        name="country"
        id="select country"
        aria-label="select country"
        onChange={event => {
          setCountry(event.target.value)
          setShipping(
            Pricing.calculateShipping(
              getCountryCode(event.target.value),
              selected.type,
              selected.size
            )
          )
        }}
      >
        {countryOptions}
      </Select>
      <TotalSection>
        <Total>
          Price: £{selected.price / 100}
          <br />+ Shipping: £ {shipping / 100}
          <br />
          <h2>
            {country
              ? "Total: £" +
                Pricing.calculateTotal(selected.price / 100, shipping / 100)
              : intl.formatMessage({ id: "store.selectCountry" })}
          </h2>
        </Total>
        <Button
          primaryColour={"#f79a60"}
          secondaryColour={"#5065a3"}
          handleClick={handleBuy}
          value={country}
          loader
          icon={
            <svg
              style={{ paddingTop: "1px" }}
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-shopping-cart"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke={country ? "white" : "#565351a8"}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <circle cx="9" cy="19" r="2" />
              <circle cx="17" cy="19" r="2" />
              <path d="M3 3h2l2 12a3 3 0 0 0 3 2h7a3 3 0 0 0 3 -2l1 -7h-15.2" />
            </svg>
          }
          text={intl.formatMessage({ id: "store.buy" })}
        />
      </TotalSection>
    </div>
  )
}
