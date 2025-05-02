import Header from "./components/Header";
import Player from "./components/Player";

const players = {
  X: "Player 1",
  O: "Player 2",
};

const App = () => {
  return (
    <main>
      <Header />
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player playerName={players.X} symbol="X" />
          <Player playerName={players.O} symbol="O" />
        </ol>
      </div>
    </main>
  );
};

export default App;
