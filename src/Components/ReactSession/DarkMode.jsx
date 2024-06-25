// ----------------------------------------------------Dark Mode--------------------------------------------------------------
import React, { useState } from "react";

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      style={{
        backgroundColor: darkMode ? "#333" : "#fff",
        color: darkMode ? "#fff" : "#333",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <button
        style={{
          padding: "10px 20px",
          borderRadius: "5px",
          backgroundColor: darkMode ? "#555" : "#ccc",
          color: darkMode ? "#fff" : "#333",
          border: "none",
          cursor: "pointer",
          outline: "none",
          marginBottom: "20px"
        }}
        onClick={toggleDarkMode}
      >
        {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      </button>
      <h2>{darkMode ? "Dark Mode Enabled" : "Light Mode Enabled"}</h2>
    </div>
  );
};

export default DarkModeToggle;
