import { useState } from "react";

type PlayerProps = {
  playerName: string;
  symbol: "X" | "O";
};

const Player = ({ playerName, symbol }: PlayerProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing((prev) => !prev);
    console.log("clicked");
  };
  const player = !isEditing ? (
    <span className="player-name">{playerName}</span>
  ) : (
    <input value={playerName} autoFocus name={playerName} />
  );

  return (
    <li>
      <span className="player">
        {player}
        <span className="player-symbol">{symbol}</span>
        <button onClick={() => handleEdit()}>
          {isEditing ? "Save" : "Edit"}
        </button>
      </span>
    </li>
  );
};

export default Player;
