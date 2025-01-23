import Fork from "../assets/Fork";
import Spoon from "../assets/Spoon";
import { Recipe } from "../types/Recipe";
import Featured from "./Featured";
import Footer from "./Footer";
import Header from "./Header";
import Hero from "./Hero";

interface HomePageProps {
  recipes: Recipe[];
}

export default function HomePage({ recipes }: HomePageProps) {
  return (
    <>
      <div className="mx-auto max-w-full lg:max-w-7xl">
        <Spoon />
        <Header />
        <Fork />
        <Hero />
        <Featured recipes={recipes} />
      </div>
      <Footer />
    </>
  );
}
