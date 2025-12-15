import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateProfile() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    role: "",
    companyName: "",
    companyType: "",
    website: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zip: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div style={styles.page}>
      <div style={styles.card}>

        {/* ⭐ FIXED: Goes to /login instead of "/" */}
        <button onClick={() => navigate("/login")} style={styles.backButton}>
          ← Back to Login
        </button>

        <div style={styles.progress}>
          <div
            style={{
              ...styles.progressBar,
              width: `${(step / 4) * 100}%`,
            }}
          ></div>
        </div>

        <h2 style={styles.title}>Created Your Profile</h2>
        <p style={styles.subtitle}>Join the supply chain transparency network</p>

        {step === 1 && (
          <div>
            <h3 style={styles.sectionTitle}>Personal Information</h3>
            <p style={styles.sectionSubtitle}>Tell us about yourself</p>

            <form style={styles.form}>
              <div style={styles.row}>
                <input
                  style={styles.input}
                  name="firstName"
                  placeholder="First Name *"
                  value={formData.firstName}
                  onChange={handleChange}
                />
                <input
                  style={styles.input}
                  name="lastName"
                  placeholder="Last Name *"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>

              <input
                style={styles.input}
                name="email"
                placeholder="Email Address *"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />

              <div style={styles.row}>
                <input
                  style={styles.input}
                  name="password"
                  placeholder="Password *"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <input
                  style={styles.input}
                  name="confirmPassword"
                  placeholder="Confirm Password *"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>

              <input
                style={styles.input}
                name="phone"
                placeholder="Phone Number"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
              />

              <button type="button" style={styles.btn} onClick={nextStep}>
                Next →
              </button>
            </form>
          </div>
        )}

        {step === 2 && (
          <div>
            <h3 style={styles.sectionTitle}>Role & Organization</h3>
            <p style={styles.sectionSubtitle}>What’s your role in the supply chain?</p>

            <form style={styles.form}>
              <select
                style={styles.input}
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="">Select Your Role *</option>
                <option value="Manufacturer">Manufacturer</option>
                <option value="Distributor">Distributor</option>
                <option value="Retailer">Retailer</option>
                <option value="Customer">Customer</option>
              </select>

              <input
                style={styles.input}
                name="companyName"
                placeholder="Company Name *"
                value={formData.companyName}
                onChange={handleChange}
              />

              <input
                style={styles.input}
                name="companyType"
                placeholder="Company Type"
                value={formData.companyType}
                onChange={handleChange}
              />

              <input
                style={styles.input}
                name="website"
                placeholder="Website (https://yourcompany.com)"
                value={formData.website}
                onChange={handleChange}
              />

              <div style={styles.rowButtons}>
                <button type="button" style={styles.prevBtn} onClick={prevStep}>
                  ← Previous
                </button>
                <button type="button" style={styles.btn} onClick={nextStep}>
                  Next →
                </button>
              </div>
            </form>
          </div>
        )}

        {step === 3 && (
          <div>
            <h3 style={styles.sectionTitle}>Address Information</h3>
            <p style={styles.sectionSubtitle}>Where are you located?</p>

            <form style={styles.form}>
              <input
                style={styles.input}
                name="address"
                placeholder="Street Address"
                value={formData.address}
                onChange={handleChange}
              />

              <div style={styles.row}>
                <input
                  style={styles.input}
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                />

                <input
                  style={styles.input}
                  name="state"
                  placeholder="State/Province"
                  value={formData.state}
                  onChange={handleChange}
                />
              </div>

              <div style={styles.row}>
                <input
                  style={styles.input}
                  name="country"
                  placeholder="Country"
                  value={formData.country}
                  onChange={handleChange}
                />

                <input
                  style={styles.input}
                  name="zip"
                  placeholder="ZIP/Postal Code"
                  value={formData.zip}
                  onChange={handleChange}
                />
              </div>

              <div style={styles.rowButtons}>
                <button type="button" style={styles.prevBtn} onClick={prevStep}>
                  ← Previous
                </button>

                <button type="button" style={styles.btn} onClick={nextStep}>
                  Next →
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    background: "linear-gradient(to bottom right, #ffe6f2, #ffffff)",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    background: "#fff",
    borderRadius: "20px",
    boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
    padding: "40px 60px",
    width: "550px",
  },
  backButton: {
    background: "none",
    border: "none",
    color: "#ff5fa2",
    fontSize: "14px",
    cursor: "pointer",
    marginBottom: "10px",
  },
  progress: {
    height: "6px",
    background: "#eee",
    borderRadius: "10px",
    marginBottom: "20px",
  },
  progressBar: {
    height: "6px",
    background: "linear-gradient(to right, #ff5fa2, #a46bff)",
    borderRadius: "10px",
  },
  title: { textAlign: "center", color: "#333", fontWeight: "700" },
  subtitle: { textAlign: "center", color: "#777", marginBottom: "30px" },
  sectionTitle: { color: "#333", marginBottom: "5px" },
  sectionSubtitle: { color: "#777", marginBottom: "20px" },
  form: { display: "flex", flexDirection: "column", gap: "15px" },
  row: { display: "flex", gap: "15px" },
  input: {
    flex: 1,
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #ddd",
  },
  btn: {
    background: "linear-gradient(to right, #ff5fa2, #a46bff)",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    padding: "12px 20px",
    cursor: "pointer",
    marginTop: "10px",
  },
  prevBtn: {
    background: "#fff",
    border: "1px solid #ff5fa2",
    color: "#ff5fa2",
    borderRadius: "10px",
    padding: "12px 20px",
    cursor: "pointer",
    marginTop: "10px",
  },
  rowButtons: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
};

export default CreateProfile;
