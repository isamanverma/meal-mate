import { useLocation } from "react-router-dom";
import { Recipe } from "../types/Recipe";
import { Clock } from "lucide-react";
import { toTitleCase } from "../utility/toTitleCase"; // Utility function to format titles
import RecommendedVideos from "./RecommendedVideos";

export default function DiscoveryRecipeDetails() {
  const location = useLocation();
  const randomRecipe: Recipe = location.state?.randomRecipe;
  console.log(randomRecipe);

  if (!randomRecipe) {
    return (
      <div className="flex items-center justify-center p-5 text-lg text-gray-700">
        No recipe data available
      </div>
    );
  }

  const {
    title,
    image,
    summary,
    preparationMinutes,
    readyInMinutes,
    servings,
    extendedIngredients,
    instructions,
  } = randomRecipe;

  return (
    <div className="bg-sexymaroon px-6 py-16 text-offwhite">
      <div className="mx-auto max-w-4xl">
        {/* Recipe Image */}
        <div className="relative mb-8 w-full">
          <img
            src={image || "assets/images/omlette.jpg"}
            alt={title}
            className="h-auto max-h-[500px] w-full rounded-xl object-cover shadow-2xl"
          />
        </div>

        {/* Recipe Title */}
        <h1 className="mb-6 text-center font-magtis font-extrabold lg:text-6xl">
          {toTitleCase(title)}
        </h1>

        {/* Recipe Summary */}
        <div className="mx-auto mb-8 max-w-3xl text-justify">
          <p
            className="text-lg"
            dangerouslySetInnerHTML={{
              __html:
                summary ||
                "This recipe is a delicious and nutritious meal. Perfect for any occasion!",
            }}
          />
        </div>

        {/* Preparation and Cooking Time */}
        <div className="mb-8 flex items-center justify-center gap-6">
          <div className="flex items-center gap-2">
            <Clock className="" />
            <p className="text-lg">
              {preparationMinutes
                ? `${preparationMinutes} min prep`
                : "No prep time available"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="" />
            <p className="text-lg">
              {readyInMinutes
                ? `${readyInMinutes} min total`
                : "No total time available"}
            </p>
          </div>
        </div>

        {/* Servings */}
        <div className="mb-6 text-center text-lg">
          <p>Servings: {servings || "N/A"}</p>
        </div>

        {/* Ingredients List */}
        <div className="mx-auto mb-8 w-full max-w-3xl">
          <h2 className="mb-6 font-castaThin text-4xl font-semibold text-offwhite">
            Ingredients
          </h2>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {extendedIngredients?.length ? (
              extendedIngredients.map((ingredient, index) => (
                <div
                  key={index}
                  className="group flex transform cursor-pointer flex-col items-center justify-center rounded-lg border border-gray-300 p-4 text-center shadow-md transition-transform duration-100 hover:motion-preset-shake hover:scale-105 hover:bg-offwhite"
                >
                  <p className="text-xl text-offwhite group-hover:text-sexymaroon">
                    {ingredient.original}
                  </p>
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center text-offwhite">
                <p>No ingredients available</p>
              </div>
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="mx-auto mb-8 w-full max-w-3xl">
          <h2 className="mb-6 text-3xl font-semibold text-offwhite">
            Instructions
          </h2>
          <div className="text-lg text-offwhite">
            <ol className="list-decimal space-y-4 pl-6">
              {instructions ? (
                instructions
                  .split("<li>")
                  .slice(1)
                  .map((step, index) => (
                    <li
                      key={index}
                      className="mb-2 text-lg leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: step }}
                    />
                  ))
              ) : (
                <p>No instructions available.</p>
              )}
            </ol>
          </div>
        </div>
      </div>
      <RecommendedVideos query={randomRecipe.title} />
    </div>
  );
}
