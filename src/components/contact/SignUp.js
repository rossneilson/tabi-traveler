import React, { useState } from "react"
import MailchimpSubscribe from "react-mailchimp-subscribe"
import styled from "styled-components"
import { useIntl } from "gatsby-plugin-intl"
import loadable from "@loadable/component"

import Illustration from "../../img/relax sleep.svg"

var ReCAPTCHA = null
var StyledCaptcha = null

const recaptchaRef = React.createRef()

const Container = styled.section`
  display: flex;
  align-items: center;
  background-color: ${props => props.theme.colors.secondary200};
  padding: 2%;
  flex-flow: wrap;
  justify-content: center;
  z-index: 2;
  position: ${props => props.position};
`

const Img = styled.img`
  width: 20%;
  @media (pointer: coarse) {
    height: 200px;
    width: auto;
  }
`

const Title = styled.h2`
  width: 40%;
  min-width: 350px;
  color: ${props => props.theme.colors.primary600};
  font-weight: 900;
  @media (pointer: coarse) {
    text-align: center;
  }
`

const FormContainer = styled.section`
  display: flex;
  justify-content: center;
  width: 40%;
  min-width: 250px;
`

const Form = styled.form`
  display: flex;
  flex-flow: wrap;
  justify-content: space-between;
`

const StyledInput = styled.input`
  height: 38px;
  padding: 8px 12px;
  margin-bottom: 10px;
  font-size: ${props => props.theme.fontSizes.s};
  line-height: 1.42857143;
  font-weight: 500;
  width: 250px;
  border-style: none;
  border-width: 1px 1px 4px;
  border-color: #000 #000 #6f81b3;
  border-radius: 10px;
  background-color: white;
  color: black;
  margin: 10px;
`

const StyledButton = styled.button`
  transition: 0.2s;
  background-color: ${props => props.theme.colors.primary600};
  color: white;
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
    background-color: ${props => props.theme.colors.primary700};
  }
  &:focus {
    background-color: ${props => props.theme.colors.primary700};
  }
`

function CustomForm({
  status,
  message,
  onValidated,
  language,
  position = "auto",
}) {
  const intl = useIntl()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  const submit = e => {
    e.preventDefault()
    recaptchaRef.current.execute()
  }
  const onChange = value => {
    email &&
      value &&
      email.indexOf("@") > -1 &&
      onValidated({
        EMAIL: email,
        NAME: name,
        LANGUAGE: language,
      })
  }

  return (
    <Container position={position}>
      <Img src={Illustration} alt={"newsletter illustration"} />
      <Title>{intl.formatMessage({ id: "signup.title" })}</Title>
      <FormContainer>
        <Form name="signup" method="post" onSubmit={submit}>
          <label>
            <StyledInput
              id="fullName"
              name="name"
              aria-label="name input"
              placeholder={intl.formatMessage({ id: "contact.name" })}
              onChange={e => {
                ReCAPTCHA = loadable(() => import("react-google-recaptcha"))
                StyledCaptcha = styled(ReCAPTCHA)`
                  display: none;
                `
                setName(e.target.value)
              }}
            />
          </label>

          <label>
            <StyledInput
              id="emailAddress"
              name="email"
              aria-label="email input"
              placeholder={intl.formatMessage({ id: "contact.email" })}
              onChange={e => setEmail(e.target.value)}
            />
          </label>
          {ReCAPTCHA ? (
            <StyledCaptcha
              ref={recaptchaRef}
              size="invisible"
              sitekey="6LcMidkZAAAAAD44pvU5sAEDBs25vi2tTTy-92_p"
              onChange={onChange}
              badge={"inline"}
            />
          ) : (
            <div style={{ display: "none" }} />
          )}
          <StyledButton onClick={submit}>
            {intl.formatMessage({ id: "signup.subscribe" })}
          </StyledButton>
        </Form>
      </FormContainer>
      {status === "sending" && <div style={{ color: "blue" }}>sending...</div>}
      {status === "error" && (
        <div
          style={{ color: "red" }}
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}
      {status === "success" && (
        <div
          style={{ color: "green" }}
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}
    </Container>
  )
}

export default function SignUp({ language, position }) {
  const url =
    "https://tabitraveler.us2.list-manage.com/subscribe/post?u=ec0ef14f775282cd407b2dff5&amp;id=eb2930ef2d"

  return (
    <MailchimpSubscribe
      url={url}
      render={({ subscribe, status, message }) => (
        <CustomForm
          status={status}
          message={message}
          onValidated={formData => subscribe(formData)}
          language={language}
          position={position}
        />
      )}
    />
  )
}
