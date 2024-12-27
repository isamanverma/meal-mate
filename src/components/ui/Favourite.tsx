import { useContext } from "react";
import { LikedRecipesContext } from "../../context/LikedRecipeContext";
import { Recipe } from "../../types/Recipe";
import HeartIcon from "./Heart";

interface FavouriteProps {
  recipe: Recipe;
}

export default function Favourite({ recipe }: FavouriteProps) {
  const { likedRecipes, addRecipe, removeRecipe } =
    useContext(LikedRecipesContext);

  const isLiked = likedRecipes.some((r) => r.id === recipe.id);

  const toggleFavourite = () => {
    if (isLiked) {
      removeRecipe(recipe.id);
    } else {
      addRecipe(recipe);
    }
  };

  return (
    <div
      onClick={toggleFavourite}
      className="my-2 flex w-40 cursor-pointer items-center gap-2 rounded-md bg-white p-2 lg:w-52"
    >
      <HeartIcon fillColor={isLiked ? "#FF162B" : "#000000"} />
      <span className="lg:text-md text-sm">
        {isLiked ? "Remove from Favourite" : "Add to Favourite"}
      </span>
    </div>
  );
}
