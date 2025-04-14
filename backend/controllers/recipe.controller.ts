import { Request, Response } from 'express';
import recipeService from '../services/recipe.service';

export const getRecipes = async (req: Request, res: Response) => {
  let data;

  try {
    const { ingredient, country, category } = req.query;
    console.log(ingredient, country, category);

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
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch recipes', error });
  }
};

export const getRecipeInfo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await recipeService.fetchInfo(id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch recipe details', error });
  }
};
