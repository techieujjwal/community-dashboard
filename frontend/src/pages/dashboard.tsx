import { useEffect, useState } from "react";
import { auth } from "../firebase";

export default function Dashboard() {
  const [profile, setProfile] = useState<any>(null);
  const [communities, setCommunities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;
      if (!user) return;
      const idToken = await user.getIdToken();

      try {
        const [profileRes, communityRes] = await Promise.all([
          fetch("http://localhost:5000/profile", {
            headers: { Authorization: `Bearer ${idToken}` },
          }),
          fetch("http://localhost:5000/community", {
            headers: { Authorization: `Bearer ${idToken}` },
          }),
        ]);

        const profileData = await profileRes.json();
        const communityData = await communityRes.json();

        setProfile(profileData.data);
        setCommunities(communityData.data || []);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: "30px" }}>
      <h1>Dashboard</h1>
      <h3>👤 Profile</h3>
      <pre>{JSON.stringify(profile, null, 2)}</pre>

      <h3>🌐 Communities</h3>
      {communities.length ? (
        <ul>
          {communities.map((c) => (
            <li key={c.id}>{c.name}</li>
          ))}
        </ul>
      ) : (
        <p>No communities yet.</p>
      )}
    </div>
  );
}