import './App.css'
import "tailwindcss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChatRoom from "./pages/ChatRoom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ChatList from "./pages/ChatList";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import SocketContextWrapper from './context/SocketContextWrapper';
import AllChatRooms from "./components/AllRoomsList";
import AppLayout from "./components/AppLayout";

function App() {
  return (
      <ThemeProvider>
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route element={<AppLayout />}>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/chatlist/:userId" element={<ChatList />} />
                <Route path="/all-rooms" element={<AllChatRooms />} />
                <Route
                  path="/room/:roomId"
                  element={
                    <SocketContextWrapper>
                      <ChatRoom />
                    </SocketContextWrapper>
                  }
                />
              </Route>
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
  )
}

export default App
