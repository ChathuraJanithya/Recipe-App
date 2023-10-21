import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginScreen from "./components/LoginScreen";
import Registerscreen from "./components/RegisterScreen";
import ItemCartScreen from "./components/ItemCartScreen";
import FavoriteSecreen from "./components/FavoriteScreen";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/register" element={<Registerscreen />} />
          <Route path="/cart" element={<ItemCartScreen />} />
          <Route path="/favorite" element={<FavoriteSecreen />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
