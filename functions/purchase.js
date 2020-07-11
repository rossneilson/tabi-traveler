var fs = require("fs").promises,
  fm = require("front-matter"),
  pricing = require("../src/utils/pricing"),
  fetch = require("node-fetch"),
  path = require("path")
exports.handler = async ({ body }) => {
  const data = JSON.parse(body)

  const order = await fetch("https://sandbox.pwinty.com/v3.0/orders", {
    method: "post",
    headers: {
      "X-Pwinty-MerchantId": process.env.PWINTY_MERCHANT_ID,
      "X-Pwinty-REST-API-Key": process.env.PWINTY_TEST_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      countryCode: data.countryCode,
      preferredShippingMethod: "Standard",
    }),
  }).then(res => res.json())

  const updatedOrder = await fetch(
    `https://sandbox.pwinty.com/v3.0/orders/${order.data.id}/images`,
    {
      method: "post",
      headers: {
        "X-Pwinty-MerchantId": process.env.PWINTY_MERCHANT_ID,
        "X-Pwinty-REST-API-Key": process.env.PWINTY_TEST_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // sku: data.product.sku,
        // url: data.image,
        sku: "GLOBAL-PHO-16X16-PRO",
        url:
          "https://tabitraveler.com/static/362253496a69079706b035db676ee5bf/a7715/dsc03157.jpg",
        copies: 1,
        sizing: "Crop",
      }),
    }
  ).then(res => res.json())

  const stripe = require("stripe")(process.env.STRIPE_TEST_SECRET_KEY)
  const test = []
  fs.readdir(__dirname, (err, files) => {
    files.forEach(file => {
      test.push(file)
    })
  })
  return JSON.stringify(test)
  const file = await fs.readFile(
    path.join(__dirname, "../", data.fileAbsolutePath.split("src")[1]),
    "utf8"
  )
  const content = fm(file)

  const product = content.attributes.products.filter(
    product => product.sku === data.product.sku
  )[0]
  const shippingPrice = pricing.calculateShipping(
    data.countryCode,
    data.type,
    data.size
  )
  // const total = pricing.calculateTotal(product.price, shippingPrice)

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
            metadata: {
              pwintyId: order.data.id,
            },
          },
          unit_amount: product.price,
        },
        quantity: 1,
      },
      {
        price_data: {
          currency: "gbp",
          product_data: {
            name: "Shipping",
          },
          unit_amount: shippingPrice,
        },
        quantity: 1,
      },
      {
        price_data: {
          currency: "gbp",
          product_data: {
            name: "VAT (20%)",
          },
          unit_amount: (product.price + shippingPrice) * 0.2,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "http://localhost:8888/prints",
    cancel_url: "http://localhost:8888/prints",
  })
  return {
    statusCode: 200,
    body: JSON.stringify({ sessionId: session.id }),
  }
}
