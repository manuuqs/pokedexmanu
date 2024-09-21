export const  searchPokemon = async ({search}) => {
    if(search === '') return null

    try{
        const nombrePokemon = search.toLowerCase()
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombrePokemon}`)
        const pokemon = await response.json()
       // console.log('search ', pokemon)
        return {
                id: pokemon.id,
                name: pokemon.name,
                imagen: pokemon.sprites.front_default,
                sonido: pokemon.cries.latest,
                tipos: pokemon.types 
            }          
        

    }catch(e){
        throw new Error('Error searching pokemones')
    }
}