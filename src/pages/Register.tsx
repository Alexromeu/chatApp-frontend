import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import axiosInstance from "../utils/axios";
import UserAlreadyExist from "../components/messages/UserAlreadyExist";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate()
  const { userId } = useAuth()
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axiosInstance.post("/signin", { username, password });
      setMessage("User registered successfully!");
      sessionStorage.setItem("authToken", res.data.token)
      console.log(res.data.token)
      navigate(`/chatlist/${userId}`);

    } catch (err: unknown) {
     if (err) {
    setIsOpen(true);
  }
  }
  };

  return (
    <form onSubmit={handleSubmit} className="register-form">

      <h2>Register</h2>

      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />

      <button type="submit">Sign In</button>

      <p>{message}</p>
      <UserAlreadyExist isOpen={isOpen} goToLogin={() => navigate("/")} />
    </form>
    
  );
};

export default Register;
