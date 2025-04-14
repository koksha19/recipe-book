import { Request, Response } from 'express';
import recipeService from '../services/recipe.service';
import { catchError } from '../middleware/catch-error.middleware';

const getRecipes = catchError(async (req: Request, res: Response) => {
  const { ingredient, country, category } = req.query;
  let data;

  if (ingredient) {
    data = await recipeService.filterByIngredient(ingredient as string);
  } else if (country) {
    data = await recipeService.filterByCountry(country as string);
  } else if (category) {
    data = await recipeService.filterByCategory(category as string);
  } else {
    data = await recipeService.fetchAll();
  }

  res.json(data);
});

const getRecipeInfo = catchError(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await recipeService.fetchInfo(id);
  res.json(data);
});

export { getRecipes, getRecipeInfo };
