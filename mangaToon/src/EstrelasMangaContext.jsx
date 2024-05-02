import { createContext, useState } from "react";

export const EstrelasMangaContext = createContext();

export const EstrelasMangaContextProvider = ({ children }) => {
  const [estrelasManga, setEstrelasManga] = useState();

  return (
    <EstrelasMangaContext.Provider value={{estrelasManga, setEstrelasManga}}>
      {children}
    </EstrelasMangaContext.Provider>
  );
};