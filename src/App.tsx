import './App.css'
import "tailwindcss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChatRoom from "./pages/ChatRoom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ChatList from "./pages/ChatList";
import { AuthProvider } from "./context/AuthContext";
import SocketContextWrapper from './context/SocketContextWrapper';
import  AllChatRooms  from "./components/AllRoomsList"



function App() {
  return (
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/chatlist/:userId" element={<ChatList />} />
            <Route path="/all-rooms" element={<AllChatRooms />} />
            <Route 
             path="/room/:roomId"
             element={
              <SocketContextWrapper>
                <ChatRoom />
              </SocketContextWrapper>}
            />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
  )
}

export default App
