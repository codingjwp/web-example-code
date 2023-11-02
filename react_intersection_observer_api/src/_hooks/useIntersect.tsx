import { useCallback, useEffect, useRef } from "react"

type IntersectinHandler = (  
  entry: IntersectionObserverEntry,
  observer: IntersectionObserver,
  )=> void
export const useIntersect = (
  onIntersect: IntersectinHandler,
  options?: IntersectionObserverInit
) => {
  const ref = useRef<HTMLDivElement>(null);
  const isObserver = useCallback<IntersectionObserverCallback>((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) onIntersect(entry, observer)
    })
  }, [onIntersect])

  useEffect(() => {
    if(!ref.current) return;
    const observer = new IntersectionObserver(isObserver, options);
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, options, isObserver])

  return ref;
}