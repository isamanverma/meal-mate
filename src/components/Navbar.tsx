import { useState, useEffect } from "react";
import usernameGenerator from "../utility/usernameGenerator.ts";
import { Link } from "react-router-dom";
import { HeartIcon, Search } from "lucide-react";

export default function Navbar() {
  const [name, setName] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    console.log("Perform search with query:", searchQuery);
  };

  useEffect(() => {
    const savedName = localStorage.getItem("user");

    if (!savedName) {
      const generatedName = usernameGenerator("Guest");
      const nameObj = { name: generatedName };
      localStorage.setItem("user", JSON.stringify(nameObj));
      setName(generatedName);
    } else {
      const parsedName = JSON.parse(savedName);
      setName(parsedName.name || "Guest");
    }
  }, []);
  return (
    <nav>
      <ul className="flex items-center gap-5 text-lg">
        <div className="flex w-full min-w-[200px] max-w-sm items-center gap-2 rounded-md border border-offwhite bg-transparent p-1 shadow-sm transition duration-300 focus-within:border-offwhite hover:border-offwhite">
          <input
            onChange={handleChange}
            type="text"
            className="w-full border-none bg-transparent text-sm text-offwhite outline-none placeholder:text-offwhite focus:ring-0"
            placeholder="Search Recipes"
            aria-label="Search for recipes"
          />
          <button
            onClick={handleSearch}
            className="flex items-center justify-center rounded-md bg-offwhite transition duration-200 hover:bg-opacity-80"
            aria-label="Search"
          >
            <Search className="text-black" />
          </button>
        </div>

        <Link to="/fav">
          <li className="flex cursor-pointer gap-1 transition-all hover:font-bold hover:text-blue-600">
            <span>Favourites</span>
            <HeartIcon />
          </li>
        </Link>

        <li className="cursor-pointer underline transition-all hover:font-bold hover:text-blue-600">
          {name ? name : "Loading..."}
        </li>
      </ul>
    </nav>
  );
}
