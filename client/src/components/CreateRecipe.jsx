import { useState, useEffect } from "react";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postRecipe, getDiets } from "../actions";

//---------- VALIDACIONES -----------

function validate(input) {
  let errors = {};
  if (!input.title) {
    errors.title = "Please insert a Name to creat a Recipe";
  } else if (!input.summary) {
    errors.summary = "Please insert a Summary to creat a Recipe";
  }

  return errors;
}

//-------------------------------------

export default function RecipeCreate() {
  const dispatch = useDispatch();
  const history = useHistory();
  const diets = useSelector((state) => state.diets); //me traigo el estado de las dietas con el useSelector
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    title: "",
    image: "",
    summary: "",
    spoonacularScore: "",
    healthScore: "",
    steps: [],
    diets: [],
  });

  //cada vez que se cambien o modifiquen mis inputs lo va a escuchar con esto
  function handleInputChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSelect(e) {
    setInput({
      ...input,
      diets: [...input.diets, e.target.value],
    });
  }

  function handleDelete(e){
    setInput({
      ...input,
      diets: input.diets.filter(el => el !== e)
    })
  }

  function handleSelectStep(e) {
    setInput({
      ...input,
      steps: [e.target.value],
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("RECETA EN CREACION", input);
    dispatch(postRecipe(input));
    alert("New Recipe Created Succesfully");
    //reseteo para que quede vacio
    setInput({
      title: "",
      image: "",
      summary: "",
      spoonacularScore: "",
      healthScore: "",
      steps: [],
      diets: [],
    });
    history.push("/home");
  }

  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  //renderizado
  return (
    <div>
      <Link to="/home">
        <button>Return</button>
      </Link>
      <h1>Create your own Recipe</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>Name: </label>
          <input
            type="string"
            value={input.title}
            name="title"
            onChange={(e) => handleInputChange(e)}
          />
          {errors.title && <p>{errors.title}</p>}
        </div>
        <div>
          <label>Image:</label>
          <input
            type="url"
            value={input.image}
            name="image"
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div>
          <label>Score: </label>
          <input
            type="integer"
            value={input.spoonacularScore}
            name="spoonacularScore"
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div>
          <label>Healthy Food Level</label>
          <input
            type="integer"
            value={input.healthScore}
            name="healthScore"
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div>
          <label>Summary: </label>
          <input
            type="text"
            value={input.summary}
            name="summary"
            onChange={(e) => handleInputChange(e)}
          />
          {errors.summary && <p>{errors.summary}</p>}
        </div>

        <div>
          <label>Steps: </label>
          <input
            type="text"
            value={input.steps}
            name="steps"
            onChange={(e) => handleSelectStep(e)}
          />
        </div>

        <select onChange={(e) => handleSelect(e)}>
          <option value="diets">diets</option>

          {diets.map((e) => (
            <option value={e.title}>{e.title}</option>
          ))}
        </select>

        <ul>
          <li>{input.diets.map((e) => e + ", ")}</li>
        </ul>




        {/* <div>
          <label>Diets:</label>
          {diets.map((e) => (
            <input
              type="checkbox"
              value={e.title}
              name={e.title}
              onChange={(e) => handleSelect(e)}
            >
              {e.title}
            </input>
          ))}
        </div> */}

        {/* <div>
          <label>Diets:</label>
          <label>
            <input
              type="checkbox"
              name="dairy free"
              value="dairy free"
              onChange={(e) => handleCheck(e)}
            />
            Dairy Free
          </label>
          <label>
            <input
              type="checkbox"
              name="gluten free"
              value="gluten free"
              onChange={(e) => handleCheck(e)}
            />
            Gluten Free
          </label>
          <label>
            <input
              type="checkbox"
              name="lacto ovo vegetarian"
              value="lacto ovo vegetarian"
              onChange={(e) => handleCheck(e)}
            />
            Lacto Ovo Vegetarian
          </label>
          <label>
            <input
              type="checkbox"
              name="fodmap friendly"
              value="fodmap friendly"
              onChange={(e) => handleCheck(e)}
            />
            Fodmap Friendly
          </label>
          <label>
            <input
              type="checkbox"
              name="paleolithic"
              value="paleolithic"
              onChange={(e) => handleCheck(e)}
            />
            Paleolithic
          </label>
          <label>
            <input
              type="checkbox"
              name="pescatarian"
              value="pescatarian"
              onChange={(e) => handleCheck(e)}
            />
            Pescatarian
          </label>
          <label>
            <input
              type="checkbox"
              name="primal"
              value="primal"
              onChange={(e) => handleCheck(e)}
            />
            Primal
          </label>
          <label>
            <input
              type="checkbox"
              name="vegan"
              value="vegan"
              onChange={(e) => handleCheck(e)}
            />
            Vegan
          </label>
          <label>
            <input
              type="checkbox"
              name="whole 30"
              value="whole 30"
              onChange={(e) => handleCheck(e)}
            />
            whole 30
          </label>
        </div> */}
        <button type="submit">Create Recipe</button>
      </form>
      {input.diets.map(e => 
        <div>
          <p>{e}</p>
          <button onClick={() => handleDelete(e)}>x</button>
        </div>
        )}
    </div>
  );
}
