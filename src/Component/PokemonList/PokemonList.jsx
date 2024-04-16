import { useEffect, useState } from "react";
import axios from "axios";
import "./PokemonList.css";
import Pokemon from "../Pokemon/Pokemon";

const PokemonList = () => {
  // State for storing the list of Pokémon and loading status
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // State for managing the current and next URLs for fetching Pokémon data
  const [pokedexUrl, setPokedexUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
  const [nextUrl, setNextUrl] = useState('');
  const [prevUrl, setPrevUrl] = useState('');

  // Function to fetch Pokémon data from the API
  async function downloadPokemons(url) {
    setIsLoading(true);
    const response = await axios.get(url);
    const pokemonResults = response.data.results;
    setNextUrl(response.data.next);
    setPrevUrl(response.data.previous);

    const pokemonResultPromise = pokemonResults.map((pokemon) =>
      axios.get(pokemon.url)
    );

    const pokemonData = await axios.all(pokemonResultPromise);

    const pokeListResult = pokemonData.map((pokeData) => {
      const pokemon = pokeData.data;
      return {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.other.dream_world.front_default,
        types: pokemon.types,
      };
    });

    setPokemonList(pokeListResult);
    setIsLoading(false);
  }

  // Fetch Pokemon data when the component mounts or when the URL changes
  useEffect(() => {
    downloadPokemons(pokedexUrl);
  }, [pokedexUrl]);

  // Render the Pokemon list and navigation controls
  return (
    <div className="pokemon-list-wrapper">
      <div className="pokemon-wrapper">
        {isLoading
          ? "Loading..."
          : pokemonList.map((p) => (
              <Pokemon name={p.name} image={p.image} key={p.id} />
            ))}
      </div>
      <div className="controls">
        <button disabled={!prevUrl} onClick={() => setPokedexUrl(prevUrl)}>
          Prev
        </button>
        <button disabled={!nextUrl} onClick={() => setPokedexUrl(nextUrl)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default PokemonList;
