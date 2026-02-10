import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import "../styles/app.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      const message = err.response?.data?.message || "Login failed";
      if (message.toLowerCase().includes("not found")) {
        alert("User not found. Redirecting to Register page...");
        navigate("/register");
      } else if (message.toLowerCase().includes("invalid")) {
        alert("Invalid credentials");
      } else {
        alert(message);
      }
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={submit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>

      <div className="auth-links">
        <p>
          Don't have an account?{" "}
          <button
            className="register-btn"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </p>
        <p>
          Forgot password? <span className="link">Click here</span>
        </p>
      </div>
    </div>
  );
}
