import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Dashboard from "./pages/dashboard";
import CommunityList from "./pages/communityList";
import Onboarding from "./pages/onboarding";
import { PrivateRoute } from "./routes/PrivateRoute";
import Navibar from "./components/Navibar";
import CommunityDetails from "./pages/communityPage";
import ViewCommunity from "./pages/viewCommunity";

export default function App() {
  return (
    <>
      <Navibar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Private Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/my-communities"
          element={
            <PrivateRoute>
              <CommunityList />
            </PrivateRoute>
          }
        />
        <Route
          path="/onboarding"
          element={
            <PrivateRoute>
              <Onboarding />
            </PrivateRoute>
          }
        />
        <Route
        path="/community/:id"
        element={
          <PrivateRoute>
            <CommunityDetails />
          </PrivateRoute>
        }
        />
        <Route
        path="/community/:id/edit"
        element={
          <PrivateRoute>
            <ViewCommunity />
          </PrivateRoute>
        }
      />
      </Routes>
    </>
  );
}
