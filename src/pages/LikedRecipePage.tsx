import { Link } from "react-router-dom";
import { ArrowLeftIcon } from "lucide-react";
import RecipeCard from "../components/RecipeCard";
import { useContext } from "react";
import { LikedRecipesContext } from "../context/LikedRecipeContext";

export default function LikedRecipePage() {
  const { likedRecipes } = useContext(LikedRecipesContext);

  return (
    <div className="p-5">
      <Link to="/" className="flex items-center gap-1">
        <ArrowLeftIcon />
        <button className="m-5 rounded-md text-lg">Go Back</button>
      </Link>
      <div className="mx-auto max-w-full lg:max-w-7xl">
        <h2 className="py-2 text-3xl font-bold">Liked Recipes</h2>
        {likedRecipes.length > 0 ? (
          <div className="flex flex-wrap gap-4 lg:gap-6">
            {likedRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <p className="py-4 text-lg">No recipes added to favourites yet!</p>
        )}
      </div>
    </div>
  );
}
