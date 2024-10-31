import "../LongTurn/LongTurn.css";

export default function LongTurns({ gameTurns, playerName }) {
  let msgWinner = gameTurns[0]?.hasWinner.isWinner
    ? `El jugador ${
        gameTurns[0].symbol == "X" ? playerName.player1 : playerName.player2
      } es el ganador de la partida.`
    : "";
  return (
    <>
      <ol id="logTurns">
        <p>{msgWinner}</p>
        {gameTurns.map((turn, index) => {
          let { rowIndex, colIndex } = turn.square;
          return (
            <li key={index}>
              <p>Turno: {gameTurns.length - index} </p>
              <p>
                {gameTurns.length - index == 9 && <h1>Juego Empatado</h1>}
                El jugador{" "}
                {turn.symbol == "X"
                  ? playerName.player1
                  : playerName.player2}{" "}
                jugo en las coordenadas: [{rowIndex}, {colIndex}]
              </p>
            </li>
          );
        })}
      </ol>
    </>
  );
}
