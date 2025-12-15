
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Customer() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("orders");

  const [orders] = useState([
    {
      id: "ORD001",
      product: "Lip Care",
      date: "2025-09-10",
      status: "Delivered",
      image: "/images/lipcare.png",
    },
    {
      id: "ORD002",
      product: "Lavender Face Cream",
      date: "2025-09-25",
      status: "In Transit",
      image: "/images/facecream.png",
    },
  ]);

  const [payments] = useState([
    { id: "PAY001", amount: "₹499", method: "UPI", date: "2025-09-10", status: "Success" },
    { id: "PAY002", amount: "₹599", method: "Credit Card", date: "2025-09-25", status: "Pending" },
  ]);

  const [reviews, setReviews] = useState([
    { product: "Lip Care", rating: 5, comment: "Amazing product, loved it!" },
    { product: "Lavender Face Cream", rating: 4, comment: "Very smooth texture." },
  ]);

  const [newReview, setNewReview] = useState({ product: "", rating: "", comment: "" });

  const [trackOrders] = useState([
    { orderId: "ORD001", status: "Delivered", location: "Mumbai, India" },
    { orderId: "ORD002", status: "In Transit", location: "Warehouse - Pune" },
  ]);

 
  const handleAddReview = () => {
    if (!newReview.product || !newReview.rating || !newReview.comment) {
      alert("Please fill all fields!");
      return;
    }
    setReviews([...reviews, newReview]);
    setNewReview({ product: "", rating: "", comment: "" });
  };

  return (
    <div style={styles.dashboard}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <h2 style={styles.logo}>Supply Chain</h2>
      
        

        <nav style={styles.nav}>
          <button
            style={{ ...styles.navItem, ...(activeTab === "orders" ? styles.activeNav : {}) }}
            onClick={() => setActiveTab("orders")}
          >
             My Orders
          </button>
          <button
            style={{ ...styles.navItem, ...(activeTab === "payments" ? styles.activeNav : {}) }}
            onClick={() => setActiveTab("payments")}
          >
             Payments
          </button>
          <button
            style={{ ...styles.navItem, ...(activeTab === "reviews" ? styles.activeNav : {}) }}
            onClick={() => setActiveTab("reviews")}
          >
             Reviews
          </button>
          <button
            style={{ ...styles.navItem, ...(activeTab === "track" ? styles.activeNav : {}) }}
            onClick={() => setActiveTab("track")}
          >
             Track Order
          </button>
          <button
            style={{ ...styles.navItem, ...(activeTab === "settings" ? styles.activeNav : {}) }}
            onClick={() => setActiveTab("settings")}
          >
             Settings
          </button>
        </nav>

        <div style={styles.userInfo}>
          <p style={styles.userName}>Nayan Palande</p>
          <p style={styles.userEmail}>nayan2106@gmail.com</p>
        </div>
      </aside>

      {/* Main Section */}
      <main style={styles.main}>
        <div style={styles.header}>
          <h2>Customer Dashboard</h2>
          <p>Track orders, manage payments, and verify authenticity</p>
        </div>

        {activeTab === "orders" && (
          <>
            <h3>My Orders</h3>
            <div style={styles.section}>
              {orders.map((order, index) => (
                <div key={index} style={styles.orderCard}>
                  <img src={order.image} alt={order.product} style={styles.productImage} />
                  <div>
                    <p><b>Order ID:</b> {order.id}</p>
                    <p><b>Product:</b> {order.product}</p>
                    <p><b>Date:</b> {order.date}</p>
                    <p><b>Status:</b> {order.status}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={styles.rightBox}>
              <h3> Verify Product Authenticity</h3>
              <input style={styles.input} placeholder="Enter Batch ID" />
              <button style={styles.addBtn}> Verify Product</button>
            </div>
          </>
        )}

        {activeTab === "payments" && (
          <div style={styles.section}>
            <h3> Payment History</h3>
            {payments.map((p, i) => (
              <div key={i} style={styles.paymentCard}>
                <p><b>Payment ID:</b> {p.id}</p>
                <p><b>Amount:</b> {p.amount}</p>
                <p><b>Method:</b> {p.method}</p>
                <p><b>Date:</b> {p.date}</p>
                <p><b>Status:</b> {p.status}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "reviews" && (
          <div style={styles.section}>
            <h3> Product Reviews</h3>
            {reviews.map((r, i) => (
              <div key={i} style={styles.reviewCard}>
                <p><b>Product:</b> {r.product}</p>
                <p><b>Rating:</b> {"".repeat(r.rating)}</p>
                <p><b>Comment:</b> {r.comment}</p>
              </div>
            ))}
            <div style={styles.rightBox}>
              <h4>Add New Review</h4>
              <input
                style={styles.input}
                placeholder="Product Name"
                value={newReview.product}
                onChange={(e) => setNewReview({ ...newReview, product: e.target.value })}
              />
              <input
                style={styles.input}
                placeholder="Rating (1-5)"
                type="number"
                value={newReview.rating}
                onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
              />
              <textarea
                style={styles.input}
                placeholder="Comment"
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              />
              <button style={styles.addBtn} onClick={handleAddReview}> Add Review</button>
            </div>
          </div>
        )}

        {activeTab === "track" && (
          <div style={styles.section}>
            <h3> Track Your Orders</h3>
            {trackOrders.map((t, i) => (
              <div key={i} style={styles.trackCard}>
                <p><b>Order ID:</b> {t.orderId}</p>
                <p><b>Status:</b> {t.status}</p>
                <p><b>Current Location:</b> {t.location}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "settings" && (
          <div style={styles.section}>
            <h3>Account Settings</h3>
            <div style={styles.settingsBox}>
              <label>Name:</label>
              <input style={styles.input} defaultValue="Nayan Palande" />
              <label>Email:</label>
              <input style={styles.input} defaultValue="nayan@example.com" />
              <label>Password:</label>
              <input style={styles.input} type="password" defaultValue="********" />
              <button style={styles.addBtn}> Save Changes</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// Styling
const styles = {
  dashboard: { display: "flex", 
    height: "100vh", 
    fontFamily: "Poppins, sans-serif", 
    backgroundColor: "#fff0f6" },
  sidebar: { width: "250px",
     backgroundColor: "#fff",
      padding: "20px",
       borderRight: "1px solid #f0f0f0",
        display: "flex", 
        flexDirection: "column", 
        justifyContent: "space-between" },
  logo: { color: "#d81b60" },
  subLogo: { fontSize: "12px", color: "#999" },
  roleBtn: { background: "linear-gradient(90deg,#d81b60,#ff80ab)", 
    color: "#fff", border: "none", padding: "6px 10px", borderRadius: "8px" },
  nav: { marginTop: "30px" },
  navItem: { display: "block", width: "100%", border: "none", background: "none", padding: "10px 0", textAlign: "left", color: "#444", cursor: "pointer" },
  activeNav: { color: "#d81b60", fontWeight: "bold" },
  userInfo: { borderTop: "1px solid #eee", paddingTop: "20px" },
  userName: { fontWeight: "bold" },
  userEmail: { fontSize: "12px", color: "#777" },
  main: { flex: 1, padding: "30px", overflowY: "auto" },
  header: { marginBottom: "20px" },
  section: { marginTop: "20px" },
  orderCard: { display: "flex", alignItems: "center", backgroundColor: "#fff6fa", borderRadius: "8px", padding: "10px", marginBottom: "10px", gap: "10px" },
  productImage: { width: "60px", height: "60px", borderRadius: "8px" },
  input: { width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "8px", border: "1px solid #ddd" },
  addBtn: { width: "100%", padding: "10px", border: "none", borderRadius: "8px", background: "linear-gradient(90deg,#d81b60,#ff80ab)", color: "#fff", fontWeight: "600" },
  rightBox: { marginTop: "20px", backgroundColor: "#fff", padding: "20px", borderRadius: "12px", boxShadow: "0 2px 6px rgba(0,0,0,0.05)" },
  paymentCard: { backgroundColor: "#fff6fa", padding: "10px", borderRadius: "8px", marginBottom: "10px" },
  reviewCard: { backgroundColor: "#fff6fa", padding: "10px", borderRadius: "8px", marginBottom: "10px" },
  trackCard: { backgroundColor: "#fff6fa", padding: "10px", borderRadius: "8px", marginBottom: "10px" },
  settingsBox: { backgroundColor: "#fff", padding: "20px", borderRadius: "12px", boxShadow: "0 2px 6px rgba(0,0,0,0.05)" },
};

export default Customer;
