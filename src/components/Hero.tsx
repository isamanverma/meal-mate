import { useState } from "react";
import DiscoverRecipeCard from "./DiscoverRecipeCard";

export default function Hero() {
  const [triggerFetch, setTriggerFetch] = useState<boolean>(false);

  const handleSurpriseClick = () => {
    setTriggerFetch(true);
  };

  const handleFetchComplete = () => {
    setTriggerFetch(false);
  };

  return (
    <div className="pt-15 flex flex-col px-5 pb-10 lg:flex-row lg:px-0 lg:pb-20">
      <div className="flex grow flex-col items-center justify-center">
        <h2 className="py-5 text-3xl font-bold lg:py-10">
          Discover New Recipes
        </h2>
        <button
          onClick={handleSurpriseClick}
          className="rounded-md bg-pinkRed p-2 text-white transition-colors duration-300 hover:bg-darkPinkRed"
        >
          Surprise Me!
        </button>
        <p className="py-2 text-sm text-gray-400">
          Click to Discover New Recipe
        </p>
      </div>
      <DiscoverRecipeCard
        triggerFetch={triggerFetch}
        onFetchComplete={handleFetchComplete}
      />
    </div>
  );
}
