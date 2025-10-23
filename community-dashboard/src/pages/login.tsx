import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div style={styles.container}>
      <h2>Login</h2>
      <form style={styles.form}>
        <input type="email" placeholder="Email" style={styles.input} />
        <input type="password" placeholder="Password" style={styles.input} />
        <button style={styles.button}>Sign In</button>
      </form>
      <p>
        Don’t have an account?{" "}
        <Link to="/signup" style={styles.link}>Sign up here</Link>
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
  button: { background: "black", color: "white", padding: "10px", border: "none" },
  link: { color: "red" },
};
