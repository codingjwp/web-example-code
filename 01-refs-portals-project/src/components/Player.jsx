import { useRef } from "react";
import { useState } from "react";

export default function Player() {
  const playerRef = useRef();
  const [playerName, setPlayerName] = useState(null);

  const handleClick = () => {
    setPlayerName(playerRef.current.value);
    playerRef.current.value = '';
  }

  return (
    <section id="player">
      <h2>Welcome {playerName ?? 'unknown entity'}</h2>
      <p>
        <input ref={playerRef} type="text" />
        <button type="button" onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
