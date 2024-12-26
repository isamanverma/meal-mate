import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Recipe } from "../types/Recipe";
import wretch from "wretch";
import LoadingPage from "./LoadingPage";
import { toTitleCase } from "../utility/toTitleCase";

export default function RecipeDetails() {
  const { id } = useParams<{ id: string }>();
  const apiKey = import.meta.env.VITE_SPOONACULAR_API;
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipeById = async () => {
      try {
        setLoading(true);
        const response = await wretch(
          `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${apiKey}`,
        )
          .get()
          .json<Recipe>();

        setRecipe(response);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Failed to fetch recipe details.");
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchRecipeById();
    }
  }, [id, apiKey]);

  if (loading) {
    return <LoadingPage />;
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>{error}</p>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>No recipe found.</p>
      </div>
    );
  }

  // //  "https://api.spoonacular.com/food/videos/search?query=chicken%20tikka%20masala&cuisine=indian&diet=non%20veg&minLength=0&maxLength=1500&number=10&apiKey=82e7c4ff47a84467a23702f812a8c69c";
  // const [tutorialVideos, setTutorialVideos] = useState("");
  // const fetchTutorialVecipes = useCallback(async () => {
  //   try {
  //     const response = await wretch(
  //       `https://api.spoonacular.com/recipes/random?limitLicense=true&tags=indian&number=28&exclude-tag=beef%2C%20pork&apiKey=${apiKey}`,
  //     )
  //       .get()
  //       .json<ApiResponse>();

  //     setRecipes(response.recipes);

  //     localStorage.setItem("recipes", JSON.stringify(response.recipes));
  //     localStorage.setItem("lastFetched", new Date().getTime().toString());
  //   } catch (error) {
  //     console.error("Error fetching recipes:", error);
  //   }
  // }, [apiKey]);

  return (
    <div className="mx-auto p-5">
      <img
        src={recipe.image || "/public/assets/images/food-placeholder.png"}
        alt={recipe.title}
        className="mb-5 max-h-[500px] w-full rounded-lg object-cover"
      />
      <div className="mx-auto max-w-full lg:max-w-7xl">
        <h1 className="mb-5 text-3xl font-bold">{toTitleCase(recipe.title)}</h1>
        <p className="mb-5">{recipe.summary?.replace(/<[^>]+>/g, "")}</p>
        <h2 className="mb-3 text-xl font-semibold">Ingredients</h2>
        <ul className="mb-5 list-disc pl-5">
          {recipe.extendedIngredients?.map((ingredient) => (
            <li key={ingredient.id}>{ingredient.original}</li>
          ))}
        </ul>
        <h2 className="mb-3 text-xl font-semibold">Instructions</h2>
        <p>{recipe.instructions || "No instructions available."}</p>
        {/* <h2>Recipe Videos From Youtube</h2> */}
      </div>
    </div>
  );
}
