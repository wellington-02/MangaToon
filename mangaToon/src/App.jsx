import { Outlet } from "react-router-dom";

import "./App.css";
import Menu from "./components/Menu";


function App() {
  return (
    <div className="App">
      <Menu />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
