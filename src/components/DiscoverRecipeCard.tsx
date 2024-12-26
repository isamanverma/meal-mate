import { useEffect, useState, useCallback } from "react";
import { Clock } from "lucide-react";
import { Recipe } from "../types/Recipe";
import { toTitleCase } from "../utility/toTitleCase";
import wretch from "wretch";
import LoadingPage from "../pages/LoadingPage";

interface DiscoverRecipeCardProps {
  triggerFetch: boolean;
  onFetchComplete: () => void;
}

export default function DiscoverRecipeCard({
  triggerFetch,
  onFetchComplete,
}: DiscoverRecipeCardProps) {
  const apiKey = import.meta.env.VITE_SPOONACULAR_API;
  const [randomRecipe, setRandomRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRandomRecipe = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await wretch(
        `https://api.spoonacular.com/recipes/random?limitLicense=true&tags=indian&number=1&exclude-tag=beef%2C%20pork&apiKey=${apiKey}`,
      )
        .get()
        .json<{ recipes: Recipe[] }>();

      if (response.recipes.length > 0) {
        const fetchedRecipe = response.recipes[0];
        setRandomRecipe(fetchedRecipe);

        localStorage.setItem("randomRecipe", JSON.stringify(fetchedRecipe));
        localStorage.setItem("fetchTime", Date.now().toString());
      } else {
        setError("No recipes found");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Error fetching recipe");
      }
    } finally {
      setLoading(false);
      onFetchComplete();
    }
  }, [apiKey, onFetchComplete]);

  useEffect(() => {
    const savedRecipe = localStorage.getItem("randomRecipe");
    const fetchTime = localStorage.getItem("fetchTime");

    const tenMinutes = 10 * 60 * 1000;
    const isExpired =
      fetchTime && Date.now() - parseInt(fetchTime) > tenMinutes;

    if (savedRecipe && !isExpired) {
      setRandomRecipe(JSON.parse(savedRecipe));
      setLoading(false);
    } else {
      fetchRandomRecipe();
    }
  }, [fetchRandomRecipe]);


  useEffect(() => {
    if (triggerFetch) {
      fetchRandomRecipe();
    }
  }, [triggerFetch, fetchRandomRecipe]);

  if (loading) {
    return <LoadingPage/>
  }

  if (error) {
    return (
      <div className="ml-auto flex max-w-2xl flex-col justify-evenly rounded-md bg-gray-200 p-5">
        <p>{error}</p>
      </div>
    );
  }

  if (!randomRecipe) {
    return (
      <div className="ml-auto flex max-w-2xl flex-col justify-evenly rounded-md bg-gray-200 p-5">
        <p>No recipes available</p>
      </div>
    );
  }

  return (
    <div className="ml-auto flex max-w-2xl flex-col justify-evenly rounded-md bg-gray-200">
      <img
        className="h-auto max-h-[150px] w-full rounded-t-md object-cover lg:max-h-[250px]"
        src={randomRecipe.image || "/public/assets/images/omlette.jpg"}
        alt="Recipe Image"
      />
      <div className="flex flex-col gap-2 p-5">
        <h2 className="text-xl font-bold normal-case">
          {toTitleCase(randomRecipe.title)}
        </h2>

        <p>
          This dish is a flavorful and nutritious meal, perfect for any
          occasion. Packed with a variety of fresh ingredients, it combines
          unique flavors and textures to create a satisfying experience. Whether
          you're cooking for a family dinner or preparing a quick meal, this
          dish is sure to please everyone with its delicious taste and balanced
          nutrition.
        </p>

        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row gap-2">
            <Clock />
            <p>
              {randomRecipe.preparationMinutes
                ? `${randomRecipe.preparationMinutes} min`
                : "No prep time available"}
            </p>
          </div>
          <button className="rounded-md bg-slate-500 p-2 text-white transition-colors duration-300 hover:scale-105 hover:transition-transform hover:duration-300">
            View Recipe
          </button>
        </div>
      </div>
    </div>
  );
}
