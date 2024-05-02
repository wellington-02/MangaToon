import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IdMangaContext } from "../IdMangaContext";

import Star from "./Star";

const MangaPopular = ({ mangaId }) => {
  const { idManga, setIdManga } = useContext(IdMangaContext);
  const [tituloManga, setTituloManga] = useState("");
  const [imgManga, setImgManga] = useState("");
  const [altManga, setAltManga] = useState("");
  const [estrelasManga, setEstrelasManga] = useState(0);

  const estrelas = [...new Array(5).keys()].map((index) => index + 1);

  useEffect(() => {
    fetch(`http://localhost:5000/mangas/${mangaId}`)
      .then((resp) => {
        if (!resp.ok) {
          throw new Error("Falha ao carregar o manga");
        }
        return resp.json();
      })
      .then((manga) => {
        setTituloManga(manga.titulo);
        setImgManga(manga.img);
        setAltManga(manga.alt);
        setEstrelasManga(manga.estrelasManga);
      })
      .catch((err) => console.error(err));
  }, [mangaId]);

  return (
    <div className="pl">
      <div className="div-populares">
        <Link to={"/manga"}>
          <img
            src={imgManga}
            alt={altManga}
            className="imagem-popular"
            data-mangaid={mangaId}
            onClick={(e) => setIdManga(e.target.dataset.mangaid)}
          />
          <h3
            className="titulo-manga"
            data-mangaid={mangaId}
            onClick={(e) => {
              const mangaIdFromH3 = e.currentTarget.dataset.mangaid;
              setIdManga(mangaIdFromH3);
            }}
          >
            {tituloManga}
          </h3>
        </Link>
      </div>
      <div style={{ background: "transparent" }}>
        {estrelas.map((index) => (
          <Star
            className="estrela-sem-pointer"
            click={() => onClickEstrela(index)}
            key={`star_${index}`}
            isAtivo={index <= estrelasManga}
            width={15}
            height={15}
          />
        ))}
      </div>
    </div>
  );
};

export default MangaPopular;
