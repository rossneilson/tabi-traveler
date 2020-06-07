import React, { useState, useEffect } from "react"
import styled, { css } from "styled-components"
import Img from "gatsby-image"
import ForwardIcon from "@material-ui/icons/ArrowForwardIos"
import BackIcon from "@material-ui/icons/ArrowBackIos"
import CloseIcon from "@material-ui/icons/Close"

import * as Keyframes from "../../utils/keyframes"

const Modal = styled.section`
  z-index: 99999;
  position: fixed;
  opacity: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.75);
  display: ${props => (props.show ? "block" : "none")};
  animation: ${props =>
    props.show
      ? css`
          1s ease-out 0s 1 ${Keyframes.fadeIn} 
        `
      : "none"};
`

const ModalMain = styled.section`
  position: fixed;
  background: white;
  display: flex;
  width: 90%;
  height: 90%;
  min-width: 350px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: ${props =>
    props.show
      ? css`
          1s ease-out 0s 1 ${Keyframes.slideInFromBottom} 
        `
      : "none"};
  @media (max-width: 450px) {
    height: 90%;
  }
`

const Image = styled(Img)`
  height: 90%;
  width: 90%;
  margin: auto;
`

const Back = styled(BackIcon)`
  float: left;
  top: 50%;
  transform: translate(0%, -50%);
  cursor: w-resize;
  color: black;
  position: absolute;
  margin-left: 20px;
  z-index: 999;
  @media (max-width: 450px) {
    margin-left: 45%;
    top: 4%;
    transform: rotate(90deg);
    cursor: n-resize;
  }
`

const Next = styled(ForwardIcon)`
  float: right;
  cursor: e-resize;
  color: black;
  position: absolute;
  margin-right: 20px;
  z-index: 999;
  align-self: center;
  margin-left: 95%;
  @media (max-width: 450px) {
    margin-left: 45%;
    margin-top: 150%;
    transform: rotate(90deg);
    cursor: s-resize;
  }
`

const Close = styled(CloseIcon)`
  float: right;
  cursor: pointer;
  color: black;
  position: absolute;
  margin-right: 20px;
  z-index: 999;
  top: 0%;
  margin-left: 95%;
  @media (max-width: 450px) {
    margin-left: 90%;
  }
`

export default function ImageView({
  selectedImage,
  setSelectedImage,
  filteredImages,
}) {
  if (filteredImages[selectedImage]) {
    return (
      <Modal
        show={selectedImage + 1}
        onClick={event => {
          if (event.target === event.currentTarget) {
            setSelectedImage(null)
          }
        }}
      >
        <ModalMain show={selectedImage + 1}>
          <Back
            fontSize="large"
            onClick={() => {
              setSelectedImage(selectedImage - 1)
            }}
          />
          <Image
            imgStyle={{ objectFit: "scale-down" }}
            fluid={
              filteredImages[selectedImage].node.frontmatter.image
                .childImageSharp.fluid
            }
          />
          <Close
            fontSize="large"
            onClick={() => {
              setSelectedImage(null)
            }}
          />
          <Next
            fontSize="large"
            onClick={() => {
              setSelectedImage(selectedImage + 1)
            }}
          />
        </ModalMain>
      </Modal>
    )
  } else {
    return <div />
  }
}
