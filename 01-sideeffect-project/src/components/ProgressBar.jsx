import { useState, useEffect } from "react";

export default function ProgressBar({time}) {
  const [remainingTime, setRemainingTime] = useState(time);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime(prev => prev -10);
    }, 10);
    return () => {
      clearInterval(interval);
    }
  }, [])
  return (
    <progress value={remainingTime} max={time} />
  )
}