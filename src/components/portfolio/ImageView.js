import React, { useEffect, useState } from "react"
import styled, { css } from "styled-components"
import { GatsbyImage as Img, getImage } from "gatsby-plugin-image"
import { CSSTransition } from "react-transition-group"

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
  max-height: 80%;
  max-width: 90%;
  margin: auto;
  transition: 1s;
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
    top: 3%;
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
  const [inProp, setInProp] = useState(false)
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
          <CSSTransition in={inProp} timeout={200}>
            <Image
              imgStyle={{ objectFit: "scale-down" }}
              image={getImage(
                filteredImages[selectedImage].node.frontmatter.image
              )}
            />
          </CSSTransition>
          <Close
            onClick={() => {
              setSelectedImage(null)
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-x"
              width="44"
              height="44"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="#2c3e50"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </Close>
          <Next
            onClick={() => {
              setSelectedImage(selectedImage + 1)
              setInProp(true)
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
