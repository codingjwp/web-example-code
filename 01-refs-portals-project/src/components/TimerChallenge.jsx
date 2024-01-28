import { useRef } from "react";
import { useState } from "react"
import ResultModal from "./ResultModal";

export default function TimerChallenge({title, targetTime}) {
  const timeRef = useRef();
  const dialogRef = useRef();
  const [timeRemainging, setTimeRemainging] = useState(targetTime * 1000);
  const timerIsActive = timeRemainging > 0 && timeRemainging < targetTime * 1000;

  if (timeRemainging <= 0) {
    clearInterval(timeRef.current);
    dialogRef.current.open();
  }
  const handleReset = () => {
    setTimeRemainging(targetTime * 1000);
  }

  const handleStart = () => {
    timeRef.current = setInterval(() => {
      setTimeRemainging(prev => prev -10);
    }, 10);
  }
  const handleStop = () => {
    dialogRef.current.open();
    clearInterval(timeRef.current)
  }

  return (
    <>
      <ResultModal ref={dialogRef} targetTime={targetTime} remainingTime={timeRemainging} result={"loast"} onReset={handleReset} />
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge=time">
          {targetTime} second{targetTime > 1 ? 's' : ''}
        </p>
        <p>
          <button onClick={timerIsActive ? handleStop : handleStart}>
            {timerIsActive ? 'Stop': 'Start'} Challenge
          </button>
        </p>
        <p className={timerIsActive ? 'active' : undefined}>
          {timerIsActive ? 'Time is running...' : 'Timer inactive'}
        </p>
      </section>
    </>
  )
}