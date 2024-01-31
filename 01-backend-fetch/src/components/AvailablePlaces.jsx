import { useEffect, useState } from 'react';
import Places from './Places.jsx';
import { sortPlacesByDistance } from '../loc.js';
import { featchAvailablePlaces } from '../http.js';

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    async function featchPlaces() {
      setIsFetching(true);
      try {
        const places = await featchAvailablePlaces();
        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(places, position.coords.latitude, position.coords.longitude);
          setAvailablePlaces(sortedPlaces)
        })
      } catch (error) {
        setError({ message: error.message || 'Could not fetch places, please try again later.' });
      } finally {
        setIsFetching(false);
      }
    }
    featchPlaces();
  });

  if (error) {
    return <Error title="An Error occurred !" message={error.message} />
  }
  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Featching place data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}