import { useEffect, useState } from "react";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { db } from "../firebase";

export default function CommunityDetails() {
  const { id } = useParams<{ id: string }>();
  const [community, setCommunity] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [chats, setChats] = useState<any[]>([]);

  useEffect(() => {
    const fetchCommunityData = async () => {
      try {
        // Fetch community details
        const communityRef = doc(db, "communities", id!);
        const docSnap = await getDoc(communityRef);

        if (docSnap.exists()) {
          setCommunity({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.warn("No such community found!");
        }

        // Fetch posts
        const postsRef = collection(db, "communities", id!, "posts");
        const postsSnap = await getDocs(postsRef);
        setPosts(postsSnap.docs.map((d) => ({ id: d.id, ...d.data() })));

        // Fetch chats
        const chatsRef = collection(db, "communities", id!, "chats");
        const chatsSnap = await getDocs(chatsRef);
        setChats(chatsSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
      } catch (err) {
        console.error("Error fetching community data:", err);
      }
    };

    fetchCommunityData();
  }, [id]);

  if (!community) return <p className="p-6 text-gray-600">Loading...</p>;

  const totalMembers = community.members?.length || 0;
  const totalPosts = posts.length;
  const totalChats = chats.length;
  const totalActions = community.activityLogs?.length || 0;

  // Extract last activity time (if exists)
  const lastActionTime =
    community.activityLogs && community.activityLogs.length > 0
      ? new Date(
          community.activityLogs[
            community.activityLogs.length - 1
          ].timestamp
        ).toLocaleString()
      : "—";

  return (
    <div className="p-6">
      {/* ====== HEADER ====== */}
      <h1 className="text-3xl font-bold mb-1">{community.name}</h1>
      <p className="text-gray-700 mb-6">{community.description}</p>

      {/* ====== ANALYTICS SUMMARY ====== */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-100 shadow-sm">
          <p className="text-sm text-indigo-500 font-semibold">👥 Members</p>
          <p className="text-2xl font-bold">{totalMembers}</p>
        </div>
        <div className="p-4 rounded-xl bg-green-50 border border-green-100 shadow-sm">
          <p className="text-sm text-green-600 font-semibold">📝 Posts</p>
          <p className="text-2xl font-bold">{totalPosts}</p>
        </div>
        <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 shadow-sm">
          <p className="text-sm text-blue-600 font-semibold">💬 Chats</p>
          <p className="text-2xl font-bold">{totalChats}</p>
        </div>
        <div className="p-4 rounded-xl bg-yellow-50 border border-yellow-100 shadow-sm">
          <p className="text-sm text-yellow-600 font-semibold">📊 Actions</p>
          <p className="text-2xl font-bold">{totalActions}</p>
        </div>
      </div>

      {/* ====== LAST ACTIVITY ====== */}
      <div className="bg-gray-50 border rounded-lg p-4 mb-6">
        <p className="text-gray-700">
          <strong>Last Activity:</strong> {lastActionTime}
        </p>
      </div>

      {/* ====== COMMUNITY DETAILS ====== */}
      <div className="space-y-2 mb-8">
        <p><strong>Created By:</strong> {community.createdBy || "—"}</p>
        <p>
          <strong>Created At:</strong>{" "}
          {community.createdAt
            ? new Date(community.createdAt).toLocaleString()
            : "—"}
        </p>
        <p>
          <strong>Updated At:</strong>{" "}
          {community.updatedAt
            ? new Date(community.updatedAt).toLocaleString()
            : "—"}
        </p>
      </div>

      <hr className="my-6" />

      {/* ====== ACTIVITY LOGS ====== */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">📊 Activity Logs</h2>
        {community.activityLogs && community.activityLogs.length > 0 ? (
          <ul className="space-y-2">
            {community.activityLogs.map((log: any, index: number) => (
              <li
                key={index}
                className="border p-3 rounded-md bg-gray-50 shadow-sm"
              >
                <p><strong>Action:</strong> {log.action}</p>
                <p><strong>User ID:</strong> {log.userId}</p>
                <p>
                  <strong>Timestamp:</strong>{" "}
                  {new Date(log.timestamp).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No activity yet.</p>
        )}
      </section>

      {/* ====== POSTS ====== */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">📬 Posts</h2>
        {posts.length > 0 ? (
          <ul className="space-y-2">
            {posts.map((p) => (
              <li
                key={p.id}
                className="border p-3 rounded-md bg-gray-50 shadow-sm"
              >
                <p className="font-semibold">{p.title || "Untitled Post"}</p>
                <p className="text-sm text-gray-600">{p.content || "—"}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No posts yet.</p>
        )}
      </section>

      {/* ====== CHATS ====== */}
      <section>
        <h2 className="text-xl font-semibold mb-2">💬 Chats</h2>
        {chats.length > 0 ? (
          <ul className="space-y-2">
            {chats.map((c) => (
              <li
                key={c.id}
                className="border p-3 rounded-md bg-gray-50 shadow-sm"
              >
                <p className="text-sm">
                  <strong>{c.sender || "Anonymous"}</strong>: {c.message}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No chats yet.</p>
        )}
      </section>
    </div>
  );
}
