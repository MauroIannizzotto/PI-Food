import React from "react";

export default function Paginado({ recipesPerPage, allRecipes, paginado }) {
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(allRecipes / recipesPerPage); i++) {
    pageNumber.push(i);
  }
  return (
    <nav>
      <ul >
        <li className="number">
        {pageNumber && //fijate si primero tiene algo el array de pageNumber
          pageNumber.map((number) => (
            <button onClick={() => paginado(number)}>{number}</button>
            ))}
            </li>
      </ul>
    </nav>
  );
}
