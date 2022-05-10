import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetails, removeDetail } from "../../actions";
import { useEffect } from "react";
import "./RecipeDetails.css"

export default function Details(props) {
  console.log("PROPIEDADES", props);
  const dispatch = useDispatch();

  useEffect(() => {
    //SE MONTA / ACTUALIZA EL COMPONENTE
    dispatch(getDetails(props.match.params.id));
    //TODO LO QUE SUCEDA DENTRO DEL RETURN ES CUANDO SE DESMONTA EL COMPONENTE
    return () => {dispatch(removeDetail())}
  }, [dispatch]);

  const myRecipe = useSelector((state) => state.detail);
  // console.log("Recetaa", myRecipe)
  return (
    <div style={{overflow: "hidden"}}>
      {myRecipe.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <div className="recipeContainer">

          <div className="recipeContainer2">
          <h1>{myRecipe[0].title}</h1>
          <img
            src={myRecipe[0].image}
            width="280px"
            height="200px"
            alt="img not found"
          />
          <h2>Score: {myRecipe[0].spoonacularScore}</h2>
          <h2>Healthy Food Level: {myRecipe[0].healthScore}</h2>
          <h2>Diets: {myRecipe[0].diets}</h2>
          {myRecipe[0].dishTypes ?
          (<h2>Dish Type: {myRecipe[0].dishTypes}</h2>) : <div></div>
          } 
          </div>
          <div className="recipeDetail_text1">
          <p id="title">Summary: </p>
          <p id="body">{myRecipe[0].summary}</p>
          <p id="title2">Instructions: </p>
          <p id="body2">{myRecipe[0].steps}</p>
        </div>
        </div>
      )}
      <Link to="/home">
        <button id="buttonReturn">Return</button>
      </Link>
    </div>
  );
}
