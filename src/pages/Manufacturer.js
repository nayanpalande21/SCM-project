import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getContract } from "../abi/contract";
import { ethers } from "ethers";



function Manufacturer() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    navigate("/login");
  };

  const [activeTab, setActiveTab] = useState("products");

  const [batches, setBatches] = useState([
    { id: "BC001", name: "Aloe Vera Gel", expiry: "2025-12-12", stock: "1200", ingredients: "Aloe, Vitamin C", certs: "FDA, Organic", verified: true },
    { id: "BC002", name: "Shea Body Lotion", expiry: "2026-01-25", stock: "980", ingredients: "Lavender, Shea Butter", certs: "ISO, Vegan", verified: false },
  ]);

  const [newBatch, setNewBatch] = useState({
    id: "", name: "", expiry: "", stock: "", ingredients: "", certs: "",
  });

  const [shipments, setShipments] = useState([
    { batchId: "BC001", destination: "Mumbai Warehouse", status: "Active" },
    { batchId: "BC002", destination: "Pune Distributor", status: "Active" },
  ]);

  const [newShipment, setNewShipment] = useState({
    batchId: "", destination: "", date: "",
  });

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const [certifications, setCertifications] = useState([
    { name: "FDA Approval", authority: "FDA", status: "Verified" },
    { name: "ISO 9001", authority: "ISO Board", status: "Verified" },
  ]);

  const [newCertification, setNewCertification] = useState({
    name: "", authority: "", link: "",
  });
  
  // 🔗 ADD: Create batch on blockchain using ethers.js
const createBatchOnBlockchain = async () => {
  try {
    if (!window.ethereum) {
      alert("MetaMask not installed");
      return false;
    }

    // ✅ 1. REQUEST ACCOUNT
    await window.ethereum.request({ method: "eth_requestAccounts" });

    // ✅ 2. FORCE SEPOLIA
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0xaa36a7" }], // Sepolia
    });

    const contract = await getContract();
    if (!contract) return false;

    // ✅ 3. CLEAN STOCK VALUE
    const cleanStock = Number(newBatch.stock.replace(/,/g, ""));
    if (!Number.isInteger(cleanStock) || cleanStock <= 0) {
      alert("Stock must be a valid number");
      return false;
    }

    console.log(" Sending TX:", {
      ...newBatch,
      stock: cleanStock,
    });

    //  4. SEND TX WITH GAS LIMIT
    const tx = await contract.createProductBatch(
      newBatch.id,
      newBatch.name,
      newBatch.expiry,
      cleanStock,
      newBatch.ingredients,
      newBatch.certs,
      {
        gasLimit: 3_000_000,
      }
    );

    console.log("TX Hash:", tx.hash);
    await tx.wait();

    alert(" Product batch stored on blockchain!");
    return true;
  } catch (error) {
    console.error(" Blockchain Error:", error);
    alert(error.reason || error.message || "Blockchain transaction failed");
    return false;
  }
};


 const handleAddBatch = async () => {
  if (
    !newBatch.id ||
    !newBatch.name ||
    !newBatch.expiry ||
    !newBatch.stock
  ) {
    alert("Please fill all product details!");
    return;
  }

  const success = await createBatchOnBlockchain();
  if (!success) return;

  setBatches([...batches, { ...newBatch, verified: false }]);
  setNewBatch({
    id: "",
    name: "",
    expiry: "",
    stock: "",
    ingredients: "",
    certs: "",
  });
};



  const handleAddShipment = () => {
    if (!newShipment.batchId || !newShipment.destination || !newShipment.date)
      return alert("Fill all shipment details!");

    setShipments([...shipments, { ...newShipment, status: "Active" }]);
    setNewShipment({ batchId: "", destination: "", date: "" });
  };

  const handleSubmitCertification = () => {
    if (!newCertification.name || !newCertification.authority)
      return alert("Fill all certification details!");

    setCertifications([...certifications, { ...newCertification, status: "Pending" }]);
    setNewCertification({ name: "", authority: "", link: "" });
  };

  const handleToggleNotifications = () =>
    setNotificationsEnabled(!notificationsEnabled);

  // ⭐ PAGE CONTENT SWITCHING
  const renderContent = () => {
    switch (activeTab) {

      // --------------------------------------------------------
      // ⭐ PRODUCTS
      // --------------------------------------------------------
      case "products":
        return (
          <div>
            <h2>Product Batches</h2>

            <div style={styles.section}>
              <div style={styles.leftBox}>
                <h3>Existing Batches</h3>

                {batches.map((b, i) => (
                  <div key={i} style={styles.batchCard}>
                    <p><b>ID:</b> {b.id}</p>
                    <p><b>Name:</b> {b.name}</p>
                    <p><b>Expiry:</b> {b.expiry}</p>
                    <p><b>Stock:</b> {b.stock} units</p>
                    <p><b>Ingredients:</b> {b.ingredients}</p>
                    <p><b>Certifications:</b> {b.certs}</p>
                    <p>
                      <b>Status:</b>{" "}
                      <span style={{ color: b.verified ? "green" : "orange" }}>
                        {b.verified ? "Verified " : "Pending "}
                      </span>
                    </p>
                  </div>
                ))}
              </div>

              {/* RIGHT BOX — ADD BATCH */}
              <div style={styles.rightBox}>
                <h3>Add New Product Batch</h3>

                <input style={styles.input} placeholder="Batch ID"
                  value={newBatch.id} onChange={e => setNewBatch({ ...newBatch, id: e.target.value })} />

                <input style={styles.input} placeholder="Product Name"
                  value={newBatch.name} onChange={e => setNewBatch({ ...newBatch, name: e.target.value })} />

                <input style={styles.input} type="date"
                  value={newBatch.expiry} onChange={e => setNewBatch({ ...newBatch, expiry: e.target.value })} />

                <input style={styles.input} placeholder="Stock Quantity"
                  value={newBatch.stock} onChange={e => setNewBatch({ ...newBatch, stock: e.target.value })} />

                <input style={styles.input} placeholder="Ingredients"
                  value={newBatch.ingredients} onChange={e => setNewBatch({ ...newBatch, ingredients: e.target.value })} />

                <input style={styles.input} placeholder="Certifications"
                  value={newBatch.certs} onChange={e => setNewBatch({ ...newBatch, certs: e.target.value })} />

                <button style={styles.addBtn} onClick={handleAddBatch}> Add Product</button>
              </div>
            </div>
          </div>
        );

      // --------------------------------------------------------
      // ⭐ SHIPMENTS
      // --------------------------------------------------------
      case "shipments":
        return (
          <div>
            <h2>Shipments Overview</h2>

            <div style={styles.section}>
              <div style={styles.leftBox}>
                <h3>Active Shipments</h3>
                {shipments.map((s, i) => (
                  <p key={i}>{s.batchId} → {s.destination} </p>
                ))}
              </div>

              {/* RIGHT BOX */}
              <div style={styles.rightBox}>
                <h3>Initiate New Shipment</h3>

                <input style={styles.input} placeholder="Batch ID"
                  value={newShipment.batchId} onChange={e => setNewShipment({ ...newShipment, batchId: e.target.value })} />

                <input style={styles.input} placeholder="Destination"
                  value={newShipment.destination} onChange={e => setNewShipment({ ...newShipment, destination: e.target.value })} />

                <input style={styles.input} type="date"
                  value={newShipment.date} onChange={e => setNewShipment({ ...newShipment, date: e.target.value })} />

                <button style={styles.addBtn} onClick={handleAddShipment}> Create Shipment</button>
              </div>
            </div>
          </div>
        );

      // --------------------------------------------------------
      // ⭐ ANALYTICS
      // --------------------------------------------------------
      case "analytics":
        const verified = batches.filter(b => b.verified).length;
        const pending = batches.length - verified;
        const expired = batches.filter(b => new Date(b.expiry) < new Date()).length;
        const soonExpiring = batches.filter(b => {
          const diff = (new Date(b.expiry) - new Date()) / (1000 * 60 * 60 * 24);
          return diff > 0 && diff < 30;
        }).length;

        return (
          <div>
            <h2>Analytics Dashboard</h2>

            <div style={styles.analyticsGrid}>
              <div style={{ ...styles.analyticsCard, background: "#fce4ec" }}>
                <h3>Total Batches</h3><h1>{batches.length}</h1>
              </div>

              <div style={{ ...styles.analyticsCard, background: "#e8f5e9" }}>
                <h3>Verified Products</h3><h1>{verified}</h1>
              </div>

              <div style={{ ...styles.analyticsCard, background: "#fff3e0" }}>
                <h3>Pending Verification</h3><h1>{pending}</h1>
              </div>

              <div style={{ ...styles.analyticsCard, background: "#e3f2fd" }}>
                <h3>Total Shipments</h3><h1>{shipments.length}</h1>
              </div>

              <div style={{ ...styles.analyticsCard, background: "#fff8e1" }}>
                <h3>Expiring Soon (30 days)</h3><h1>{soonExpiring}</h1>
              </div>

              <div style={{ ...styles.analyticsCard, background: "#ffcdd2" }}>
                <h3>Expired Batches</h3><h1>{expired}</h1>
              </div>
            </div>
          </div>
        );

      // --------------------------------------------------------
      // ⭐ CERTIFICATIONS
      // --------------------------------------------------------
      case "certifications":
        return (
          <div>
            <h2>Certifications</h2>

            <div style={styles.section}>

              {/* LEFT — EXISTING */}
              <div style={styles.leftBox}>
                <h3>Existing Certificates</h3>

                {certifications.map((c, i) => (
                  <div key={i} style={styles.certCard}>
                    <p><b>Name:</b> {c.name}</p>
                    <p><b>Authority:</b> {c.authority || "N/A"}</p>
                    <p>
                      <b>Status:</b>{" "}
                      <span style={{ color: c.status === "Verified" ? "green" : "orange" }}>
                        {c.status}
                      </span>
                    </p>
                    {c.link && (
                      <p><a href={c.link} target="_blank"></a></p>
                    )}
                  </div>
                ))}

                <p><b>Total Certifications:</b> {certifications.length}</p>
              </div>

              {/* RIGHT — NEW entry */}
              <div style={styles.rightBox}>
                <h3>Add New Certification</h3>

                <input style={styles.input} placeholder="Certification Name"
                  value={newCertification.name}
                  onChange={(e) => setNewCertification({ ...newCertification, name: e.target.value })}
                />

                <input style={styles.input} placeholder="Issuing Authority"
                  value={newCertification.authority}
                  onChange={(e) => setNewCertification({ ...newCertification, authority: e.target.value })}
                />

                

                <button style={styles.addBtn} onClick={handleSubmitCertification}>
                   Add Certification
                </button>

                <hr />

                
              </div>
            </div>
          </div>
        );

      // --------------------------------------------------------
      // ⭐ SETTINGS
      // --------------------------------------------------------
      case "settings":
        return (
          <div>
            <h2>Settings</h2>

            <div style={styles.section}>
              <div style={styles.leftBox}>
                <h3>Profile Info</h3>
                <p><b>Name:</b> Ram</p>
                <p><b>Email:</b> ram2205@gmail.com</p>
                <p><b>Role:</b> Manufacturer</p>
              </div>

              <div style={styles.rightBox}>
                <h3>Preferences</h3>

                <button
                  style={{ ...styles.addBtn, marginBottom: "12px" }}
                  onClick={handleToggleNotifications}
                >
                  {notificationsEnabled ? "Disable Notifications" : "Enable Notifications"}
                </button>

                <button style={styles.addBtn} onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // --------------------------------------------------------
  // MAIN RETURN
  // --------------------------------------------------------
  return (
    <div style={styles.dashboard}>
      <aside style={styles.sidebar}>
        <h2 style={styles.logo}>Supply Chain</h2>

        <nav style={styles.nav}>
          {["products", "shipments", "analytics", "certifications", "settings"].map(tab => (
            <button
              key={tab}
              style={{ ...styles.navItem, ...(activeTab === tab ? styles.activeNav : {}) }}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>

        <div style={styles.userInfo}>
          <p style={styles.userName}>Ram</p>
          <p style={styles.userEmail}>ram2205@gmail.com</p>
        </div>

        <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
      </aside>

      <main style={styles.main}>
        {renderContent()}
      </main>
    </div>
  );
}

// =====================================================
// ⭐ STYLES
// =====================================================
const styles = {
  dashboard: {
    display: "flex",
    background: "#fff0f6",
    height: "100vh",
    fontFamily: "Poppins",
  },
  sidebar: {
    width: "250px",
    background: "#fff",
    padding: "20px",
    borderRight: "1px solid #eee",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  logo: { color: "#d81b60" },
  nav: {
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  navItem: {
    background: "none",
    border: "none",
    padding: "10px",
    cursor: "pointer",
    textAlign: "left",
  },
  activeNav: {
    background: "#ffe6f0",
    color: "#d81b60",
  },
  userInfo: {
    borderTop: "1px solid #eee",
    paddingTop: "20px",
  },
  userName: { fontWeight: "bold" },
  userEmail: { fontSize: "12px", color: "#777" },

  main: { flex: 1, padding: "30px", overflowY: "auto" },

  section: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
    gap: "20px",
  },

  leftBox: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 2px 10px #eee",
  },

  rightBox: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 2px 10px #eee",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  batchCard: {
    background: "#fff6fa",
    padding: "12px",
    borderRadius: "8px",
    marginBottom: "10px",
  },

  certCard: {
    background: "#fff6fa",
    padding: "12px",
    borderRadius: "8px",
    marginBottom: "12px",
    boxShadow: "0 1px 5px rgba(0,0,0,0.05)",
  },

  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    marginBottom: "10px",
  },

  addBtn: {
    width: "100%",
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    background: "linear-gradient(90deg, #d81b60, #ff80ab)",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
  },

  logoutBtn: {
    padding: "12px",
    width: "100%",
    border: "none",
    borderRadius: "8px",
    background: "linear-gradient(90deg, #d81b60, #ff80ab)",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "20px",
  },

  analyticsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
    marginTop: "20px",
  },

  analyticsCard: {
    padding: "20px",
    borderRadius: "12px",
    textAlign: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  },
};

export default Manufacturer;
