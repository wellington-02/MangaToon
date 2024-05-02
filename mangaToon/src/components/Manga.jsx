import { useEffect, useState, useContext } from "react";
import Star from "./Star";
import axios from "axios";
import "./PopularesHoje.css"

import { EstrelasMangaContext } from "../EstrelasMangaContext";

const Manga = ({ mangaId }) => {
  const [tituloManga, setTituloManga] = useState("");
  const [imgManga, setImgManga] = useState("");
  const [altManga, setAltManga] = useState("");
  const [sinopseManga, setSinopseManga] = useState("");

  const { estrelasManga, setEstrelasManga } = useContext(EstrelasMangaContext);
  const estrelas = [...new Array(5).keys()].map((index) => index + 1);

  const onClickEstrela = (index) => {
    setEstrelasManga((prev) => (prev === index ? undefined : index));

    axios
      .patch(`http://localhost:5000/mangas/${mangaId}`, {
        estrelasManga: index,
      })
      .then((response) => {
        console.log("PATCH request successful:", response.data);
      })
      .catch((error) => {
        console.error("Error making PATCH request:", error);
      });
  };

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
        setSinopseManga(manga.sinopse);
        setEstrelasManga(manga.estrelasManga);
      })
      .catch((err) => console.error(err));
  }, [mangaId]);

  return (
    <div className="container-manga">
      <img src={imgManga} alt={altManga} className="imagem-manga" />
      <div className="texto-manga">
        <h3 className="nome-manga">{tituloManga}</h3>
        <p>{sinopseManga}</p>
        {estrelas.map((index) => (
          <Star
            click={() => onClickEstrela(index)}
            key={`star_${index}`}
            isAtivo={index <= estrelasManga}
            width={30}
            height={30}
            cursor={"pointer"}
          />
        ))}
      </div>
    </div>
  );
};

export default Manga;
