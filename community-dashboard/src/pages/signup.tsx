import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div style={styles.container}>
      <h2>Sign Up</h2>
      <form style={styles.form}>
        <input type="text" placeholder="Full Name" style={styles.input} />
        <input type="email" placeholder="Email" style={styles.input} />
        <input type="password" placeholder="Password" style={styles.input} />
        <button style={styles.button}>Create Account</button>
      </form>
      <p>
        Already have an account?{" "}
        <Link to="/login" style={styles.link}>Login</Link>
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
  input: { margin: "10px 0", padding: "10px", fontSize: "16px" },
  button: { background: "red", color: "white", padding: "10px", border: "none" },
  link: { color: "gold" },
};
