var json = require("./countries.json")

var calculateShipping = function (countryCode, productType, size) {
  if (productType === "print") {
    return 1000
  } else {
    const country = json.countries.filter(x => x.isoCode === countryCode)[0]
    if (size === "s") {
      return country.sFrame * 1.2
    } else if (size === "l") {
      return country.lFrame * 1.2
    }
  }
}
var calculateTotal = function (base, shipping) {
  return base + shipping
}

module.exports = { calculateShipping, calculateTotal }
