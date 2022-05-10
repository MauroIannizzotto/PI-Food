 const { Router } = require("express");
const { Diet, Recipe } = require("../db");
const router = Router();


router.post("/", async (req, res) => {
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