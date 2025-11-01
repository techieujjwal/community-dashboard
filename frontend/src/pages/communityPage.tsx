import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Card, CardContent, CardHeader } from "../components/ui/card";

export default function CommunityDetails() {
  const { id } = useParams<{ id: string }>();
  const [community, setCommunity] = useState<any>(null);
  const [role, setRole] = useState<string>("");

  useEffect(() => {
    const fetchCommunity = async () => {
      const docRef = doc(db, "communities", id!);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setCommunity(docSnap.data());
      }

      // optionally fetch user role (you can extend later)
      // For example:
      // const roleDoc = await getDoc(doc(db, `communities/${id}/roles/${currentUser.uid}`));
      // setRole(roleDoc.exists() ? roleDoc.data().role : "guest");
    };

    fetchCommunity();
  }, [id]);

  if (!community) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <Card>
        <CardHeader>{community.name}</CardHeader>
        <CardContent>
        <p><strong>Work / College:</strong> {community.workAssociated || "—"}</p>
        <p><strong>Description:</strong> {community.description || "—"}</p>
        <p><strong>Member Cap:</strong> {community.memberCap || "—"}</p>
        <p><strong>Roles:</strong> {community.roles?.join(", ") || "—"}</p>
        <p><strong>Chat Enabled:</strong> {community.chatEnabled ? "Yes" : "No"}</p>

          {role === "admin" && (
            <div className="mt-4 p-4 border rounded-md bg-gray-50">
              <h3 className="font-bold text-lg mb-2">Admin Controls</h3>
              <button className="bg-green-600 text-white px-3 py-2 rounded-md mr-3">Schedule Event</button>
              <button className="bg-red-600 text-white px-3 py-2 rounded-md">Manage Members</button>
            </div>
          )}

          {role === "member" && (
            <div className="mt-4">
              <h3 className="font-bold text-lg mb-2">Member Activities</h3>
              <button className="bg-blue-500 text-white px-3 py-2 rounded-md">View Posts</button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
