import "./App.css";

import Player from "./components/Player/Player.jsx";
import GameBoard from "./components/GameBoard/GameBoard.jsx";
import LongTurn from "./components/LongTurn/LongTurn.jsx";
import { useState } from "react";

/* Cuando se esta desarrollando se esta en desarrollo y react toma una medida de renderizar el componente 2 veces por cuestiones de seguridad para encontrar error en el código. Cuando se haga la compilación  el código pasa a producción y deja de renderizar 2 entre otras cosas */
/*
No es recomendado y es mala practica actualizar el estado de un componente con su estado  
 */
function App() {
  const [activePlayer, setActivePlayer] = useState("X");
  const [gameTurns, setGameTurns] = useState([]);

  function handlePickedSquare(rowIndex, colIndex) {
    debugger;
    setActivePlayer(() => (activePlayer === "X" ? "O" : "X"));
    /* OJO */
    //Prohibido actualizar el estado de un componente con otro estado
    setGameTurns((prevGameTurns) => {
      debugger;
      let actualSymbol =
        gameTurns.length > 0 && gameTurns[0].symbol == "X" ? "O" : "X";
      const actualGameTurns = [
        {
          square: {
            rowIndex: rowIndex,
            colIndex: colIndex,
          },
          symbol: actualSymbol,
        },
        ...prevGameTurns,
      ];

      return actualGameTurns;
    });
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
            gameTurns={gameTurns}
            onSelectSquare={handlePickedSquare}
          />
          <LongTurn gameTurns={gameTurns} />
        </div>
      </main>
    </>
  );
}

export default App;
