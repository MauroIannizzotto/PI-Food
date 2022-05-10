const { Router } = require("express");
const { Diet, Recipe } = require("../db");
const axios = require("axios");
const router = Router();

const { API_KEY } = process.env;
const { API_KEY_2 } = process.env;
const { API_KEY_3 } = process.env;
const { API_KEY_4 } = process.env;
const { API_KEY_5 } = process.env;
const { API_KEY_6 } = process.env;
const { API_KEY_7 } = process.env;
const { API_KEY_8 } = process.env;
const { API_KEY_9 } = process.env;
const { API_KEY_10 } = process.env;


///////////////////  FUNCIONES CONTROLADORAS  ///////////////////


////////// FUNCION PARA OBTENER LAS RECETAS DE LA API //////////
const getApiInfo = async () => {
    try {
      const apiUrl = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY_8}&addRecipeInformation=true&number=100`
      );
      const apiData = apiUrl.data?.results.map((e) => {
        return {
          title: e.title,
          id: e.id,
          summary: e.summary.replace(/<[^>]*>?/g, ""),
          steps: e.analyzedInstructions[0]?.steps.map((e) => e.step),
          spoonacularScore: e.spoonacularScore,
          healthScore: e.healthScore,
          diets: e.diets,
          image: e.image,
          dishTypes: e.dishTypes,
          //   imageType: e.imageType,
        };
      });
      return apiData;
    } catch (error) {
      console.log(error);
    }
  };
  

  ////////// FUNCION PARA OBTENER LAS RECETAS DE LA BASE DE DATOS //////////
  const getDbInfo = async () => {
    let dbRecipes = await Recipe.findAll({
      include: {
        model: Diet,
        attributes: ["title"],  //me traigo el nombre de las dietas
        through: {
          attributes: [],
        },
      },
    });
  
    return dbRecipes.map((e) => {
      return {
        title: e.title,
        id: e.id,
        summary: e.summary,
        steps: e.steps,
        spoonacularScore: e.spoonacularScore,
        healthScore: e.healthScore,
        diets: e.diets.map((e) => e.title),
        image: e.image,
      };
    });
  };
  

  ////////// FUNCION PARA COMBINAR LAS RECETAS //////////
  const getAllRecipes = async () => {
    const apiData = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiData.concat(dbInfo);
    return infoTotal;
  };
  

  //////////// RUTAS PARA TRAER INFORMACION DE LAS DIETAS  /////////////

  ////////// RUTA PARA OBTENER LAS RECETAS POR NAME (QUERY) //////////
  router.get("/", async (req, res) => {
    try {
      const name = req.query.name;
      // console.log("NAMEEE", name)
      // console.log("RECETAS TOTALES",totalRecipes);
      let totalRecipes = await getAllRecipes();
      if (name) {
        let recipesByName = await totalRecipes.filter((e) =>
          e.title.toLowerCase().includes(name.toLowerCase())
        );
        // consolo.log("AAAAA", recipesByName)
        recipesByName.length
          ? // console.log("RECETAS FILTRADAAAS", recipesByName)
            res.status(200).json(recipesByName)
          : res
              .status(200)
              .json([])
      } else {
        res.status(200).json(totalRecipes);
        
      }
    } catch (error) {
      res.status(400).send("Error del catch");
      // console.log(error);
    }
  });
  

  ////////// RUTA PARA OBTENER LAS RECETAS POR ID (PARAMS) //////////
  router.get("/:idReceta", async (req, res) => {
    const idReceta = req.params.idReceta;
    try {
      let totalRecipes = await getAllRecipes();
      if (idReceta) {
        let recipesById = await totalRecipes.filter((e) => e.id == idReceta);
        recipesById.length
          ? res.status(200).json(recipesById)
          : res.status(404).send("No existe receta con ese id");
      } else {
        res.status(400).send("No id");
        // console.log(recipesById);
      }
    } catch (error) {
      res.status(400).send("Error");
      // console.log("ERROOOOOR", error);
    }
  });

  
module.exports = router;