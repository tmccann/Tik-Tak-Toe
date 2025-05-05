import { useState } from "react";
import Header from "./components/Header";
import Player from "./components/Player";

const players = {
  X: "Player 1",
  O: "Player 2",
};

const App = () => {
  const [playersName, setPlayersName] = useState(players);

  const handleNameChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    symbol: "X" | "O"
  ) => {
    const newInput = e.target.value;

    setPlayersName((prev) => ({
      ...prev,
      [symbol]: newInput,
    }));
  };
  // for test purposes only we sort correct logic when game board is complete
  let currentPlayer = "X";
  return (
    <main>
      <Header />
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            playerName={playersName.X}
            symbol="X"
            handleNameChange={handleNameChange}
            isActive={currentPlayer === "X"}
          />
          <Player
            playerName={playersName.O}
            symbol="O"
            handleNameChange={handleNameChange}
            isActive={currentPlayer === "O"}
          />
        </ol>
      </div>
    </main>
  );
};

export default App;
