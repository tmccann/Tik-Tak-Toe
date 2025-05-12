import { screen, render } from "@testing-library/react";
import GameBoard from "../../components/GameBoard";
import type { Turns } from "../../types/game";
import userEvent from "@testing-library/user-event";

const mockHandleTurn = vi.fn();
const user = userEvent.setup();
describe("gameBoard component tests", () => {
  beforeEach(() => {
    // turns bust be defined in each describe block to avoid all test using same values
    let turns: Turns[] = [];
    render(<GameBoard turns={turns} handleTurn={mockHandleTurn} />);
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

describe("game board populate correctly", () => {
  // turns bust be defined in each describe block to avoid all test using same values
  let turns: Turns[] = [];

  beforeEach(() => {
    turns = [{ square: { rowIndex: 0, colIndex: 0 }, player: "X" }];
    render(<GameBoard turns={turns} handleTurn={mockHandleTurn} />);
  });
  test("gameboard populates with correct symbol", () => {
    const buttons = screen.getAllByRole("button");
    expect(buttons[0]).toHaveTextContent("X");
  });
});
