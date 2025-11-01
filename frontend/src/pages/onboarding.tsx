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

  useEffect(() => {
    const checkExistingCommunity = async () => {
      if (!authReady) {
        console.log("[DEBUG] Waiting for Firebase Auth to initialize...");
        return;
      }

      if (!user) {
        console.log("[DEBUG] No user found — redirecting to login");
        navigate("/login");
        return;
      }

      try {
        console.log("[DEBUG] Checking community for:", user.uid);

        const q = query(
          collection(db, "communities"),
          where("ownerId", "==", user.uid)
        );
        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
          console.log("[DEBUG] Existing community found — redirecting...");
          navigate("/communities");
        } else {
          console.log("[DEBUG] No existing community — show form");
          setLoading(false);
        }
      } catch (err) {
        console.error("[ERROR] Firestore query failed:", err);
        setLoading(false);
      }
    };

    checkExistingCommunity();
  }, [user, authReady, navigate]);

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

      alert("Community created successfully!");
      navigate("/communities");
    } catch (error: any) {
      console.error("Error creating community:", error);
      if (error.code === "permission-denied") {
        alert(
          "You don’t have permission to create a community. Check Firestore rules."
        );
      } else {
        alert("Failed to create community. Please try again.");
      }
    }
  };

  if (loading) return <p>🔍 Checking your community access...</p>;

  return (
    <div className="onboarding" style={{ padding: "2rem" }}>
      <h2>Create a New Community</h2>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          maxWidth: "500px",
        }}
      >
        <label>
          Community Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Work Associated / College:
          <input
            type="text"
            name="workAssociated"
            value={formData.workAssociated}
            onChange={handleChange}
          />
        </label>

        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </label>

        <label>
          Member Cap:
          <input
            type="number"
            name="memberCap"
            value={formData.memberCap}
            onChange={handleChange}
            min="1"
          />
        </label>

        <label>
          Roles (comma-separated):
          <input
            type="text"
            name="roles"
            value={formData.roles}
            onChange={handleChange}
            placeholder="e.g. admin, moderator, member"
          />
        </label>

        <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
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
          style={{
            backgroundColor: "#2563eb",
            color: "white",
            padding: "0.7rem",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Create Community
        </button>
      </form>
    </div>
  );
}
