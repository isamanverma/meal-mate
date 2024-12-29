import { useState } from "react";
import { Navigate } from "react-router-dom";
import Header from "../components/Header";

interface SignupProps {
  isSignedIn: boolean;
  onSignIn: () => void; // Callback to notify parent of sign-in
}

interface FormData {
  name: string;
  email: string;
  password: string;
}

export default function Signup({ isSignedIn, onSignIn }: SignupProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setError(""); // Clear error on input change

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form data
    if (!formData.name || !formData.email || !formData.password) {
      setError("Please fill out all fields before submitting.");
      return;
    }

    // Save data to local storage
    localStorage.setItem("user", JSON.stringify(formData));

    // Notify parent component about sign-in
    onSignIn();
  };

  if (isSignedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div className="mx-auto min-h-screen max-w-full lg:max-w-7xl">
      <Header isSignedIn={isSignedIn} />
      <div className="flex items-center justify-center py-10">
        <form
          onSubmit={handleSubmit}
          className="mt-[10%] w-full max-w-sm space-y-4 rounded-md border border-gray-200 bg-white p-6 shadow-lg"
        >
          <h1 className="text-center font-magtis text-4xl font-semibold text-gray-800">
            Sign Up
          </h1>

          {error && (
            <div className="text-center text-sm font-medium text-red-600">
              {error}
            </div>
          )}

          {/* Name Field */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your name"
              className="mt-1 w-full rounded-md border border-gray-300 p-2 text-sm text-gray-900 shadow-sm outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              className="mt-1 w-full rounded-md border border-gray-300 p-2 text-sm text-gray-900 shadow-sm outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
              className="mt-1 w-full rounded-md border border-gray-300 p-2 text-sm text-gray-900 shadow-sm outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full rounded-md bg-red-600 py-2 text-sm font-medium text-white hover:bg-red-700 focus:ring-2 focus:ring-red-500"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
