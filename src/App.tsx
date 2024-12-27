import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import HomePage from "./components/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import wretch from "wretch";
import { ApiResponse, Recipe } from "./types/Recipe";
import Signup from "./pages/Signup";
import LikedRecipePage from "./pages/LikedRecipePage";
import RecipeDetails from "./pages/RecipeDetails";
import { LikedRecipesProvider } from "./context/LikedRecipeContext";

function App() {
  const apiKey = import.meta.env.VITE_SPOONACULAR_API;
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const fetchRecipes = useCallback(async () => {
    try {
      const response = await wretch(
        `https://api.spoonacular.com/recipes/random?limitLicense=true&number=28&include-tag=vegetarian&exclude-tag=beef,pork&apiKey=${apiKey}`,
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
    const savedUser = localStorage.getItem("user");
    setIsSignedIn(!!savedUser);

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

  const router = createBrowserRouter([
    {
      path: "/",
      element: isSignedIn ? (
        <HomePage isSignedIn={isSignedIn} recipes={recipes} />
      ) : (
        <Navigate to="/signup" />
      ),
      errorElement: <NotFoundPage />,
    },
    {
      path: "/signup",
      element: <Signup isSignedIn={isSignedIn} />,
    },
    {
      path: "/fav",
      element: <LikedRecipePage />,
    },
    {
      path: "/recipe/:id",
      element: <RecipeDetails />,
    },
  ]);

  return (
    <LikedRecipesProvider>
      <main className="relative h-screen">
        <RouterProvider router={router} />
      </main>
    </LikedRecipesProvider>
  );
}

export default App;
