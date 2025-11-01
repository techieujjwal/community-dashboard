import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signup(email, password);
      console.log("[AUTH] Signup successful, redirecting to dashboard...");
      navigate("/dashboard");
    } catch (err) {
      console.error("Signup failed:", err);
      alert("Could not create account. Try again.");
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await loginWithGoogle();
      navigate("/dashboard");
    } catch (err) {
      console.error("Google signup failed:", err);
      alert("Google signup failed. Try again.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "3rem" }}>
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
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
        <button type="submit">Signup</button>
      </form>

      <p>or</p>

      <button
        onClick={handleGoogleSignup}
        style={{
          background: "#4285F4",
          color: "white",
          padding: "0.6rem 1rem",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Sign up with Google
      </button>
    </div>
  );
}
