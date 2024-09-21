import { useState, useRef, useCallback } from "react";
import { searchPokemon } from "../services/pokemonApi";

export function usePokemon({search}) {
    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const previousSearch = useRef(search);

    const getPokemon = useCallback(async ({search}) => {

        try {
            setLoading(true);
            setError(null);
            previousSearch.current = search;
            const newPokemon = await searchPokemon({ search }); // Añadido await
            setPokemon(newPokemon);
            console.log('search 2', newPokemon)
          } catch (e) {
            setError(e.message);
          } finally {
            setLoading(false);
          }

    }, [])

    return {pokemon, getPokemon, loading, error}
}