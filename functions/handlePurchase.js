const stripe = require("stripe")(process.env.STRIPE_TEST_SECRET_KEY)
exports.handler = async ({ headers, body }) => {
  console.log("REEEEEEEEEEE")
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
  console.log(event)
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

    const lineItems = await stripe.checkout.sessions.listLineItems(session.id)
    console.log(lineItems)

    console.log("shipping")
    console.log({
      line1,
      line2,
      city,
      state,
      postal_code,
      country,
    })
  }

  // Get data from stripe
  // Update order
  // Email me + customer

  return {
    statusCode: 200,
    body: JSON.stringify({ received: true }),
  }
}
