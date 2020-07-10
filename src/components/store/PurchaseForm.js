import React, { useState, useEffect } from "react"
import styled from "styled-components"
import loadable from "@loadable/component"
import { FormattedMessage } from "react-intl"
import { loadStripe } from "@stripe/stripe-js"
import countriesJson from "../../utils/countries.json"
// import Pricing from "../../utils/pricing"

import { Select } from "grommet"
import { Shop } from "grommet-icons"
const Button = loadable(() => import("@material-ui/core/Button"))
const Pricing = require("../../utils/pricing")
console.log(process.env)
console.log(process.env.STRIPE_TEST_PUBLISH_KEY)
const TotalSection = styled.section`
  display: flex;
  justify-content: space-around;
  margin-top: 50px;
`
const OptionsForm = styled.section`
  display: flex;
  justify-content: space-around;
`

const BuyButton = styled(Button)`
  background-color: #f79a60;
  color: white;
  height: 80px;
  display: flex;
  justify-content: space-around;
  &:hover {
    background-color: #5065a3;
  }
  &:focus {
    background-color: #5065a3;
  }
  width: 30%;
`
const countries = []
countriesJson.countries.forEach(country => {
  countries.push(country.name)
})

export default function PurchasePanel({
  frontmatter,
  itemOptions,
  tab,
  selected,
  language,
  fileAbsolutePath,
}) {
  const [countryOptions, setCountryOptions] = useState(countries)
  const [country, setCountry] = useState()
  const [shipping, setShipping] = useState()

  const getCountryCode = targetCountry => {
    return countriesJson.countries.filter(x => x.name === targetCountry)[0]
      .isoCode
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
  console.log(frontmatter)
  const handleBuy = async event => {
    console.log("buying")
    const response = await fetch("/.netlify/functions/purchase", {
      body: JSON.stringify({
        countryCode: getCountryCode(country),
        type: selected.type,
        size: selected.size,
        title: frontmatter.title,
        product: selected,
        locale: language === "jp" ? "ja" : "auto",
        fileAbsolutePath: fileAbsolutePath,
        image:
          "http://localhost:8888" +
          frontmatter.fullImage.childImageSharp.fluid.originalImg,
      }),
      method: "POST",
    })

    const stripe = await loadStripe(
      "pk_test_51H1z1WLdKK5sOT6pjvjbdqVZVE8gQLdXmZzTwBvhpPCUucRWjejKw6cEmiq5Scw9oenQVGiVVoRGnsmr1B9OAQ6c007lhc3Miz"
    )
    const jsonResp = await response.json()
    stripe.redirectToCheckout({ sessionId: jsonResp.sessionId })
  }

  return (
    <div>
      <div>
        {itemOptions}
        <Select
          value={country}
          onSearch={searchText => {
            const regexp = new RegExp(searchText, "i")
            setCountryOptions(countryOptions.filter(o => o.match(regexp)))
          }}
          onChange={event => {
            setCountryOptions(countries)
            setCountry(event.value)
            setShipping(
              Pricing.calculateShipping(
                getCountryCode(event.value),
                selected.type,
                selected.size
              )
            )
          }}
          options={countryOptions}
        />
      </div>
      <TotalSection>
        <div>
          Price: £{selected.price / 100}
          <br />+ Shipping: £ {shipping / 100}
          <br />
          + VAT(20%)
          <br />
          <h2>
            {country
              ? "Total: £" +
                Pricing.calculateTotal(selected.price / 100, shipping / 100)
              : "Please select a country"}
          </h2>
        </div>

        <BuyButton disabled={!country} onClick={handleBuy}>
          Buy now
          <Shop color={country ? "white" : null} />
        </BuyButton>
      </TotalSection>
    </div>
  )
}
