import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipesByName } from "../../actions";
import "./SearchBar.css"

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("") //creo un estado local vacio

  //al tener un input, tengo que ir guardando eso en mi estado local (name)
  
  function handleInputChange(e){
      e.preventDefault()
      setName(e.target.value) 
  }

  function handleSubmit(e){
    e.preventDefault()
    dispatch(getRecipesByName(name.toLocaleLowerCase())); //despacha la funcion con lo que hay en el estado local(nombre) para que se lo mande al back
    setName("");
  }
  return (  
<div>
    <input 
    id="inputName"
    type = 'text'
    placeholder="Search..."
    onChange={(e) => handleInputChange(e)}
    />
    <button id="buttonSearch" type="submit" onClick={(e) => handleSubmit(e)}>Search</button>

</div>
  )
}
