import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoIosNotifications } from "react-icons/io";

const NotificationBell = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    axios.get("https://forum-server-site.vercel.app/announcements/count")
      .then(res => setCount(res?.data?.count))
      .catch(err => console.error(err,"i"));
  }, []);

  return (
    <div className="relative">
      <span className="text-2xl"><IoIosNotifications  size={30}/></span>
      {count > 0 && (
        <span className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 py-0.5 rounded-full">
          {count}
        </span>
      )}
    </div>
  );
};

export default NotificationBell;  