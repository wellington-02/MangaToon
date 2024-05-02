import React, { useContext } from "react";

import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import { IdMangaContext, IdMangaContextProvider } from "./IdMangaContext.jsx";
import { IdCapituloContextProvider } from "./IdCapituloContext.jsx";

import { EstrelasMangaContextProvider } from "./EstrelasMangaContext.jsx";

import Home from "./routes/Home";
import TelaManga from "./routes/TelaManga.jsx";
import TelaCapitulos from "./routes/TelaCapitulos";

const PrivateRoute = ({ element, ...rest }) => {
  const { idManga } = useContext(IdMangaContext);

  return idManga === "0" ? <Navigate to="/" /> : element;
};

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/manga",
        element: <PrivateRoute element={<TelaManga />} />,
      },
      {
        path: "/capitulos",
        element: <PrivateRoute element={<TelaCapitulos />} />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <IdMangaContextProvider>
      <EstrelasMangaContextProvider>
        <IdCapituloContextProvider>
          <RouterProvider router={router} />
        </IdCapituloContextProvider>
      </EstrelasMangaContextProvider>
    </IdMangaContextProvider>
  </React.StrictMode>
);
