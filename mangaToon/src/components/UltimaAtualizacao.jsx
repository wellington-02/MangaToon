import MangaAtualizado from "./MangaAtualizado";
import "./UltimaAtualizacao.css";

const UltimaAtualizacao = () => {
  return (
    <div className="container-ultima-att">
      <h2 className="h2-ultimaAtt">Últimas Atualizações</h2>
      <div className="mangas-atualizados">
        <MangaAtualizado mangaId={"1"} />
        <MangaAtualizado mangaId={"2"} />
        <MangaAtualizado mangaId={"3"} />
        <MangaAtualizado mangaId={"4"} />
        <MangaAtualizado mangaId={"4"} />
      </div>
    </div>
  );
};

export default UltimaAtualizacao;
