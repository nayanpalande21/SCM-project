// src/pages/Dashboard.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getContract } from "../abi/contract"; // ✅ ADDED (only import)

function Dashboard() {
  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole");
  const [hover, setHover] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    navigate("/login");
  };

  const connectMetaMask = async () => {
    if (typeof window.ethereum === "undefined") {
      alert("MetaMask not installed! Please install MetaMask.");
      return;
    }

    try {
      // 🔥 FORCE MetaMask popup
      await window.ethereum.request({
        method: "wallet_requestPermissions",
        params: [{ eth_accounts: {} }],
      });

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      alert("Wallet Connected: " + accounts[0]);
    } catch (error) {
      console.error(error);
      alert("MetaMask connection cancelled or failed");
    }
  };

  // ✅ ADDED — SMART CONTRACT TEST (NO EXISTING CODE TOUCHED)
  const testBlockchainConnection = async () => {
    try {
      const contract = await getContract();
      if (!contract) return;

      console.log("✅ Smart contract connected:", contract);
      alert("Smart contract connected successfully!");
    } catch (error) {
      console.error("❌ Contract connection failed:", error);
      alert("Smart contract connection failed");
    }
  };

  return (
    <div style={styles.page}>
      {/* ⭐ BACKGROUND BLUR OVERLAY */}
      <div style={styles.bgOverlay}></div>

      <div style={{ position: "relative", zIndex: 2 }}>
        {/* NAVBAR */}
        <header style={styles.navbar}>
          <h2 style={styles.logo}>
            SupplyChain<span style={{ color: "#ff80ab" }}></span>
          </h2>

          <div style={styles.navButtons}>
            <button style={styles.metaBtn} onClick={connectMetaMask}>
              Connect Wallet
            </button>

            {/* ✅ ADDED BUTTON (SAFE) */}
            <button
              style={styles.metaBtn}
              onClick={testBlockchainConnection}
            >
              Test Contract
            </button>

            {!userRole ? (
              <button
                style={styles.loginBtn}
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            ) : (
              <button
                style={styles.logoutBtn}
                onClick={handleLogout}
              >
                Logout
              </button>
            )}
          </div>
        </header>

        {/* HERO SECTION */}
        <section style={styles.hero}>
          <h1 style={styles.heroTitle}>Track • Verify • Authenticate</h1>
          <p style={styles.heroSubtitle}>
            Blockchain-powered transparency and real-time product verification.
          </p>

          {!userRole ? (
            <button
              style={styles.primaryBtn}
              onClick={() => navigate("/create-profile")}
            >
              Create Your Profile →
            </button>
          ) : (
            <button
              style={styles.primaryBtn}
              onClick={() =>
                navigate(`/${userRole.toLowerCase()}`)
              }
            >
              Go to Your Dashboard →
            </button>
          )}
        </section>

        {/* ROLE CARDS */}
        <section style={styles.rolesSection}>
          <h2 style={styles.sectionTitle}>Choose Your Role</h2>

          <div style={styles.grid}>
            {[
              {
                role: "Manufacturer",
                desc: "Manage batches & production",
                color: "#ffe3ed",
              },
              {
                role: "Distributor",
                desc: "Handle shipments & routing",
                color: "#e3f2fd",
              },
              {
                role: "Retailer",
                desc: "Stock & verify products",
                color: "#e8f5e9",
              },
              {
                role: "Customer",
                desc: "Track & verify purchases",
                color: "#fff7d6",
              },
            ].map((r, i) => (
              <div
                key={i}
                style={{
                  ...styles.card,
                  ...(hover === i ? styles.cardHover : {}),
                  background: r.color,
                }}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                onClick={() => navigate("/login")}
              >
                <div style={styles.cardCenter}>
                  <h3 style={styles.cardTitle}>{r.role}</h3>
                  <p style={styles.cardDesc}>{r.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <footer style={styles.footer}>
          © 2025 SupplyChainX • Blockchain • Transparency • Trust
        </footer>
      </div>
    </div>
  );
}

/* ===== STYLES (UNCHANGED) ===== */

const styles = {
  page: {
    minHeight: "100vh",
    backgroundImage: "url('/images/cosmetic_products.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    fontFamily: "Poppins",
    position: "relative",
    overflowX: "hidden",
  },
  bgOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(255,255,255,0.45)",
    backdropFilter: "blur(1px)",
    zIndex: 1,
  },
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    padding: "20px 40px",
    alignItems: "center",
    background: "rgba(255,255,255,0.6)",
    backdropFilter: "blur(8px)",
    borderRadius: "0 0 12px 12px",
    margin: "0",
  },
  logo: { fontSize: "26px", fontWeight: "700", color: "#b3154f" },
  navButtons: { display: "flex", gap: "10px" },
  hero: {
    textAlign: "center",
    padding: "70px 20px",
    color: "#222",
  },
  heroTitle: { fontSize: "48px", fontWeight: "700" },
  heroSubtitle: {
    fontSize: "18px",
    maxWidth: "700px",
    margin: "10px auto",
    color: "#333",
  },
  primaryBtn: {
    marginTop: "25px",
    padding: "14px 30px",
    borderRadius: "12px",
    background: "linear-gradient(90deg,#d81b60,#ff80ab)",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    fontSize: "18px",
    fontWeight: "600",
  },
  rolesSection: { padding: "50px 40px" },
  sectionTitle: {
    textAlign: "center",
    fontSize: "32px",
    fontWeight: "700",
    color: "#b3154f",
    marginBottom: "30px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
    gap: "25px",
  },
  card: {
    height: "180px",
    borderRadius: "18px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    cursor: "pointer",
    transition: "all 0.35s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  cardCenter: { textAlign: "center" },
  cardHover: {
    transform: "translateY(-8px) scale(1.05)",
    boxShadow: "0 15px 35px rgba(0,0,0,0.25)",
  },
  cardTitle: { fontSize: "24px", fontWeight: "700", color: "#111" },
  cardDesc: { fontSize: "14px", marginTop: "8px", color: "#333" },
  loginBtn: {
    padding: "10px 20px",
    borderRadius: "8px",
    background: "#fff",
    color: "#b3154f",
    border: "1px solid #b3154f",
  },
  logoutBtn: {
    padding: "10px 20px",
    borderRadius: "8px",
    background: "linear-gradient(90deg,#d81b60,#ff80ab)",
    color: "#fff",
    border: "none",
    fontWeight: "600",
  },
  metaBtn: {
    padding: "10px 20px",
    borderRadius: "8px",
    background: "#ffd9f0",
    color: "#b3154f",
    border: "1px solid #b3154f",
  },
  footer: {
    textAlign: "center",
    marginTop: "50px",
    color: "#222",
    fontWeight: "500",
  },
};

export default Dashboard;
