import { useState } from "react";
import axiosInstance from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"
import axios from "axios"
import UserNotFoundDialog from "../components/messages/UserNotFoundDialog";
import "../styles/dialog_login_box.css"
import "../styles/login_form.css"

const Login = () => {
  const [showDialog, setShowDialog] = useState(false);
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
      console.log(token)
      navigate(`/chatlist/${userId}`);

    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) {
          setShowDialog(true)

        return;
    }

  } else {
    setMessage("Unexpected error occurred");
  }
      console.log(err)
    }
  };

  return (
    <>
    <div className="login-container">
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
      
      <p className="login-message">{message}</p>
    </form>
    <button onClick={()=>navigate('/register')} className="register-button">SignIn</button>
    </div>
    <UserNotFoundDialog isOpen={showDialog} onTryAgain={() => setShowDialog(false)} onSignIn={() => navigate('/register')}/>

    </>
  );
};

export default Login;
