import { Link } from "react-router-dom";
import { Recipe } from "../types/Recipe";
import { ArrowLeftIcon } from "lucide-react";
import RecipeCard from "../components/RecipeCard";

interface LikedRecipePageProps {
  recipes: Recipe[];
}

export default function LikedRecipePage({ recipes }: LikedRecipePageProps) {
  return (
    <div className="p-5">
      <Link to="/" className="flex items-center gap-1">
        <ArrowLeftIcon />
        <button className="m-5 rounded-md text-lg">Go Back</button>
      </Link>
      <div className="mx-auto max-w-full lg:max-w-7xl">
        <h2 className="py-2 text-3xl font-bold">Liked Recipes</h2>
        <div className="flex flex-wrap gap-4 lg:gap-6">
          {recipes.map((recipe: Recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </div>
    </div>
  );
}
