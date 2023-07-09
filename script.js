const pokemonContainer = document.querySelector('.pokemon-container')
const searchForm = document.querySelector('form')
const searchInput = document.querySelector('input[type="search"]')

searchForm.addEventListener('submit', function(event) {
  event.preventDefault()
  const searchText = searchInput.value.toLowerCase()
  searchPokemon(searchText)
})
//Solicitudes
function fetchPokemon(id) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then(res => res.json())
    .then(data => {
      createPokemon(data)
    })
}
function fetchPokemons(number) {
  for (let i = 1; i <= number; i++) {
    fetchPokemon(i)
  }
}
function createPokemon(pokemon) {
  const card = document.createElement('div')
  card.classList.add('pokemon-block', 'pokemon-card')
  const spriteContainer = document.createElement('div')
  spriteContainer.classList.add('img-container', 'pokemon-content')
  const sprite = document.createElement('img')
  sprite.src = pokemon.sprites.front_default
  spriteContainer.appendChild(sprite)
  const number = document.createElement('p')
  number.textContent = `#${pokemon.id.toString().padStart(3, 0)}`
  number.classList.add('pokemon-content')
  const name = document.createElement('p')
  name.classList.add('name', 'pokemon-content')
  name.textContent = pokemon.name

  card.appendChild(spriteContainer)
  card.appendChild(number)
  card.appendChild(name)
  pokemonContainer.appendChild(card)
}
function searchPokemon(searchText) {
    const pokemonBlocks = Array.from(document.querySelectorAll('.pokemon-block'))
    // Ocultar todos los bloques de pokemon
    pokemonBlocks.forEach(block => {
      block.style.display = 'none'
    })
    // Filtrar pokemon
    const filteredPokemonBlocks = pokemonBlocks.filter(block => {
      const name = block.querySelector('.name').textContent.toLowerCase()
      return name.includes(searchText)
    })
    // Mostrar pokemon filtrados
    filteredPokemonBlocks.forEach(block => {
      block.style.display = 'block'
    })
  }
fetchPokemons(30) //Muestra primeros 30 pokemon
