import "../GameBoard/GameBoard.css";

/* Se pone fuera del componente, porque cuando se renderiza se llama lo que se encuentra dentro  */
/* Forma correcta  para la matriz 3X3*/
const INITIAL_GAME_BOARD = [];
let winnerGame = false;

for (let i = 0; i < 3; i++) {
  INITIAL_GAME_BOARD.push(new Array(3).fill(null));
}
export default function GameBoard({ onSelectSquare, gameTurns }) {
  function isWinningSquare(rowIndex, colIndex) {
    if (gameTurns[0]?.hasWinner.isWinner) {
      return gameTurns[0].hasWinner.combinationWiner.some(
        (combination) =>
          combination.row === rowIndex && combination.column === colIndex
      );
    }
    return false;
  }
  /*  
  Forma incorrecta de declarar una matriz
  const INITIAL_GAME_BOARD = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
    ]; */

  /* Para actualizar el estado de un array o Object se debe ser de forma inmutable, es decir hacer una copia del array o Object */
  // /const [gamerBoard, setgamerBoard] = useState(INITIAL_GAME_BOARD);

  /*
  function handleCickSquare(rowIndex, colIndex) {
    //Para el control del estado esto se hace para elevar el estado y componente padre tenga control del estado que necesite este componente
    // onSelectSquare();
    
    //Forma correcta de actualizar el estado para tener presente lo anterior
    setgamerBoard((prevgamerBoard) => {
      //Se utiliza el operador Spread para hacer una copia de los valores anteriores para no sobrescribir los viejos.
      const updategamerBoard = [...prevgamerBoard.map((row) => [...row])];
      
      updategamerBoard[rowIndex][colIndex] = activePlayer;
      
      return updategamerBoard;
      });
      
      onSelectSquare();
      }*/
  const gameBoard = INITIAL_GAME_BOARD;

  for (const turn of gameTurns) {
    const { square, symbol, hasWinner } = turn;
    winnerGame = hasWinner.isWinner;
    if (winnerGame) {
      break;
    }
    const { rowIndex, colIndex } = square;
    gameBoard[rowIndex][colIndex] = symbol;
  }

  return (
    <ol id="gameBoard">
      {/* OJO con los () en el map después de la => que se pueden confundir en el seteo del código  */}
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((col, colIndex) => (
              <li key={colIndex}>
                <button
                  className={
                    isWinningSquare(rowIndex, colIndex) ? "winningSquare" : ""
                  }
                  /* Forma correcta de llamar la function cuando se active el evento click */
                  onClick={() => {
                    //Evitar que se sobrescriba el símbolo en una casilla que ya esta ocupada
                    if (gameBoard[rowIndex][colIndex] === null && !winnerGame) {
                      console.log(winnerGame);

                      onSelectSquare(rowIndex, colIndex, gameBoard);
                    }
                  }}
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
