import { useState, useRef, useEffect, useCallback } from "react"
import { getPhotoApi, ApiData } from '../_apis/photoFetch';

export const usePhotoFetch = (page: number) => {
  const [photo, setPhoto] = useState<ApiData[]>([])
  const photoRef = useRef(photo);
  const [loading, setLoading] = useState(false);
  const [end, setEnd] = useState(false);

  const serPhotoData = useCallback(() => {
    if (end) return;
    setLoading(true);
    setTimeout(async() => {
      try {
        const res = await getPhotoApi(page.toString(), '15');
        if (!res || res.length === 0) {
          setEnd(true);
          return;
        }
        const hasPhoto = res.every((obj) => photoRef.current.some((old) => old.id === obj.id));
        if (hasPhoto) return;
        setPhoto((prev) => {
          const newData = [...prev, ...res];
          photoRef.current = newData;
          return newData;
        })
      }catch(error: unknown) {
        console.log((error as Error).message);
      } finally {
        setLoading(false);
      }
    }, 2000);
  },[end, page])

  useEffect(() => {
    serPhotoData();
  }, [serPhotoData])

  return [photo, loading, end] as const;
}