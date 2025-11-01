import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Users, PlusCircle, CheckCircle } from "lucide-react";

export default function Dashboard() {
  const { user, authReady } = useAuth();
  const navigate = useNavigate();

  if (!authReady) {
    return <div className="text-center mt-20 text-lg">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="text-center mt-20 text-lg">
        Please log in first. <br />
        <button
          onClick={() => navigate("/login")}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="p-8 min-h-screen bg-gray-50 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-10 text-center">
        Welcome, {user.displayName || user.email} 👋
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl">
        {/* Communities Button */}
        <button
          onClick={() => navigate("/my-communities")}
          className="flex flex-col items-center justify-center bg-white text-blue-600 border border-blue-200 rounded-2xl p-8 shadow-md hover:shadow-lg hover:bg-blue-50 transition-all"
        >
          <Users size={40} className="mb-3" />
          <h2 className="text-xl font-semibold mb-1">Communities</h2>
          <p className="text-gray-600 text-sm">
            Explore and join learning communities.
          </p>
        </button>

        {/* Create Community Button */}
        <button
          onClick={() => navigate("/onboarding")}
          className="flex flex-col items-center justify-center bg-white text-green-600 border border-green-200 rounded-2xl p-8 shadow-md hover:shadow-lg hover:bg-green-50 transition-all"
        >
          <PlusCircle size={40} className="mb-3" />
          <h2 className="text-xl font-semibold mb-1">Create a Community</h2>
          <p className="text-gray-600 text-sm">
            Build your own space and invite members.
          </p>
        </button>

        {/* Onboarding Button */}
        <button
          onClick={() => navigate("/onboarding")}
          className="flex flex-col items-center justify-center bg-white text-purple-600 border border-purple-200 rounded-2xl p-8 shadow-md hover:shadow-lg hover:bg-purple-50 transition-all"
        >
          <CheckCircle size={40} className="mb-3" />
          <h2 className="text-xl font-semibold mb-1">Onboarding</h2>
          <p className="text-gray-600 text-sm">
            Complete setup for personalized access.
          </p>
        </button>
      </div>
    </div>
  );
}
