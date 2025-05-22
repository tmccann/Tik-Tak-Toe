import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../../App";

test("complete game flow: rename, play, win, draw, reset", async () => {
  const user = userEvent.setup();
  render(<App />);

  // -----------------------------
  // Step 1: Rename the players
  // -----------------------------

  await user.click(screen.getByTestId("playerNameButton-X"));
  let input = screen.getByRole("textbox");
  await user.clear(input);
  await user.click(screen.getByRole("button", { name: "Save" }));
  expect(screen.getByText("Player name can not be blank")).toBeInTheDocument();
  await user.type(input, "Alfie");
  await user.click(screen.getByRole("button", { name: "Save" }));
  await user.click(screen.getByTestId("playerNameButton-O"));
  input = screen.getByRole("textbox");
  await user.clear(input);
  await user.type(input, "Bob");
  await user.click(screen.getByRole("button", { name: "Save" }));

  expect(screen.getByText("Alfie")).toBeInTheDocument();
  expect(screen.getByText("Bob")).toBeInTheDocument();

  // -----------------------------
  // Step 2: Play game until Alfie wins
  // -----------------------------
  const squares = screen.getAllByTestId("square");
  await user.click(squares[0]); // X (Alfie)
  await user.click(squares[3]); // O (Bob)
  await user.click(squares[1]); // X (Alfie)
  await user.click(squares[4]); // O (Bob)
  await user.click(squares[2]); // X (Alfie)wins

  expect(screen.getByText(/Alfie won!/i)).toBeInTheDocument();

  // -----------------------------
  // Step 3: Reset and check board is clear
  // -----------------------------
  await user.click(screen.getByRole("button", { name: /Rematch!/i }));

  squares.forEach((square) => {
    expect(square).toHaveTextContent("");
  });

  // -----------------------------
  // Step 4: Play a draw round
  // -----------------------------
  await user.click(squares[0]); // X
  await user.click(squares[1]); // O
  await user.click(squares[2]); // X
  await user.click(squares[4]); // O
  await user.click(squares[3]); // X
  await user.click(squares[5]); // O
  await user.click(squares[7]); // X
  await user.click(squares[6]); // O
  await user.click(squares[8]); // X

  expect(screen.getByText(/It's a draw/i)).toBeInTheDocument();
});
