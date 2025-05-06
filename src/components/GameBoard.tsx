type GameBoardSymbol = "X" | "O" | null;

type gameBoardMatrix = [
  [GameBoardSymbol, GameBoardSymbol, GameBoardSymbol],
  [GameBoardSymbol, GameBoardSymbol, GameBoardSymbol],
  [GameBoardSymbol, GameBoardSymbol, GameBoardSymbol],
];

const initialBoardState: gameBoardMatrix = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const GameBoard = () => {
  return (
    <ol id="game-board">
      {initialBoardState.map((row, rowindex) => (
        <ol key={rowindex}>
          {row.map((symbol, colindex) => (
            <li key={colindex}>
              <button>{symbol}</button>
            </li>
          ))}
        </ol>
      ))}
    </ol>
  );
};

export default GameBoard;
