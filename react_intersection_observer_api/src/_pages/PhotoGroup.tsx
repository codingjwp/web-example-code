import styled from 'styled-components';
import Card from '../_components/Card';
import BoundingBox from '../_components/BoundingBox';
import { useIntersect } from '../_hooks/useIntersect';
import { usePhotoFetch } from '../_hooks/usePhotoFetch';
import { useState } from 'react';

const PhotoGroup = () => {
  const cardAttribute = {
    "$minWidth": '15rem',
    "$maxWidth": '60rem',
  }
  const [page, setPage] = useState(1);
  const [ photo, loading, end ] = usePhotoFetch(page);
  const loader = useIntersect((entry, observer) => {
    observer.unobserve(entry.target);
    if (!loading && !end) {
      console.log(end, loading);
      setPage((prev) => prev + 1);
    }
  })

  return (
    <MainGroup>
        {photo.map((item) => {
          const haxColor = item.url.split('/');
          return (
            <Card key={`${item.id}`}>
              <Card.Title {...cardAttribute}>{item.title}</Card.Title>
              <Card.Img $src={item.thumbnailUrl} $alt={haxColor[haxColor.length - 1]} $width='15rem' $maxWidth='60rem' $height='15rem' $maxHeight='60rem'  />
              <Card.Context {...cardAttribute}>#{haxColor[haxColor.length - 1]}</Card.Context>
            </Card>
          )
        })}
        <BoundingBox visible={loading} ref={loader} />
    </MainGroup>
  )
}

export default PhotoGroup;

const MainGroup = styled.div`
  max-width: 144rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
`;