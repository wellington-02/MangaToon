import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import NumeroCapitulo from "./NumeroCapitulo";

import { IdMangaContext } from "../IdMangaContext";

const MangaAtualizado = ({ mangaId }) => {
  const { idManga, setIdManga } = useContext(IdMangaContext);

  const [tituloManga, setTituloManga] = useState("");
  const [imgManga, setImgManga] = useState("");
  const [capitulos, setCapitulos] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/mangas/${mangaId}`)
      .then((resp) => {
        if (!resp.ok) {
          throw new Error("Falha ao carregar o manga");
        }
        return resp.json();
      })
      .then((data) => {
        setTituloManga(data.titulo);
        setImgManga(data.img);
      })
      .catch((err) => console.error(err));
  }, [mangaId]);

  useEffect(() => {
    fetch(`http://localhost:5000/capitulos?mangaId=${mangaId}`)
      .then((resp) => {
        if (!resp.ok) {
          throw new Error("Falha ao carregar os capitulos");
        }
        return resp.json();
      })
      .then((data) => {
        setCapitulos(data);
      })
      .catch((err) => console.error(err));
  }, [mangaId]);

  return (
    <div className="att">
      <Link to="/manga">
        <img
          src={imgManga}
          alt="imagem omniscient readers viewpoint"
          className="imagem-att"
          data-mangaid={mangaId}
          onClick={(e) => setIdManga(e.target.dataset.mangaid)}
        />
      </Link>
      <div className="textos" style={{ display: "grid", gap: "25px" }}>
        <Link to="/manga">
          <h3
            className="titulo-mangaAtt"
            data-mangaid={mangaId}
            onClick={(e) => {
              const mangaIdFromH3 = e.currentTarget.dataset.mangaid;
              setIdManga(mangaIdFromH3);
            }}
          >
            {tituloManga}
          </h3>
        </Link>
        <ul>
          {capitulos
            .sort((a, b) => b.numeroCapitulo - a.numeroCapitulo)
            .slice(0, 3)
            .map((capitulo) => (
              <NumeroCapitulo
                key={capitulo.id}
                capituloId={capitulo.id}
                classLi={"opacidade-capitulos"}
              />
            ))}
        </ul>
      </div>
    </div>
  );
};

export default MangaAtualizado;
