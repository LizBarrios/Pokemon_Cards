import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PokemonCard from "../components/PokemonCard";

const API_BASE_URL = "http://localhost:3000/src/favorite"; // Asegura que sea la URL correcta

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const search = searchParams.get("search") || "";

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
      })
      .catch((error) => console.error("Error al obtener los Pokémon:", error));

    const token = localStorage.getItem("token");
    if (token) {
      fetch(API_BASE_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) throw new Error("Error al obtener favoritos");
          return response.json();
        })
        .then((data) => setFavorites(data))
        .catch((error) => console.error(error.message));
    }
  }, []);

  const toggleFavorite = (pokemon) => {
    const token = localStorage.getItem("token");
    if (!token) return;
  
    const isAlreadyFavorite = favorites.some((fav) => fav.pokemonId === pokemon.id);
    const method = isAlreadyFavorite ? "DELETE" : "POST";
    const endpoint = `http://localhost:3000/src/favorite/${pokemon.id}`;
  
    fetch(endpoint, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Error al actualizar favoritos");
        return response.json();
      })
      .then(() => {
        setFavorites((prevFavorites) => {
          if (isAlreadyFavorite) {
            return prevFavorites.filter((fav) => fav.pokemonId !== pokemon.id);
          } else {
            return [...prevFavorites, { pokemonId: pokemon.id }];
          }
        });
      })
      .catch((error) => console.error("Error al actualizar favoritos:", error));
  };
  

  const filteredPokemons = pokemons.filter(
    (pokemon) =>
      pokemon.name.toLowerCase().includes(search.toLowerCase()) ||
      pokemon.id.toString() === search
  );

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <h1 className="text-3xl text-white font-bold text-center mb-6">
        Lista de Pokémons
      </h1>

      {filteredPokemons.length === 0 && search ? (
        <div className="text-center text-red-400 font-bold text-xl mt-6">
          ❌ No se encontró ningún Pokémon con el nombre o ID:{" "}
          <span className="text-yellow-300">{search}</span>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {filteredPokemons.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              isFavorite={favorites.some((fav) => fav.pokemonId === pokemon.id)}
              onFavoriteToggle={toggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PokemonList;
