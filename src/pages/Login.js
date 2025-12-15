import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Save the selected role for route protection
    localStorage.setItem("userRole", role);

    if (role === "Manufacturer") navigate("/manufacturer");
    else if (role === "Distributor") navigate("/distributor");
    else if (role === "Retailer") navigate("/retailer");
    else if (role === "Customer") navigate("/customer");
    else navigate("/dashboard");
  };

  const handleCreateAccount = () => {
    navigate("/create-profile");
  };

  return (
    <div style={{ backgroundColor: "#f7f5ff", minHeight: "100vh", paddingTop: "50px", position: "relative" }}>

      {/* ⭐ BACK TO DASHBOARD BUTTON */}
      <button
        onClick={() => navigate("/")}
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          background: "linear-gradient(90deg,#d81b60,#ff80ab)",
          color: "white",
          padding: "8px 16px",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: "600",
          boxShadow: "0 4px 10px rgba(0,0,0,0.15)"
        }}
      >
        ← Back to Dashboard
      </button>

      <div
        style={{
          width: "350px",
          margin: "auto",
          backgroundColor: "white",
          borderRadius: "10px",
          padding: "20px",
          boxShadow: "0 0 10px lightgray",
        }}
      >
        {/* Logo and title */}
        <div style={{ textAlign: "center" }}>
          <img
            src="/images/cosmetic_products.jpg"
            alt="Cosmetic Logo"
            style={{
              width: "70px",
              height: "70px",
              borderRadius: "50%",
              objectFit: "cover",
              margin: "auto",
              display: "block",
            }}
          />
          <h2>Supply Chain</h2>
          <p style={{ fontSize: "12px", color: "gray" }}>
            Authentic. Traceable. Transparent.
          </p>
        </div>

        <h3 style={{ textAlign: "center", marginTop: "10px" }}>Welcome Back</h3>
        <p style={{ textAlign: "center", fontSize: "12px", color: "gray" }}>
          Sign in to your account
        </p>

        <form onSubmit={handleLogin}>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "5px",
              marginBottom: "10px",
            }}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "5px",
              marginBottom: "10px",
            }}
          />

          <label>Select Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "5px",
              marginBottom: "20px",
            }}
          >
            <option value="">Choose your role</option>
            <option value="Manufacturer">Manufacturer</option>
            <option value="Distributor">Distributor</option>
            <option value="Retailer">Retailer</option>
            <option value="Customer">Customer</option>
          </select>

          <button
            type="submit"
            style={{
              width: "100%",
              backgroundColor: "violet",
              border: "none",
              color: "white",
              padding: "8px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Sign In
          </button>

          <p style={{ textAlign: "center", fontSize: "13px", marginTop: "10px" }}>OR</p>

          <button
            type="button"
            onClick={handleCreateAccount}
            style={{
              width: "100%",
              backgroundColor: "white",
              border: "1px solid gray",
              padding: "8px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Create New Account
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
