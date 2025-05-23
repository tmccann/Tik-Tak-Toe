import { screen, render } from "@testing-library/react";
import GameBoard from "../../components/GameBoard";
import userEvent from "@testing-library/user-event";
import { deriveGameBoard } from "../../Utils/GameBoardUtils";
import type { UserEvent } from "@testing-library/user-event";
import { gameBoardMatrix } from "../../types/game";

const mockHandleTurn = vi.fn();
let user: UserEvent;
describe("gameBoard component tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // turns bust be defined in each describe block to avoid all test using same values
    user = userEvent.setup();
    let mockBoard = deriveGameBoard([]);
    render(<GameBoard board={mockBoard} handleTurn={mockHandleTurn} isValid />);
  });

  test("component renders with blank gameboard containing 9 buttons", () => {
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(9);
    buttons.forEach((button) => {
      expect(button).toBeEmptyDOMElement();
    });
  });
  test("gameBoard registers which cell has been clicked", async () => {
    let buttons = screen.getAllByRole("button");
    await user.click(buttons[0]);
    expect(mockHandleTurn).toBeCalledWith(0, 0);
    buttons = screen.getAllByRole("button");
  });
});

describe("gameboard buttons disabled/eneabled depending on isValid", () => {
  let mockBoard: gameBoardMatrix; // define it here so both tests can access it

  beforeEach(() => {
    vi.clearAllMocks();
    mockBoard = deriveGameBoard([]);
    user = userEvent.setup();
  });

  test("buttons disabled if isValid false, handleTurn not called when clicked ", async () => {
    render(
      <GameBoard
        board={mockBoard}
        handleTurn={mockHandleTurn}
        isValid={false}
      />
    );
    const buttons = screen.getAllByRole("button");
    buttons.forEach((button) => {
      expect(button).toBeDisabled();
    });
    await user.click(buttons[0]);
    expect(mockHandleTurn).not.toBeCalled();
  });
  test("buttons enabled if isvalid ,  handleTurn called when clicked ", async () => {
    render(<GameBoard board={mockBoard} handleTurn={mockHandleTurn} isValid />);
    const buttons = screen.getAllByRole("button");
    buttons.forEach((button) => {
      expect(button).not.toBeDisabled();
    });
    await user.click(buttons[0]);
    expect(mockHandleTurn).toBeCalled();
  });
});

describe("game board populate correctly", () => {
  // turns bust be defined in each describe block to avoid all test using same values

  beforeEach(() => {
    vi.clearAllMocks();
    let mockBoard = deriveGameBoard([
      { square: { rowIndex: 0, colIndex: 0 }, player: "X" },
    ]);
    render(<GameBoard board={mockBoard} handleTurn={mockHandleTurn} isValid />);
  });
  test("gameboard populates with correct symbol", () => {
    const buttons = screen.getAllByRole("button");
    expect(buttons[0]).toHaveTextContent("X");
  });
});
