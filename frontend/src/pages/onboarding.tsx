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

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  };

  const formStyle = {
    backgroundColor: '#1e293b',
    padding: '3rem',
    borderRadius: '1rem',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.4)',
    border: '1px solid #334155',
    width: '100%',
    maxWidth: '500px'
  };

  const inputStyle = {
    width: '100%',
    padding: '1rem',
    margin: '0.5rem 0 1rem',
    backgroundColor: '#334155',
    border: '1px solid #475569',
    borderRadius: '0.5rem',
    color: '#e2e8f0',
    fontSize: '1rem'
  };

  const buttonStyle = {
    width: '100%',
    padding: '1rem',
    marginTop: '1.5rem',
    backgroundColor: '#1e40af',
    color: 'white',
    border: 'none',
    borderRadius: '0.5rem',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer'
  };

  if (loading) return (
    <div style={containerStyle}>
      <p style={{ color: '#e2e8f0', fontSize: '1.125rem' }}>🔍 Checking your community access...</p>
    </div>
  );

  return (
    <div style={containerStyle}>
      <div style={formStyle}>
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '2rem', color: '#f1f5f9' }}>
          Create a New Community
        </h2>

        <form onSubmit={handleSubmit}>
          <div>
            <label style={{ display: 'block', color: '#e2e8f0', fontWeight: '500', marginBottom: '0.5rem' }}>
              Community Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={inputStyle}
              placeholder="Enter community name"
            />
          </div>

          <div>
            <label style={{ display: 'block', color: '#e2e8f0', fontWeight: '500', marginBottom: '0.5rem' }}>
              Work Associated / College
            </label>
            <input
              type="text"
              name="workAssociated"
              value={formData.workAssociated}
              onChange={handleChange}
              style={inputStyle}
              placeholder="e.g., Tech Club, Engineering Dept"
            />
          </div>

          <div>
            <label style={{ display: 'block', color: '#e2e8f0', fontWeight: '500', marginBottom: '0.5rem' }}>
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              style={{ ...inputStyle, minHeight: '100px', resize: 'vertical' }}
              placeholder="Briefly describe your community..."
            />
          </div>

          <div>
            <label style={{ display: 'block', color: '#e2e8f0', fontWeight: '500', marginBottom: '0.5rem' }}>
              Member Cap
            </label>
            <input
              type="number"
              name="memberCap"
              value={formData.memberCap}
              onChange={handleChange}
              min="1"
              style={inputStyle}
              placeholder="Max number of members"
            />
          </div>

          <div>
            <label style={{ display: 'block', color: '#e2e8f0', fontWeight: '500', marginBottom: '0.5rem' }}>
              Roles (comma-separated)
            </label>
            <input
              type="text"
              name="roles"
              value={formData.roles}
              onChange={handleChange}
              placeholder="e.g., admin, moderator, member"
              style={inputStyle}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '1rem 0' }}>
            <input
              type="checkbox"
              name="chatEnabled"
              checked={formData.chatEnabled}
              onChange={handleChange}
              style={{ width: '1rem', height: '1rem' }}
            />
            <span style={{ color: '#e2e8f0', fontWeight: '500' }}>Enable Chat</span>
          </div>

          <button type="submit" style={buttonStyle}>
            Create Community
          </button>
        </form>
      </div>
    </div>
  );
}