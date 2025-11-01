import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function CommunityDetails() {
  const { id } = useParams<{ id: string }>();
  const [community, setCommunity] = useState<any>(null);
  const [role, setRole] = useState<string>("");

  useEffect(() => {
    const fetchCommunity = async () => {
      const docRef = doc(db, "communities", id!);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setCommunity(docSnap.data());
      }

      // optionally fetch user role (you can extend later)
      // For example:
      // const roleDoc = await getDoc(doc(db, `communities/${id}/roles/${currentUser.uid}`));
      // setRole(roleDoc.exists() ? roleDoc.data().role : "guest");
    };

    fetchCommunity();
  }, [id]);

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
    maxWidth: '800px',
    margin: '0 auto'
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
    marginRight: '1rem',
    marginTop: '0.5rem'
  };

  if (!community) return (
    <div style={containerStyle}>
      <p style={{ color: '#e2e8f0', fontSize: '1.125rem', textAlign: 'center' }}>Loading...</p>
    </div>
  );

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#f1f5f9', marginBottom: '2rem' }}>
          {community.name}
        </h1>
        
        <div style={{ marginBottom: '1.5rem' }}>
          <p style={{ color: '#94a3b8', marginBottom: '1rem', lineHeight: '1.6' }}>
            <strong style={{ color: '#e2e8f0' }}>Work / College:</strong> {community.workAssociated || "—"}
          </p>
          <p style={{ color: '#94a3b8', marginBottom: '1rem', lineHeight: '1.6' }}>
            <strong style={{ color: '#e2e8f0' }}>Description:</strong> {community.description || "—"}
          </p>
          <p style={{ color: '#94a3b8', marginBottom: '1rem', lineHeight: '1.6' }}>
            <strong style={{ color: '#e2e8f0' }}>Member Cap:</strong> {community.memberCap || "—"}
          </p>
          <p style={{ color: '#94a3b8', marginBottom: '1rem', lineHeight: '1.6' }}>
            <strong style={{ color: '#e2e8f0' }}>Roles:</strong> {community.roles?.join(", ") || "—"}
          </p>
          <p style={{ color: '#94a3b8', marginBottom: '1rem', lineHeight: '1.6' }}>
            <strong style={{ color: '#e2e8f0' }}>Chat Enabled:</strong> {community.chatEnabled ? "Yes" : "No"}
          </p>
        </div>

        {role === "admin" && (
          <div style={{ 
            marginTop: '2rem', 
            padding: '1.5rem', 
            border: '1px solid #334155', 
            borderRadius: '0.5rem', 
            backgroundColor: '#334155' 
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#f1f5f9' }}>
              Admin Controls
            </h3>
            <button style={{ ...buttonStyle, backgroundColor: '#059669' }}>Schedule Event</button>
            <button style={{ ...buttonStyle, backgroundColor: '#dc2626' }}>Manage Members</button>
          </div>
        )}

        {role === "member" && (
          <div style={{ marginTop: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#f1f5f9' }}>
              Member Activities
            </h3>
            <button style={buttonStyle}>View Posts</button>
          </div>
        )}
      </div>
    </div>
  );
}