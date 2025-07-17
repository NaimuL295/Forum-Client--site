import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const fetchAnnouncements = async () => {
  const res = await axios.get("https://forum-server-site.vercel.app/announcements");
  return res.data;
};

const AnnouncementSection = () => {
  const {
    data: announcements = [],
    isPending,
    error,
  } = useQuery({
    queryKey: ["announcements"],
    queryFn: fetchAnnouncements,
  });

  if (isPending) return <div>Loading announcements...</div>;
  if (error) return <div>Error loading announcements.</div>;
  if (announcements.length === 0) return null;

  return (
    <div className="my-8 p-4 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">📢 Announcements</h2>
      <ul className="space-y-4 grid  lg:grid-cols-3 md:grid-cols-2">
        {announcements.map((a) => (
          <li key={a._id} className="p-4 rounded shadow-sm">
            <h3 className="text-lg font-bold">{a.title}</h3>
            <p className="text-gray-600">{a.description}</p>
            <div className="text-sm text-gray-400 mt-2">- {a.authorName}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AnnouncementSection;

