
import {
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

import Layout from "./components/Layout";

// Existing Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";

// New Pages
import Calendar from "./pages/Calendar";
import Board from "./pages/Board";
import Projects from "./pages/Projects";
import Team from "./pages/Team";
import Reports from "./pages/Reports";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

// Protect pages that require login
function ProtectedRoute() {
  return localStorage.getItem("token") ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
}

// Application Routes
export default function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/board" element={<Board />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/team" element={<Team />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Route>

      {/* Open Register Page When Website Link Is Opened */}
      <Route
        path="/"
        element={<Navigate to="/register" replace />}
      />

      {/* Unknown Route Redirect */}
      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  );
}
