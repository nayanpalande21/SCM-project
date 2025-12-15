import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Manufacturer from "./pages/Manufacturer";
import Distributor from "./pages/Distributor";
import Retailer from "./pages/Retailer";
import Customer from "./pages/Customer";
import Dashboard from "./pages/Dashboard";
import CreateProfile from "./pages/CreateProfile";

import RoleRouter from "./RoleRouter";

function App() {
  return (
    <Router>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-profile" element={<CreateProfile />} />

        <Route
          path="/manufacturer"
          element={
            <RoleRouter allowedRole="Manufacturer">
              <Manufacturer />
            </RoleRouter>
          }
        />

        <Route
          path="/distributor"
          element={
            <RoleRouter allowedRole="Distributor">
              <Distributor />
            </RoleRouter>
          }
        />

        <Route
          path="/retailer"
          element={
            <RoleRouter allowedRole="Retailer">
              <Retailer />
            </RoleRouter>
          }
        />

        <Route
          path="/customer"
          element={
            <RoleRouter allowedRole="Customer">
              <Customer />
            </RoleRouter>
          }
        />
      </Routes>

    </Router>
  );
}

export default App;
