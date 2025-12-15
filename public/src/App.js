import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";

import Manufacturer from "./pages/Manufacturer";
import Distributor from "./pages/Distributor";
import Retailer from "./pages/Retailer";
import Customer from "./pages/Customer";
import Dashboard from "./pages/Dashboard";

import CreateProfile from "./pages/CreateProfile";

function App() {
  return (
    <Router>
      {/* Navbar */}
      <nav style={styles.navbar}>
        <div style={styles.logoContainer}>
          <img
            src="/images/cosmetic_products.jpg"
            alt="Cosmetic Product"
            style={styles.logoImg}
          />
          <h2 style={styles.logoText}>Cosmetic SCM</h2>
        </div>

        <div style={styles.linkContainer}>
          
          <Link to="/" style={styles.link}>Dashboard</Link>
          <Link to="/manufacturer" style={styles.link}>Manufacturer</Link>
          <Link to="/distributor" style={styles.link}>Distributor</Link>
          <Link to="/retailer" style={styles.link}>Retailer</Link>
          <Link to="/customer" style={styles.link}>Customer</Link>
          
          <Link to="/login" style={styles.link}>Login</Link>
         
         
          <Link to="/create-profile" style={styles.link}>CreateProfile</Link>
        </div>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
          
       
        <Route path="/manufacturer" element={<Manufacturer />} />
        <Route path="/distributor" element={<Distributor />} />
        <Route path="/retailer" element={<Retailer />} />
        <Route path="/customer" element={<Customer />} />
        
        <Route path="/create-profile" element={<CreateProfile />} />
      </Routes>
    </Router>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 30px",
    background: "linear-gradient(90deg, #f9a8d4, #c084fc)",
    color: "white",
    boxShadow: "0 3px 10px rgba(0,0,0,0.15)",
    fontFamily: "'Poppins', sans-serif",
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  logoImg: {
    width: "45px",
    height: "45px",
    borderRadius: "50%",
    border: "2px solid white",
    objectFit: "cover",
  },
  logoText: {
    margin: 0,
    fontSize: "24px",
    fontWeight: "700",
    letterSpacing: "1px",
    color: "white",
    fontFamily: "'Playfair Display', serif", // elegant font for brand name
  },
  linkContainer: {
    display: "flex",
    alignItems: "center",
    gap: "18px",
  },
  link: {
    fontSize: "16px",
    color: "white",
    textDecoration: "none",
    fontWeight: "500",
    letterSpacing: "0.5px",
    transition: "all 0.3s ease",
  },
};

// Add hover effect manually (React inline styles don’t support hover natively)
const addHoverEffect = () => {
  const links = document.querySelectorAll("a");
  links.forEach(link => {
    link.addEventListener("mouseover", () => {
      link.style.opacity = "0.8";
      link.style.transform = "scale(1.05)";
    });
    link.addEventListener("mouseout", () => {
      link.style.opacity = "1";
      link.style.transform = "scale(1)";
    });
  });
};

if (typeof window !== "undefined") {
  window.addEventListener("DOMContentLoaded", addHoverEffect);
}

export default App;
