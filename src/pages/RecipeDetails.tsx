import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import wretch from "wretch";
import LoadingPage from "./LoadingPage";
import { Heart, DollarSign, Clock, Users, CheckSquare } from "lucide-react"; // Icons for the display

interface Recipe {
  id: number;
  title: string;
  image: string;
  healthScore: number;
  pricePerServing: number;
  preparationMinutes?: number;
  cookingMinutes?: number;
  servings: number;
  extendedIngredients: { id: number; image: string; original: string }[];
  analyzedInstructions?: { steps: { number: number; step: string }[] }[];
  nutrition?: { nutrients: { name: string; amount: number; unit: string }[] };
}

export default function RecipeDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchRecipe = async () => {
      try {
        setLoading(true);
        const response = await wretch(
          `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&apiKey=${import.meta.env.VITE_SPOONACULAR_API}`,
        )
          .get()
          .json<Recipe>();
        setRecipe(response);
      } catch (err) {
        console.log(err);
        setError("Failed to load recipe data.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) return <LoadingPage />;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!recipe) return <p className="text-center">No recipe found.</p>;

  return (
    <div className="mx-auto grid grid-cols-1 gap-6 p-6 md:grid-cols-12">
      {/* Header Section: Image and Title */}
      <div className="col-span-12">
        <div className="relative">
          <img
            src={recipe.image || "assets/images/food-placeholder.png"}
            alt={recipe.title}
            className="h-96 w-full rounded-lg object-cover"
          />
          <h1 className="absolute bottom-4 left-4 rounded-lg bg-black bg-opacity-50 p-2 text-4xl text-white">
            {recipe.title}
          </h1>
        </div>
      </div>

      {/* Below Header: Ingredients + Prep + Details + Nutrients */}
      <div className="mx-auto max-w-7xl">
        {/* Left Column: Ingredients */}
        <div className="col-span-12 rounded-lg bg-white p-6 shadow md:col-span-4">
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
        <div className="col-span-12 rounded-lg bg-white p-6 shadow md:col-span-4">
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
        <div className="col-span-12 rounded-lg bg-white p-6 shadow md:col-span-4">
          <h2 className="mb-4 text-2xl font-semibold">Recipe Details</h2>
          <div className="space-y-4">
            {/* Health Score */}
            <div className="flex items-center space-x-2">
              <Heart className="h-6 w-6 text-red-500" />
              <span>
                <strong>Health Score:</strong> {recipe.healthScore || "N/A"}
              </span>
            </div>
            {/* Price Per Serving */}
            <div className="flex items-center space-x-2">
              <DollarSign className="h-6 w-6 text-green-500" />
              <span>
                <strong>Price Per Serving:</strong> $
                {recipe.pricePerServing?.toFixed(2) || "N/A"}
              </span>
            </div>
            {/* Preparation Time */}
            <div className="flex items-center space-x-2">
              <Clock className="h-6 w-6 text-yellow-500" />
              <span>
                <strong>Preparation Time:</strong>{" "}
                {recipe.preparationMinutes || "N/A"} mins
              </span>
            </div>
            {/* Cooking Time */}
            <div className="flex items-center space-x-2">
              <Clock className="h-6 w-6 text-orange-500" />
              <span>
                <strong>Cooking Time:</strong> {recipe.cookingMinutes || "N/A"}{" "}
                mins
              </span>
            </div>
            {/* Servings */}
            <div className="flex items-center space-x-2">
              <Users className="h-6 w-6 text-blue-500" />
              <span>
                <strong>Servings:</strong> {recipe.servings || "N/A"}
              </span>
            </div>
          </div>
        </div>

        {/* Nutritional Info Grid: Detailed Nutrients */}
        <div className="col-span-12 rounded-lg bg-white p-6 shadow md:col-span-12">
          <h2 className="mb-4 text-2xl font-semibold">
            Nutritional Information
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
            {recipe.nutrition?.nutrients?.map((nutrient) => (
              <div key={nutrient.name} className="flex items-center space-x-2">
                <CheckSquare className="h-6 w-6 text-purple-500" />
                <span>
                  <strong>{nutrient.name}:</strong> {nutrient.amount}{" "}
                  {nutrient.unit}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
