import { useContext } from "react";
import { IdMangaContext } from "../IdMangaContext";
import Manga from "../components/Manga";
import "./TelaManga.css";
import Capitulos from "../components/Capitulos";

const TelaManga = () => {
  const { idManga } = useContext(IdMangaContext);

  return (
    <div className="tela-manga">
      <Manga mangaId={idManga} />
      <Capitulos mangaId={idManga}/>
    </div>
  );
};

export default TelaManga;
