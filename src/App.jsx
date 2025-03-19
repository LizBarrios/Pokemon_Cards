import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import PokemonList from "../pages/PokemonList.jsx";
import Navbar from "../components/Navbar.jsx";
import Login from "./pages/Login.jsx";


const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/pokemons" element={<PokemonList />} />
      </Routes>
    </div>
  );
};

export default App;
