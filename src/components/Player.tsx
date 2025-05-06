import { useState } from "react";

type PlayerProps = {
  playerName: string;
  symbol: "X" | "O";
  handleNameChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    symbol: "X" | "O"
  ) => void;
  isActive: boolean;
};

const Player = ({
  playerName,
  symbol,
  handleNameChange,
  isActive,
}: PlayerProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    playerName.length > 0
      ? setIsEditing((prev) => !prev)
      : alert("player name cannot be blank");
  };

  const player = !isEditing ? (
    <span className="player-name">{playerName}</span>
  ) : (
    <input
      value={playerName}
      autoFocus
      name={playerName}
      onChange={(e) => handleNameChange(e, symbol)}
    />
  );

  return (
    <li className={isActive ? "active" : ""}>
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
