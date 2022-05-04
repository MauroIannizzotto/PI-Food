import React from "react";
import "./Paginado.css";

export default function Paginado({ recipesPerPage, allRecipes, paginado }) {
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(allRecipes / recipesPerPage); i++) {
    pageNumber.push(i);
  }
  return (
    <nav>
      <div className="paginado">
        {pageNumber && //fijate si primero tiene algo el array de pageNumber
          pageNumber.map((number) => (
            <button
              className="number"
              key={number}
              onClick={() => paginado(number)}
            >
              {number}
            </button>
          ))}
      </div>
    </nav>
  );
}
