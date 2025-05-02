import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import Player from "../../components/Player";

const user = userEvent.setup();
let mockPlayers = {
  X: "Player 1",
  O: "Player 2",
};

const componentUnderTest = <Player playerName={mockPlayers.X} symbol="X" />;

describe("player component renders correctly", () => {
  let rerenderComponent: (newProps?: React.ReactElement) => void;

  // added so that state changes can be checked
  beforeEach(() => {
    const { rerender } = render(componentUnderTest);
    // make rerender avaiable outside the beforeEach
    rerenderComponent = rerender;
  });

  test("player component shoulld render with default values", () => {
    const player = mockPlayers.X;
    const playerName = screen.getByText(player);
    const playerSymbol = screen.getByText("X");
    expect(playerName).toHaveTextContent("Player 1");
    expect(playerSymbol).toBeInTheDocument();
  });
  test("edit/save button toggle and correct input comes into focus", async () => {
    const editButton = screen.getByRole("button", { name: "Edit" });
    const saveButton = screen.queryByRole("button", { name: "Save" });
    expect(editButton).toBeInTheDocument();
    expect(saveButton).not.toBeInTheDocument();
    await user.click(editButton);
    const newEditButton = screen.queryByRole("button", { name: "Edit" });
    const newSaveButton = screen.getByRole("button", { name: "Save" });
    const nameInput = screen.getByDisplayValue("Player 1");
    expect(newEditButton).not.toBeInTheDocument();
    expect(newSaveButton).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
  });
  test("player input cannot be left blank", () => {});
  test("player name editable", () => {});
  test("player name saves when name is edited", () => {});
});
