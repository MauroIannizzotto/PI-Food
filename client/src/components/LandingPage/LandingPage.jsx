import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

//COMPONENTE FUNCIONAL
export default function LandingPage() {
  return (
    <div className="landing">
      <div className="landing_h1">
        <h1>Welcome to my Recipes Page</h1>
      </div>
      <Link to="/home">
        <button className="landing_button">Come and See!</button>
      </Link>
    </div>
  );
}
