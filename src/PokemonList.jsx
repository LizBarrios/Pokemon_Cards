import { useEffect, useState } from "react";

const PokemonList = () => {
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=10")
      .then((response) => response.json())
      .then((data) => {
        const fetches = data.results.map((p) =>
          fetch(p.url).then((res) => res.json())
        );
        Promise.all(fetches).then((pokeData) => setPokemon(pokeData));
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold mb-6">Lista de Pokémon</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {pokemon.map((p) => (
          <div
            key={p.id}
            className="bg-white shadow-md rounded-xl p-4 flex flex-col items-center hover:scale-105 transition-transform"
          >
            <img
              src={p.sprites.front_default}
              alt={p.name}
              className="w-24 h-24 mb-2"
            />
            <h2 className="text-lg font-semibold capitalize">{p.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonList;
