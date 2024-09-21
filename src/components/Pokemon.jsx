import { PokemonAudio } from "./PokeAudio";
import typeColors from "../mocks/typeColors.json"

/* eslint-disable react/prop-types */
function PokemonEncontrado({ pokemon }) {

    const tipos = pokemon.tipos.map(tipo => tipo.type.name);

    const backgroundStyle = {
        background: getGradientByTypes(tipos),
    };

    return (
        <div className="pokemon" key={pokemon.id} style={backgroundStyle}>
            <h1>{pokemon.name.toUpperCase() + '!!'}</h1>
            <img src={pokemon.imagen} alt={pokemon.name} />
            
            <PokemonAudio pokemon={pokemon} />

            <ul className="tipo">
                <h3>El pokemon es de tipo:</h3>
                {pokemon.tipos.map(tipos => (
                    <li className="type" key={tipos.type.name}>
                        <p>{tipos.type.name}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}


function PokemonNoEncontrado (){
    return (<p>Pokemon no encontrado en la Pokedex 😢</p>)
}

export function Pokemon ({pokemon}) {
    const hasPokemon = pokemon && pokemon.id
    return(
        hasPokemon ? <PokemonEncontrado pokemon={pokemon} /> : <PokemonNoEncontrado/>
    )
}

function getGradientByTypes(types) {
    if (types.length === 1) {
        return `linear-gradient(135deg, ${typeColors[types[0]]}, ${typeColors[types[0]]} 100%)`;
    } else {
        // Si el Pokémon tiene más de un tipo, hacemos un degradado de dos colores
        return `linear-gradient(135deg, ${typeColors[types[0]]}, ${typeColors[types[1]]})`;
    }
}

