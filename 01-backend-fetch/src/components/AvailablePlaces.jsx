import { useEffect } from 'react';
import Places from './Places.jsx';
import { sortPlacesByDistance } from '../loc.js';
import { fetchAvailablePlaces } from '../http.js';
import { useFetch } from '../hooks/useFetch.jsx'
import Error from './Error';

async function fetchSortedPlaces() {
  const places = await fetchAvailablePlaces();
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(
        places,
        position.coords.latitude,
        position.coords.longitude
      )
      resolve(sortedPlaces);
    })
  })
}

export default function AvailablePlaces({ onSelectPlace }) {
  const { isFetching, error, fetchedData: availablePlaces} = useFetch(fetchSortedPlaces, []);

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