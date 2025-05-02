type PlayerProps = {
  playerName: string;
  symbol: "X" | "O";
};

const Player = ({ playerName, symbol }: PlayerProps) => {
  return (
    <li>
      <span className="player">
        {playerName}
        <span className="player-symbol">{symbol}</span>
        <button>Edit</button>
      </span>
    </li>
  );
};

export default Player;
