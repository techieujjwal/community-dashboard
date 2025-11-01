import { useAuth } from "../hooks/useAuth";

export default function Homepage() {
  const { user } = useAuth();

  return (
    <div style={{ textAlign: "center", marginTop: "3rem" }}>
      <h1>Welcome to the Community Engagement Hub</h1>
      <p>
        {user
          ? "Explore your communities and analytics from the Dashboard."
          : "Sign up or log in to explore communities and analytics."}
      </p>
    </div>
  );
}
