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

  return (
    <div style={{ textAlign: "center", marginTop: "3rem" }}>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />{" "}
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />{" "}
        <br />
        <button type="submit">Login</button>
      </form>

      <p>or</p>

      <button
        onClick={handleGoogleLogin}
        style={{
          background: "#4285F4",
          color: "white",
          padding: "0.6rem 1rem",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Continue with Google
      </button>
    </div>
  );
}
