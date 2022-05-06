const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

//INSTALO E IMPORTO AXIOS
const axios = require("axios");
const { Diet, Recipe } = require("../db");
// DUDAAAA no se si esta bien la ruta
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//APIKEY
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






////////// FUNCION PARA OBTENER LAS RECETAS DE LA API //////////
const getApiInfo = async () => {
  try {
    const apiUrl = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY_10}&addRecipeInformation=true&number=100`
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
      attributes: ["title"],
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

////////// RUTA PARA OBTENER LAS RECETAS POR NAME (QUERY) //////////
router.get("/recipes", async (req, res) => {
  try {
    const name = req.query.name;
    // console.log("NAMEEE", name)
    let totalRecipes = await getAllRecipes();
    // console.log("RECETAS TOTALES",totalRecipes);
    if (name) {
      let recipesByName = await totalRecipes.filter((e) =>
        e.title.toLowerCase().includes(name.toLowerCase())
      );
      // consolo.log("AAAAA", recipesByName)
      recipesByName.length
        ? // console.log("RECETAS FILTRADAAAS", recipesByName)
          res.status(200).json(recipesByName)
        : res
            .status(404)
            .send(
              `El nombre "${name}" no corresponde a ninguna receta existente`
            );
    } else {
      res.status(200).json(totalRecipes);
      
    }
  } catch (error) {
    res.status(400).send("Error del catch");
    // console.log(error);
  }
});

////////// RUTA PARA OBTENER LAS RECETAS POR ID (PARAMS) //////////
router.get("/recipes/:idReceta", async (req, res) => {
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

////////// RUTA PARA OBTENER LOS TIPOS DE DIETA //////////
router.get("/types", async (req, res) => {
  try {
    const info = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY_10}&addRecipeInformation=true&number=100`
    );
    const types = info.data?.results.map((e) => e.diets); //extraemos info
    const newTypes = types.flat().concat("vegetarian", "ketogenic");
    const finalTypes = [...new Set(newTypes)];
    // console.log(finalTypes);
 
    for (let element in finalTypes) {
      Diet.findOrCreate({
        where: { title: finalTypes[element] },
      });
    }

    const newDiets = await Diet.findAll();
    res.status(200).json(newDiets);
  } catch (error) {
    console.log(error);
  }
});

////////// RUTA PARA CREAR UNA RECETA EN BASE DE DATOS //////////
router.post("/recipe", async (req, res) => {
  try {
    let { title, summary, spoonacularScore, healthScore, steps, diets, image } =
      req.body;
      
    let recipeCreated = await Recipe.create({
      title,
      summary,
      spoonacularScore,
      healthScore,
      steps,
      image,
    });
    // console.log("DIETSS", diets);

    diets.forEach(async (e) => {
      let dietDb = await Diet.findAll({
        where: { title: e },
      });
      await recipeCreated.addDiets(dietDb);
      // console.log("DIETSdb", dietDb);
    });

    // recipeCreated.addDiets(recipeCreated);
    res.json(recipeCreated);
  } catch (error) {
    console.log("ERROR DB", error);
  }
});

module.exports = router;
