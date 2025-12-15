import React, { useState } from "react";

function Manufacturer() {
  const [activeTab, setActiveTab] = useState("products");
  const [batches, setBatches] = useState([
    { id: "BC001", name: "Aloe Vera Gel", expiry: "2025-12-12", stock: "1,200", ingredients: "Aloe, Vitamin C", certs: "FDA, Organic", verified: true },
    { id: "BC002", name: "Shea Body Lotion", expiry: "2026-01-25", stock: "980", ingredients: "Lavender, Shea Butter", certs: "ISO, Vegan", verified: false },
  ]);

  const [newBatch, setNewBatch] = useState({
    id: "",
    name: "",
    expiry: "",
    stock: "",
    ingredients: "",
    certs: "",
  });

  const [shipments, setShipments] = useState([
    { batchId: "BC001", destination: "Mumbai Warehouse", status: "Active" },
    { batchId: "BC002", destination: "Pune Distributor", status: "Active" },
  ]);

  const [newShipment, setNewShipment] = useState({
    batchId: "",
    destination: "",
    date: "",
  });

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const [certifications, setCertifications] = useState([
    { name: "FDA Approval", status: "Verified" },
    { name: "ISO 9001", status: "Verified" },
  ]);

  const [newCertification, setNewCertification] = useState({
    name: "",
    authority: "",
    link: "",
  });

  
  const handleAddBatch = () => {
    if (!newBatch.id || !newBatch.name) return alert("Please fill all product details!");
    setBatches([...batches, { ...newBatch, verified: false }]);
    setNewBatch({ id: "", name: "", expiry: "", stock: "", ingredients: "", certs: "" });
    alert("Product batch added!");
  };

  const handleAddShipment = () => {
    if (!newShipment.batchId || !newShipment.destination || !newShipment.date) return alert("Fill all shipment details!");
    setShipments([...shipments, { ...newShipment, status: "Active" }]);
    setNewShipment({ batchId: "", destination: "", date: "" });
    alert("Shipment created!");
  };

  const handleSubmitCertification = () => {
    if (!newCertification.name || !newCertification.authority) return alert("Fill all certification details!");
    setCertifications([...certifications, { ...newCertification, status: "Pending" }]);
    setNewCertification({ name: "", authority: "", link: "" });
    alert("Certification submitted!");
  };

  const handleEditProfile = () => alert("Edit Profile clicked!");
  const handleToggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
    alert(`Notifications ${!notificationsEnabled ? "Enabled" : "Disabled"}`);
  };
  const handleLogout = () => alert("Logout clicked!");

  // === PAGE CONTENT ===
  const renderContent = () => {
    switch (activeTab) {
      case "products":
        return (
          <div>
            <h2> Product Batches</h2>
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
                    <p><b>Status:</b> <span style={{ color: b.verified ? "green" : "orange" }}>{b.verified ? "Verified ✅" : "Pending ⏳"}</span></p>
                  </div>
                ))}
              </div>
              <div style={styles.rightBox}>
                <h3>Add New Product Batch</h3>
                <input style={styles.input} placeholder="Batch ID" value={newBatch.id} onChange={e => setNewBatch({ ...newBatch, id: e.target.value })} />
                <input style={styles.input} placeholder="Product Name" value={newBatch.name} onChange={e => setNewBatch({ ...newBatch, name: e.target.value })} />
                <input style={styles.input} type="date" value={newBatch.expiry} onChange={e => setNewBatch({ ...newBatch, expiry: e.target.value })} />
                <input style={styles.input} placeholder="Stock Quantity" value={newBatch.stock} onChange={e => setNewBatch({ ...newBatch, stock: e.target.value })} />
                <input style={styles.input} placeholder="Ingredients" value={newBatch.ingredients} onChange={e => setNewBatch({ ...newBatch, ingredients: e.target.value })} />
                <input style={styles.input} placeholder="Certifications" value={newBatch.certs} onChange={e => setNewBatch({ ...newBatch, certs: e.target.value })} />
                <button style={styles.addBtn} onClick={handleAddBatch}>➕ Add Product</button>
              </div>
            </div>
          </div>
        );

      case "shipments":
        return (
          <div>
            <h2> Shipments Overview</h2>
            <div style={styles.section}>
              <div style={styles.leftBox}>
                <h3>Active Shipments</h3>
                <ul>
                  {shipments.map((s, i) => (
                    <li key={i}>{s.batchId} → {s.destination} {s.status === "Active" ? "🟢" : "✅"}</li>
                  ))}
                </ul>
              </div>
              <div style={styles.rightBox}>
                <h3>Initiate New Shipment</h3>
                <input style={styles.input} placeholder="Batch ID" value={newShipment.batchId} onChange={e => setNewShipment({ ...newShipment, batchId: e.target.value })} />
                <input style={styles.input} placeholder="Destination" value={newShipment.destination} onChange={e => setNewShipment({ ...newShipment, destination: e.target.value })} />
                <input style={styles.input} type="date" value={newShipment.date} onChange={e => setNewShipment({ ...newShipment, date: e.target.value })} />
                <button style={styles.addBtn} onClick={handleAddShipment}>🚀 Create Shipment</button>
              </div>
            </div>
          </div>
        );

     case "analytics":
  return (
    <div>
      <h2> Analytics Dashboard</h2>
      <div style={styles.section}>
        <div style={styles.leftBox}>
          <h3>Production Overview</h3>
          <p>Total Units Produced: <b>75,000</b></p>
          <p>Monthly Growth: <b>+10%</b></p>
          <p>Top Product: <b>Aloe Vera Gel</b></p>
          <p>Defective Units Rate: <b>0.8%</b></p>
        </div>
        <div style={styles.rightBox}>
          <h3>Revenue Insights</h3>
          <p>Monthly Revenue: ₹2.8M</p>
          <p>Quarterly Growth: +15%</p>
          <p>Top Selling Region: Maharashtra</p>
          <p>Repeat Distributors: 18</p>
        </div>
      </div>
      <div style={styles.infoBox}>
        <h4>Performance Trends</h4>
        <p> Production ↑</p>
        <p> Shipments Steady</p>
        <p> Profit Margin: 25%</p>
      </div>
    </div>
  );


      case "certifications":
        return (
          <div>
            <h2> Certifications</h2>
            <div style={styles.section}>
              <div style={styles.leftBox}>
                <h3>Existing Certifications</h3>
                <ul>{certifications.map((c, i) => <li key={i}>{c.name} ({c.status})</li>)}</ul>
              </div>
              <div style={styles.rightBox}>
                <h3>Apply for New Certification</h3>
                <input style={styles.input} placeholder="Certification Name" value={newCertification.name} onChange={e => setNewCertification({ ...newCertification, name: e.target.value })} />
                <input style={styles.input} placeholder="Authority Name" value={newCertification.authority} onChange={e => setNewCertification({ ...newCertification, authority: e.target.value })} />
                <input style={styles.input} placeholder="Supporting Documents Link" value={newCertification.link} onChange={e => setNewCertification({ ...newCertification, link: e.target.value })} />
                <button style={styles.addBtn} onClick={handleSubmitCertification}>📄 Submit Application</button>
              </div>
            </div>
          </div>
        );

      case "settings":
        return (
          <div>
            <h2> Settings</h2>
            <div style={styles.section}>
              <div style={styles.leftBox}>
                <h3>Profile Information</h3>
                <p><b>Name:</b> Nayan Palande</p>
                <p><b>Email:</b> manufacturer@company.com</p>
                <p><b>Role:</b> Manufacturer</p>
                <p><b>Factory Location:</b> Pune, India</p>
                <button style={styles.addBtn} onClick={handleEditProfile}> Edit Profile</button>
              </div>
              <div style={styles.rightBox}>
                <h3>System Preferences</h3>
                <button style={styles.addBtn} onClick={handleToggleNotifications}>
                  {notificationsEnabled ? " Disable Notifications" : " Enable Notifications"}
                </button>
                <button style={{ ...styles.addBtn, background: "#ccc", color: "#000" }} onClick={handleLogout}> Logout</button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

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
              {tab === "products" && " Products"}
              {tab === "shipments" && " Shipments"}
              {tab === "analytics" && " Analytics"}
              {tab === "certifications" && " Certifications"}
              {tab === "settings" && " Settings"}
            </button>
          ))}
        </nav>
        <div style={styles.userInfo}>
          <p style={styles.userName}>Ram</p>
          <p style={styles.userEmail}>ram2205@gmail.com</p>
        </div>
      </aside>
      <main style={styles.main}>{renderContent()}</main>
    </div>
  );
}




// === STYLES ===
const styles = {
  dashboard: {
    display: "flex",
    height: "100vh",
    fontFamily: "Poppins, sans-serif",
    backgroundColor: "#fff0f6",
  },
  sidebar: {
    width: "250px",
    backgroundColor: "#fff",
    padding: "20px",
    borderRight: "1px solid #f0f0f0",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  logo: { color: "#d81b60", marginBottom: "0" },
  subLogo: { fontSize: "12px", color: "#999", marginBottom: "10px" },
  nav: { marginTop: "20px", display: "flex", flexDirection: "column", gap: "10px" },
  navItem: {
    background: "none",
    border: "none",
    textAlign: "left",
    padding: "10px",
    cursor: "pointer",
    color: "#555",
    borderRadius: "6px",
  },
  activeNav: { background: "#ffe6f0", color: "#d81b60", fontWeight: "600" },
  userInfo: { borderTop: "1px solid #eee", paddingTop: "20px" },
  userName: { fontWeight: "bold" },
  userEmail: { fontSize: "12px", color: "#777" },
  main: { flex: 1, padding: "30px", overflowY: "auto" },
  section: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
    gap: "20px",
    marginTop: "20px",
  },
  leftBox: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
  },
  rightBox: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
  },
  batchCard: {
    backgroundColor: "#fff6fa",
    borderRadius: "8px",
    padding: "10px",
    marginBottom: "10px",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "8px",
    border: "1px solid #ddd",
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
  infoBox: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
    marginTop: "15px",
  },
};

export default Manufacturer;
