import React, { useState } from "react"
import MailchimpSubscribe from "react-mailchimp-subscribe"
import styled from "styled-components"
import { useIntl } from "react-intl"
import ReCAPTCHA from "react-google-recaptcha"

import Illustration from "../../img/relax sleep.svg"

const recaptchaRef = React.createRef()

const Container = styled.section`
  display: flex;
  align-items: center;
  background-color: #ffcd73d1;
  padding: 2%;
  flex-flow: wrap;
  justify-content: center;
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
  min-width: 300px;
  color: #6f81b3;
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
  font-size: 14px;
  line-height: 1.42857143;
  font-weight: 500;
  width: 250px;
  border-style: none;
  border-width: 1px 1px 4px;
  border-color: #000 #000 #6f81b3;
  border-radius: 10px;
  background-color: #fff;
  color: #ff6200;
  margin: 10px;
`

const StyledButton = styled.button`
  transition: 0.2s;
  background-color: #6f81b3;
  color: white;
  height: 40px;
  justify-content: space-around;
  font-size: large;
  font-weight: 500;
  min-width: 30%;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  margin: auto;
  &:hover {
    background-color: #5065a3;
  }
  &:focus {
    background-color: #5065a3;
  }
`

function CustomForm({ status, message, onValidated, language }) {
  const intl = useIntl()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  const submit = e => {
    e.preventDefault()
    recaptchaRef.current.execute()
  }
  const onChange = value => {
    console.log("Captcha value:", value)
    console.log("yay")
    email &&
      email.indexOf("@") > -1 &&
      onValidated({
        EMAIL: email,
        NAME: name,
        LANGUAGE: language,
      })
  }

  return (
    <Container>
      <Img src={Illustration} />
      <Title>{intl.formatMessage({ id: "signup.title" })}</Title>
      <FormContainer>
        <Form name="signup" method="post" onSubmit={submit}>
          <ReCAPTCHA
            ref={recaptchaRef}
            size="invisible"
            sitekey="6LcMidkZAAAAAD44pvU5sAEDBs25vi2tTTy-92_p"
            onChange={onChange}
          />
          <div
            style={{ position: "absolute", left: "-5000px" }}
            aria-hidden="true"
          >
            <input
              type="text"
              name="b_ec0ef14f775282cd407b2dff5_eb2930ef2d"
              tabindex="-1"
              value=""
            />
          </div>
          <StyledInput
            id="name"
            name="name"
            placeholder={intl.formatMessage({ id: "contact.name" })}
            onChange={e => setName(e.target.value)}
          />
          <StyledInput
            id="email"
            name="email"
            placeholder={intl.formatMessage({ id: "contact.email" })}
            onChange={e => setEmail(e.target.value)}
          />
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

export default function SignUp({ language }) {
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
        />
      )}
    />
  )
}
