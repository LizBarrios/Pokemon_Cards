import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

export const api = axios.create({
  baseURL: API_URL,
});
 
export const getPokemon = async () => {
    try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();
        
        // Agregamos la URL de la imagen de cada Pokémon
        return data.results.map((pokemon, index) => ({
            id: index + 1,
            name: pokemon.name,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
        }));
    } catch (err) {
        console.error(err);
        return [];
    }
};

// Marcar un Pokémon como favorito
export const markAsFavorite = async (userId, pokemonId) => {
    try {
      const response = await fetch(`${API_URL}/favorites`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, pokemonId }),
      });
      return await response.json();
    } catch (error) {
      console.error("Error al marcar favorito:", error);
    }
  };
  
  // Obtener los Pokémon favoritos de un usuario
  export const getUserFavorites = async (userId) => {
    try {
      const response = await fetch(`${API_URL}/favorites/${userId}`);
      return await response.json();
    } catch (error) {
      console.error("Error al obtener favoritos:", error);
      return [];
    }
  };
