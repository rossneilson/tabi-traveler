var fm = require("front-matter"),
  pricing = require("../src/utils/pricing"),
  fetch = require("node-fetch")
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

  await fetch(
    `https://sandbox.pwinty.com/v3.0/orders/${order.data.id}/images`,
    {
      method: "post",
      headers: {
        "X-Pwinty-MerchantId": process.env.PWINTY_MERCHANT_ID,
        "X-Pwinty-REST-API-Key": process.env.PWINTY_TEST_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sku: data.product.sku,
        url: data.image,
        // sku: "GLOBAL-PHO-16X16-PRO",
        // url:
        //   "https://tabitraveler.com/static/362253496a69079706b035db676ee5bf/a7715/dsc03157.jpg",
        copies: 1,
        sizing: "Crop",
      }),
    }
  ).then(res => res.json())

  const stripe = require("stripe")(process.env.STRIPE_TEST_SECRET_KEY)

  const mdFromGithub = await fetch(
    `https://${
      process.env.GITHUB_ACCESS_TOKEN
    }@raw.githubusercontent.com/rossneilson/tabi-traveler/printsStore/src${
      data.fileAbsolutePath.split("src")[1]
    }`
  ).then(res => res.text())
  const content = fm(mdFromGithub)

  const product = content.attributes.products.filter(
    product => product.sku === data.product.sku
  )[0]
  const shippingPrice = pricing.calculateShipping(
    data.countryCode,
    data.type,
    data.size
  )

  const session = await stripe.checkout.sessions.create({
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
            images: [data.image],
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
    metadata: {
      pwintyId: order.data.id,
      name: data.title + " - " + data.product.title,
    },
    mode: "payment",
    success_url: "https://tabitraveler.com/success",
    cancel_url: "https://tabitraveler.com/prints",
  })
  return {
    statusCode: 200,
    body: JSON.stringify({ sessionId: session.id }),
  }
}
