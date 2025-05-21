import type { gameBoardMatrix, Turns } from "../types/game";
import { WINNING_COMBINATIONS } from "./winningCombinatopns";
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

export const deriveWinner = (gameBoard: gameBoardMatrix) => {
  let winner;
  for (const [
    // Destructure each winning combination
    // (Each combination is an array of three {row, column} objects)
    { row: r1, column: c1 },
    { row: r2, column: c2 },
    { row: r3, column: c3 },
  ] of WINNING_COMBINATIONS) {
    // Get the symbols at each of the three winning positions
    const firstSymbol = gameBoard[r1][c1];
    const secondSymbol = gameBoard[r2][c2];
    const thirdSymbol = gameBoard[r3][c3];

    // Check if all three are equal and not null — we have a winner
    if (
      firstSymbol != null &&
      firstSymbol === secondSymbol &&
      firstSymbol === thirdSymbol
    ) {
      winner = firstSymbol;
      break;
    }
  }
  // if all match return winner
  return winner;
};
