import "./Menu.css";
import { useContext } from "react";

import { IdMangaContext } from "../IdMangaContext";
import {IdCapituloContext} from "../IdCapituloContext"

const Menu = () => {
  const { idManga, setIdManga } = useContext(IdMangaContext);
  const {setIdCapitulo} = useContext(IdCapituloContext)

  const limparContexts = () => {
    setIdManga("0");
    setIdCapitulo("0");
  };

  return (
    <div className="container-menu">
      <div>
        {idManga === "0" && <button className="botoes-menu">Menu</button>}
        {idManga !== "0" && <button className="botoes-menu" onClick={limparContexts}>Home</button>}
      </div>
      <div>
        <label>
          <input type="text" id="procurar-menu" placeholder="Procurar" />
        </label>
      </div>
      <div>
        <button className="botoes-menu">Login</button>
      </div>
    </div>
  );
};

export default Menu;
