import Navbar from "../components/Navbar";

export default function Dashboard() {
  return (
    <>
      <Navbar />
      <div className="page-container">
        <h1>Dashboard</h1>
        <div className="card">
          <h2>Welcome!</h2>
          <p>This is your dashboard. You can manage your tasks and profile from here.</p>
        </div>
        <div className="card">
          <h2>Quick Links</h2>
          <ul>
            <li>Go to <b>Tasks</b> to manage your tasks</li>
            <li>Go to <b>Profile</b> to the information</li>
          </ul>
        </div>
      </div>
    </>
  );
}
