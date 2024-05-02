import { useContext, useEffect, useState } from "react";
import { IdMangaContext } from "../IdMangaContext";
import { IdCapituloContext } from "../IdCapituloContext";

import "./TelaCapitulo.css";

const TelaCapitulos = () => {
  const { idCapitulo, setIdCapitulo } = useContext(IdCapituloContext);
  const { idManga, setIdManga } = useContext(IdMangaContext);
  const [tituloCapitulo, setTituloCapitulo] = useState("");
  const [numeroCapitulo, setNumeroCapitulo] = useState("");
  const [imagemCapitulo, setImagemCapitulo] = useState("");
  const [imagemCapituloBr, setImagemCapituloBr] = useState("");

  const [capitulos, setCapitulos] = useState([]);

  const [botaoAnteriorDesabilitado, setBotaoAnteriorDesabilitado] =
    useState(false);

  const [botaoProximoDesabilitado, setBotaoProximoDesabilitado] =
    useState(false);

  const menorNumeroCapitulo = capitulos.reduce((menor, capitulo) => {
    return capitulo.numeroCapitulo < menor ? capitulo.numeroCapitulo : menor;
  }, Infinity);

  const idAnterior = (id) => {
    if (numeroCapitulo === menorNumeroCapitulo) {
      setBotaoAnteriorDesabilitado(true);
    } else {
      const idCapituloAtual = parseInt(id, 10);
      if (!isNaN(idCapituloAtual)) {
        const idAnterior = idCapituloAtual - 1;
        const idAnteriorString = idAnterior.toString();

        setIdCapitulo(idAnteriorString);
        setBotaoProximoDesabilitado(false);
      } else {
        console.log("O idCapitulo não representa um número válido.");
      }
    }
  };

  const onClickVoltarCapitulo = () => {
    idAnterior(idCapitulo);
  };

  const maiorNumeroCapitulo = capitulos.reduce((maior, capitulo) => {
    return capitulo.numeroCapitulo > maior ? capitulo.numeroCapitulo : maior;
  }, -Infinity);

  const proximoId = (id) => {
    if (numeroCapitulo >= maiorNumeroCapitulo) {
      setBotaoProximoDesabilitado(true);
    } else {
      const idCapituloAtual = parseInt(id, 10);
      if (!isNaN(idCapituloAtual)) {
        const idProximo = idCapituloAtual + 1;
        const idProximoString = idProximo.toString();

        setIdCapitulo(idProximoString);
        setBotaoAnteriorDesabilitado(false);
      } else {
        console.log("O idCapitulo não representa um número válido.");
      }
    }
  };

  const onClickProximoCapitulo = () => {
    proximoId(idCapitulo);
  };

  useEffect(() => {
    fetch(`http://localhost:5000/capitulos?id=${idCapitulo}`)
      .then((resp) => {
        if (!resp.ok) {
          throw new Error("Falha ao carregar o capitulo");
        }
        return resp.json();
      })
      .then((data) => {
        if (data.length !== 0) {
          console.log(data);
          setTituloCapitulo(data[0].tituloCapitulo);
          setNumeroCapitulo(data[0].numeroCapitulo);
          setImagemCapitulo(data[0].imgCapitulo);
          setImagemCapituloBr(data[0].imgCapituloBr);
          setIdManga(data[0].mangaId);
        }
      })
      .catch((err) => console.error(err));
  }, [idCapitulo]);

  useEffect(() => {
    fetch(`http://localhost:5000/capitulos?mangaId=${idManga}`)
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
  }, [idManga]);

  return (
    <div className="container-capitulo-manga">
      <h2 id="capitulo-manga-h2">
        {tituloCapitulo} Capítulo {numeroCapitulo}
      </h2>
      <div className="container-botoes-capitulo-manga">
        <button
          className="botoes-capitulo-manga"
          onClick={onClickVoltarCapitulo}
          disabled={botaoAnteriorDesabilitado}
        >
          {`<`} Capítulo Anterior
        </button>
        <button
          className="botoes-capitulo-manga"
          onClick={onClickProximoCapitulo}
          disabled={botaoProximoDesabilitado}
        >
          Próximo capítulo {`>`}
        </button>
      </div>
      <div id="container-imagem-capitulo">
        <img src={imagemCapitulo} id="img-capitulo-manga" />
        <img src={imagemCapituloBr} id="img-capitulo-manga" />
      </div>
    </div>
  );
};

export default TelaCapitulos;
