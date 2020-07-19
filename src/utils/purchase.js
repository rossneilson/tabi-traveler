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
      image:
        "http://localhost:8888" +
        frontmatter.fullImage.childImageSharp.fluid.originalImg,
    }),
    method: "POST",
  })

  const stripe = await loadStripe(
    "pk_test_51H1z1WLdKK5sOT6pjvjbdqVZVE8gQLdXmZzTwBvhpPCUucRWjejKw6cEmiq5Scw9oenQVGiVVoRGnsmr1B9OAQ6c007lhc3Miz"
  )
  const jsonResp = await response.json()
  stripe.redirectToCheckout({ sessionId: jsonResp.sessionId })
}
