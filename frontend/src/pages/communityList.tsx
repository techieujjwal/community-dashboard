import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { Community } from "../types";
import { useAuth } from "../hooks/useAuth";

export default function CommunityList() {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [userRole, setUserRole] = useState<string | null>(null);
  const { user, authReady } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCommunities = async () => {
      if (!authReady) return;
      if (!user) {
        navigate("/login");
        return;
      }

      try {
        // Fetch communities created by the logged-in user
        const q = query(
          collection(db, "communities"),
          where("ownerId", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);
        const fetchedCommunities: Community[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Community, "id">),
        }));
        setCommunities(fetchedCommunities);
      } catch (error) {
        console.error("Error fetching communities:", error);
      }
    };

    const fetchRole = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) return;

      try {
        const res = await fetch("/api/verifyRole", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });

        const data = await res.json();
        setUserRole(data.role);
      } catch (err) {
        console.error("Error fetching role:", err);
      }
    };

    fetchCommunities();
    fetchRole();
  }, [user, authReady, navigate]);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Communities</h1>
        <button
          onClick={() => navigate("/onboarding")}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          + Create New Community
        </button>
      </div>

      {/* Community List */}
      {communities.length === 0 ? (
        <p className="text-gray-500">You haven’t created any communities yet.</p>
      ) : (
        <ul className="space-y-4">
          {communities.map((community) => (
            <li
              key={community.id}
              className="p-5 border rounded-lg shadow-sm hover:shadow-md transition bg-white"
            >
              <h2 className="text-xl font-semibold text-gray-800">
                {community.name}
              </h2>
              <p className="text-gray-600 mb-3">
                {community.description || "No description available."}
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => navigate(`/community/${community.id}`)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                >
                  View
                </button>

                {(userRole === "admin" || userRole === "creator") && (
                  <button
                    onClick={() => navigate(`/community/edit/${community.id}`)}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
                  >
                    Edit
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
