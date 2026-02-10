import { useEffect, useState } from "react";
import api from "../api/axios"; // axios instance with Authorization header
import Navbar from "../components/Navbar";
import "../styles/app.css";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
  const fetchProfile = async () => {
    try {
      const res = await api.get("/users/profile");
      console.log("Profile response:", res.data); // <-- add this
      setUser(res.data.user); 
    } catch (err) {
      if (err.response?.status === 401) {
        alert("You are not authorized. Please login first.");
        window.location.href = "/login";
      } else {
        alert("Failed to fetch profile");
      }
    }
  };
  fetchProfile();
}, []);

  return (
    <>
      <Navbar />
      <div className="page-container">
        <h1>Profile</h1>
        {user ? (
          <div className="card" style={{ textAlign: "center" }}>
            <p><strong>Email:</strong> {user.email}</p>
          </div>
        ) : (
          <p>Loading profile...</p>
        )}
      </div>
    </>
  );
}
