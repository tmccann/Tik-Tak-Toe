export type GameBoardSymbol = "X" | "O" | null;

export type gameBoardMatrix = [
  [GameBoardSymbol, GameBoardSymbol, GameBoardSymbol],
  [GameBoardSymbol, GameBoardSymbol, GameBoardSymbol],
  [GameBoardSymbol, GameBoardSymbol, GameBoardSymbol],
];

export type Turns = {
  square: {
    colIndex: number;
    rowIndex: number;
  };
  player: "X" | "O";
};
