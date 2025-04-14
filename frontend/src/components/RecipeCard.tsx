export interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

interface RecipeCardProps {
  recipe: Recipe;
  onClick: () => void;
}

export function RecipeCard({ recipe, onClick }: RecipeCardProps) {
  return (
    <div onClick={onClick} className="m-100 cursor-pointer">
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="w-full h-48 object-cover"
      />
      <h3 className="text-lg font-semibold text-center text-gray-800">
        {recipe.strMeal}
      </h3>
    </div>
  );
}
