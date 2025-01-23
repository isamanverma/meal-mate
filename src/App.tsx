import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./components/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import LikedRecipePage from "./pages/LikedRecipePage";
import { LikedRecipesProvider } from "./context/LikedRecipeContext";
import { useRecipeManager } from "./hooks/useRecipeManager";
import { useState, useEffect } from "react";
import { SplashScreen } from "./pages/SplashScreen";
import DiscoveryRecipeDetails from "./components/DiscoveryRecipeDetails";

function App() {
  const apiKey = import.meta.env.VITE_SPOONACULAR_API;
  const { recipes } = useRecipeManager(apiKey);
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
      element: <HomePage recipes={recipes} />,
      errorElement: <NotFoundPage />,
    },
    {
      path: "/fav",
      element: <LikedRecipePage />,
    },
    {
      path: "/discover",
      element: <DiscoveryRecipeDetails />,
    },
  ]);

  if (pageLoading) {
    return <SplashScreen />;
  }

  return (
    <LikedRecipesProvider>
      <main className="bg-sexymaroon">
      <RouterProvider router={router} />
      </main>
    </LikedRecipesProvider>
  );
}

export default App;
