import { useState, useEffect } from "react";
import usernameGenerator from "../utility/usernameGenerator.ts";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [name, setName] = useState<string | null>(null);

  // Get the name from localStorage when the component mounts
  useEffect(() => {
    const savedName = localStorage.getItem("user");
    if (savedName) {
      const parsedName = JSON.parse(savedName);
      setName(parsedName.name); // Assuming "name" is the key in your stored object
    }
  }, []);

  return (
    <nav>
      <ul className="flex gap-5 text-lg">
        <Link to="/fav">
          <li className="cursor-pointer transition-all hover:font-bold hover:text-blue-600">
            Favourites
          </li>
        </Link>

        <li className="cursor-pointer transition-all hover:font-bold hover:text-blue-600">
          Veg
        </li>
        <li className="cursor-pointer transition-all hover:font-bold hover:text-blue-600">
          {name ? usernameGenerator(name.toLowerCase()) : "Loading..."}
        </li>
      </ul>
    </nav>
  );
}
