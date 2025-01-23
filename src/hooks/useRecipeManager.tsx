import { useState, useEffect, useCallback } from "react";
import wretch from "wretch";
import { ApiResponse, Recipe } from "../types/Recipe";

export function useRecipeManager(apiKey: string) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const fetchRecipes = useCallback(async () => {
    try {
      const response = await wretch(
        `https://api.spoonacular.com/recipes/random?limitLicense=true&number=500&include-tag=vegetarian&exclude-tag=beef,pork&apiKey=${apiKey}`,
      )
        .get()
        .json<ApiResponse>();

      setRecipes(response.recipes);

      localStorage.setItem("recipes", JSON.stringify(response.recipes));
      localStorage.setItem("lastFetched", new Date().getTime().toString());
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  }, [apiKey]);

  useEffect(() => {
    const savedRecipes = localStorage.getItem("recipes");
    const lastFetched = localStorage.getItem("lastFetched");
    const currentTime = new Date().getTime();

    if (
      !savedRecipes ||
      !lastFetched ||
      currentTime - parseInt(lastFetched) > 600000
    ) {
      fetchRecipes();
    } else {
      setRecipes(JSON.parse(savedRecipes));
    }

    const intervalId = setInterval(() => {
      fetchRecipes();
    }, 600000);

    return () => clearInterval(intervalId);
  }, [fetchRecipes]);

  return { recipes };
}
