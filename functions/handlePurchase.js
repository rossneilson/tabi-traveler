const fetch = require("node-fetch")
const stripe = require("stripe")(process.env.STRIPE_TEST_SECRET_KEY)
const Sentry = require("@sentry/node")
exports.handler = async ({ headers, body }) => {
  Sentry.init({
    dsn:
      "https://e074bf79a96e4160bb0b71b697d631d1@o425302.ingest.sentry.io/5360471",
  })
  const sig = headers["stripe-signature"]
  let event
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (err) {
    Sentry.captureException(err)
    await Sentry.flush()
    return {
      statusCode: 400,
      body: `Webhook error: ${err}`,
    }
  }
  try {
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
            addressTownOrCity: city ? city : line2 ? line2 : line1,
            stateOrCounty: state ? state : line2 ? line2 : line1,
            countryCode: country,
            postalOrZipCode: postal_code,
            recipientName: session.shipping.name,
          }),
        }
      ).then(res => res.json())
      console.log("order")
      console.log(order)

      const status = await fetch(
        `https://sandbox.pwinty.com/v3.0/orders/${session.metadata.pwintyId}/SubmissionStatus`,
        {
          method: "GET",
          headers: {
            "X-Pwinty-MerchantId": process.env.PWINTY_MERCHANT_ID,
            "X-Pwinty-REST-API-Key": process.env.PWINTY_TEST_API_KEY,
            "Content-Type": "application/json",
          },
        }
      ).then(res => res.json())
      console.log("status")
      console.log(status)

      var finalOrder
      if (status.statusCode === 200) {
        console.log("it worked")
        finalOrder = await fetch(
          `https://sandbox.pwinty.com/v3.0/orders/${session.metadata.pwintyId}/status`,
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
      console.log(finalOrder)

      return {
        statusCode: 200,
        body: JSON.stringify({ received: true, order: finalOrder }),
      }
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
