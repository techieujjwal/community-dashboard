import { Link, useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";

export default function Login() {
  const navigate = useNavigate();
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth,provider);
      const user = result.user;
      const idToken = await user.getIdToken();
      if(user) {
        console.log("[TOKEN] Firebase ID Token:", idToken);
      }
      const res = await fetch("http://localhost:5000/auth/login",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        }
      });
      const data = await await res.json();
      console.log("[RESP] Backend response: ",data);
      if(res.ok) {
        navigate("/dashboard");
      } else {
        alert("Invalid Credentials!");
      }
    } catch(err) {
      console.error("[FAILED] Login failed: ",err);
    }
  }
  return (
    <div style={styles.container}>
      <h2>Login</h2>

      {/* Old email/password form (optional – you can remove it) */}
      <form style={styles.form}>
        <input type="email" placeholder="Email" style={styles.input} disabled />
        <input type="password" placeholder="Password" style={styles.input} disabled />
        <button type="button" style={styles.button} onClick={handleGoogleLogin}>
          Sign in with Google
        </button>
      </form>

      <p>
        Don’t have an account?{" "}
        <Link to="/signup" style={styles.link}>
          Sign up here
        </Link>
      </p>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
  },
  form: { display: "flex", flexDirection: "column", width: "300px" },
  input: {
    margin: "10px 0",
    padding: "10px",
    fontSize: "16px",
  },
  button: {
    background: "#4285F4",
    color: "white",
    padding: "10px",
    border: "none",
    cursor: "pointer",
  },
  link: { color: "red" },
};
