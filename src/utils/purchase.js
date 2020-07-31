import { loadStripe } from "@stripe/stripe-js"

export const createCheckout = async (
  countryCode,
  selected,
  frontmatter,
  fileAbsolutePath,
  language
) => {
  const response = await fetch("/.netlify/functions/purchase", {
    body: JSON.stringify({
      countryCode: countryCode,
      type: selected.type,
      size: selected.size,
      title: frontmatter.title,
      product: selected,
      locale: language === "jp" ? "ja" : "auto",
      fileAbsolutePath: fileAbsolutePath,
    }),
    method: "POST",
  })

  const stripe = await loadStripe(
    "pk_live_51H1z1WLdKK5sOT6p62etDF1PlnJxBIEt4lBQcuAyHntN8dOHM0qguI6nrDR5ntfXt7eEJX8aPim4ZkMFLsBY3WaP006De31oe4"
  )
  const jsonResp = await response.json()
  stripe.redirectToCheckout({ sessionId: jsonResp.sessionId })
}
