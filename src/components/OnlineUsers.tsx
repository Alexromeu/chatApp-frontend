import { useEffect, useState } from "react";
import { onOnlineUsersUpdate } from "../sockets/presenceSocket";
import { fetchUsernames } from "../utils/fetchUsernames";
import "../styles/online_users.css"

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
    <div className="online-users">

      <h3>Online Users</h3>

      {Object.entries(roomUsers).map(([roomId, users]) => (
        <div key={roomId} className="each-user-online">

          <ul>
            {users.map((user) => (
              <p key={user}>
                {user}
              </p>
            ))}
          </ul>

        </div>
      ))}
    </div>
  );
};

export default OnlineUsers;
