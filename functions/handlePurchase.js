const fetch = require("node-fetch")
const stripe = require("stripe")(process.env.STRIPE_TEST_SECRET_KEY)
exports.handler = async ({ headers, body }) => {
  const sig = headers["stripe-signature"]
  let event
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (err) {
    console.log(err)
    return {
      statusCode: 400,
      body: `Webhook error: ${err}`,
    }
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object
    console.log(session)

    const {
      line1,
      line2,
      city,
      state,
      postal_code,
      country,
    } = session.shipping.address

    const order = await fetch(
      `https://sandbox.pwinty.com/v3.0/orders/${session.metadata.pwintyId}`,
      {
        method: "put",
        headers: {
          "X-Pwinty-MerchantId": process.env.PWINTY_MERCHANT_ID,
          "X-Pwinty-REST-API-Key": process.env.PWINTY_TEST_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address1: line1,
          address2: line2,
          addressTownOrCity: city,
          stateOrCounty: state,
          countryCode: country,
          postalOrZipCode: postal_code,
          recipientName: session.shipping.name,
        }),
      }
    ).then(res => {
      return fetch(
        `https://sandbox.pwinty.com/v3.0/orders/${session.id}/SubmissionStatus`
      ).then(res => {
        if (res.json().statusCode === 200) {
          return fetch(
            `https://sandbox.pwinty.com/v3.0/orders/${session.id}/status`,
            {
              method: "post",
              headers: {
                "X-Pwinty-MerchantId": process.env.PWINTY_MERCHANT_ID,
                "X-Pwinty-REST-API-Key": process.env.PWINTY_TEST_API_KEY,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                status: "Submitted",
              }),
            }
          ).then(res => res.json())
        }
      })
    })

    return {
      statusCode: 200,
      body: JSON.stringify({ received: true, order: order }),
    }
  }
}
