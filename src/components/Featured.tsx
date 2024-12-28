import { Recipe } from "../types/Recipe";
import RecipeCard from "./RecipeCard";

interface FeaturedProps {
  recipes: Recipe[];
}

export default function Featured({ recipes }: FeaturedProps) {
  return (
    <div className="h-screen p-5">
      <h2 className="py-2 font-magtis text-4xl font-bold text-offwhite">
        Featured Recipes
      </h2>
      <div className="flex flex-wrap gap-4 lg:gap-6">
        {recipes.map((recipe: Recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}
