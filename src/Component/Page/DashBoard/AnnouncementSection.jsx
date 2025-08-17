import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../Share/Spinner";

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

  if (isPending) return <div className="my-5"> <Spinner></Spinner></div>;
  if (error) return <div>Error loading announcements.</div>;
  if (announcements.length === 0) return null;

  return (
    <div className=" xl:max-w-[1350px]  md:w-11/12 mx-auto  my-8 p-4 rounded   bg-none    ">
      <h2 className="text-2xl font-semibold mb-4 text text-center">📢 Announcements</h2>
      <ul className="space-y-4 grid gap-6 lg:grid-cols-3 md:grid-cols-2">
        {announcements.map((a) => (
          <li key={a._id} className="p-4 rounded shadow-sm">
            <h3 className="text-lg font-bold">{a.title}</h3>
            <p className="">{a.description}</p>
            <div className="text-sm  mt-2">- {a.authorName}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AnnouncementSection;

