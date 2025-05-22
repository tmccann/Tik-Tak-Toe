import { useState } from "react";
import Player from "../../components/Player";

const PlayerWrapper = () => {
  const [players, setPlayers] = useState({ X: "Player 1", O: "Player 2" });
  const [playerNameError, setPlayersNameError] = useState({ X: "", O: "" });

  const handleNameChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    symbol: "X" | "O"
  ) => {
    const newInput = e.target.value;
    const trimmed = newInput.trim();
    const otherSymbol = symbol === "X" ? "O" : "X";

    setPlayers((prev) => ({ ...prev, [symbol]: newInput }));
    if (!trimmed) {
      setPlayersNameError((prev) => ({
        ...prev,
        [symbol]: "Player name can not be blank",
      }));
    } else if (trimmed === players[otherSymbol].trim()) {
      setPlayersNameError((prev) => ({
        ...prev,
        [symbol]: "Player name must be unique",
      }));
    } else {
      setPlayersNameError((prev) => ({ ...prev, [symbol]: "" }));
    }
  };

  return (
    <>
      <Player
        playerName={players.X}
        symbol="X"
        handleNameChange={handleNameChange}
        isActive
        playerNameError={playerNameError.X}
      />
      <Player
        playerName={players.O}
        symbol="O"
        handleNameChange={handleNameChange}
        isActive={false}
        playerNameError={playerNameError.O}
      />
    </>
  );
};

export default PlayerWrapper;
