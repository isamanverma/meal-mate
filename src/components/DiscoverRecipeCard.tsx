import { useEffect, useState, useCallback } from "react";
import { Clock } from "lucide-react";
import { Recipe } from "../types/Recipe";
import { toTitleCase } from "../utility/toTitleCase";
import wretch from "wretch";
import LoadingPage from "../pages/LoadingPage";
import { cleanRecipeSummary } from "../utility/cleanRecipeSummary";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate(); // Use the useNavigate hook

  const fetchRandomRecipe = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await wretch(
        `https://api.spoonacular.com/recipes/random?limitLicense=true&number=1&exclude-tag=beef%2C%20pork&apiKey=${apiKey}`,
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

    const tenMinutes = 10 * 60 * 1000; // 10 minutes in milliseconds
    const isExpired =
      fetchTime && Date.now() - parseInt(fetchTime) > tenMinutes;

    if (savedRecipe && !isExpired) {
      setRandomRecipe(JSON.parse(savedRecipe));
      setLoading(false);
    } else {
      if (!savedRecipe || isExpired) {
        fetchRandomRecipe();
      }
    }
  }, [fetchRandomRecipe]);

  useEffect(() => {
    if (triggerFetch) {
      fetchRandomRecipe();
    }
  }, [triggerFetch, fetchRandomRecipe]);

  if (loading) {
    return <LoadingPage />;
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

  const cleanedSummary = randomRecipe.summary
    ? cleanRecipeSummary(randomRecipe.summary)
    : "";

  const handleNavigate = () => {
    // Navigate to the discovery page with the random recipe as state
    navigate("/discover", { state: { randomRecipe } });
  };

  return (
    <div className="relative motion-scale-in-[0.5] motion-translate-x-in-[-25%] motion-translate-y-in-[25%] motion-rotate-in-[-10deg] motion-blur-in-[5px] motion-opacity-in-[0%] motion-duration-[0.35s] motion-duration-[0.53s]/scale motion-duration-[0.53s]/translate motion-duration-[0.63s]/rotate">
      <div className="absolute -inset-0.5 rounded-xl bg-amber-800 opacity-90 blur-2xl"></div>
      <div className="relative ml-auto flex max-w-2xl flex-col justify-evenly rounded-xl bg-rose-50 text-sexymaroon">
        <div className="relative overflow-hidden rounded-md">
          <img
            className="h-auto max-h-[150px] w-full transform cursor-pointer rounded-t-xl object-cover transition duration-300 ease-in-out hover:scale-105 lg:max-h-[250px]"
            src={randomRecipe.image || "assets/images/omlette.jpg"}
            alt="Recipe Image"
          />
        </div>
        <div className="flex flex-col gap-2 p-5">
          <h2 className="font-castaThin text-5xl font-bold normal-case">
            {toTitleCase(randomRecipe.title)}
          </h2>

          <p>
            <div
              className="summary mt-2 line-clamp-4 text-sm lg:text-base"
              dangerouslySetInnerHTML={{
                __html:
                  cleanedSummary ||
                  `<p className="line-clamp-5">This dish is a flavorful and nutritious meal, perfect for any occasion. Packed with a variety of fresh ingredients, it combines unique flavors and textures to create a satisfying experience. Whether you're cooking for a family dinner or preparing a quick meal, this dish is sure to please everyone with its delicious taste and balanced nutrition.</p>`,
              }}
            />
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
            <button
              onClick={handleNavigate}
              className="rounded-md bg-slate-500 p-2 text-white transition-colors duration-300 hover:scale-105 hover:transition-transform hover:duration-300"
            >
              View Recipe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
