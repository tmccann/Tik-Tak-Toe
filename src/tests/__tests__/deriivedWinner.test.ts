import { gameBoardMatrix } from "../../types/game";
import { deriveWinner } from "../../Utils/GameBoardUtils";

test("detects horizontal win", () => {
  const board = [
    ["X", "X", "X"],
    [null, null, null],
    [null, null, null],
  ] as gameBoardMatrix;
  expect(deriveWinner(board)).toBe("X");
});

test("detects vertical win", () => {
  const board = [
    ["O", null, null],
    ["O", null, null],
    ["O", null, null],
  ] as gameBoardMatrix;
  expect(deriveWinner(board)).toBe("O");
});

test("detects diagonal win", () => {
  const board = [
    ["O", null, null],
    [null, "O", null],
    [null, null, "O"],
  ] as gameBoardMatrix;
  expect(deriveWinner(board)).toBe("O");
});
