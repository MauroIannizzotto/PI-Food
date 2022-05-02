// import React from "react";
// import { useDispatch } from "react-redux";
// import { filterRecipesbyDiets, orderByName, orderByScore } from "../actions";


// export default function Filters(){
//   const dispatch = useDispatch();

  
//   function handleFilterRecipes(e) {
//     dispatch(filterRecipesbyDiets(e.target.value));
//   }

//   function handleOrderByName(e) {
//     e.preventDefault();
//     dispatch(orderByName(e.target.value));
    
//   }

//   function handleOrderByScore(e) {
//     e.preventDefault();
//     dispatch(orderByScore(e.target.value));
//   }
//     return(
// <div>
//         <select defaultValue="sortByName" onChange={(e) => handleOrderByName(e)}>
//           <option value="sortByName">Sort By Name</option>
//           <option value="asc">A-Z</option>
//           <option value="desc">Z-A</option>
//           {/* el value sirve para despues poder preguntarme ..dentro del select tengo opciones, bueno si el value
//     es asc hace tal cosa y si es desc hace tal otra cosa*/}
//         </select>
//         <select defaultValue="sortByScore" onChange={(e) => handleOrderByScore(e)}>
//         <option value="sortByScore">Sort By Score</option>
//           <option value="high">HIGHEST SCORE</option>
//           <option value="low">LOWEST SCORE</option>
//         </select>
//         <select defaultValue="all" onChange={(e) => handleFilterRecipes(e)}>
//           <option value="all">ALL</option>
//           <option value="dairy free">DAIRY FREE</option>
//           <option value="gluten free">GLUTEN FREE</option>
//           <option value="lacto ovo vegetarian">LACTO-OVOVEGETARIAN</option>
//           <option value="fodmap friendly">LOW FODMAP</option>
//           <option value="ketogenic">KETOGENIC</option>
//           <option value="paleolithic">PALEOLITHIC</option>
//           <option value="pescatarian">PESCATARIAN</option>
//           <option value="primal">PRIMAL</option>
//           <option value="vegan">VEGAN</option>
//           <option value="vegetarian">VEGETARIAN</option>
//           <option value="whole 30">WHOLE30</option>

//         </select>
//         </div>
//     )
// }