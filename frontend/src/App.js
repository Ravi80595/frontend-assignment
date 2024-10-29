import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Auth from "./components/Auth";
import Dashboard from "./components/Dashboard";
import { useMetaMask } from "./hooks/useMetaMask";

function App() {
  const { isWalletConnected } = useMetaMask();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* <Route
          path="/dashboard"
          element={isWalletConnected ? <Dashboard /> : <Navigate to="/" />}
        /> */}
      </Routes>
    </Router>
  );
}

export default App;
