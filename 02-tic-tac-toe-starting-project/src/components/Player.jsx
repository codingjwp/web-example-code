import { useState } from "react"

export default function Player({initialName, symbol, isActive, onChangeName}) {
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);
  const btnCaption = isEditing ? 'Save' : 'Edit'
  let nameCompoent = <span className="player-name">{playerName}</span>
  const handleEditCLick = () => {
    setIsEditing(prev => !prev);
    if (isEditing) {
      onChangeName(symbol, playerName);
    }
  }
  const handleChange = (event) => {
    setPlayerName(event.target.value);
  }
  if (isEditing){
    nameCompoent = <input type="text" required value={playerName} onChange={handleChange} />
  }

  return (
    <li className={isActive ? 'active' : undefined}>
      <span className="player">
        {nameCompoent}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditCLick}>{btnCaption}</button>
    </li>
  )
}