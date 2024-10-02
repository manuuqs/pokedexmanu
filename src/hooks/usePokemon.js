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

            if(!newPokemon){
              setPokemon(null)
              setError("Pokemon no encontrado en la Pokedex 😢")
            }else{
              setPokemon(newPokemon)
              setError(null)
            }

          // eslint-disable-next-line no-unused-vars
          } catch (e) {
            setError("Pokemon no encontrado en la Pokedex 😢");
            setPokemon(null)
          } finally {
            setLoading(false);
          }

    }, [])

    return {pokemon, getPokemon, loading, error}
}