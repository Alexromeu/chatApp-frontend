import { useState } from "react";
import axiosInstance from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"
import axios from "axios"


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const { login, userId } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const res = await axiosInstance.post("/login", { username, password });
      const { token } = res.data;
      login(token)
      navigate(`/chatlist/${userId}`);

    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) {
        navigate('/register');
        return;
    }
    setMessage(err.response?.data?.message || "Login failed");
  } else {
    setMessage("Unexpected error occurred");
  }
      console.log(err)
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">

      <h2>Login</h2>

      <input
        id="username-input"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />

      <input
        id="pasword-input"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />

      <button type="submit">Log In</button>
      
      <p>{message}</p>
    </form>
  );
};

export default Login;
