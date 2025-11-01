import { Link } from "react-router-dom";


export default function Homepage() {
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Welcome to the Community Engagement Hub</h1>
      <p>Sign up or log in to explore communities and analytics.</p>
    </div>
  );
}


const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f5f5f5",
  },
  heading: {
    fontSize: "3rem",
    color: "#333",
    fontFamily: "Arial, sans-serif",
  },
};
