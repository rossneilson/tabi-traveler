var fm = require("front-matter"),
  pricing = require("../src/utils/pricing"),
  fetch = require("node-fetch"),
  Sentry = require("@sentry/node")

exports.handler = async ({ body }) => {
  Sentry.init({
    dsn:
      "https://e074bf79a96e4160bb0b71b697d631d1@o425302.ingest.sentry.io/5360471",
  })
  try {
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

    const mdFromGithub = await fetch(
      `https://${
        process.env.GITHUB_ACCESS_TOKEN
      }@raw.githubusercontent.com/rossneilson/tabi-traveler/printsStore/src${
        data.fileAbsolutePath.split("src")[1]
      }`
    ).then(res => res.text())
    const content = fm(mdFromGithub)

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
          url: content.attributes.fullImage,
          copies: 1,
          sizing: "Crop",
        }),
      }
    ).then(res => res.json())

    const stripe = require("stripe")(process.env.STRIPE_TEST_SECRET_KEY)

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
              images: [content.attributes.fullImage],
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
  } catch (err) {
    Sentry.captureException(err)
    await Sentry.flush()
    return {
      statusCode: 400,
      body: `Webhook error: ${err}`,
    }
  }
}
