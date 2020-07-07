exports.handler = async ({ body }) => {
  const stripe = require("stripe")(
    "sk_test_51H1z1WLdKK5sOT6pVoXab5kEwslAP9xd1qaNLyYn2u9vm7STDMMPCJw6jJnth9vyHd8uT8ektK0jt0ntUVVIOG2s00ynWGNkCs"
  )

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "gbp",
          product_data: {
            name: "Print",
          },
          unit_amount: 20000,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "https://example.com/success?session_id={CHECKOUT_SESSION_ID}",
    cancel_url: "https://example.com/cancel",
  })
  return {
    statusCode: 200,
    body: JSON.stringify({ sessionId: session.id }),
  }
}
