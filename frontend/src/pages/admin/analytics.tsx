// src/pages/admin/analytics.tsx
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const Analytics = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchActivity = async () => {
      const querySnapshot = await getDocs(collection(db, "communities"));
      const activityData: any[] = [];

      querySnapshot.forEach((doc) => {
        const logs = doc.data().activityLogs || [];
        activityData.push({
          name: doc.data().name || "Unknown",
          interactions: logs.length,
        });
      });

      setData(activityData);
    };

    fetchActivity();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Community Activity Overview</h1>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="interactions" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Analytics;
