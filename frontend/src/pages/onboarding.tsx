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

  // ✅ Handle form submission
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
      navigate("/my-communities"); // redirect after creation ✅
    } catch (error: any) {
      console.error("Error creating community:", error);
      alert("Failed to create community. Please try again.");
    }
  };

  if (loading) return <p>🔍 Checking your community access...</p>;

  return (
    <div className="onboarding p-8 min-h-screen bg-gray-50 flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-8">Create a New Community</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-2xl p-6 flex flex-col gap-4 w-full max-w-md"
      >
        <label className="flex flex-col gap-1">
          Community Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="border rounded-lg p-2"
          />
        </label>

        <label className="flex flex-col gap-1">
          Work Associated / College:
          <input
            type="text"
            name="workAssociated"
            value={formData.workAssociated}
            onChange={handleChange}
            className="border rounded-lg p-2"
          />
        </label>

        <label className="flex flex-col gap-1">
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="border rounded-lg p-2"
          />
        </label>

        <label className="flex flex-col gap-1">
          Member Cap:
          <input
            type="number"
            name="memberCap"
            value={formData.memberCap}
            onChange={handleChange}
            min="1"
            className="border rounded-lg p-2"
          />
        </label>

        <label className="flex flex-col gap-1">
          Roles (comma-separated):
          <input
            type="text"
            name="roles"
            value={formData.roles}
            onChange={handleChange}
            placeholder="e.g. admin, moderator, member"
            className="border rounded-lg p-2"
          />
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="chatEnabled"
            checked={formData.chatEnabled}
            onChange={handleChange}
          />
          Enable Chat
        </label>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Create Community
        </button>
      </form>
    </div>
  );
}
