import { Link } from "react-router-dom";
import Navbar from "./Navbar";

interface SignupProps {
  isSignedIn: boolean;
}

export default function Header({ isSignedIn }: SignupProps) {
  return (
    <div className="flex flex-row items-center justify-between p-3 text-offwhite lg:p-0">
      <Link to="/">
        <div className="flex items-center gap-5">
          <img
            className="motion-preset-seesaw size-12 motion-duration-300"
            src="assets/images/logo.png"
            alt="logo"
          />
          <h1 className="hidden py-10 text-center text-3xl font-bold lg:block">
            Meal Mate
          </h1>
        </div>
      </Link>
      {isSignedIn && <Navbar />}
    </div>
  );
}
