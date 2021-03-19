import React, { useState } from "react"
import styled from "styled-components"
import { useIntl } from "gatsby-plugin-intl"
import { StaticImage } from "gatsby-plugin-image"

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
  padding: 5%;
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
  margin-bottom: 20px;
  color: ${props => props.theme.colors.primary600};
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: auto;
  max-width: 75%;
`

const StyledInput = styled.input`
  height: 38px;
  padding: 8px 12px;
  margin: 5% 0%;
  font-size: ${props => props.theme.fontSizes.m};
  line-height: 1.42857143;
  font-weight: 500;
  width: 100%;
  border-style: none;
  border-width: 1px 1px 4px;
  border-color: #000 #000 #6f81b3;
  border-radius: 10px;
  background-color: ${props =>
    props.error
      ? props.theme.colors.warning
      : props.theme.colors.grayBackground};
  color: black;
`

const Icons = styled.section`
  margin-top: 25px;
`

const Link = styled.a`
  margin: 10px;
  background-image: none;
`

const Image = styled.section`
  width: 100%;
  height: 100%;
  opacity: 0.8;
`

const StyledButton = styled.button`
  transition: 0.2s;
  background-color: ${props => props.theme.colors.secondary};
  color: black;
  height: 40px;
  justify-content: space-around;
  font-size: ${props => props.theme.fontSizes.m};
  font-weight: 500;
  min-width: 30%;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  margin: auto;
  &:hover {
    background-color: ${props => props.theme.colors.primary};
  }
  &:focus {
    background-color: ${props => props.theme.colors.primary};
  }
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
  const [success, setSuccess] = useState(false)
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
        .then(() => setSuccess(true))
        .catch(error => alert(error))
    }
  }

  return (
    <Wrapper>
      <Image>
        <StaticImage
          width={1800}
          quality={80}
          src="../../img/footImage.png"
          alt="Mountain range background"
        />
      </Image>
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
            <StyledInput
              aria-label="Name input"
              placeholder={intl.formatMessage({ id: "contact.name" })}
              id="name"
              name="name"
              onChange={e => setName(e.target.value)}
            />
          </label>
          <label>
            <StyledInput
              aria-label="email input"
              placeholder={intl.formatMessage({ id: "contact.email" })}
              id="email"
              name="email"
              error={emailError}
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
            <StyledInput
              aria-label="Message input"
              placeholder={intl.formatMessage({ id: "contact.message" })}
              id="message"
              name="message"
              onChange={e => setMessage(e.target.value)}
            />
          </label>

          <StyledButton type="submit" aria-label="Submit button">
            {intl.formatMessage({ id: "contact.submit" })}
          </StyledButton>
          {emailError
            ? intl.formatMessage({ id: "contact.invalidEmail" })
            : success
            ? intl.formatMessage({ id: "contact.success" })
            : null}
        </Form>
        <Icons>
          <Link
            target="_blank"
            rel="noopener"
            aria-label="Instagram"
            href="https://www.instagram.com/tabitraveler/"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-brand-instagram"
              width="44"
              height="44"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#f79a60"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
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
            aria-label="Email"
            href="mailto:ross@tabitraveler.com"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-mail"
              width="44"
              height="44"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#f79a60"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
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
