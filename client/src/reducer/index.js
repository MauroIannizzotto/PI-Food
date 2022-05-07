// import { GET_RECIPES } from './actions'

const initialState = {
  recipes: [],
  allRecipes: [],
  diets: [],
  detail: [],
};

function rootReducer(state = initialState, action) {
  switch (
    action.type //verificamos los tipos de acciones que me llegan
  ) {
    //las acciones son objetos puros que tiene  un type que es la instruccion
    //que indica que se deben ejecutar
    case "GET_RECIPES":
      return {
        ...state,
        recipes: action.payload, //trae los personajes y me los guarda en este estado
        allRecipes: action.payload, // y tambien le pido que me los guarde en este estado
      };

    case "GET_RECIPES_BY_NAME":
      return {
        ...state,
        recipes: action.payload,
      };
    case "FILTER_BY_DIETS":
      const allRecipes = state.allRecipes; //cada vez que hace el fltro toma el array completo
      const statusFiltered =
        action.payload === "all"
          ? allRecipes
          : allRecipes.filter((e) =>
              e.diets.find((e) => e.includes(action.payload))
            );
      // console.log("VARIABLEE", statusFiltered);
      return {
        ...state,
        recipes: statusFiltered, //aplica sobre el estado de recipes
      };
    case "GET_DIETS":
      return {
        ...state,
        diets: action.payload,
      };
    case "POST_RECIPE":
      return {
        ...state,
      };
    case "ORDER_BY_NAME":
      let sorteredArr =
        action.payload === "asc"
          ? state.recipes.sort(function (a, b) {
              if (a.title > b.title) {
                return 1;
              }
              if (b.title > a.title) {
                return -1;
              }
              return 0;
            })
          : state.recipes.sort(function (a, b) {
              if (a.title > b.title) {
                return -1;
              }
              if (b.title > a.title) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        recipes: sorteredArr,
      };

    case "ORDER_BY_SCORE":
      let sorteredByScore =
        action.payload === "high"
          ? state.recipes.sort(function (a, b) {
            // return sorteredByScore.sort((a,b)=>{
              return b.spoonacularScore - a.spoonacularScore
          })
          
          : state.recipes.sort(function (a, b) {
            // return sorteredByScore.sort((a,b)=>{
              return a.spoonacularScore - b.spoonacularScore
           
          })
      return {
        ...state,
        recipes: sorteredByScore,
      };

    case "GET_DETAILS":
      console.log("actionn", action.payload);
      return {
        ...state,
        detail: action.payload,
      };
    case "REMOVE_DETAILS":
      return {
        ...state,
        detail: [],
      };
    default:
      return state; //InitialState
  }

}




export default rootReducer;
