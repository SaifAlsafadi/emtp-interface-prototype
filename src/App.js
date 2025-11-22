// src/App.js
import React, { useState } from "react";
import "./App.css";
import StateSpaceDialog from "./windows/StateSpaceDialog";

// import the symbol image
import ss1Img from "./state-space-ss1.png";

function App() {
  const [showStateSpace, setShowStateSpace] = useState(false);

  return (
    <div className="App">
      <h2 className="app-title">EMTP React UI</h2>
      <p className="app-subtitle">
        Click the State-Space block to open its properties window.
      </p>

      {/* Symbol block with the image */}
      <div className="symbol-wrapper">
        <div
          className="symbol-click-area"
          onClick={() => setShowStateSpace(true)}
          title="Click to open State-Space properties"
        >
          <img
            src={ss1Img}
            alt="State-Space block SS1"
            className="symbol-image"
          />
        </div>
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

