import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Users, PlusCircle, CheckCircle } from "lucide-react";

export default function Dashboard() {
  const { user, authReady } = useAuth();
  const navigate = useNavigate();

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  };

  const cardStyle = {
    backgroundColor: '#1e293b',
    border: '1px solid #334155',
    borderRadius: '1rem',
    padding: '2rem',
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center' as const,
    cursor: 'pointer',
    transition: 'all 0.2s',
    color: '#e2e8f0'
  };

  if (!authReady) {
    return <div style={{ ...containerStyle, justifyContent: 'center', fontSize: '1.125rem', color: '#e2e8f0' }}>Loading...</div>;
  }

  if (!user) {
    return (
      <div style={{ ...containerStyle, justifyContent: 'center', textAlign: 'center', fontSize: '1.125rem', color: '#e2e8f0' }}>
        Please log in first. <br />
        <button
          onClick={() => navigate("/login")}
          style={{
            marginTop: '1rem',
            backgroundColor: '#1e40af',
            color: 'white',
            padding: '1rem 1.5rem',
            borderRadius: '0.5rem',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '600'
          }}
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '3rem', textAlign: 'center', color: '#f1f5f9' }}>
        Welcome, {user.displayName || user.email} 👋
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', width: '100%', maxWidth: '1200px' }}>
        {/* Communities Button */}
        <button
          onClick={() => navigate("/my-communities")}
          style={{ ...cardStyle, ':hover': { backgroundColor: '#334155' } }}
        >
          <Users size={40} style={{ marginBottom: '1rem', color: '#60a5fa' }} />
          <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', color: '#f1f5f9' }}>Communities</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>
            Explore and join learning communities.
          </p>
        </button>

        {/* Create Community Button */}
        <button
          onClick={() => navigate("/onboarding")}
          style={cardStyle}
        >
          <PlusCircle size={40} style={{ marginBottom: '1rem', color: '#34d399' }} />
          <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', color: '#f1f5f9' }}>Create a Community</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>
            Build your own space and invite members.
          </p>
        </button>

        {/* Onboarding Button */}
        <button
          onClick={() => navigate("/onboarding")}
          style={cardStyle}
        >
          <CheckCircle size={40} style={{ marginBottom: '1rem', color: '#a78bfa' }} />
          <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', color: '#f1f5f9' }}>Onboarding</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>
            Complete setup for personalized access.
          </p>
        </button>
      </div>
    </div>
  );
}
