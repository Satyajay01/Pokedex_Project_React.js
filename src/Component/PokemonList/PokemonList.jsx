import { useEffect, useState } from "react";
import axios from "axios";
import "./PokemonList.css";
import Pokemon from "../Pokemon/Pokemon";

const PokemonList = () => {
  const [pokemonListState, setPokemonListState] = useState({
    pokemonList: [],
    isLoading: true,
    pokedexUrl: "https://pokeapi.co/api/v2/pokemon/",
    nextUrl: "",
    prevUrl: "",
  });

  // Function to fetch Pokémon data from the API
  async function downloadPokemons(url) {
    setPokemonListState((state) => ({ ...state, isLoading: true }));
    const response = await axios.get(pokemonListState.pokedexUrl); // This downloads list of 20 pokemon.

    const pokemonResults = response.data.results;

    // setNextUrl(response.data.next);
    setPokemonListState((state) => ({
      ...state,
      nextUrl: response.data.next,
      prevUrl: response.data.previous,
    }));

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

    // setPokemonList(pokeListResult);
    setPokemonListState((state) => ({
      ...state,
      pokemonList: pokeListResult,
      isLoading: false,
    }));
    // setIsLoading(false);
  }

  // Fetch Pokemon data when the component mounts or when the URL changes
  useEffect(() => {
    downloadPokemons();
  }, [pokemonListState.pokedexUrl]);

  // Render the Pokemon list and navigation controls
  return (
    <div className="pokemon-list-wrapper">
      <div className="pokemon-wrapper">
        {pokemonListState.isLoading
          ? "Loading..."
          : pokemonListState.pokemonList.map((p) => (
              <Pokemon name={p.name} image={p.image} id={p.id} key={p.id} />
            ))}
      </div>
      <div className="controls">
        <button disabled={pokemonListState.prevUrl == null}onClick={() =>setPokemonListState({...pokemonListState,pokedexUrl: pokemonListState.prevUrl,})}>Prev</button>

        <button disabled={pokemonListState.nextUrl == null}onClick={() =>setPokemonListState({...pokemonListState,pokedexUrl: pokemonListState.nextUrl,})}>Next</button>
      </div>
    </div>
  );
};

export default PokemonList;
