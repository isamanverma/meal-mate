import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./components/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import Signup from "./pages/Signup";
import LikedRecipePage from "./pages/LikedRecipePage";
import RecipeDetails from "./pages/RecipeDetails";
import { LikedRecipesProvider } from "./context/LikedRecipeContext";
import { useRecipeManager } from "./hooks/useRecipeManager";
import { useState, useEffect } from "react";
import { SplashScreen } from "./pages/SplashScreen";
import DiscoveryRecipeDetails from "./components/DiscoveryRecipeDetails";

function App() {
  const apiKey = import.meta.env.VITE_SPOONACULAR_API;
  const { isSignedIn, recipes } = useRecipeManager(apiKey);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

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
      path: "/discover",
      element: <DiscoveryRecipeDetails />,
    },
    {
      path: "/recipe/:id",
      element: <RecipeDetails />,
    },
  ]);

  return (
    <>
      {pageLoading ? (
        <SplashScreen />
      ) : (
        <LikedRecipesProvider>
          <main className="relative min-h-screen bg-sexymaroon font-work text-black">
            <RouterProvider router={router} />
          </main>
        </LikedRecipesProvider>
      )}
    </>
  );
}

export default App;
