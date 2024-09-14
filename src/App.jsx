import "./App.css";

import Player from "./components/Player/Player.jsx";
import GameBoard from "./components/GameBoard/GameBoard.jsx";
import { useState } from "react";

/* Cuando se esta desarrollando se esta en desarrollo y react toma una medida de renderizar el componente 2 veces por cuestiones de seguridad para encontrar error en el código. Cuando se haga la compilación  el código pasa a producción y deja de renderizar 2 entre otras cosas */

function App() {
  const [activePlayer, setActivePlayer] = useState("X");

  function handlePickedSquare() {
    setActivePlayer(() => (activePlayer === "X" ? "O" : "X"));
  }
  return (
    <>
      <main>
        <div id="game-container">
          <ol id="playersContainer" className="highlight-player">
            <Player
              is_active={activePlayer === "X"}
              player_name_initial="Player 1"
              player_symbol="X"
            />
            <Player
              is_active={activePlayer === "O"}
              player_name_initial="Player 2"
              player_symbol="O"
            />
          </ol>
          {/*onSelectSquare es para que el componente se entere cual es el símbolo */}
          <GameBoard
            activePlayer={activePlayer}
            onSelectSquare={() => handlePickedSquare()}
          />
        </div>
      </main>
    </>
  );
}

export default App;
