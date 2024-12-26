import { Recipe } from "../types/Recipe";
import RecipeCard from "./RecipeCard";

interface FeaturedProps {
  recipes: Recipe[];
}

export default function Featured({ recipes }: FeaturedProps) {
 

  return (
    <div className="p-5">
      <h2 className="py-2 text-3xl font-bold">Featured Recipes</h2>
      <div className="flex flex-wrap gap-4 lg:gap-6">
        {recipes.map((recipe: Recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}
