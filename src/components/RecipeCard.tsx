import { Link } from "react-router-dom";
import { Recipe } from "../types/Recipe";
import { cleanRecipeSummary } from "../utility/cleanRecipeSummary";
import { getDietType } from "../utility/getDietType";
import { toTitleCase } from "../utility/toTitleCase";
import Favourite from "./ui/Favourite";

interface RecipeCardProps {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  const cleanedSummary = recipe.summary
    ? cleanRecipeSummary(recipe.summary)
    : "";

  return (
    <div className="motion-preset-blur-right w-44 cursor-pointer rounded-md bg-offwhite p-2 shadow-2xl shadow-yellow-800 lg:w-[370px]">
      {/* Link to recipe details */}
      <Link to={`/recipe/${recipe.id}/`}>
        <div className="relative overflow-hidden rounded-md">
          <img
            src={recipe.image || "/public/assets/images/food-placeholder.png"}
            alt={recipe.title}
            className="h-24 w-full transform object-cover transition duration-300 ease-in-out hover:scale-105 lg:h-48"
          />
        </div>

        <div className="mt-2">
          <h3 className="text-md font-castaThin font-bold text-royalGreen lg:text-3xl">
            {toTitleCase(recipe.title)}
          </h3>
          <div
            className="summary line-clamp-4 text-sm text-gray-600 lg:text-base"
            dangerouslySetInnerHTML={{
              __html:
                cleanedSummary ||
                `<p className="line-clamp-5">This dish is a flavorful and nutritious meal, perfect for any occasion. Packed with a variety of fresh ingredients, it combines unique flavors and textures to create a satisfying experience. Whether you're cooking for a family dinner or preparing a quick meal, this dish is sure to please everyone with its delicious taste and balanced nutrition.</p>`,
            }}
          />
        </div>
      </Link>
      <div className="flex items-center justify-between">
        <div className="mt-3 text-xs text-gray-500 lg:mt-5 lg:text-sm">
          <p>
            Prep Time:
            {recipe.cookingMinutes ? recipe.cookingMinutes + " mins" : " N/A"}
          </p>
          <p>Diet Type: {getDietType(recipe.vegetarian, recipe.vegan)}</p>
        </div>
        <Favourite recipe={recipe} />
      </div>
    </div>
  );
}
