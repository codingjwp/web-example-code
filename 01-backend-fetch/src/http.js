export async function featchAvailablePlaces() {
  const res = await fetch('http://localhost:3000/places')
  const placeData = await res.json();
  if (!res.ok) { // true일 경우 (200 300) false 일경우 400 500
    throw new Error('Failed to featch places');
  }
  return placeData.places;
}

export async function featchUserPlaces() {
  const res = await fetch('http://localhost:3000/user-places')
  const placeData = await res.json();
  if (!res.ok) { // true일 경우 (200 300) false 일경우 400 500
    throw new Error('Failed to featch user places');
  }
  return placeData.places;
}

export async function updateUserPlaces(places) {
  const response = await fetch('http://localhost:3000/user-places', {
    method: "PUT",
    body: JSON.stringify({ places}),
    headers: {
      'Content-Type': 'application/json',

    }
  });
  const resData = await response.json();
  if (!resData.ok) {
    throw new Error('Failed to update user data.');
  }
  return resData.message;
}