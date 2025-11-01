import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase";

export default function CommunityList() {
  const [communities, setCommunities] = useState<any[]>([]);

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const user = auth.currentUser;
        const idToken = await user?.getIdToken();

        const res = await fetch("http://localhost:5000/community", {
          headers: { Authorization: `Bearer ${idToken}` },
        });
        const data = await res.json();
        setCommunities(data.data || []);
      } catch (err) {
        console.error("Error fetching communities:", err);
      }
    };

    fetchCommunities();
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h2>All Communities</h2>
      <Link to="/community/create">➕ Create New Community</Link>
      <ul>
        {communities.map((c) => (
          <li key={c.id}>
            <Link to={`/community/${c.id}`}>{c.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
