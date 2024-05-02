import { createContext, useState } from "react";

export const IdMangaContext = createContext();

export const IdMangaContextProvider = ({ children }) => {
  const [idManga, setIdManga] = useState("0");

  return (
    <IdMangaContext.Provider value={{idManga, setIdManga}}>
      {children}
    </IdMangaContext.Provider>
  );
};