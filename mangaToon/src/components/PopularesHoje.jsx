import { useEffect, useState } from "react";
import "./PopularesHoje.css";
import MangaPopular from "./MangaPopular";


const PopularesHoje = () => {

  return (
    <div className="container-pupalar">
      <h2 id="titulo">Mangas Mais Pulares de hoje</h2>
      <div className="mangas-populares">
        <MangaPopular mangaId={"1"}/>
        <MangaPopular mangaId={"2"}/>
        <MangaPopular mangaId={"3"}/>
        <MangaPopular mangaId={"4"}/>
      </div>
    </div>
  );
};

export default PopularesHoje;
