import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Heart, DollarSign, Clock, ArrowLeftIcon } from "lucide-react";
import LoadingPage from "./LoadingPage";
import { useRecipeManager } from "../hooks/useRecipeManager";
import { Recipe } from "../types/Recipe";
import RecommendedVideos from "../components/RecommendedVideos";
import Footer from "../components/Footer";

export default function RecipeDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { recipes } = useRecipeManager(import.meta.env.VITE_SPOONACULAR_API);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id || !recipes || recipes.length === 0) return;

    const foundRecipe = recipes.find((recipe) => recipe.id.toString() === id);

    if (foundRecipe) {
      console.log(foundRecipe);
      setRecipe(foundRecipe);
      setLoading(false);
    } else {
      setError("Recipe not found.");
      setLoading(false);
    }
  }, [id, recipes]);

  if (loading) return <LoadingPage />;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!recipe) return <p className="text-center">No recipe found.</p>;

  return (
    <>
      <div className="relative mx-auto grid max-w-full grid-cols-1 gap-6 p-6 md:grid-cols-12 lg:max-w-7xl">
        <Link to="/" className="absolute -left-[15%] top-8 z-50">
          <button className="flex items-center rounded-md bg-offwhite p-2 text-lg">
            <ArrowLeftIcon color="#3C0008" />
            <span className="ml-2 text-sexymaroon">Go Back</span>
          </button>
        </Link>
        {/* Header Section: Image and Title */}
        <div className="col-span-12">
          <div className="relative">
            <img
              src={recipe.image || "assets/images/food-placeholder.png"}
              alt={recipe.title}
              className="h-96 w-full rounded-lg object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <h1 className="bg-black bg-opacity-60 p-2 font-magtis text-7xl text-white">
                {recipe.title}
              </h1>
            </div>
          </div>
        </div>

        {/* Left Column: Ingredients */}
        <div className="col-span-12 rounded-lg bg-offwhite p-6 shadow md:col-span-4 lg:max-h-[75vh] lg:overflow-y-auto">
          <h2 className="mb-4 text-2xl font-semibold">Ingredients</h2>
          <ul className="space-y-2">
            {recipe.extendedIngredients?.map((ingredient) => (
              <li key={ingredient.id} className="flex items-center space-x-3">
                {ingredient.image && (
                  <img
                    src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`}
                    alt={ingredient.original}
                    className="h-12 w-12 rounded-lg object-cover"
                  />
                )}
                <span>{ingredient.original}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Center Column: Instructions */}
        <div className="col-span-12 rounded-lg bg-offwhite p-6 shadow md:col-span-4 lg:max-h-[75vh] lg:overflow-y-auto">
          <h2 className="mb-4 text-2xl font-semibold">Instructions</h2>
          {recipe.analyzedInstructions?.length ? (
            <ol className="list-decimal space-y-3 pl-5">
              {recipe.analyzedInstructions[0].steps.map((step) => (
                <li key={step.number}>{step.step}</li>
              ))}
            </ol>
          ) : (
            <p>No instructions available.</p>
          )}
        </div>

        {/* Right Column: Nutritional Info (Health Score, Price, etc.) */}
        <div className="col-span-12 rounded-lg bg-offwhite p-6 shadow md:col-span-4 lg:max-h-[75vh] lg:overflow-y-auto">
          <h2 className="mb-4 text-2xl font-semibold">Recipe Details</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Heart className="h-6 w-6 text-red-500" />
              <span>
                <strong>Health Score:</strong> {recipe.healthScore || "N/A"}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <DollarSign className="h-6 w-6 text-green-500" />
              <span>
                <strong>Price Per Serving:</strong> $
                {recipe.pricePerServing?.toFixed(2) || "N/A"}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-6 w-6 text-yellow-500" />
              <span>
                <strong>Preparation Time:</strong>{" "}
                {recipe.preparationMinutes || 0} mins
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-6 w-6 text-orange-500" />
              <span>
                <strong>Cooking Time:</strong> {recipe.cookingMinutes || 0} mins
              </span>
            </div>
          </div>
        </div>
        <div className="col-span-12">
          <RecommendedVideos query={recipe.title} />
        </div>
      </div>
      <Footer />
    </>
  );
}
