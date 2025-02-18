import { createContext, useEffect, useState } from "react";
import { getPokemon } from "../api";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [user, setUser] = useState(null); 
    const [pokemons, setPokemons] = useState([]);

    useEffect(() => {
        getPokemon().then(setPokemons);
    }, []);

    return (
        <AppContext.Provider value={{ user, setUser, pokemons }}>
            {children}
        </AppContext.Provider>
    );
};
