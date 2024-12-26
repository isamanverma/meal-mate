import Fork from "../assets/Fork";
import Spoon from "../assets/Spoon";
import { Recipe } from "../types/Recipe";
import Featured from "./Featured";
import Header from "./Header";
import Hero from "./Hero";

interface HomePageProps {
  isSignedIn: boolean;
  recipes: Recipe[];
}

export default function HomePage({ isSignedIn, recipes }: HomePageProps) {
  return (
    <div className="mx-auto max-w-full lg:max-w-7xl">
      <Spoon />
      <Header isSignedIn={isSignedIn} />
      <Fork />
      <Hero />
      <Featured recipes={recipes} />
    </div>
  );
}
