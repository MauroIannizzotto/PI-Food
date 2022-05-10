const { Router } = require("express");
const { Diet } = require("../db");
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



router.get("/", async (req, res) => {
    try {
      const info = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY_8}&addRecipeInformation=true&number=100`
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

  module.exports = router;