import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Distributor() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("shipments");

  // ⭐ LOGOUT FUNCTION
  const handleLogout = () => {
    localStorage.removeItem("userRole");
    navigate("/login");
  };

  // Shipment Data
  const [shipments, setShipments] = useState([
    { id: "SHP001", from: "Manufacturer A", to: "Retailer X", status: "Delivered", date: "2025-10-05" },
    { id: "SHP002", from: "Manufacturer B", to: "Retailer Y", status: "In Transit", date: "2025-10-10" },
    { id: "SHP003", from: "Manufacturer A", to: "Retailer Z", status: "Pending", date: "2025-10-12" },
  ]);

  const [newShipment, setNewShipment] = useState({
    id: "",
    from: "",
    to: "",
    status: "Pending",
    date: "",
  });

  const handleAddShipment = () => {
    if (!newShipment.id || !newShipment.from || !newShipment.to || !newShipment.date) {
      alert("Please fill all fields!");
      return;
    }
    setShipments([...shipments, newShipment]);
    setNewShipment({ id: "", from: "", to: "", status: "Pending", date: "" });
  };

  // Inventory
  const [inventory] = useState([
    { id: "INV001", product: "Aloe Vera Gel", quantity: 120, batch: "BC001" },
    { id: "INV002", product: "Herbal Shampoo", quantity: 200, batch: "BC002" },
    { id: "INV003", product: "Face Cream", quantity: 80, batch: "BC003" },
  ]);

  // Analytics
  const analytics = {
    totalShipments: shipments.length,
    delivered: shipments.filter((s) => s.status === "Delivered").length,
    pending: shipments.filter((s) => s.status === "Pending").length,
    inTransit: shipments.filter((s) => s.status === "In Transit").length,
    totalRetailers: 6,
  };

  return (
    <div style={styles.dashboard}>
      
      {/* SIDEBAR */}
      <aside style={styles.sidebar}>
        <h2 style={styles.logo}>Supply Chain</h2>

        <nav style={styles.nav}>
          {["shipments", "inventory", "analytics"].map((tab) => (
            <button
              key={tab}
              style={{
                ...styles.navItem,
                ...(activeTab === tab ? styles.activeNav : {}),
              }}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "shipments" && " Shipments"}
              {tab === "inventory" && " Inventory"}
             
              {tab === "analytics" && " Analytics"}
            </button>
          ))}
        </nav>

        <div style={styles.userInfo}>
          <p style={styles.userName}>John</p>
          <p style={styles.userEmail}>john12@gmail.com</p>
        </div>

        {/* ⭐ LOGOUT BUTTON ADDED */}
        <button onClick={handleLogout} style={styles.logoutBtn}>
          Logout
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main style={styles.main}>
        <div style={styles.header}>
          <h2>Distributor Dashboard</h2>
          <p>Manage shipments, inventory, and retailer orders</p>
        </div>

        {/* Shipments */}
        {activeTab === "shipments" && (
          <div>
            <h3> Shipment Management</h3>

            <div style={styles.cards}>
              <div style={{ ...styles.card, backgroundColor: "#e3f2fd" }}>
                <h3>Total Shipments</h3>
                <h1>{analytics.totalShipments}</h1>
              </div>
              <div style={{ ...styles.card, backgroundColor: "#e8f5e9" }}>
                <h3>Delivered</h3>
                <h1>{analytics.delivered}</h1>
              </div>
              <div style={{ ...styles.card, backgroundColor: "#fffde7" }}>
                <h3>In Transit</h3>
                <h1>{analytics.inTransit}</h1>
              </div>
              <div style={{ ...styles.card, backgroundColor: "#ffebee" }}>
                <h3>Pending</h3>
                <h1>{analytics.pending}</h1>
              </div>
            </div>

            <div style={styles.section}>
              {/* LEFT — LIST */}
              <div style={styles.leftBox}>
                <h3>Shipment Records</h3>
                {shipments.map((s, i) => (
                  <div key={i} style={styles.shipmentCard}>
                    <p><b>ID:</b> {s.id}</p>
                    <p><b>From:</b> {s.from}</p>
                    <p><b>To:</b> {s.to}</p>
                    <p><b>Status:</b> <span style={{ color: getStatusColor(s.status) }}>{s.status}</span></p>
                    <p><b>Date:</b> {s.date}</p>
                  </div>
                ))}
              </div>

              {/* RIGHT — ADD SHIPMENT */}
              <div style={styles.rightBox}>
                <h3>Add New Shipment</h3>

                <input style={styles.input} placeholder="Shipment ID"
                  value={newShipment.id}
                  onChange={(e) => setNewShipment({ ...newShipment, id: e.target.value })}
                />

                <input style={styles.input} placeholder="From (Manufacturer)"
                  value={newShipment.from}
                  onChange={(e) => setNewShipment({ ...newShipment, from: e.target.value })}
                />

                <input style={styles.input} placeholder="To (Retailer)"
                  value={newShipment.to}
                  onChange={(e) => setNewShipment({ ...newShipment, to: e.target.value })}
                />

                <input style={styles.input} type="date"
                  value={newShipment.date}
                  onChange={(e) => setNewShipment({ ...newShipment, date: e.target.value })}
                />

                <select style={styles.input}
                  value={newShipment.status}
                  onChange={(e) => setNewShipment({ ...newShipment, status: e.target.value })}
                >
                  <option>Pending</option>
                  <option>In Transit</option>
                  <option>Delivered</option>
                  <option>Returned</option>
                </select>

                <button style={styles.addBtn} onClick={handleAddShipment}>
                  ➕ Add Shipment
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Inventory */}
        {activeTab === "inventory" && (
          <div>
            <h3>Inventory Management</h3>
            {inventory.map((item, i) => (
              <div key={i} style={styles.shipmentCard}>
                <p><b>Product:</b> {item.product}</p>
                <p><b>Quantity:</b> {item.quantity}</p>
                <p><b>Batch:</b> {item.batch}</p>
              </div>
            ))}
          </div>
        )}

        

        {/* Analytics */}
        {activeTab === "analytics" && (
          <div>
            <h3>Analytics Overview</h3>

            <div style={styles.cards}>
              <div style={{ ...styles.card, backgroundColor: "#fce4ec" }}>
                <h4>Total Retailers</h4>
                <h1>{analytics.totalRetailers}</h1>
              </div>
              <div style={{ ...styles.card, backgroundColor: "#e8f5e9" }}>
                <h4>Delivered Shipments</h4>
                <h1>{analytics.delivered}</h1>
              </div>
              <div style={{ ...styles.card, backgroundColor: "#fffde7" }}>
                <h4>Pending Shipments</h4>
                <h1>{analytics.pending}</h1>
              </div>
              <div style={{ ...styles.card, backgroundColor: "#e3f2fd" }}>
                <h4>In Transit</h4>
                <h1>{analytics.inTransit}</h1>
              </div>
            </div>
          </div>
        )}

      
       
      </main>
    </div>
  );
}

// Status Colors
const getStatusColor = (status) => {
  switch (status) {
    case "Delivered": return "green";
    case "In Transit": return "#d81b60";
    case "Pending": return "orange";
    case "Returned": return "red";
    default: return "black";
  }
};

// Styles
const styles = {
  dashboard: { display: "flex", height: "100vh", fontFamily: "Poppins, sans-serif", backgroundColor: "#fff0f6" },

  sidebar: { width: "250px", backgroundColor: "#fff", padding: "20px", borderRight: "1px solid #f0f0f0", display: "flex", flexDirection: "column", justifyContent: "space-between" },

  logo: { color: "#d81b60" },

  nav: { marginTop: "30px" },

  navItem: { display: "block", width: "100%", background: "none", border: "none", padding: "10px 0", textAlign: "left", color: "#444", cursor: "pointer" },

  activeNav: { color: "#d81b60", fontWeight: "bold" },

  userInfo: { borderTop: "1px solid #eee", paddingTop: "20px" },

  userName: { fontWeight: "bold" },

  userEmail: { fontSize: "12px", color: "#777" },

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

  main: { flex: 1, padding: "30px", overflowY: "auto" },

  header: { marginBottom: "20px" },

  cards: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "15px" },

  card: { borderRadius: "12px", padding: "15px", boxShadow: "0 2px 6px rgba(0,0,0,0.05)" },

  section: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "20px", marginTop: "30px" },

  leftBox: { backgroundColor: "#fff", borderRadius: "12px", padding: "20px", boxShadow: "0 2px 6px rgba(0,0,0,0.05)" },

  rightBox: { backgroundColor: "#fff", borderRadius: "12px", padding: "20px", boxShadow: "0 2px 6px rgba(0,0,0,0.05)" },

  shipmentCard: { backgroundColor: "#fff6fa", borderRadius: "8px", padding: "10px", marginBottom: "10px" },

  input: { width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "8px", border: "1px solid #ddd" },

  addBtn: { width: "100%", padding: "12px", border: "none", borderRadius: "8px", background: "linear-gradient(90deg, #d81b60, #ff80ab)", color: "#fff", fontWeight: "600", cursor: "pointer" },

  trackingSection: { marginTop: "40px", backgroundColor: "#fff", padding: "20px", borderRadius: "12px", boxShadow: "0 2px 6px rgba(0,0,0,0.05)" },

  trackingBox: { backgroundColor: "#fff6fa", padding: "15px", borderRadius: "8px", marginTop: "10px" },
};

export default Distributor;
