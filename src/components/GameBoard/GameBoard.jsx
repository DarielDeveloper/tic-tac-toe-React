import "../GameBoard/GameBoard.css";
import { useState } from "react";
export default function GameBoard({ onSelectSquare, activePlayer }) {
  const INITIAL_GAME_BOARD = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];

  /* Para actualizar el estado de un array o Object se debe ser de forma inmutable, es decir hacer una copia del array o Object */
  const [gamerBoard, setgamerBoard] = useState(INITIAL_GAME_BOARD);

  function handleCickSquare(rowIndex, colIndex) {
    //Para el control del estado esto se hace para elevar el estado y componente padre tenga control del estado que necesite este componente
    // onSelectSquare();

    //Se llama aquí para el control de las casillas validas y pueda pasar el turno al otro jugador
    onSelectSquare();
    if (!gamerBoard[rowIndex][colIndex]) {
      //Forma correcta de actualizar el estado para tener presente lo anterior
      setgamerBoard((prevgamerBoard) => {
        const updategamerBoard = [...prevgamerBoard.map((cols) => [...cols])];

        updategamerBoard[rowIndex][colIndex] = activePlayer;

        return updategamerBoard;
      });
    }
  }
  return (
    <ol id="gameBoard">
      {/* OJO con los () en el map después de la => que se pueden confundir en el seteo del código  */}
      {gamerBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((col, colIndex) => (
              <li key={colIndex}>
                <button
                  /* Forma correcta de llamar la function cuando se active el evento click */
                  onClick={() => handleCickSquare(rowIndex, colIndex)}
                >
                  {col}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
