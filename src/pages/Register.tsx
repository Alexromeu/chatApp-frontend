import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import axiosInstance from "../utils/axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate()
  const { userId } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axiosInstance.post("/signin", { username, password });
      setMessage("User registered successfully!");
      localStorage.setItem("authToken", res.data.token)
      navigate(`/chatlist/${userId}`);

    } catch (err: unknown) {
      const error = err instanceof Error ? err.message : "Registration failed";
      setMessage(error);
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
      
    </form>
  );
};

export default Register;
