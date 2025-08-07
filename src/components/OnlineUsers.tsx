import { useEffect, useState } from "react";
import { onOnlineUsersUpdate } from "../sockets/presenceSocket";

import { fetchUsernames } from "../utils/fetchUsernames";

const OnlineUsers = () => {

  const [roomUsers, setRoomUsers] = useState<{ [roomId: string]: string[] }>({});

  useEffect(() => {
    const handleUpdate = async (roomId: string, userIds: string[]) => {
      const usernames = await fetchUsernames(userIds);
                                 
      setRoomUsers((prev) => ({
        ...prev,
        [roomId]: usernames,
      }));
    };
    
    onOnlineUsersUpdate(handleUpdate);
  }, []);

  return (
    <div className="online-users p-4">

      <h3 className="text-lg font-semibold mb-2">Online Users</h3>

      {Object.entries(roomUsers).map(([roomId, users]) => (
        <div key={roomId} className="mb-4">

          <ul className="space-y-1">
            {users.map((user) => (
              <li key={user} className="text-green-600">
                🟢 {user}
              </li>
            ))}
          </ul>

        </div>
      ))}
    </div>
  );
};

export default OnlineUsers;
