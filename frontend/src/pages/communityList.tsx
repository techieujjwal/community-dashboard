// import { useEffect, useState } from "react";
// import { collection, query, where, getDocs } from "firebase/firestore";
// import { db } from "../firebase";
// import { useAuth } from "../hooks/useAuth";
// import { useNavigate } from "react-router-dom";

// interface Community {
//   id: string;
//   name: string;
//   description: string;
//   owner: string;
//   roles?: Record<string, string>; // userId -> role
// }

// export default function CommunityList() {
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const [communities, setCommunities] = useState<Community[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchCommunities = async () => {
//       if (!user) return;
//       try {
//         const userCommunities: Community[] = [];

//         // Fetch communities owned by the user
//         const q1 = query(collection(db, "communities"), where("owner", "==", user.uid));
//         const snapshot1 = await getDocs(q1);
//         snapshot1.forEach((doc) => {
//           const data = doc.data() as Omit<Community, "id">;
//           userCommunities.push({ ...data, id: doc.id });
//         });

//         // Fetch communities where the user is listed in roles
//         const q2 = query(collection(db, "communities"));
//         const snapshot2 = await getDocs(q2);
//         snapshot2.forEach((doc) => {
//           const data = doc.data() as Omit<Community, "id">;
//           if (data.roles && data.roles[user.uid] && !userCommunities.some((c) => c.id === doc.id)) {
//             userCommunities.push({ ...data, id: doc.id });
//           }
//         });

//         setCommunities(userCommunities);
//       } catch (err) {
//         console.error("Error fetching communities:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCommunities();
//   }, [user]);

//   if (loading) return <p>Loading communities...</p>;

//   return (
//     <div style={styles.container}>
//       <h2>Your Communities</h2>

//       <button style={styles.createBtn} onClick={() => navigate("/onboarding")}>
//         ➕ Create New Community
//       </button>

//       {communities.length === 0 ? (
//         <p>You haven’t joined or created any communities yet.</p>
//       ) : (
//         <ul style={styles.list}>
//           {communities.map((community) => (
//             <li
//               key={community.id}
//               style={styles.card}
//               onClick={() => navigate(`/view-community/${community.id}`)}
//             >
//               <h3>{community.name}</h3>
//               <p>{community.description}</p>
//               <small>
//                 Role:{" "}
//                 {community.owner === user?.uid
//                   ? "Owner"
//                   : community.roles?.[user?.uid || ""] || "Member"}
//               </small>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

// const styles: Record<string, React.CSSProperties> = {
//   container: { padding: "30px", textAlign: "left" },
//   createBtn: {
//     padding: "10px 15px",
//     marginBottom: "20px",
//     backgroundColor: "#4CAF50",
//     color: "white",
//     border: "none",
//     borderRadius: "6px",
//     cursor: "pointer",
//   },
//   list: { listStyle: "none", padding: 0 },
//   card: {
//     backgroundColor: "#f5f5f5",
//     padding: "15px",
//     borderRadius: "8px",
//     marginBottom: "10px",
//     cursor: "pointer",
//     transition: "0.2s",
//   },
// };
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Community } from "../types";

export default function CommunityList() {
  const [communities, setCommunities] = useState<Community[]>([]);

  useEffect(() => {
    const fetchCommunities = async () => {
      const querySnapshot = await getDocs(collection(db, "communities"));
      const fetchedCommunities: Community[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Community, "id">),
      }));
      setCommunities(fetchedCommunities);
    };

    fetchCommunities();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Communities</h1>
      <ul className="space-y-4">
        {communities.map((community) => (
          <li
            key={community.id}
            className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
          >
            <h2 className="text-lg font-semibold">{community.name}</h2>
            <p className="text-gray-600">{community.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
