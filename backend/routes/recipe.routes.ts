import { Router } from 'express';
import { getRecipes, getRecipeInfo } from '../controllers/recipe.controller';

const router = Router();

router.get('/recipes', getRecipes);
router.get('/recipes/:id', getRecipeInfo);

export default router;
