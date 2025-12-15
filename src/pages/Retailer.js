// src/pages/Retailer.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Retailer() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("products");

  // ⭐ LOGOUT FUNCTION
  const handleLogout = () => {
    localStorage.removeItem("userRole");
    navigate("/login");
  };

  // --- Products Data ---
  const [products, setProducts] = useState([
    { id: "P001", name: "Aloe Face Cream", batch: "BC001", status: "In Stock", price: 499, mfg: "Manufacturer A", date: "2025-10-08" },
    { id: "P002", name: "Lavender Lotion", batch: "BC002", status: "Sold", price: 599, mfg: "Manufacturer B", date: "2025-10-10" },
  ]);

  // --- Shipments Data ---
  const [shipments, setShipments] = useState([
    { id: "SHP001", from: "Distributor A", items: 30, status: "Delivered", date: "2025-10-01" },
    { id: "SHP002", from: "Distributor B", items: 15, status: "In Transit", date: "2025-10-12" },
  ]);

  // --- Sales Data ---
  const [sales] = useState([
    { id: "S001", product: "Aloe Face Cream", qty: 5, amount: 2495, date: "2025-10-14" },
    { id: "S002", product: "Lavender Lotion", qty: 3, amount: 1797, date: "2025-10-15" },
  ]);

  // --- Verify Product ---
  const [verifyInput, setVerifyInput] = useState("");
  const [verifyResult, setVerifyResult] = useState("");

  const handleVerify = () => {
    if (!verifyInput) return alert("Enter Batch ID!");
    if (products.some((p) => p.batch === verifyInput)) {
      setVerifyResult(" ✔ Authentic product verified on blockchain.");
    } else {
      setVerifyResult(" ✖ Counterfeit detected or not found in blockchain record.");
    }
  };

  // --- Add Product ---
  const [newProduct, setNewProduct] = useState({
    id: "",
    name: "",
    batch: "",
    mfg: "",
    price: "",
    status: "In Stock",
    date: "",
  });

  const handleAddProduct = () => {
    if (!newProduct.id || !newProduct.name || !newProduct.batch || !newProduct.price) {
      alert("Please fill all required fields!");
      return;
    }
    setProducts([...products, newProduct]);
    setNewProduct({ id: "", name: "", batch: "", mfg: "", price: "", status: "In Stock", date: "" });
  };

  return (
    <div style={styles.dashboard}>
      {/* SIDEBAR */}
      <aside style={styles.sidebar}>
        <h2 style={styles.logo}>Supply Chain</h2>

        <nav style={styles.nav}>
          {[
            ["Products", "products"],
            ["Shipments", "shipments"],
            ["Sales", "sales"],
            ["Verify", "verify"],
            ["Analytics", "analytics"],
          
          ].map(([label, key]) => (
            <button
              key={key}
              style={{ ...styles.navItem, ...(activeTab === key ? styles.activeNav : {}) }}
              onClick={() => setActiveTab(key)}
            >
              {label}
            </button>
          ))}
        </nav>

        <div style={styles.userInfo}>
          <p style={styles.userName}>Riya</p>
          <p style={styles.userEmail}>riya0912@gmail.com</p>
        </div>

        {/* ⭐ LOGOUT BUTTON */}
        <button onClick={handleLogout} style={styles.logoutBtn}>
          Logout
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main style={styles.main}>
        <div style={styles.header}>
          <h2>Retailer Dashboard</h2>
          <p>Manage your products, shipments, sales, and authenticity verification.</p>
        </div>

        {/* PRODUCT TAB */}
        {activeTab === "products" && (
          <>
            <div style={styles.cards}>
              <div style={{ ...styles.card, backgroundColor: "#e3f2fd" }}>
                <h3>Total Products</h3>
                <h1>{products.length}</h1>
              </div>
              <div style={{ ...styles.card, backgroundColor: "#e8f5e9" }}>
                <h3>Sold</h3>
                <h1>{products.filter((p) => p.status === "Sold").length}</h1>
              </div>
              <div style={{ ...styles.card, backgroundColor: "#ffebee" }}>
                <h3>In Stock</h3>
                <h1>{products.filter((p) => p.status === "In Stock").length}</h1>
              </div>
            </div>

            <div style={styles.section}>
              {/* LEFT: LIST */}
              <div style={styles.leftBox}>
                <h3>Products in Store</h3>
                {products.map((p, i) => (
                  <div key={i} style={styles.productCard}>
                    <p><b>ID:</b> {p.id}</p>
                    <p><b>Name:</b> {p.name}</p>
                    <p><b>Batch:</b> {p.batch}</p>
                    <p><b>Manufacturer:</b> {p.mfg}</p>
                    <p><b>Price:</b> ₹{p.price}</p>
                    <p><b>Status:</b> <span style={{ color: getStatusColor(p.status) }}>{p.status}</span></p>
                    <p><b>Date:</b> {p.date}</p>
                  </div>
                ))}
              </div>

              {/* RIGHT: ADD PRODUCT */}
              <div style={styles.rightBox}>
                <h3>Add New Product</h3>

                {["id", "name", "batch", "mfg", "price", "date"].map((field) => (
                  <input
                    key={field}
                    style={styles.input}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    type={field === "price" ? "number" : field === "date" ? "date" : "text"}
                    value={newProduct[field]}
                    onChange={(e) => setNewProduct({ ...newProduct, [field]: e.target.value })}
                  />
                ))}

                <select
                  style={styles.input}
                  value={newProduct.status}
                  onChange={(e) => setNewProduct({ ...newProduct, status: e.target.value })}
                >
                  <option>In Stock</option>
                  <option>Sold</option>
                  <option>Returned</option>
                </select>

                <button style={styles.addBtn} onClick={handleAddProduct}>
                  ➕ Add Product
                </button>
              </div>
            </div>
          </>
        )}

        {/* SHIPMENTS */}
        {activeTab === "shipments" && (
          <div style={styles.sectionBox}>
            <h3>Received Shipments</h3>
            {shipments.map((s, i) => (
              <div key={i} style={styles.shipmentCard}>
                <p><b>ID:</b> {s.id}</p>
                <p><b>From:</b> {s.from}</p>
                <p><b>Items:</b> {s.items}</p>
                <p><b>Status:</b> <span style={{ color: s.status === "Delivered" ? "green" : "orange" }}>{s.status}</span></p>
                <p><b>Date:</b> {s.date}</p>
              </div>
            ))}
          </div>
        )}

        {/* SALES */}
        {activeTab === "sales" && (
          <div style={styles.sectionBox}>
            <h3>Sales Overview</h3>
            {sales.map((s, i) => (
              <div key={i} style={styles.salesCard}>
                <p><b>Sale ID:</b> {s.id}</p>
                <p><b>Product:</b> {s.product}</p>
                <p><b>Qty:</b> {s.qty}</p>
                <p><b>Total:</b> ₹{s.amount}</p>
                <p><b>Date:</b> {s.date}</p>
              </div>
            ))}
          </div>
        )}

        {/* VERIFY */}
        {activeTab === "verify" && (
          <div style={styles.sectionBox}>
            <h3>Verify Product Authenticity</h3>
            <input
              style={styles.input}
              placeholder="Enter Batch ID"
              value={verifyInput}
              onChange={(e) => setVerifyInput(e.target.value)}
            />
            <button style={styles.verifyBtn} onClick={handleVerify}>
              Verify Product
            </button>

            {verifyResult && <p style={{ marginTop: "10px" }}>{verifyResult}</p>}
          </div>
        )}

        {/* ANALYTICS */}
        {activeTab === "analytics" && (
          <div style={styles.sectionBox}>
            <h3>Sales Analytics</h3>
            <p><b>Total Revenue:</b> ₹{sales.reduce((a, b) => a + b.amount, 0)}</p>
            <p><b>Top Selling Product:</b> {sales[0]?.product}</p>
            <p><b>Average Sale Amount:</b> ₹{(sales.reduce((a, b) => a + b.amount, 0) / sales.length).toFixed(2)}</p>
          </div>
        )}

        {/* SETTINGS */}
        
      </main>
    </div>
  );
}

// STATUS COLOR
const getStatusColor = (status) => {
  switch (status) {
    case "Sold":
      return "green";
    case "In Stock":
      return "#d81b60";
    case "Returned":
      return "red";
    default:
      return "black";
  }
};

// --- Styling ---
const styles = {
  dashboard: { display: "flex", height: "100vh", fontFamily: "Poppins", backgroundColor: "#fff0f6" },

  sidebar: {
    width: "250px",
    backgroundColor: "#fff",
    padding: "20px",
    borderRight: "1px solid #f0f0f0",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },

  logo: { color: "#d81b60" },

  nav: { marginTop: "30px" },

  navItem: {
    display: "block",
    width: "100%",
    border: "none",
    background: "none",
    padding: "10px 0",
    textAlign: "left",
    color: "#444",
    cursor: "pointer",
  },

  activeNav: { color: "#d81b60", fontWeight: "bold" },

  userInfo: { borderTop: "1px solid #eee", paddingTop: "20px" },

  userName: { fontWeight: "bold" },

  userEmail: { fontSize: "12px", color: "#777" },

  logoutBtn: {
    marginTop: "20px",
    padding: "12px",
    width: "100%",
    border: "none",
    borderRadius: "8px",
    background: "linear-gradient(90deg,#d81b60,#ff80ab)",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
  },

  main: { flex: 1, padding: "30px", overflowY: "auto" },

  header: { marginBottom: "20px" },

  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "15px",
  },

  card: { padding: "15px", borderRadius: "12px", boxShadow: "0 2px 6px rgba(0,0,0,0.05)" },

  section: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
    gap: "20px",
    marginTop: "30px",
  },

  sectionBox: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
  },

  leftBox: { background: "#fff", padding: "20px", borderRadius: "12px" },

  rightBox: { background: "#fff", padding: "20px", borderRadius: "12px" },

  productCard: { background: "#fff6fa", padding: "10px", borderRadius: "8px", marginBottom: "10px" },

  shipmentCard: { background: "#f9fbe7", padding: "10px", borderRadius: "8px", marginBottom: "10px" },

  salesCard: { background: "#f3e5f5", padding: "10px", borderRadius: "8px", marginBottom: "10px" },

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
    background: "linear-gradient(90deg,#d81b60,#ff80ab)",
    color: "#fff",
    fontWeight: "600",
  },

  verifyBtn: {
    padding: "12px 20px",
    border: "none",
    borderRadius: "8px",
    background: "linear-gradient(90deg,#d81b60,#ff80ab)",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
  },
};

export default Retailer;
