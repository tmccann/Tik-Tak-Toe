import { useState } from "react";
import Header from "./components/Header";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import type { Turns } from "./types/game";
import { deriveGameBoard, deriveWinner } from "./Utils/GameBoardUtils";
import GameOver from "./components/GameOver";

const players = {
  X: "Player 1",
  O: "Player 2",
};

const App = () => {
  const [playersName, setPlayersName] = useState(players);
  const [currentPlayer, setCurrenttPlayer] = useState<"X" | "O">("X");
  const [turns, setTurns] = useState<Turns[]>([]);
  const [playerNameError, setPlayersNameError] = useState({ X: "", O: "" });
  const [isValid, setIsValid] = useState(true);

  const board = deriveGameBoard(turns);

  let winner = deriveWinner(board);

  const draw = !winner && turns.length === 9;

  const handleNameChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    symbol: "X" | "O"
  ) => {
    const newInput = e.target.value;
    const trimmed = newInput.trim();
    const otherSymbol = symbol === "X" ? "O" : "X";

    setPlayersName((prev) => ({ ...prev, [symbol]: newInput }));
    if (!trimmed) {
      setPlayersNameError((prev) => ({
        ...prev,
        [symbol]: "Player name can not be blank",
      }));
      setIsValid(false);
    } else if (trimmed === playersName[otherSymbol].trim()) {
      setPlayersNameError((prev) => ({
        ...prev,
        [symbol]: "Player name must be unique",
      }));
      setIsValid(false);
    } else {
      setPlayersNameError((prev) => ({ ...prev, [symbol]: "" }));
      setIsValid(true);
    }
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

  const onRestart = () => {
    setTurns([]);
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
            playerNameError={playerNameError.X}
            isActive={currentPlayer === "X"}
          />
          <Player
            playerName={playersName.O}
            symbol="O"
            handleNameChange={handleNameChange}
            playerNameError={playerNameError.O}
            isActive={currentPlayer === "O"}
          />
        </ol>
        {(winner || draw) && (
          <GameOver
            winner={winner ? playersName[winner] : undefined}
            onRestart={onRestart}
          />
        )}
        <GameBoard handleTurn={handleTurn} board={board} isValid={isValid} />
      </div>
    </main>
  );
};

export default App;
