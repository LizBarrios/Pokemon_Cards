import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const search = searchParams.get("search") || ""; // Obtener el parámetro de búsqueda

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then((response) => response.json())
      .then((data) => {
        const formattedPokemons = data.results.map((p, index) => ({
          id: index + 1,
          name: p.name,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
        }));
        setPokemons(formattedPokemons);
      });
  }, []);

  // Filtrar los Pokémon por nombre o ID
  const filteredPokemons = pokemons.filter(
    (pokemon) =>
      pokemon.name.toLowerCase().includes(search.toLowerCase()) ||
      pokemon.id.toString() === search
  );

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <h1 className="text-3xl text-white font-bold text-center mb-6">Lista de Pokémons</h1>

      {/* Si no hay resultados, mostrar un mensaje */}
      {filteredPokemons.length === 0 && search ? (
        <div className="text-center text-red-400 font-bold text-xl mt-6">
          ❌ No se encontró ningún Pokémon con el nombre o ID: <span className="text-yellow-300">{search}</span>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {filteredPokemons.map((pokemon) => (
            <div
              key={pokemon.id}
              className="bg-white rounded-xl shadow-lg p-4 text-center border border-gray-200 hover:scale-105 transition-transform duration-300"
            >
              <span className="text-gray-500 font-bold">#{pokemon.id}</span>
              <img
                src={pokemon.image}
                alt={pokemon.name}
                className="w-32 h-32 mx-auto object-contain"
              />
              <h3 className="mt-2 text-lg font-bold capitalize">{pokemon.name}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PokemonList;
