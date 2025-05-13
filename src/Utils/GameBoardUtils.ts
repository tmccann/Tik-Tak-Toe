import type { gameBoardMatrix, Turns } from "../types/game";
export const initialBoardState: gameBoardMatrix = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
export const deriveGameBoard = (turns: Turns[]) => {
  // Create a deep copy of the board so we don't accidentally modify the original
  // - map goes through each row in the board
  // - [...row] makes a shallow copy of each row (so we copy values, not references)
  // - TypeScript forgets it's a fixed 3x3 tuple at this point
  // - so we use 'as gameBoardMatrix' to assert the correct type and avoid errors
  let gameBoard = initialBoardState.map((row) => [...row]) as gameBoardMatrix;
  for (const turn of turns) {
    const { square, player }: Turns = turn;
    const { rowIndex, colIndex } = square;
    gameBoard[rowIndex][colIndex] = player;
  }
  return gameBoard;
};
