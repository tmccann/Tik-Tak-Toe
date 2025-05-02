import { render, screen } from "@testing-library/react";
import Player from "../../components/Player";

const mockPlayers = {
  X: "Player 1",
  O: "Player 2",
};

describe("player component renders correctly", () => {
  test("player component shoulld render with default values", () => {
    render(<Player playerName={mockPlayers.X} symbol="X" />);
    const player = mockPlayers.X;
    const playerName = screen.getByText(player);
    const playerSymbol = screen.getByText("X");
    expect(playerName).toHaveTextContent("Player 1");
    expect(playerSymbol).toBeInTheDocument();
  });
  test("edit/save button toggle and correct input comes into focus", () => {});
  test("player input cannot be left blank", () => {});
  test("player name editable", () => {});
  test("player name saves when name is edited", () => {});
});
