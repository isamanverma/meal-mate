import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { useEffect, useState } from "react";
import HomePage from "./components/HomePage";
import Signup from "./components/Signup";
import NotFoundPage from "./components/NotFoundPage";
import LikedRecipePage from "./components/LikedRecipePage";
import wretch from "wretch";
import { ApiResponse, Recipe } from "./types/Recipe";

function App() {
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);

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
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await wretch(
        "https://api.spoonacular.com/recipes/random?limitLicense=true&tags=indian&number=28&exclude-tag=beef%2C%20pork&apiKey=82e7c4ff47a84467a23702f812a8c69c",
      )
        .get()
        .json<ApiResponse>();

      setRecipes(response.recipes);

      localStorage.setItem("recipes", JSON.stringify(response.recipes));
      localStorage.setItem("lastFetched", new Date().getTime().toString());
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

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
      element: <LikedRecipePage recipes={recipes} />,
    },
  ]);

  return (
    <main className="relative h-screen">
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
