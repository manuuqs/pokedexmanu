import { useRef, useState, useEffect, useCallback } from 'react'
import './App.css'
import { Pokemon } from './components/Pokemon'
import { usePokemon } from './hooks/usePokemon'
import debounce from 'just-debounce-it'


function useSearch () {
  const [search, updateSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {
  if (isFirstInput.current) {
    isFirstInput.current = search === ''
    return
  }

  if (search === '') {
    setError('No se puede buscar un pokemon vacio')
    return
  }

  setError(null)
}, [search])

return { search, updateSearch, error }
}




function App() {

  const { search, updateSearch, error: searchError } = useSearch()
  const { pokemon, loading, getPokemon, error } = usePokemon({ search })

 // const handleSubmit = (event) => {
 //   event.preventDefault()
  //  getPokemon({ search })
  //}

  const debouncedGetPokemon = useCallback(
    debounce((search) => {
      getPokemon({ search });
    }, 300),
    [getPokemon]
  );

  const handleChange = (event) => {
    const newSearch = event.target.value;
    updateSearch(newSearch);

    if (newSearch.length > 2) {
      // Solo ejecutamos la búsqueda cuando hay más de 2 caracteres
      debouncedGetPokemon(newSearch);
    }
  };

  return (
    <div className='page'>
      <header>
        <h1>POKEDEX</h1>
        <form className='form' onSubmit={(e) => e.preventDefault()}>
        <input
            style={{
              border: '1px solid transparent',
              borderColor: searchError ? 'red' : 'transparent'
            }}
             onChange={handleChange} value={search} name='query' placeholder='Pikachu, Charmander, Wartortle...'
          />
       
        </form>
      </header>
      <main>
        {loading && <p>Buscando Pokémon...</p>}

        {!loading && error && <p>{error}</p>} {/* Mostrar el error */}

        {!loading && !error && pokemon && <Pokemon pokemon={pokemon} />} {/* Mostrar el Pokémon solo si no hay error y existe */}
      </main>
    </div>
  )
}
//    <button type='submit'>Encontrar Pokemon</button>

export default App