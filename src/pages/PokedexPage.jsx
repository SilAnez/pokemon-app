import { useSelector } from "react-redux";
import useFetch from "../hooks/useFetch";
import { useEffect, useRef, useState } from "react";
import PokeCard from "../components/PokedexPage/PokeCard";
import SelectType from "../components/PokedexPage/SelectType";

const pokedexPage = () => {
  const [inputValue, setInputValue] = useState("");
  const [typeSelected, setTypeSelected] = useState("allPokemons");

  const trainerName = useSelector((states) => states.trainer);
  
  const url = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0";
  const [pokemons, getPokemons, getTypePokemon] = useFetch(url);
  useEffect(() => {
    if (typeSelected === "allPokemons") {
      getPokemons();
    } else {
      getTypePokemon(typeSelected);
    }
  }, [typeSelected]);

  const inputName = useRef();

  const handleSearch = e => {
    e.preventDefault();
    setInputValue(inputName.current.value.trim().toLowerCase());
  };

  const cbFilter = (pokeInfo) =>
    pokeInfo.name.toLowerCase().includes(inputValue);
  return (
    <div>
      <h2>
        Hi! <span>{trainerName}</span>, here you can find your favorites
        pokemons
      </h2>
      <form onSubmit={handleSearch}>
        <input ref={inputName} type="text" />
        <button>Search</button>
      </form>
      <SelectType setTypeSelected={setTypeSelected} />
      <div>
        {pokemons?.results.filter(cbFilter).map((pokeInfo) => (
          <PokeCard key={pokeInfo.url} url={pokeInfo.url} />
        ))}
      </div>
    </div>
  );
};

export default pokedexPage;
