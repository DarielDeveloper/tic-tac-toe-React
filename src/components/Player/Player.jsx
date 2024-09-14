import "./Player.css";
import { useState } from "react";

export default function Player({
  player_name_initial,
  player_symbol,
  is_active,
}) {
  const [player_name, setPlayerName] = useState(player_name_initial);

  const [isEditing, setIsEditing] = useState(false);
  function handleClickButton() {
    /* React programa a futuro el cambio de estado por lo que de esta forma no es la recomendada setIsEditing(!isEditing);  */
    // setIsEditing(!isEditing);
    /* Esta es la mejor forma de setear el estado */

    setIsEditing((isEditing) => !isEditing);
  }

  function handleChangeInput(event) {
    /* Capturo el valor del input con el target que es el elemento y a este se le pide el value */
    setPlayerName(() => event.target.value);
  }
  const inputSpanName = isEditing ? (
    <input
      /* Capturo el evento, en este caso lo llamamos el object event, para posterior enviarlo a la función para setear el useState del nombre del jugador*/
      onChange={(event) => handleChangeInput(event)}
      type="text"
      className="inputName"
      required
      placeholder="Nombre"
      /* defaultValue se utiliza esta propiedad para que capte el valor y pueda editar el value del input en este caso  */
      value={player_name}
    />
  ) : (
    <span className="player-name">{player_name}</span>
  );

  const buttonSaveName = isEditing ? "Guardar" : "Cambiar";
  return (
    <li className={is_active ? "active" : ""}>
      <span className="player">
        {inputSpanName}
        <span className="player-symbol">{player_symbol}</span>
      </span>

      <button onClick={handleClickButton}>{buttonSaveName}</button>
    </li>
  );
}
