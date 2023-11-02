import styled, { keyframes } from 'styled-components'
import { forwardRef } from "react";

const BoundingBox = forwardRef<HTMLDivElement, {visible: boolean}>(({visible}, ref) => {
  return (
    <Box ref={ref} $visible={visible}>
      <LoaderBox />
      <LoaderBox />
      <LoaderBox />
      <LoaderBox />
      <LoaderBox />
    </Box>
  )
});

export default BoundingBox;

const boundAni = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(50%);
  }
`

const Box = styled.div<{$visible: boolean}>`
  width: 100%;
  height: 7rem;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${props => props.$visible ? 1 : 0};
  & div {
    animation-play-state: ${props => props.$visible ? 'running' : 'paused'};
    animation-name: ${boundAni};
    animation-duration: 1.5s;
    animation-timing-function: ease-out;
    animation-iteration-count: infinite;
  }
  & div:nth-of-type(2) {
    animation-delay: 300ms;
  }
  & div:nth-of-type(3) {
    animation-delay: 600ms;
  }
  & div:nth-of-type(4) {
    animation-delay: 900ms;
  }
  & div:nth-of-type(5) {
    animation-delay: 1200ms;
  }
`
const LoaderBox = styled.div`
  width: 2rem;
  height: 5rem;
  background-color: #000000;
  margin: 0 1rem;
`