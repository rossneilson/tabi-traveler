import { keyframes } from "styled-components"

export const slideInFromBottom = keyframes`
  0% {
    transform: translate(-50%, -300%);
  }
  100% {
    transform: translate(-50%, -50%);
  }
`
export const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`
