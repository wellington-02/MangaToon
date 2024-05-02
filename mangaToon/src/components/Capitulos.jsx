import React, { useContext, useEffect, useState } from "react";

import NumeroCapitulo from "./NumeroCapitulo";
import { Link } from "react-router-dom";
import { IdCapituloContext } from "../IdCapituloContext";

const Capitulos = ({ mangaId }) => {
  const { setIdCapitulo } = useContext(IdCapituloContext);
  const [capitulos, setCapitulos] = useState([]);
  const [tituloManga, setTituloManga] = useState("");

  const menorNumeroCapitulo = capitulos.reduce((menor, capitulo) => {
    return capitulo.numeroCapitulo < menor ? capitulo.numeroCapitulo : menor;
  }, Infinity);

  const onClickSetIdMenorNumero = () => {
    const capituloComMangaId = capitulos.filter(
      (capitulo) => capitulo.mangaId === mangaId
    );

    if (capituloComMangaId.length === 0) {
      console.log("Não há capítulos para o mangaId fornecido.");
      return;
    }

    const menorNumeroCapitulo2 = capituloComMangaId.reduce((menor, capitulo) => {
      return capitulo.numeroCapitulo < menor ? capitulo.numeroCapitulo : menor;
    }, Infinity);

    const idDoMenorCapitulo = capituloComMangaId.find(
      (capitulo) => capitulo.numeroCapitulo === menorNumeroCapitulo2
    ).id;

    setIdCapitulo(idDoMenorCapitulo);
  };

  const maiorNumeroCapitulo = capitulos.reduce((maior, capitulo) => {
    return capitulo.numeroCapitulo > maior ? capitulo.numeroCapitulo : maior;
  }, -Infinity);

  const onClickSetIdMaiorNumero = () => {
    const capituloComMangaId = capitulos.filter(
      (capitulo) => capitulo.mangaId === mangaId
    );

    if (capituloComMangaId.length === 0) {
      console.log("Não há capítulos para o mangaId fornecido.");
      return;
    }

    const maiorNumeroCapitulo2 = capituloComMangaId.reduce((maior, capitulo) => {
      return capitulo.numeroCapitulo > maior ? capitulo.numeroCapitulo : maior;
    }, -Infinity);

    const idDoUltimoCapitulo = capituloComMangaId.find(
      (capitulo) => capitulo.numeroCapitulo === maiorNumeroCapitulo2
    ).id;

    setIdCapitulo(idDoUltimoCapitulo);
  };

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
      })
      .catch((err) => console.error(err));
  }, [mangaId]);

  return (
    <div className="capitulos-container">
      <div>
        <h2 id="capitulo-titulo">Capítulos de {tituloManga}</h2>
      </div>

      <div className="container-botoes">
        <Link
          to={"/capitulos"}
          className="botoes-primeiro-ultimo"
          onClick={onClickSetIdMenorNumero}
        >
          Primeiro Capítulo
          <span>Capítulo {menorNumeroCapitulo}</span>
        </Link>
        <Link
          to={"/capitulos"}
          className="botoes-primeiro-ultimo"
          onClick={onClickSetIdMaiorNumero}
        >
          Novo Capítulo
          <span>Capítulo {maiorNumeroCapitulo}</span>
        </Link>
      </div>

      <div className="container-capitulos-manga">
        <ul>
          {capitulos
            .sort((a, b) => b.numeroCapitulo - a.numeroCapitulo)
            .map((capitulo) => (
              <NumeroCapitulo
                key={capitulo.id}
                capituloId={capitulo.id}
                classLi={"capitulos-manga"}
              />
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Capitulos;
