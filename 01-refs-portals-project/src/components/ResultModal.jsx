import { forwardRef, useImperativeHandle, useRef } from "react"
import { createPortal } from 'react-dom';

const ResultModal = forwardRef(function ResultModal({ targetTime, remainingTime, onReset }, ref) {
  const dialogRef = useRef();
  const userLost = remainingTime <= 0;
  const fommatedRemaingingTime = (remainingTime / 1000).toFixed(2);
  const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialogRef.current.showModal();
      }
    }
  });
  return createPortal(
    <dialog ref={dialogRef} className="result-modal" onClose={onReset}>
      {userLost ? <h2>You Lost</h2> : <h2>You Score: {score}</h2> }
      <p>The target timewas <strong>{targetTime} second.</strong></p>
      <p>Yout stopped the timer with <strong>{fommatedRemaingingTime} seconds left.</strong></p>
      <form method="dialog" onSubmit={onReset}>
        <button>Close</button>
      </form>
    </dialog>,
    document.getElementById('modal')
  )
});

export default ResultModal