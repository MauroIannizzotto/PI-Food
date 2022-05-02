import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetails, removeDetail } from "../actions";
import { useEffect } from "react";

export default function Details(props) {
  console.log("PROPIEDADES", props);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetails(props.match.params.id));
    return () => {dispatch(removeDetail())}
  }, [dispatch]);

  const myRecipe = useSelector((state) => state.detail);
  // console.log("Recetaa", myRecipe)
  return (
    <div>
      {myRecipe.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h1>{myRecipe[0].name}</h1>
          <img
            src={myRecipe[0].image}
            width="700px"
            height="500px"
            alt=""
          ></img>
          <h3>Score: {myRecipe[0].spoonacularScore}</h3>
          <h3>{myRecipe[0].healthScore}</h3>
          <h3>{myRecipe[0].diets}</h3>
          <h3>{myRecipe[0].dishTypes}</h3>
          <p>Summary: {myRecipe[0].summary}</p>
          <p>Instructios: {myRecipe[0].steps}</p>
        </div>
      )}
      <Link to="/home">
        <button>Return</button>
      </Link>
    </div>
  );
}
