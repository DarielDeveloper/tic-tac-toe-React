import "../GameOver/GameOver.css";

export default function GameOver({ title, resetGameBoard }) {
  return (
    <div id="game-over">
      <p>
        <button onClick={resetGameBoard}>{title}</button>
      </p>
    </div>
  );
}
