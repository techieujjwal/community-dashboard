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

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
    padding: '2rem',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  };

  const cardStyle = {
    backgroundColor: '#1e293b',
    padding: '2rem',
    borderRadius: '1rem',
    border: '1px solid #334155',
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
    marginBottom: '1.5rem'
  };

  const buttonStyle = {
    backgroundColor: '#1e40af',
    color: 'white',
    padding: '0.75rem 1.5rem',
    borderRadius: '0.5rem',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '600',
    marginRight: '1rem'
  };

  return (
    <div style={containerStyle}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#f1f5f9' }}>My Communities</h1>
          <button onClick={() => navigate("/onboarding")} style={buttonStyle}>
            + Create New Community
          </button>
        </div>

        {communities.length === 0 ? (
          <p style={{ color: '#94a3b8', fontSize: '1.125rem', textAlign: 'center', padding: '3rem' }}>You haven't created any communities yet.</p>
        ) : (
          <div>
            {communities.map((community) => (
              <div key={community.id} style={cardStyle}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#f1f5f9', marginBottom: '1rem' }}>
                  {community.name}
                </h2>
                <p style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>
                  {community.description || "No description available."}
                </p>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button onClick={() => navigate(`/community/${community.id}`)} style={buttonStyle}>
                    View
                  </button>
                  {(userRole === "admin" || userRole === "creator") && (
                    <button onClick={() => navigate(`/community/edit/${community.id}`)} style={{ ...buttonStyle, backgroundColor: '#059669' }}>
                      Edit
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}