import { useSelector } from "react-redux";
import useFetch from "../hooks/useFetch";
import { useEffect, useRef, useState } from "react";
import PokeCard from "../components/PokedexPage/PokeCard";
import SelectType from "../components/PokedexPage/SelectType";
import "../components/PokedexPage/styles/PokedexPage.css";
import Header from "../components/Header/Header";

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

  const handleSearch = (e) => {
    e.preventDefault();
    setInputValue(inputName.current.value.trim().toLowerCase());
  };

  const cbFilter = (pokeInfo) =>
    pokeInfo.name.toLowerCase().includes(inputValue);

  return (
    <>
    <Header />
    <div className="pokedex__container">      
      <h2 className="pokedex__text">
        <span> Hi! {trainerName},</span> here you can find your favorites
        pokemons
      </h2>
      <div className="pokedex__form__container">
        <form className="pokedex__form" onSubmit={handleSearch}>
          <input className="pokedex__input" ref={inputName} type="text" />
          <button className="pokedex__button">Search</button>
        </form>
        <SelectType setTypeSelected={setTypeSelected} />
      </div>
      <div className="pokedex__type__selected">
        {pokemons?.results.filter(cbFilter).map((pokeInfo) => (
          <PokeCard key={pokeInfo.url} url={pokeInfo.url} />
        ))}
      </div>
    </div>
    </>
  );
};

export default pokedexPage;
