import React from 'react';

const PokemonCard = ({ pokemon, isFavorite, onFavoriteToggle }) => {
  return (
    <div className="pokemon-card relative bg-white p-4 rounded-lg shadow-lg">
      <button
        onClick={() => onFavoriteToggle(pokemon)}
        className="absolute top-2 right-2 p-2 rounded-full transition-colors duration-300"
        style={{
          background: 'transparent', // Asegura que el fondo sea transparente
          border: 'none', // Sin bordes
          display: 'flex', // Alinea correctamente el corazón
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span className={`text-2xl ${isFavorite ? 'text-red-500' : 'text-gray-400'}`}>
          {isFavorite ? '❤️' : '🤍'}
        </span>
      </button>
      <img src={pokemon.image} alt={pokemon.name} className="w-full h-32 object-contain mb-4" />
      <h3 className="text-lg font-bold text-center">{pokemon.name}</h3>
    </div>
  );
};


export default PokemonCard;