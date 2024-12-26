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
    <div className="w-44 cursor-pointer rounded-md bg-gray-100 p-2 lg:w-[370px]">
      <img
        src={recipe.image || "/public/assets/images/food-placeholder.png"}
        alt={recipe.title}
        className="h-24 w-full rounded-md object-cover lg:h-48"
      />
      <div className="mt-2">
        <h3 className="text-md font-bold lg:text-xl">
          {toTitleCase(recipe.title)}
        </h3>

        <div
          className="summary mt-2 line-clamp-4 text-sm text-gray-600 lg:py-5 lg:text-base"
          dangerouslySetInnerHTML={{
            __html:
              cleanedSummary ||
              `<p className="line-clamp-5">This dish is a flavorful and nutritious meal, perfect for any occasion. Packed with a variety of fresh ingredients, it combines unique flavors and textures to create a satisfying experience. Whether you're cooking for a family dinner or preparing a quick meal, this dish is sure to please everyone with its delicious taste and balanced nutrition.</p>`,
          }}
        />

        <div className="mt-3 text-xs text-gray-500 lg:mt-5 lg:text-sm">
          <p>
            Prep Time:{" "}
            {recipe.cookingMinutes ? recipe.cookingMinutes + " mins" : "N/A"}
          </p>
          <p>Diet Type: {getDietType(recipe.vegetarian, recipe.vegan)}</p>
        </div>
      </div>

      <Favourite />
    </div>
  );
}
