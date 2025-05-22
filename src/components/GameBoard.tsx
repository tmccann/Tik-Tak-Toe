import { gameBoardMatrix } from "../types/game";

// Define the expected props for the GameBoard component
// Ensures type safety and clarity when using the component, helping to avoid type errors

type GameBoardProps = {
  board: gameBoardMatrix;
  handleTurn: (rowIndex: number, colIndex: number) => void;
  isValid: boolean;
};

const GameBoard = ({ handleTurn, board, isValid }: GameBoardProps) => {
  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <ol key={rowIndex}>
          {row.map((symbol, colIndex) => (
            <li key={colIndex}>
              <button
                data-testid="square"
                onClick={() => {
                  handleTurn(rowIndex, colIndex);
                }}
                // !! turn value into bolean
                disabled={!!symbol || !isValid}
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
