import { useState } from "react";
import Header from "./Header";
import { Navigate } from "react-router-dom";

interface SignupProps {
  isSignedIn: boolean;
}

enum DietaryPreference {
  VEG = "Veg",
  NON_VEG = "Non-Veg",
  VEGAN = "Vegan",
}

interface FormData {
  name: string;
  email: string;
  password: string;
  dietaryPreference: DietaryPreference | "";
}

export default function Signup({ isSignedIn }: SignupProps) {
  // Always call hooks before any conditional logic
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    dietaryPreference: "",
  });

  const [redirect, setRedirect] = useState<boolean>(false);

  // Redirect early if the user is signed in
  if (isSignedIn) {
    return <Navigate to="/" />;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify(formData));
    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div className="mx-auto min-h-screen max-w-full lg:max-w-7xl">
      <Header isSignedIn={isSignedIn} />
      <div className="flex items-center justify-center py-10">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm space-y-4 rounded-md border border-gray-300 p-6 shadow-sm"
        >
          <h1 className="text-center text-xl font-semibold">Sign Up</h1>

          {/* Name Field */}
          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Name"
              className="w-full border border-gray-400 p-2 text-sm outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Email Field */}
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Email"
              className="w-full border border-gray-400 p-2 text-sm outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Password Field */}
          <div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Password"
              className="w-full border border-gray-400 p-2 text-sm outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Dietary Preference Dropdown */}
          <div>
            <select
              name="dietaryPreference"
              value={formData.dietaryPreference}
              onChange={handleChange}
              required
              className="w-full border border-gray-400 p-2 text-sm text-gray-500 outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="" disabled>
                Select Dietary Preference
              </option>
              <option value={DietaryPreference.VEG}>
                {DietaryPreference.VEG}
              </option>
              <option value={DietaryPreference.NON_VEG}>
                {DietaryPreference.NON_VEG}
              </option>
              <option value={DietaryPreference.VEGAN}>
                {DietaryPreference.VEGAN}
              </option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full rounded-md bg-indigo-600 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
