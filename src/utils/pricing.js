var json = require("./countries.json")

var calculateShipping = function (countryCode, productType, size) {
  if (productType === "print") {
    return 1000
  } else {
    const country = json.countries.filter(x => x.isoCode === countryCode)[0]
    console.log(country)
    if (size === "s") {
      return country.sFrame
    } else if (size === "l") {
      return country.lFrame
    }
  }
}
var calculateTotal = function (base, shipping) {
  console.log(base)
  console.log(shipping)
  return (base + shipping) * 1.2
}

module.exports = { calculateShipping, calculateTotal }
