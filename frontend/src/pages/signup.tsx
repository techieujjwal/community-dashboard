import { Link } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";

export default function Signup() {
  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();
      const res = await fetch("http://localhost:5000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
      });
      const data = await res.json();
      console.log("[RESP] Signup:", data);
    } catch (err) {
      console.error("Signup failed:", err);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Signup</h2>
      <button onClick={handleGoogleSignup}>Sign up with Google</button>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

// const styles: Record<string, React.CSSProperties> = {
//   container: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "center",
//     minHeight: "100vh",
//   },
//   form: { display: "flex", flexDirection: "column", width: "300px" },
//   input: { margin: "10px 0", padding: "10px", fontSize: "16px" },
//   button: { background: "red", color: "white", padding: "10px", border: "none" },
//   link: { color: "gold" },
// };
