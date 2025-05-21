import { screen, render } from "@testing-library/react";
import GameOver from "../../components/GameOver";
import userEvent from "@testing-library/user-event";

describe("winner name is displayeds", () => {
  const mockRestart = vi.fn();
  const user = userEvent.setup();
  test("winner is display if player symbol received", () => {
    render(<GameOver winner="Player 1" onRestart={mockRestart} />);
    const winner = screen.getByText(/Player 1 won!/i);
    expect(winner).toBeInTheDocument();
  });
  test("draw dispplayed if no winner", () => {
    render(<GameOver winner={undefined} onRestart={mockRestart} />);
    const winner = screen.getByText(/Draw/i);
    expect(winner).toBeInTheDocument();
  });
  test("mockRestart is called when restart clicked ", async () => {
    render(<GameOver winner={undefined} onRestart={mockRestart} />);
    const restartButton = screen.getByRole("button", { name: /rematch/i });
    await user.click(restartButton);
    expect(mockRestart).toHaveBeenCalled();
  });
});
