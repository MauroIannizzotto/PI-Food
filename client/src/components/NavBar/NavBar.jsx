import React from "react";
import { Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { getRecipes } from "../../actions";
import SearchBar from "../SearchBar/SearchBar";
import "./NavBar.css";

export default function NavBar() {
  // const dispatch = useDispatch();

  function handleClick(e) {
    // e.preventDefault();
    // dispatch(getRecipes());}
    window.location.reload();
  }
  return (
    <div className="navbar">
      <div>
        <Link to="/recipe">
          <button className="navbar_button1">Create Recipe</button>
        </Link>
      </div>
      <div>
        <button
          className="navbar_button2"
          onClick={(e) => {
            handleClick(e);
          }}
        >
          Refresh all Recipes
        </button>
      </div>
      <div className="navbar_searchbar">
        <SearchBar />
      </div>
    </div>
  );
}
