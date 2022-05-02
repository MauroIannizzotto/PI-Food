// import React from 'react'

import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes, filterRecipesbyDiets, orderByName, orderByScore } from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";
import NavBar from "./NavBar";
// import SearchBar from "./SearchBar";

//HOME SERA UN COMPONENTE FUNCIONAL
export default function Home() {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipes); //es lo mismo que hacer el map state to props
  //en la constante allRecipes con el useSelector me trae todo lo que esta en el estado de recipes

  //---------- PAGINADO ----------
  //para el paginado creamos varios estados actuales
  const [currentPage, setCurrentPage] = useState(1); //siempre arranca en la pagina 1
  const [recipesPerPage, setrecipesPerPage] = useState(9); //cuantas recetas quiero por pagina
  const indexOfLastRecipe = currentPage * recipesPerPage; //9
  const indexOfFirtsRecipe = indexOfLastRecipe - recipesPerPage; //0
  //en la pagina 1 mi primer personaje va a tener el index 0 y el ultimo el 9
  const currentRecipe = allRecipes.slice(indexOfFirtsRecipe, indexOfLastRecipe);
  //toma todas las recetas y solamente devuelve desde el indice del primer personaje hasta el indice del segundo personaje
  const [orden, setOrden] = useState("");
  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  //nos traemos las recetas del estado cuando se monta
  useEffect(() => {
    dispatch(getRecipes()); //uso dispatch porque ya declare la constante
  }, [dispatch]);

  // function handleClick(e) {
  //   e.preventDefault();
  //   dispatch(getRecipes());
  // }

  function handleFilterRecipes(e) {
    dispatch(filterRecipesbyDiets(e.target.value));
  }

  function handleOrderByName(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrden(e.target.value);
  }

  function handleOrderByScore(e) {
    e.preventDefault();
    dispatch(orderByScore(e.target.value));
    setCurrentPage(1);
    setOrden(e.target.value);
  }

  return (
    <div>
      <h1>Food Individual Proyect</h1>
      <NavBar />
      {/* <Link to="/recipe">
        <button>Create Recipe</button>
      </Link>
      <button
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Refresh all Recipes
      </button> */}
      <div>
        <select defaultValue="sortByName" onChange={(e) => handleOrderByName(e)}>
          <option value="sortByName">Sort By Name</option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
          {/* el value sirve para despues poder preguntarme ..dentro del select tengo opciones, bueno si el value
    es asc hace tal cosa y si es desc hace tal otra cosa*/}
        </select>
        <select defaultValue="sortByScore" onChange={(e) => handleOrderByScore(e)}>
        <option value="sortByScore">Sort By Score</option>
          <option value="high">HIGHEST SCORE</option>
          <option value="low">LOWEST SCORE</option>
        </select>
        <select defaultValue="all" onChange={(e) => handleFilterRecipes(e)}>
          <option value="all">ALL</option>
          <option value="dairy free">DAIRY FREE</option>
          <option value="gluten free">GLUTEN FREE</option>
          <option value="lacto ovo vegetarian">LACTO-OVOVEGETARIAN</option>
          <option value="fodmap friendly">LOW FODMAP</option>
          <option value="ketogenic">KETOGENIC</option>
          <option value="paleolithic">PALEOLITHIC</option>
          <option value="pescatarian">PESCATARIAN</option>
          <option value="primal">PRIMAL</option>
          <option value="vegan">VEGAN</option>
          <option value="vegetarian">VEGETARIAN</option>
          <option value="whole 30">WHOLE30</option>

        </select>
        <Paginado
          recipesPerPage={recipesPerPage}
          allRecipes={allRecipes.length}
          paginado={paginado}
        />
        {/* <SearchBar /> */}
        {currentRecipe?.map((e) => {
          return (
            <Fragment>
                <Card
                  title={e.title}
                  image={e.image}
                  diets={e.diets}
                  id={e.id}
                  key={e.id}
                />
              <Link to={"/recipes/" + e.id}>
                <button>Detail</button>
              </Link>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
