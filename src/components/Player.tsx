import { useState } from "react";

type PlayerProps = {
  playerName: string;
  symbol: "X" | "O";
  handleNameChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    symbol: "X" | "O"
  ) => void;
  playerNameError: string | "";
  isActive: boolean;
};

const Player = ({
  playerName,
  symbol,
  handleNameChange,
  playerNameError,
  isActive,
}: PlayerProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    if (!playerNameError) {
      setIsEditing((prev) => !prev);
    } else {
      return;
    }
  };

  const player = !isEditing ? (
    <span className="player-name">{playerName}</span>
  ) : (
    <input
      value={playerName}
      autoFocus
      name={`${playerName}`}
      onChange={(e) => handleNameChange(e, symbol)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          handleEdit();
        }
      }}
    />
  );

  return (
    <li className={isActive ? "active" : ""} data-testid={`player-${symbol}`}>
      <div className="player-wrapper">
        <span className="player">
          {player}
          <span className="player-symbol">{symbol}</span>
          <button
            type="button"
            data-testid={`playerNameButton-${symbol}`}
            onClick={handleEdit}
          >
            {isEditing ? "Save" : "Edit"}
          </button>
        </span>
        {playerNameError && (
          <div className="playerError">{playerNameError}</div>
        )}
      </div>
    </li>
  );
};

export default Player;
