import { Routes, Route, Link } from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Dashboard from "./pages/dashboard";
import Homepage from "./pages/homepage";
import CommunityList from "./pages/communityList";
import CreateCommunity from "./pages/createCommunity";
import ViewCommunity from "./pages/viewCommunity";
import EditCommunity from "./pages/editCommunity";

function App() {
  return (
    <div>
      {/* Simple NavBar */}
      <nav style={{ display: "flex", gap: "20px", padding: "10px" }}>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/community">Communities</Link>
      </nav>

      {/* App Routes */}
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected / Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Community CRUD */}
        <Route path="/community" element={<CommunityList />} />
        <Route path="/community/create" element={<CreateCommunity />} />
        <Route path="/community/:id" element={<ViewCommunity />} />
        <Route path="/community/:id/edit" element={<EditCommunity />} />
      </Routes>
    </div>
  );
}

export default App;
