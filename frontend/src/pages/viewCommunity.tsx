import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { auth } from "../firebase";

export default function ViewCommunity() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [community, setCommunity] = useState<any>(null);

  useEffect(() => {
    const fetchCommunity = async () => {
      try {
        const user = auth.currentUser;
        const idToken = await user?.getIdToken();

        const res = await fetch(`http://localhost:5000/api/community/${id}`, {
          headers: { Authorization: `Bearer ${idToken}` },
        });
        const data = await res.json();
        setCommunity(data.data);
      } catch (err) {
        console.error("Error fetching community:", err);
      }
    };

    fetchCommunity();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this community?")) return;
    try {
      const idToken = await auth.currentUser?.getIdToken();
      const res = await fetch(`http://localhost:5000/api/community/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${idToken}` },
      });
      if (res.ok) {
        alert("Community deleted successfully!");
        navigate("/community");
      }
    } catch (err) {
      console.error("Error deleting community:", err);
    }
  };

  if (!community) return <p>Loading...</p>;

  return (
    <div style={{ padding: "30px" }}>
      <h2>{community.name}</h2>
      <p>{community.description}</p>
      <p><strong>Visibility:</strong> {community.visibility}</p>
      <p><strong>Purpose:</strong> {community.purpose}</p>

      <div style={{ marginTop: "20px" }}>
        <Link to={`/community/${id}/edit`}>✏️ Edit</Link> &nbsp; | &nbsp;
        <button onClick={handleDelete} style={{ background: "red", color: "white" }}>
          🗑 Delete
        </button>
      </div>
    </div>
  );
}
