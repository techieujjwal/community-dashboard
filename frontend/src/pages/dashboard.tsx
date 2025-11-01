import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Dashboard() {
  const { user, authReady } = useAuth();
  const navigate = useNavigate();

  // Wait until Firebase Auth initializes
  if (!authReady) {
    return <div className="text-center mt-20 text-lg">Loading...</div>;
  }

  // If user isn’t logged in, redirect or show fallback
  if (!user) {
    return (
      <div className="text-center mt-20 text-lg">
        Please log in first. <br />
        <button
          onClick={() => navigate("/login")}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Go to Login
        </button>
      </div>
    );
  }

  // Once authReady = true & user exists
  return (
    <div className="p-8 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Welcome, {user.displayName || user.email} 👋
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Communities Card */}
        <div
          onClick={() => navigate("/communities")}
          className="bg-white shadow-md rounded-2xl p-6 cursor-pointer hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold mb-2">Communities</h2>
          <p className="text-gray-600">
            Explore and join existing communities of like-minded learners.
          </p>
        </div>

        {/* Create Community Card */}
        <div
          onClick={() => navigate("/onboarding")}
          className="bg-white shadow-md rounded-2xl p-6 cursor-pointer hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold mb-2">Create a Community</h2>
          <p className="text-gray-600">
            Build your own community and invite members to collaborate.
          </p>
        </div>

        {/* Onboarding Shortcut */}
        <div
          onClick={() => navigate("/onboarding")}
          className="bg-white shadow-md rounded-2xl p-6 cursor-pointer hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold mb-2">Onboarding</h2>
          <p className="text-gray-600">
            Complete your onboarding process to get personalized recommendations.
          </p>
        </div>
      </div>
    </div>
  );
}
