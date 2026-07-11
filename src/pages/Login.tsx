import { useState, useEffect, type ReactNode } from "react";
import axiosInstance from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"
import axios from "axios"
import UserNotFoundDialog from "../components/messages/UserNotFoundDialog";
import "../styles/dialog_login_box.css"
import "../styles/login_form.css"

const LAST_SENTENCE =
  "so it will take around 40 seconds, Thank you for your pacience , this is a learing project not a product."
const WORDS = LAST_SENTENCE.split(" ")

function TimeoutMessage(): ReactNode {
  // number of dots currently visible (0 → 3)
  const [dots, setDots] = useState(0)
  // number of words of the last sentence currently visible
  const [wordCount, setWordCount] = useState(0)

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []

    // reveal the three dots one after another
    for (let i = 1; i <= 3; i++) {
      timers.push(setTimeout(() => setDots(i), 750 * i))
    }

    const dotsDone = 750 * 3
    WORDS.forEach((_, i) => {
      timers.push(setTimeout(() => setWordCount(i + 1), dotsDone + 200 * (i + 1)))
    })

    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <div className="timeout-message">
      <p>
        Sorry about that{".".repeat(dots)} But unfurtunally i got the free tier for
        this project
      </p>
      <p>{WORDS.slice(0, wordCount).join(" ")}</p>
    </div>
  )
}

const Login = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const { login, userId } = useAuth()
  const [startMessage, setStartMessage] = useState(false);

  useEffect(() => {
    if (userId) navigate(`/chatlist/${userId}`);
  }, [userId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const res = await axiosInstance.post("/api/login", { username, password });
      const { token } = res.data;
      setStartMessage(false)
      login(token)

    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setStartMessage(true)
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
    {startMessage && <TimeoutMessage />}
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

export {Login, TimeoutMessage};
