import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  serverTimestamp,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Onboarding() {
  const navigate = useNavigate();
  const { user, authReady } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    workAssociated: "",
    description: "",
    memberCap: "",
    roles: "",
    chatEnabled: false,
  });

  const [loading, setLoading] = useState(true);

  // Check if user already owns a community
  useEffect(() => {
    const checkExistingCommunity = async () => {
      if (!authReady) return; // wait for Firebase to initialize
      if (!user) {
        navigate("/login");
        return;
      }

      try {
        const q = query(
          collection(db, "communities"),
          where("ownerId", "==", user.uid)
        );
        const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        const proceed = window.confirm(
          "You already have a community. Do you want to create another?"
        );
        if (!proceed) navigate("/my-communities");
        else setLoading(false);
      } else {
        setLoading(false);
      }

      } catch (err) {
        console.error("[ERROR] Firestore query failed:", err);
        setLoading(false);
      }
    };

    checkExistingCommunity();
  }, [user, authReady, navigate]);

  // ✅ Handle form input
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert("You must be logged in to create a community.");
      navigate("/login");
      return;
    }

    try {
      const rolesArray = formData.roles
        .split(",")
        .map((r) => r.trim())
        .filter((r) => r.length > 0);

      await addDoc(collection(db, "communities"), {
        name: formData.name,
        workAssociated: formData.workAssociated,
        description: formData.description,
        memberCap: Number(formData.memberCap),
        roles: rolesArray,
        chatEnabled: formData.chatEnabled,
        ownerId: user.uid,
        createdAt: serverTimestamp(),
      });

      alert("🎉 Community created successfully!");
      navigate("/my-communities"); // redirect after creation
    } catch (error: any) {
      console.error("Error creating community:", error);
      alert("Failed to create community. Please try again.");
    }
  };

  if (loading) return <p>🔍 Checking your community access...</p>;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-700">
          Create a New Community
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Community Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Community Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
              placeholder="Enter community name"
            />
          </div>

          {/* Work Associated / College */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Work Associated / College
            </label>
            <input
              type="text"
              name="workAssociated"
              value={formData.workAssociated}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
              placeholder="e.g., Tech Club, Engineering Dept"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
              rows={3}
              placeholder="Briefly describe your community..."
            />
          </div>

          {/* Member Cap */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Member Cap
            </label>
            <input
              type="number"
              name="memberCap"
              value={formData.memberCap}
              onChange={handleChange}
              min="1"
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
              placeholder="Max number of members"
            />
          </div>

          {/* Roles */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Roles (comma-separated)
            </label>
            <input
              type="text"
              name="roles"
              value={formData.roles}
              onChange={handleChange}
              placeholder="e.g., admin, moderator, member"
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Chat Toggle */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="chatEnabled"
              checked={formData.chatEnabled}
              onChange={handleChange}
              className="h-4 w-4 accent-blue-600"
            />
            <span className="text-gray-700 font-medium">Enable Chat</span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold mt-3"
          >
            Create Community
          </button>
        </form>
      </div>
    </div>
  );
}
