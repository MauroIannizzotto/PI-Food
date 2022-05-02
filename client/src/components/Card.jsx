import React from "react";
// import { Link } from "react-router-dom";


export default function Card({ title, image, diets }) {
  return (
    <div>
      <h3>{title}</h3>
      <h5>{diets}</h5>
      <img src={image} alt="img not found" width="300px" height="200px" />
      {/* <Link to={"/home/" + id}>
          <button>Detail</button>
      </Link> */}
    </div>
  );
}
