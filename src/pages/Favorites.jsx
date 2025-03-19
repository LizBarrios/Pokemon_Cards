import React, { useEffect, useState } from 'react';
import PokemonCard from '../components/PokemonCard';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('http://localhost:3000/src/favorite', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setFavorites(data);
        });
    }
  }, []);

  return (
    <div className="favorites-list w-full max-w-7xl mx-auto p-6">
      <h2 className="text-3xl text-white font-bold text-center mb-6">Favoritos</h2>
      {favorites.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {favorites.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} isFavorite={true} onFavoriteToggle={() => {}} />
          ))}
        </div>
      ) : (
        <p className="text-center text-red-400 font-bold text-xl mt-6">No tienes Pokémon favoritos.</p>
      )}
    </div>
  );
};

export default Favorites;