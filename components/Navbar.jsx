import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (search.trim() !== "") {
      navigate(`/pokemons?search=${search}`);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-pink-600 to-purple-700 p-4 flex justify-between items-center shadow-md">
      <div className="flex space-x-6">
        <a href="/home" className="text-white font-bold text-lg drop-shadow-md hover:text-yellow-300 transition duration-300">
          Home
        </a>
        <a href="/pokemons" className="text-white font-bold text-lg drop-shadow-md hover:text-yellow-300 transition duration-300">
          Pokemons
        </a>
      </div>
      <div className="flex space-x-2">
        <input
          type="text"
          className="p-2 rounded bg-purple-200 text-gray-800 placeholder-gray-600 font-bold focus:outline-none focus:ring-2 focus:ring-pink-400"
          placeholder="Buscar Pokémon..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()} 
        />
        <button 
          onClick={handleSearch} 
          className="bg-purple-600 hover:bg-purple-800 text-white px-4 py-2 rounded transition-all duration-300"
        >
          Search
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
