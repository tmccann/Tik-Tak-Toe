import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Player from "../../components/Player";
import PlayerWrapper from "../testWrappers/PlayerWrapper";
import type { UserEvent } from "@testing-library/user-event";

let mockPlayers = {
  X: "Player 1",
  O: "Player 2",
};
let user: UserEvent;
const mockNameChange = vi.fn();
const componentUnderTest = (
  <Player
    playerName={mockPlayers.X}
    symbol="X"
    handleNameChange={mockNameChange}
    isActive
  />
);

describe("player component renders correctly", () => {
  // added so that state changes can be checked

  beforeEach(() => {
    user = userEvent.setup();
    render(componentUnderTest);
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
    const nameInput = screen.getByRole("textbox");
    expect(newEditButton).not.toBeInTheDocument();
    expect(newSaveButton).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
  });
});

describe("player element class", () => {
  test("player element has active class when active x is active as default for now", () => {
    render(
      <Player
        playerName={mockPlayers.X}
        symbol="X"
        handleNameChange={mockNameChange}
        isActive={true}
      />
    );
    const playerElement = screen.getByRole("listitem");
    expect(playerElement).toHaveClass("active");
  });
  test("player elementdoes not have active class when set to O", () => {
    render(
      <Player
        playerName={mockPlayers.O}
        symbol="O"
        handleNameChange={mockNameChange}
        isActive={false}
      />
    );
    const playerElement = screen.getByRole("listitem");
    expect(playerElement).not.toHaveClass("active");
  });
});
// wrapper used to simulate state changes
describe("Player input interactions (with wrapper)", async () => {
  const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});

  beforeEach(() => {
    user = userEvent.setup();
    alertMock;
    render(<PlayerWrapper />);
  });

  afterEach(() => {
    alertMock.mockRestore();
  });
  test("player input cannot be left blank", async () => {
    const editButton = screen.getByRole("button", { name: "Edit" });
    await user.click(editButton);
    const playerInput = screen.getByRole("textbox");
    await user.clear(playerInput);
    expect(playerInput).toHaveValue("");
    const saveButton = screen.getByRole("button", { name: "Save" });
    await user.click(saveButton);
    expect(alertMock).toHaveBeenCalled();
  });
  test("player name is editable and saves", async () => {
    const editButton = screen.getByRole("button", { name: "Edit" });
    await user.click(editButton);
    const playerInput = screen.getByRole("textbox");
    await user.clear(playerInput);
    await user.type(playerInput, "test");
    const saveButton = screen.getByRole("button", { name: "Save" });
    await user.click(saveButton);
    expect(alertMock).not.toHaveBeenCalled();
    const newPlayerName = screen.getByText("test");
    expect(newPlayerName).toBeInTheDocument();
  });
});
