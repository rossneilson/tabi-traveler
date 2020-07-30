import React, { useEffect } from "react"
import styled, { css } from "styled-components"
import Img from "gatsby-image"

import * as Keyframes from "../../utils/keyframes"
import { useKeyPress } from "../../utils/hooks"

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
`

const Image = styled(Img)`
  height: 90%;
  width: 90%;
  margin: auto;
`

const Back = styled.section`
  float: left;
  top: 50%;
  transform: translate(0%, -50%);
  cursor: w-resize;
  position: absolute;
  margin-left: 20px;
  z-index: 999;
  @media (pointer: coarse) {
    margin-left: 45%;
    top: 4%;
    transform: rotate(90deg);
    cursor: n-resize;
  }
`

const Next = styled.section`
  float: right;
  cursor: e-resize;
  position: absolute;
  margin-right: 20px;
  z-index: 999;
  align-self: center;
  margin-left: 95%;
  @media (pointer: coarse) {
    margin-left: 45%;
    bottom: 0;
    margin-bottom: 10px;
    transform: rotate(90deg);
    cursor: s-resize;
  }
`

const Close = styled.section`
  float: right;
  cursor: pointer;
  position: absolute;
  margin-right: 20px;
  z-index: 999;
  top: 1%;
  margin-left: 94%;
  @media (pointer: coarse) {
    margin-left: 87%;
  }
`

export default function ImageView({
  selectedImage,
  setSelectedImage,
  filteredImages,
}) {
  const left = useKeyPress("ArrowLeft")
  const right = useKeyPress("ArrowRight")
  useEffect(() => {
    if (selectedImage !== null) {
      if (left) {
        setSelectedImage(selectedImage - 1)
      }
      if (right) {
        setSelectedImage(selectedImage + 1)
      }
    }
  }, [left, right])
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
            onClick={() => {
              setSelectedImage(selectedImage - 1)
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-chevron-left"
              width="44"
              height="44"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="#000000"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <polyline points="15 6 9 12 15 18" />
            </svg>
          </Back>
          <Image
            imgStyle={{ objectFit: "scale-down" }}
            fluid={
              filteredImages[selectedImage].node.frontmatter.image
                .childImageSharp.fluid
            }
          />
          <Close
            onClick={() => {
              setSelectedImage(null)
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-arrow-back-up"
              width="44"
              height="44"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="#000000"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <path d="M9 13l-4 -4l4 -4m-4 4h11a4 4 0 0 1 0 8h-1" />
            </svg>
          </Close>
          <Next
            onClick={() => {
              setSelectedImage(selectedImage + 1)
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-chevron-right"
              width="44"
              height="44"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="#000000"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <polyline points="9 6 15 12 9 18" />
            </svg>
          </Next>
        </ModalMain>
      </Modal>
    )
  } else {
    return <div />
  }
}
