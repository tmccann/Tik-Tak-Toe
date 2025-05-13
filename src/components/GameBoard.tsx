import { gameBoardMatrix } from "../types/game";

// Define the expected props for the GameBoard component
// Ensures type safety and clarity when using the component, helping to avoid type errors

type GameBoardProps = {
  board: gameBoardMatrix;
  handleTurn: (rowIndex: number, colIndex: number) => void;
};

const GameBoard = ({ handleTurn, board }: GameBoardProps) => {
  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
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
