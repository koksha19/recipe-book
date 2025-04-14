import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { Recipe, RecipeCard } from "../components/RecipeCard.tsx";

export default function RecipeListPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const ingredient = searchParams.get("ingredient");
  const country = searchParams.get("country");
  const category = searchParams.get("category");

  const getTitle = () => {
    if (ingredient) return `Recipes with ${ingredient}`;
    if (country) return `${country} Recipes`;
    if (category) return `${category} Recipes`;
    return "All Recipes";
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      let url = "http://localhost:3000/api/recipes";
      const queryParams: string[] = [];
      if (ingredient) queryParams.push(`ingredient=${ingredient}`);
      if (country) queryParams.push(`country=${country}`);
      if (category) queryParams.push(`category=${category}`);
      if (queryParams.length) url += `?${queryParams.join("&")}`;

      const res = await fetch(url);
      const data = await res.json();
      setRecipes(data.meals || []);
    };

    fetchRecipes();
  }, [ingredient, country, category]);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="font-bold mb-8 text-center">{getTitle()}</h1>
      <div className="flex flex-wrap justify-center">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.idMeal}
            recipe={recipe}
            onClick={() => navigate(`/recipe/${recipe.idMeal}`)}
          />
        ))}
      </div>
      {recipes.length === 0 && <p className="text-center">No recipes found</p>}
    </div>
  );
}
