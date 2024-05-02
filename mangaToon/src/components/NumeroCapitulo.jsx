import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";

import { IdCapituloContext } from "../IdCapituloContext";
import { IdMangaContext } from "../IdMangaContext";

const NumeroCapitulo = ({ capituloId, classLi }) => {
  const { setIdCapitulo } = useContext(IdCapituloContext);
  const { idManga, setIdManga } = useContext(IdMangaContext);
  const [numeroCapitulo, setNumeroCapitulo] = useState(0);

  const onClickSetIdCapitulo = () => {
    setIdCapitulo(capituloId);
  };

  useEffect(() => {
    fetch("http://localhost:5000/capitulos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        const capitulo = data.find((m) => m.id === capituloId);
        if (capitulo) {
          setNumeroCapitulo(capitulo.numeroCapitulo);
          setIdManga(capitulo.mangaId)
        }
      })
      .catch((err) => console.log(err));
  }, [capituloId]);

  return (
    <li className={classLi}>
      <Link to={"/capitulos"} onClick={onClickSetIdCapitulo}>
        Capítulo {numeroCapitulo}
      </Link>
    </li>
  );
};

export default NumeroCapitulo;
