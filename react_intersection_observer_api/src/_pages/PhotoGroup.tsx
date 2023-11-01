import styled from 'styled-components';
import { getPhotoApi } from '../_apis/photoFetch';
import Card from '../_components/Card';
import BoundingBox from '../_components/BoundingBox';

const PhotoGroup = async () => {
  const data = await getPhotoApi('1', '20');


  return (
    <MainGroup>{
      data.map((item) => {
        const haxColor = item.url.split('/');
        return (
          <Card>
            <Card.Title>{item.title}</Card.Title>
            <Card.Img $src={item.thumbnailUrl} $alt={haxColor[haxColor.length - 1]} $minHeight='16rem' $minWidth='16rem' $maxHeight='60rem' $maxWidth='60rem' />
            <Card.Context>#{haxColor[haxColor.length - 1]}</Card.Context>
          </Card>
        )
      })}
      <BoundingBox />
    </MainGroup>
  )
}

export default PhotoGroup;

const MainGroup = styled.main`
  width: 100%;
  max-width: 120rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
`