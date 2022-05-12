import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetails, removeDetail, removeRecipe } from "../../actions";
import { useEffect } from "react";
import "./RecipeDetails.css";

export default function Details(props) {
  console.log("PROPIEDADES", props);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetails(props.match.params.id));
    dispatch(removeRecipe())
    //DESMONTA
    return () => {
      dispatch(removeDetail());
    };
  }, [dispatch, props.match.params.id]);

  const myRecipe = useSelector((state) => state.detail);
  // console.log("Recetaa", myRecipe)
  return (
    <div style={{ overflow: "hidden" }}>
      {myRecipe.length === 0 ? (
        <div>
          <p id="not_found2">Loading...</p>
          <img alt="loading" src="https://i.gifer.com/14UV.gif" id="img" />
        </div>
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
            {/* <h2>Score: {myRecipe[0].spoonacularScore}</h2> */}
            <h2>Healthy Food Level: {myRecipe[0].healthScore}</h2>
            <h2>Diets: {myRecipe[0].diets}</h2>
            {myRecipe[0].dishTypes ? (
              <h2>Dish Type: {myRecipe[0].dishTypes}</h2>
            ) : (
              <div></div>
            )}
          </div>
          <div className="recipeDetail_text1">
            <p id="title">Summary: </p>
            <p id="body">{myRecipe[0].summary}</p>
            <p id="title2">Instructions: </p>
            <p id="body2">{myRecipe[0].steps}</p>
          </div>
      <Link to="/home">
        <button id="buttonReturn">Return</button>
      </Link>
        </div>
      )}
    </div>
  );
}
