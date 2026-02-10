import { useNavigate } from "react-router-dom";
import "../styles/app.css";


export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav>
      <button onClick={() => navigate("/dashboard")}>Dashboard</button>
      <button onClick={() => navigate("/profile")}>Profile</button>
      <button onClick={() => navigate("/tasks")}>Tasks</button>
      <button onClick={logout}>Logout</button>
    </nav>
  );
}
