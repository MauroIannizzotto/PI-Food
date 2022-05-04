import { useState, useEffect } from "react";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postRecipe, getDiets } from "../../actions";
import "./CreateRecipe.css"
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
    <div className="formContainer">
      <h1>Create your own Recipe</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
      <div className="inputs">
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
          <label>Image: </label>
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
          <label>Healthy Food Level: </label>
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
            className="textarea"
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
            className="textarea"
            type="text"
            value={input.steps}
            name="steps"
            onChange={(e) => handleSelectStep(e)}
            id="steps"
          />
        </div>
        </div>
        <div className="tipoDeDietas">
          <div>
            <label>Diets:</label>
            <div className="opciones">
              {diets.map((e) => (
                <div className="box">
                  <input
                  className="box2"
                    type="checkbox"
                    value={e.title}
                    name={e.title}
                    onChange={(e) => handleSelect(e)}
                  />
                  <h3>{e.title}</h3>
                </div> 
                       ))}
                       </div>
                     </div>
                   </div>
        <button className="createButton" type="submit">Create Recipe</button>
      </form>
    <Link to="/home">
        <button className="returnButton">Return</button>
      </Link>

    </div>
  );
}





        // {/* <select onChange={(e) => handleSelect(e)}>
        //   <option value="diets">diets</option>

        //   {diets.map((e) => (
        //     <option value={e.title}>{e.title}</option>
        //   ))}
        // </select>

        // <ul>
        //   <li>{input.diets.map((e) => e + ", ")}</li>
        // </ul> */}




        // {/* <div>
        //   <label>Diets:</label>
        //   {type.map((e) => (
        //     <input
        //       type="checkbox"
        //       value={e.title}
        //       name={e.title}
        //       onChange={(e) => handleSelect(e)}
        //     >
        //       {e.title}
        //     </input>
        //   ))}
        // </div> */}


// <div className="tipoDeDietas">
//           <div>
//             <label>Diets:</label>
//             <div className="opciones">
//               {types.map((e) => (
//                 <div>
//                   <input
//                     type="checkbox"
//                     value={e.title}
//                     name={e.title}
//                     onChange={(e) => handleSelect(e)}
//                   />
//                   <label>{e.title}</label>
//                 </div> 


    