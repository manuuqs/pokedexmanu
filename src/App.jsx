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

  const { search, updateSearch, error } = useSearch()
  const { pokemon, loading, getPokemon } = usePokemon({ search })

  const handleSubmit = (event) => {
    event.preventDefault()
    getPokemon({ search })
  }

  const debouncedGetPokemon = useCallback(
    debounce(search => {
      console.log('pokemon buscado: ', search)
      getPokemon({ search })
    }, 300)
    , [getPokemon]
  )

  const handleChange = (event) => {
    const newSearch = event.target.value
    updateSearch(newSearch)
    debouncedGetPokemon(newSearch)
  }

  return (
    <div className='page'>
      <header>
        <h1>POKEDEX</h1>
        <form className='form' onSubmit={handleSubmit}>
        <input
            style={{
              border: '1px solid transparent',
              borderColor: error ? 'red' : 'transparent'
            }}
             onChange={handleChange} value={search} name='query' placeholder='Pikachu, Charmander, Wartortle...'
          />
       
        </form>
      </header>
      <main>
        {
          loading ? <p>Buscando Pokemon...</p> : <Pokemon pokemon={pokemon} />
        }
      </main>
    </div>
  )
}
//    <button type='submit'>Encontrar Pokemon</button>

export default App