import React, { useEffect, useState } from "react";
import axios from "axios";

const AnnouncementSection = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    axios.get("/announcements")
      .then(res => setAnnouncements(res.data))
      .catch(err => console.error("Announcement load error", err));
  }, []);

  if (announcements.length === 0) return null;

  return (
    <div className="my-8  p-4 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">📢 Announcements</h2>
      <ul className="space-y-4">
        {announcements.map((a) => (
          <li key={a._id} className=" p-4 rounded shadow-sm">
            <h3 className="text-lg font-bold">{a.title}</h3>
            <p className="text-gray-600">{a.description}</p>
            <div className="text-sm text-gray-400 mt-2">
              - {a.authorName}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AnnouncementSection;
