import type { Turns } from "../types/game";
import { initialBoardState } from "../Utils/GameBoardUtils";

// Define the expected props for the GameBoard component
// Ensures type safety and clarity when using the component, helping to avoid type errors

type GameBoardProps = {
  turns: Turns[];
  handleTurn: (rowIndex: number, colIndex: number) => void;
};

const GameBoard = ({ turns, handleTurn }: GameBoardProps) => {
  let gameBoard = [...initialBoardState];

  for (const turn of turns) {
    const { square, player }: Turns = turn;
    const { rowIndex, colIndex } = square;
    gameBoard[rowIndex][colIndex] = player;
  }

  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <ol key={rowIndex}>
          {row.map((symbol, colIndex) => (
            <li key={colIndex}>
              <button
                onClick={() => {
                  handleTurn(rowIndex, colIndex);
                }}
              >
                {symbol}
              </button>
            </li>
          ))}
        </ol>
      ))}
    </ol>
  );
};

export default GameBoard;
