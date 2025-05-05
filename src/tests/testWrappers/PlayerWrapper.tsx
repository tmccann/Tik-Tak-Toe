import { useState } from "react";
import Player from "../../components/Player";

const PlayerWrapper = () => {
  const [players, setPlayers] = useState({ X: "Player 1", O: "Player 2" });

  const handleNameChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    symbol: "X" | "O"
  ) => {
    const value = e.target.value;
    setPlayers((prev) => ({ ...prev, [symbol]: value }));
  };

  return (
    <Player
      playerName={players.X}
      symbol="X"
      handleNameChange={handleNameChange}
      isActive
    />
  );
};

export default PlayerWrapper;
