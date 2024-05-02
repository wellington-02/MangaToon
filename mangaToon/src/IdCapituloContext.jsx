import { createContext, useState } from "react";

export const IdCapituloContext = createContext();

export const IdCapituloContextProvider = ({ children }) => {
  const [idCapitulo, setIdCapitulo] = useState("5");

  return (
    <IdCapituloContext.Provider value={{ idCapitulo, setIdCapitulo }}>
      {children}
    </IdCapituloContext.Provider>
  );
};
