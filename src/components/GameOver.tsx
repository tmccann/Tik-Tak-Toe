type gameOverProps = {
  winner: string | undefined;
  onRestart: () => void;
};

export default function GameOver({ winner, onRestart }: gameOverProps) {
  return (
    <div id="game-over">
      <h2>Game Over!</h2>
      {winner && <p>{winner} won!</p>}
      {!winner && <p>It's a draw!</p>}
      <span>
        <button onClick={onRestart}>Rematch!</button>
      </span>
    </div>
  );
}
