import { useContext } from "react";
import { AppContext } from "./context/AppContext";

const PokemonList = () => {
    const { pokemons } = useContext(AppContext);

    return (
        <div className="w-full max-w-7xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-center mb-6">Lista de Pokémons</h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {pokemons.map((pokemon) => (
                    <div key={pokemon.id} className="bg-white rounded-xl shadow-lg p-4 text-center border border-gray-200 hover:scale-105 transition-transform duration-300">
                        <img src={pokemon.image} alt={pokemon.name} className="w-32 h-32 mx-auto object-contain" />
                        <h3 className="mt-2 text-lg font-bold capitalize">{pokemon.name}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PokemonList;
