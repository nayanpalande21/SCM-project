import React from "react";


const cosmeticImages = [
  "/images/aloe_vera_gel.jpg",  // Cosmetic 1
  "/images/body_lotion.jpg",    // Cosmetic 2
  "/images/face_wash.jpg",      // Cosmetic 3
  "/images/lip_balm.jpg",       // Cosmetic 4
];

function Dashboard() {
  const dashboardStyle = {
    padding: "40px 20px",
    minHeight: "100vh",
    backgroundColor: "#ffe4f1", 
    color: "black",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
  };

  const imagesContainerStyle = {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: "20px",
  };

  const imageStyle = {
    width: "150px",
    height: "150px",
    objectFit: "cover",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
  };

  return (
    <div style={dashboardStyle}>
      <h2>Supply Chain Dashboard</h2>
      <p>
        Welcome to the Cosmetic Supply Chain Dashboard.<br />
        Here you can track the journey of products from Manufacturer<br />
        through Distributor to Retailer, and finally to the Customer.<br />
        Monitor the status of each product as it moves through the chain.<br />
        Stay updated with products created, shipped, and delivered.<br />
        Efficiently manage and optimize the cosmetic supply process.
      </p>

      <div style={imagesContainerStyle}>
        {cosmeticImages.map((img, index) => (
          <img key={index} src={img} alt={`Cosmetic ${index + 1}`} style={imageStyle} />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
