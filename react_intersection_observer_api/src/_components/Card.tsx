import { ReactNode } from 'react';
import styled from 'styled-components';

const Card = ({children}: {children: ReactNode}) => {
  return (
    <CardBox>
      {children}
    </CardBox>
  )
}

export default Card;

const CardBox = styled.div<{$borderColor?: string}>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  max-width: 60rem;
  margin: 1rem;
  border: ${props => `0.3rem solid ${props.$borderColor}`};
`;

const CardFontSize = styled.p`
  font-size: 1.4rem;
  width: calc(100% - 2rem);
  padding: 1rem;
`;

Card.Title = styled(CardFontSize)`
  font-weight: 600;
`
Card.Context = styled(CardFontSize)`
  text-align: center;
`
Card.Img = styled.img.attrs<{$src: string, $alt: string}>(props => ({
  src: props.$src,
  alt: props.$alt,
}))<{$minWidth: string, $minHeight: string, $maxWidth: string, $maxHeight: string}>`
  min-width: ${props => props.$minWidth};
  min-height: ${props => props.$minHeight};
  max-width: ${props => props.$maxWidth};
  max-height: ${props => props.$maxHeight};
`;