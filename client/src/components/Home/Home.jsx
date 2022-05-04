// import React from 'react'

import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getRecipes,
  filterRecipesbyDiets,
  orderByName,
  orderByScore,
} from "../../actions";
import Card from "../Card/Card";
import Paginado from "../Paginado/Paginado";
import NavBar from "../NavBar/NavBar";
import "./Home.css";

//HOME SERA UN COMPONENTE FUNCIONAL
export default function Home() {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipes); //es lo mismo que hacer el map state to props
  //en la constante allRecipes con el useSelector me trae todo lo que esta en el estado de recipes

  //---------- PAGINADO ----------

  //para el paginado creamos varios estados actuales
  const [currentPage, setCurrentPage] = useState(1); //estado local para la pag actual
  const [recipesPerPage, setrecipesPerPage] = useState(9); //estado para guardar la cantidad de rec x page
  const indexOfLastRecipe = currentPage * recipesPerPage; //9
  const indexOfFirtsRecipe = indexOfLastRecipe - recipesPerPage; //0
  //en la pagina 1 mi primer personaje va a tener el index 0 y el ultimo el 8
  const currentRecipe = allRecipes.slice(indexOfFirtsRecipe, indexOfLastRecipe);
  //toma todas las recetas y solamente devuelve desde el indice de la primer receta hasta el indice de la seg receta
  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber); //cambia mi numero de pagina
  };

  const [orden, setOrden] = useState("");
  //nos traemos las recetas del estado cuando se monta

  useEffect(() => {
    dispatch(getRecipes()); //uso dispatch porque ya declare la constante
  }, [dispatch]);

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
    <div className="home">
      {/* <h1>Food Individual Proyect</h1> */}
      <NavBar />
      <div>
        <div className="filters">
          <select
            className="filter1"
            defaultValue="sortByName"
            onChange={(e) => handleOrderByName(e)}
          >
            <option value="sortByName">Sort By Name</option>
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </select>
          <select
            className="filter2"
            defaultValue="sortByScore"
            onChange={(e) => handleOrderByScore(e)}
          >
            <option value="sortByScore">Sort By Score</option>
            <option value="high">HIGHEST SCORE</option>
            <option value="low">LOWEST SCORE</option>
          </select>
          <select
            className="filter3"
            defaultValue="all"
            onChange={(e) => handleFilterRecipes(e)}
          >
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
        </div>
        <div className="paginado">
          <Paginado
            recipesPerPage={recipesPerPage}
            allRecipes={allRecipes.length}
            paginado={paginado}
          />
        </div>

        <div className="card_container">
          {currentRecipe?.map((e) => {
            return (
              <Fragment>
                <Card
                  title={e.title}
                  image={e.image}
                  diets={e.diets.join(", ")}
                  id={e.id}
                  key={e.id}
                />
              </Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
