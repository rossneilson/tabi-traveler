var fs = require("fs").promises,
  fm = require("front-matter"),
  pricing = require("../src/utils/pricing")
exports.handler = async ({ body }) => {
  const stripe = require("stripe")(
    "sk_test_51H1z1WLdKK5sOT6pVoXab5kEwslAP9xd1qaNLyYn2u9vm7STDMMPCJw6jJnth9vyHd8uT8ektK0jt0ntUVVIOG2s00ynWGNkCs"
  )

  const data = JSON.parse(body)
  console.log(data.image)
  const file = await fs.readFile(data.fileAbsolutePath, "utf8")
  const content = fm(file)

  const product = content.attributes.products.filter(
    product => product.sku === data.product.sku
  )[0]
  const shippingPrice = pricing.calculateShipping(
    data.countryCode,
    data.type,
    data.size
  )
  const total = pricing.calculateTotal(product.price, shippingPrice)

  const session = await stripe.checkout.sessions.create({
    shipping_address_collection: "required",
    payment_method_types: ["card"],
    locale: data.locale,
    shipping_address_collection: {
      allowed_countries: [data.countryCode],
    },
    line_items: [
      {
        price_data: {
          currency: "gbp",
          product_data: {
            name: data.title + " - " + data.product.title,
            images: [
              "https://tabitraveler.com/static/362253496a69079706b035db676ee5bf/a7715/dsc03157.jpg",
            ],
          },
          unit_amount: total,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "https://localhost:8888/prints",
    cancel_url: "https://localhost:8888/prints",
  })
  return {
    statusCode: 200,
    body: JSON.stringify({ sessionId: session.id }),
  }
}
