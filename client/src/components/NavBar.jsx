//refresh --- create recipe --- searchbar

import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getRecipes } from "../actions";
import SearchBar from "./SearchBar";

export default function NavBar() {
  const dispatch = useDispatch();

  function handleClick(e) {
    e.preventDefault();
    dispatch(getRecipes());
  }
  return (
    <div>
      <Link to="/recipe">
        <button>Create Recipe</button>
      </Link>
      <button
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Refresh all Recipes
      </button>
      <SearchBar />
    </div>
  );
}
