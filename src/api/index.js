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
