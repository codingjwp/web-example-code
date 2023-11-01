type ApiData = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export const getPhotoApi = async (page: string, limit: string) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=1&_page=${page}&_limit=${limit}`, {
    method: 'GET',
    cache: 'force-cache',
    headers: {
      'Cache-Control': "max-age=3600",
    }
  })
  if (!res.ok) throw new Error(`Fetch NetWork Error ${res.status}`);
  return (await res.json()) as ApiData[];
}
