// src/App.js
import React, { useState } from "react";
import "./App.css";
import StateSpaceDialog from "./windows/StateSpaceDialog";

function App() {
  const [showStateSpace, setShowStateSpace] = useState(false);

  return (
    <div className="App" style={{ padding: 24 }}>
      {/* You can replace this with your actual symbol / canvas later */}
      <h2>EMTP React UI</h2>
      <p>Click the symbol below to open the State-space properties window.</p>

      <div
        onClick={() => setShowStateSpace(true)}
        style={{
          width: 80,
          height: 80,
          border: "2px solid #555",
          borderRadius: 6,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          background: "#f5f5f5",
          fontWeight: "bold",
          marginTop: 16,
        }}
      >
        SS
      </div>

      {/* EMTP-style dialog */}
      <StateSpaceDialog
        open={showStateSpace}
        onClose={() => setShowStateSpace(false)}
      />
    </div>
  );
}

export default App;
