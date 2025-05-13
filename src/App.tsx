import { useState } from "react";
import Header from "./components/Header";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import type { Turns } from "./types/game";
import { deriveGameBoard } from "./Utils/GameBoardUtils";

const players = {
  X: "Player 1",
  O: "Player 2",
};

const App = () => {
  const [playersName, setPlayersName] = useState(players);
  const [currentPlayer, setCurrenttPlayer] = useState<"X" | "O">("X");
  const [turns, setTurns] = useState<Turns[]>([]);

  const board = deriveGameBoard(turns);

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
  const handleTurn = (rowIndex: number, colIndex: number) => {
    if (board[rowIndex][colIndex] !== null) {
      return;
    }
    setTurns((prev) => [
      { square: { rowIndex, colIndex }, player: currentPlayer },
      ...prev,
    ]);

    switchPlayer();
  };
  const switchPlayer = () => {
    currentPlayer === "X" ? setCurrenttPlayer("O") : setCurrenttPlayer("X");
  };

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
        <GameBoard handleTurn={handleTurn} board={board} />
      </div>
    </main>
  );
};

export default App;
