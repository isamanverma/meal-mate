import { useContext, useState } from "react";
import { LikedRecipesContext } from "../../context/LikedRecipeContext";
import { Recipe } from "../../types/Recipe";
import HeartIcon from "./Heart";

interface FavouriteProps {
  recipe: Recipe;
}

export default function Favourite({ recipe }: FavouriteProps) {
  const { likedRecipes, addRecipe, removeRecipe } =
    useContext(LikedRecipesContext);

  const [confettiClass, setConfettiClass] = useState(false);
  const isLiked = likedRecipes.some((r) => r.id === recipe.id);

  const toggleFavourite = () => {
    if (isLiked) {
      removeRecipe(recipe.id);
    } else {
      addRecipe(recipe);
      setConfettiClass(true);
      setTimeout(() => {
        setConfettiClass(false);
      }, 1000);
    }
  };

  return (
    <span
      onClick={toggleFavourite}
      className={`${confettiClass ? "motion-preset-confetti" : ""} my-2 flex w-10 cursor-pointer items-center gap-2 rounded-md bg-white p-2`}
    >
      <HeartIcon fillColor={isLiked ? "#FF162B" : "#000000"} />
    </span>
  );
}
