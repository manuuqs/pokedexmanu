/* eslint-disable react/prop-types */
import { useRef, useEffect } from "react";

export function PokemonAudio({ pokemon }) {
    const audioRef = useRef(null);
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = 0.15; // Ajustar el volumen a un 50%
        }
    }, []);
    return (
        <audio ref={audioRef} autoPlay>
            <source src={pokemon.sonido} type="audio/ogg" />
        </audio>
    );
}
