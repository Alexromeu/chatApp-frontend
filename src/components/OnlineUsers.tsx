import { useEffect, useState } from "react";
import { onOnlineUsersUpdate } from "../sockets/presenceSocket";

const OnlineUsers = () => {
  const [roomUsers, setRoomUsers] = useState<{ [roomId: string]: string[] }>({});

  useEffect(() => {
    onOnlineUsersUpdate((roomId: string, users: string[]) => {
      setRoomUsers((prev) => ({
        ...prev,
        [roomId]: users,
      }));
    });
  }, []);

  return (
    <div className="online-users p-4">
      <h3 className="text-lg font-semibold mb-2">Online Users</h3>
      {Object.entries(roomUsers).map(([roomId, users]) => (
        <div key={roomId} className="mb-4">
          <h4 className="text-md font-medium text-gray-700">Room: {roomId}</h4>
          <ul className="space-y-1">
            {users.map((userId) => (
              <li key={userId} className="text-green-600">
                🟢 {userId}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default OnlineUsers;
