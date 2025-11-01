import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      console.log("[AUTH] Login successful, redirecting to dashboard...");
      navigate("/dashboard");
    } catch (err) {
      console.error("Login failed:", err);
      alert("Invalid email or password");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      console.log("[AUTH] Google login successful, redirecting...");
      navigate("/dashboard");
    } catch (err) {
      console.error("Google login failed:", err);
      alert("Google login failed. Try again.");
    }
  };

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  };

  const formStyle = {
    backgroundColor: '#1e293b',
    padding: '3rem',
    borderRadius: '1rem',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.4)',
    border: '1px solid #334155',
    width: '100%',
    maxWidth: '400px'
  };

  const inputStyle = {
    width: '100%',
    padding: '1rem',
    margin: '0.5rem 0',
    backgroundColor: '#334155',
    border: '1px solid #475569',
    borderRadius: '0.5rem',
    color: '#e2e8f0',
    fontSize: '1rem'
  };

  const buttonStyle = {
    width: '100%',
    padding: '1rem',
    margin: '1rem 0',
    backgroundColor: '#1e40af',
    color: 'white',
    border: 'none',
    borderRadius: '0.5rem',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  };

  return (
    <div style={containerStyle}>
      <div style={formStyle}>
        <h2 style={{ color: '#f1f5f9', textAlign: 'center', marginBottom: '2rem', fontSize: '2rem' }}>Login</h2>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={inputStyle}
          />
          <button type="submit" style={buttonStyle}>Login</button>
        </form>

        <p style={{ color: '#94a3b8', textAlign: 'center', margin: '1rem 0' }}>or</p>

        <button
          onClick={handleGoogleLogin}
          style={{
            ...buttonStyle,
            backgroundColor: '#4285F4'
          }}
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
}
