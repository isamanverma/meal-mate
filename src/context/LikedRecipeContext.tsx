import { createContext, useState, ReactNode } from "react";
import { Recipe } from "../types/Recipe";

interface LikedRecipesContextProps {
  likedRecipes: Recipe[];
  addRecipe: (recipe: Recipe) => void;
  removeRecipe: (recipeId: number) => void; // Add removeRecipe here.
}

export const LikedRecipesContext = createContext<LikedRecipesContextProps>({
  likedRecipes: [],
  addRecipe: () => {},
  removeRecipe: () => {},
});

export const LikedRecipesProvider = ({ children }: { children: ReactNode }) => {
  const [likedRecipes, setLikedRecipes] = useState<Recipe[]>([]);

  const addRecipe = (recipe: Recipe) => {
    setLikedRecipes((prev) => [...prev, recipe]);
  };

  const removeRecipe = (recipeId: number) => {
    setLikedRecipes((prev) => prev.filter((recipe) => recipe.id !== recipeId));
  };

  return (
    <LikedRecipesContext.Provider
      value={{ likedRecipes, addRecipe, removeRecipe }}
    >
      {children}
    </LikedRecipesContext.Provider>
  );
};
