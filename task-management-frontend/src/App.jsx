import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import api from "./api";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

import { AuthContext } from "./components/AuthContext";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("taskflow_token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    localStorage.removeItem("taskflow_token");
    setUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("taskflow_token");

    if (!token) {
      setLoading(false);
      return;
    }

    api
      .get("/auth/me")
      .then((response) => {
        setUser(response.data.user);
      })
      .catch(() => {
        localStorage.removeItem("taskflow_token");
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="page-loader">Loading TaskFlow...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      <Routes>

        <Route
          path="/login"
          element={
            user ? <Navigate to="/" replace /> : <Login />
          }
        />

        <Route
          path="/register"
          element={
            user ? <Navigate to="/" replace /> : <Register />
          }
        />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>
    </AuthContext.Provider>
  );
}

export default App;