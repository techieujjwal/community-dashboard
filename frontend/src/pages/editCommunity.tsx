import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { auth } from "../firebase";

export default function EditCommunity() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState<any>({});

  useEffect(() => {
    const fetchCommunity = async () => {
      const idToken = await auth.currentUser?.getIdToken();
      const res = await fetch(`http://localhost:5000/community/${id}`, {
        headers: { Authorization: `Bearer ${idToken}` },
      });
      const data = await res.json();
      setForm(data.data);
    };
    fetchCommunity();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const idToken = await auth.currentUser?.getIdToken();
      const res = await fetch(`http://localhost:5000/community/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        alert("Community updated!");
        navigate(`/community/${id}`);
      }
    } catch (err) {
      console.error("Error updating community:", err);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Edit Community</h2>
      <form onSubmit={handleUpdate}>
        <input
          name="name"
          value={form.name || ""}
          onChange={handleChange}
          placeholder="Name"
        />
        <textarea
          name="description"
          value={form.description || ""}
          onChange={handleChange}
          placeholder="Description"
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}
