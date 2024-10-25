import "./App.css";

import Player from "./components/Player/Player.jsx";
import GameBoard from "./components/GameBoard/GameBoard.jsx";
import LongTurn from "./components/LongTurn/LongTurn.jsx";
import { WINNING_COMBINATIONS } from "./data/winningCombination.js";
import { useState } from "react";

/* Cuando se esta desarrollando se esta en desarrollo y react toma una medida de renderizar el componente 2 veces por cuestiones de seguridad para encontrar error en el código. Cuando se haga la compilación  el código pasa a producción y deja de renderizar 2 entre otras cosas */
/*
No es recomendado y es mala practica actualizar el estado de un componente con su estado  
*/
function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [playerName, setPlayerName] = useState({
    player1: "Player 1",
    player2: "Player 2",
  });

  function setHasWinner(prevGameTurns, newGameBoard) {
    if (prevGameTurns.length >= 4) {
      for (const combination of WINNING_COMBINATIONS) {
        let combinationWiner = {
          firstSymbol: newGameBoard[combination[0].row][combination[0].column],
          secundSymbol: newGameBoard[combination[1].row][combination[1].column],
          thirdSymbol: newGameBoard[combination[2].row][combination[2].column],
        };

        if (
          combinationWiner.firstSymbol == combinationWiner.secundSymbol &&
          combinationWiner.firstSymbol == combinationWiner.thirdSymbol
        ) {
          return { isWinner: true, combinationWiner: combination };
        }
      }
    }
    return { isWinner: false };
  }

  function symbolActualPlayer(gameTurns) {
    let playerSymbol =
      gameTurns.length > 0 && gameTurns[0].symbol == "X" ? "O" : "X";
    if (gameTurns[0]?.hasWinner.isWinner) {
      playerSymbol = gameTurns[0].symbol;
    }
    return playerSymbol;
  }

  //Actualizo la variable de control para el jugador activo
  const activePlayer = symbolActualPlayer(gameTurns);

  function handleChangeName(event, keyNamePlayer) {
    //Capturo el valor del input con el target que es el elemento y a este se le pide el value
    setPlayerName((...prevPlayer) => {
      //Hago una copia del objeto Player
      const prevPlayerName = { ...prevPlayer };
      //Validar para mantener el player que no se esta cambiando
      const otherKey = keyNamePlayer == "player1" ? "player2" : "player1";
      //Creo el nuevo Object de player para que cambie el estado
      const newPlayerName = {
        [keyNamePlayer]: event.target.value,
        [otherKey]: prevPlayerName[0][otherKey],
      };
      return newPlayerName;
    });
  }

  function handlePickedSquare(rowIndex, colIndex, gameBoard) {
    /* OJO */
    //Prohibido actualizar el estado de un componente con otro estado
    setGameTurns((prevGameTurns) => {
      const symbol = symbolActualPlayer(prevGameTurns);
      // Se hace una copia del tablero
      let newGameBoard = [...gameBoard];
      newGameBoard[rowIndex][colIndex] = symbol;
      //Se crea una nueva function para saber si hay un ganador y tener la function principal la mas limpia posible
      const hasWinner = setHasWinner(prevGameTurns, newGameBoard);

      //Creo el nuevo turno
      const actualGameTurns = [
        {
          square: {
            rowIndex: rowIndex,
            colIndex: colIndex,
          },
          symbol: symbol,
          hasWinner,
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
              handleChangeName={handleChangeName}
              player_name={playerName.player1}
              keyNamePlayer="player1"
              player_symbol="X"
            />
            <Player
              is_active={activePlayer === "O"}
              handleChangeName={handleChangeName}
              player_name={playerName.player2}
              keyNamePlayer="player2"
              player_symbol="O"
            />
          </ol>
          {/*onSelectSquare es para que el componente se entere cual es el símbolo */}
          <GameBoard
            gameTurns={gameTurns}
            onSelectSquare={handlePickedSquare}
          />
          <LongTurn gameTurns={gameTurns} playerName={playerName} />
        </div>
      </main>
    </>
  );
}

export default App;
