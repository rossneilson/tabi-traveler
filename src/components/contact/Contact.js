import React, { useState } from "react"
import styled from "styled-components"
import { useIntl } from "react-intl"
import Img from "gatsby-image"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"

const Wrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background-size: cover;
`

const ContactCard = styled.section`
  background-color: white;
  position: absolute;
  padding: 40px;
  z-index: 978;
  min-height: 20%;
  width: 50%;
  margin: 5% 1% 5% 1%;
  flex-grow: 2;
  padding-bottom: 20px;
  text-align: center;
  min-width: 300px;
`

const Title = styled.h2`
  margin: auto;
  color: #5065a3;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: auto;
  max-width: 75%;
  margin-right: 16%;
`
const FormField = styled(TextField)`
  color: #5065a3;
  margin: 20px;
`
const SubmitButton = styled(Button)`
  background-color: #f79a60;
  color: white;
  &:hover {
    background-color: #5065a3;
  }
  &:focus {
    background-color: #5065a3;
  }
  margin: auto;
  width: 25%;
  padding: 5px;
`

const Icons = styled.section`
  margin-right: 7%;
  margin-top: 25px;
`

const Link = styled.a`
  margin: 10px;
  color: #f79a60;
  background-image: none;
  &:hover {
    color: #5065a3;
  }
  &:focus {
    color: #5065a3;
  }
`
const Image = styled(Img)`
  width: 100%;
  height: 100%;
  opacity: 0.8;
`

const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
)

const encode = data => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&")
}

export default function Contact(props) {
  const intl = useIntl()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [emailError, setEmailError] = useState(false)
  const [submitAttempt, setSubmitAttempt] = useState(0)

  const handleSubmit = e => {
    e.preventDefault()
    setSubmitAttempt(submitAttempt + 1)
    if (!validEmailRegex.test(email)) {
      setEmailError(true)
    } else {
      fetch("/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: encode({
          "form-name": "contact",
          ...{ name, email, message },
        }),
      })
        .then(() => alert("Success!"))
        .catch(error => alert(error))
    }
  }

  return (
    <Wrapper>
      <Image fluid={props.footImage1} />
      <ContactCard>
        <Title>{intl.formatMessage({ id: "contact.title" })}</Title>
        <form name="contact" netlify-honeypot="bot-field" hidden>
          <input type="text" name="name" />
          <input type="email" name="email" />
          <textarea name="message"></textarea>
        </form>
        <Form
          name="contact"
          method="post"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          netlify
          onSubmit={handleSubmit}
        >
          <input type="hidden" name="form-name" value="contact" />
          <label>
            <FormField
              aria-label="Name input"
              label={intl.formatMessage({ id: "contact.name" })}
              id="name"
              name="name"
              fullWidth
              onChange={e => setName(e.target.value)}
            />
          </label>
          <label>
            <FormField
              aria-label="Email input"
              label={intl.formatMessage({ id: "contact.email" })}
              id="email"
              name="email"
              fullWidth
              error={emailError}
              helperText={
                emailError
                  ? intl.formatMessage({ id: "contact.invalidEmail" })
                  : null
              }
              onChange={e => {
                const value = e.target.value
                if (!validEmailRegex.test(value) && submitAttempt > 0) {
                  setEmailError(true)
                } else {
                  setEmailError(false)
                }
                setEmail(e.target.value)
              }}
            />
          </label>
          <label>
            <FormField
              aria-label="Message input"
              label={intl.formatMessage({ id: "contact.message" })}
              id="message"
              name="message"
              multiline
              fullWidth
              onChange={e => setMessage(e.target.value)}
            />
          </label>

          <SubmitButton
            type="submit"
            aria-label="Submit button"
            variant="contained"
            disabled={emailError}
          >
            {intl.formatMessage({ id: "contact.submit" })}
          </SubmitButton>
        </Form>
        <Icons>
          <Link
            target="_blank"
            rel="noopener"
            href="https://www.instagram.com/tabitraveler/"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-brand-instagram"
              width="44"
              height="44"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#f79a60"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <rect x="4" y="4" width="16" height="16" rx="4" />
              <circle cx="12" cy="12" r="3" />
              <line x1="16.5" y1="7.5" x2="16.5" y2="7.501" />
            </svg>
          </Link>

          <Link
            target="_blank"
            rel="noopener"
            href="mailto:ross@tabitraveler.com"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-mail"
              width="44"
              height="44"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#f79a60"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <polyline points="3 7 12 13 21 7" />
            </svg>
          </Link>
        </Icons>
      </ContactCard>
    </Wrapper>
  )
}
