import { useState } from "react";
import { auth } from "../firebase";

export default function CreateCommunity() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    collegeOrWork: "",
    purpose: "",
    visibility: "public",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = auth.currentUser;
      const idToken = await user?.getIdToken();

      const res = await fetch("http://localhost:5000/api/community/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      alert(data.message || "Community created!");
    } catch (err) {
      console.error("Error creating community:", err);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Create New Community</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          name="name"
          placeholder="Community Name"
          value={form.name}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          style={styles.textarea}
          required
        />
        <input
          name="collegeOrWork"
          placeholder="College or Workplace"
          value={form.collegeOrWork}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          name="purpose"
          placeholder="Purpose"
          value={form.purpose}
          onChange={handleChange}
          style={styles.input}
        />
        <select
          name="visibility"
          value={form.visibility}
          onChange={(e) => setForm({ ...form, visibility: e.target.value })}
          style={styles.input}
        >
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>
        <button type="submit" style={styles.button}>
          Create Community
        </button>
      </form>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: { padding: "30px" },
  form: { display: "flex", flexDirection: "column", width: "400px" },
  input: { margin: "8px 0", padding: "8px" },
  textarea: { margin: "8px 0", padding: "8px", height: "80px" },
  button: { padding: "10px", background: "#4CAF50", color: "white", border: "none" },
};
