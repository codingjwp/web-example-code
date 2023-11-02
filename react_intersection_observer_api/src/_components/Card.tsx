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
  align-items: center;
  justify-content: center;
  max-width: 60rem;
  margin: 1rem;
  border: ${props => `0.3rem solid ${props.$borderColor}`};
`;

const CardFontSize = styled.p`
  font-size: 1.4rem;
  width: calc(100% - 2rem);
  padding: 1rem;
`;

Card.Title = styled(CardFontSize)<{$minWidth: string, $maxWidth: string}>`
  font-weight: 600;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  height: 3.6rem;
  margin: 1rem;
  padding: 0;
  text-overflow: ellipsis;
  width: ${props => props.$minWidth};
  max-width: ${props => props.$maxWidth};
`
Card.Context = styled(CardFontSize)<{$minWidth: string, $maxWidth: string}>`
  text-align: center;
  width: ${props => props.$minWidth};
  max-width: ${props => props.$maxWidth};
`
Card.Img = styled.img.attrs<{$src: string, $alt: string}>(props => ({
  src: props.$src,
  alt: props.$alt,
}))<{$width: string, $height: string, $maxWidth: string, $maxHeight: string}>`
  width: ${props => props.$width};
  height: ${props => props.$height};
  max-width: ${props => props.$maxWidth};
  max-height: ${props => props.$maxHeight};
`;