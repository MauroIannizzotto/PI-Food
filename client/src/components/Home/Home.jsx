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
  const allRecipes = useSelector((state) => state.recipes); 
  const recetas = useSelector((state) => state.allRecipes); 
  const notFound = useSelector((state) => state.error);

  //---------- PAGINADO ----------

  const [currentPage, setCurrentPage] = useState(1); //estado local para la pag actual
  const [recipesPerPage, /*setrecipesPerPage*/] = useState(9); //estado para guardar la cantidad de rec x page
  const indexOfLastRecipe = currentPage * recipesPerPage; //9
  const indexOfFirtsRecipe = indexOfLastRecipe - recipesPerPage; //0
  const currentRecipe = allRecipes.slice(indexOfFirtsRecipe, indexOfLastRecipe);
  
  
  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber); //cambia mi numero de pagina
  };

  const [/*orden*/, setOrden] = useState("");

  //nos traemos las recetas del estado cuando se monta
  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]);

  //--------- HANDLERS ---------
  function handleFilterRecipes(e) {
    dispatch(filterRecipesbyDiets(e.target.value));
    setCurrentPage(1);
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
      <NavBar />
      <div>
        <div className="filters">
          <select
            className="filter1"
            defaultValue="sortByName"
            onChange={(e) => handleOrderByName(e)}
          >
            <option value="sortByName" select disabled>
              Sort By Name
            </option>
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </select>
          <select
            className="filter2"
            defaultValue="sortByScore"
            onChange={(e) => handleOrderByScore(e)}
          >
            <option value="sortByScore" select disabled>
              Sort By Score
            </option>
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

        <div>
          {recetas.length === 0 ? (
            <div>
              <p id="not_found2">Loading...</p>
              <img alt="loading" src="https://i.gifer.com/14UV.gif" id="img" />
            </div>
          ) : notFound.length === 0 && allRecipes.length > 0 ? (
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
          ) : (
            <p id="not_found">Not recipe found</p>
          )}
        </div>
      </div>
    </div>
  );
}
