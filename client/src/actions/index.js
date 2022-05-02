import axios from "axios";

//TRATAR DE NO HACER LOGICA EN LAS ACTIONS. LAS ACTIONS ES SOLO DESPACHAR UN TIPO. LA LOGICA EN EL REDUCER O COMPONENTE

//MOMENTO DE CONEXION ENTRE EL FRONT Y EL BACK
export function getRecipes() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/recipes", {});
    return dispatch({
      type: "GET_RECIPES",
      payload: json.data,
    });
  };
}

export function getRecipesByName(name) {
  return async function (dispatch) {
    var json = await axios.get(`http://localhost:3001/recipes?name=${name}`);
    return dispatch({
      type: "GET_RECIPES_BY_NAME",
      payload: json.data,
    });
  };
}

export function getDiets() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/types", {});
    return dispatch({
      type: "GET_DIETS",
      payload: json.data,
    });
  };
}

export function postRecipe(payload) {
  return async function (dispatch) {
    const json = await axios.post("http://localhost:3001/recipe", payload);
    return json;
  };
}

export function filterRecipesbyDiets(payload) {
  // console.log("PAYLOADD", payload)
  return {
    type: "FILTER_BY_DIETS",
    payload,
  };
}

export function orderByName(payload) {
  return {
    type: "ORDER_BY_NAME",
    payload,
  };
}

export function orderByScore(payload) {
  return {
    type: "ORDER_BY_SCORE",
    payload,
  };
}

export function getDetails(id) {
  return async function (dispatch) {
    console.log("ID", id)
    try {
      const json = await axios.get(`http://localhost:3001/recipes/${id}`);
      return dispatch({
        type: "GET_DETAILS",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function removeDetail(){
  return {
    type: "REMOVE_DETAILS"
  }
}

export function createRecipe(payload) {}
