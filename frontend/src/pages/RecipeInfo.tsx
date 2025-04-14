import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

interface RecipeDetail {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  [key: string]: string;
}

export default function RecipeInfoPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<RecipeDetail | null>(null);
  const [related, setRelated] = useState<RecipeDetail[]>([]);

  useEffect(() => {
    const fetchRecipe = async () => {
      const res = await fetch(`http://localhost:3000/api/recipes/${id}`);
      const data = await res.json();
      setRecipe(data.meals?.[0]);
    };
    fetchRecipe();
  }, [id]);

  useEffect(() => {
    if (!recipe?.strCategory) return;

    const fetchRelated = async () => {
      const res = await fetch(
        `http://localhost:3000/api/recipes?category=${recipe.strCategory}`,
      );
      const data = await res.json();
      setRelated(
        data.meals?.filter((r: RecipeDetail) => r.idMeal !== recipe.idMeal) ||
          [],
      );
    };
    fetchRelated();
  }, [recipe?.strCategory]);

  const getIngredients = () => {
    if (!recipe) return [];
    return Object.keys(recipe)
      .filter((key) => key.startsWith("strIngredient") && recipe[key])
      .map((key) => ({
        name: recipe[key],
        measure: recipe[`strMeasure${key.replace("strIngredient", "")}`],
      }));
  };

  if (!recipe)
    return (
      <div className="flex justify-center p-8">
        <p>Loading recipe...</p>
      </div>
    );

  return (
    <div className="mx-auto">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-3/4">
          <div className="flex flex-col md:flex-row gap-8 mb-8">
            <div className="md:w-1/3">
              <img src={recipe.strMealThumb} alt={recipe.strMeal} />
            </div>

            <div className="md:w-2/3">
              <h1 className="font-bold">{recipe.strMeal}</h1>

              <div className="flex items-center gap-4 mb-6">
                <span
                  onClick={() => navigate(`/?country=${recipe.strArea}`)}
                  className="cursor-pointer"
                >
                  {recipe.strArea}
                </span>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Ingredients
                </h2>
                <ul className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {getIngredients().map((ing, idx) => (
                    <li
                      key={idx}
                      onClick={() => navigate(`/?ingredient=${ing.name}`)}
                      className="flex items-center hover:bg-gray-100 cursor-pointer"
                    >
                      <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                      <span className="text-gray-700 hover:text-blue-600">
                        {ing.measure} {ing.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Instructions
            </h2>
            <div className="prose max-w-none text-gray-700 whitespace-pre-wrap">
              {recipe.strInstructions}
            </div>
          </div>
        </div>

        <div className="lg:w-1/4">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              More {recipe.strCategory} Recipes
            </h2>
            <ul className="space-y-3">
              {related.length > 0 ? (
                related.map((r) => (
                  <li
                    key={r.idMeal}
                    onClick={() => navigate(`/recipe/${r.idMeal}`)}
                    className="p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors border border-gray-100"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={r.strMealThumb}
                        alt={r.strMeal}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <span className="text-gray-700 hover:text-blue-600 font-medium">
                        {r.strMeal}
                      </span>
                    </div>
                  </li>
                ))
              ) : (
                <p className="text-gray-500">No related recipes found</p>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
