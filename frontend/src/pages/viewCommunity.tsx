import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Card, CardContent, CardHeader } from "../components/ui/card";

interface Community {
  id: string;
  name: string;
  college?: string;
  work?: string;
  purpose?: string;
  isPrivate?: boolean;
  createdBy?: string;
}

export default function ViewCommunity() {
  const { id } = useParams<{ id: string }>();
  const [community, setCommunity] = useState<Community | null>(null);
  const [isCreator, setIsCreator] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    purpose: "",
    college: "",
    work: "",
  });

  // Get user ID from local storage (assuming you stored it after login)
  const userId = localStorage.getItem("uid");

  useEffect(() => {
    const fetchCommunity = async () => {
      if (!id) return;
      const docRef = doc(db, "communities", id);
      const snap = await getDoc(docRef);

      if (snap.exists()) {
        const data = snap.data() as Community;
        // setCommunity({ id: snap.id, ...data });
        setEditedData({
          purpose: data.purpose || "",
          college: data.college || "",
          work: data.work || "",
        });
        if (userId && data.createdBy === userId) setIsCreator(true);
      }
    };
    fetchCommunity();
  }, [id, userId]);

  const handleSave = async () => {
    if (!id) return;
    const ref = doc(db, "communities", id);
    await updateDoc(ref, {
      purpose: editedData.purpose,
      college: editedData.college,
      work: editedData.work,
    });
    setCommunity({ ...community!, ...editedData });
    setEditing(false);
    alert("Community details updated successfully!");
  };

  if (!community) return <div className="p-6 text-gray-600">Loading...</div>;

  return (
    <div className="p-6 space-y-6 max-w-2xl mx-auto">
      <Card>
        <CardHeader className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">{community.name}</h1>
          {isCreator && !editing && (
            <button
              onClick={() => setEditing(true)}
              className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700"
            >
              Edit
            </button>
          )}
        </CardHeader>

        <CardContent className="space-y-3">
          <div>
            <strong>Purpose:</strong>{" "}
            {editing ? (
              <input
                type="text"
                className="border p-1 rounded w-full"
                value={editedData.purpose}
                onChange={(e) =>
                  setEditedData({ ...editedData, purpose: e.target.value })
                }
              />
            ) : (
              community.purpose || "N/A"
            )}
          </div>

          <div>
            <strong>College:</strong>{" "}
            {editing ? (
              <input
                type="text"
                className="border p-1 rounded w-full"
                value={editedData.college}
                onChange={(e) =>
                  setEditedData({ ...editedData, college: e.target.value })
                }
              />
            ) : (
              community.college || "N/A"
            )}
          </div>

          <div>
            <strong>Work:</strong>{" "}
            {editing ? (
              <input
                type="text"
                className="border p-1 rounded w-full"
                value={editedData.work}
                onChange={(e) =>
                  setEditedData({ ...editedData, work: e.target.value })
                }
              />
            ) : (
              community.work || "N/A"
            )}
          </div>

          {isCreator && editing && (
            <div className="flex gap-3 mt-3">
              <button
                onClick={handleSave}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
              >
                Save
              </button>
              <button
                onClick={() => setEditing(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          )}

          <p>
            <strong>Role:</strong> {isCreator ? "admin" : "member"}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
