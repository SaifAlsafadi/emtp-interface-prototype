// src/windows/StateSpaceDialog.jsx
import React, { useState } from "react";
import "./StateSpaceDialog.css";

function StateSpaceDialog({ open, onClose }) {
  // which tab is active: "data" | "ic" | "attr"
  const [activeTab, setActiveTab] = useState("data");

  const [useFile, setUseFile] = useState(false);
  const [showMatrix, setShowMatrix] = useState({
    A: true,
    B: true,
    C: true,
    D: true,
    D1: true,
  });

  const [matrices, setMatrices] = useState({
    A: "",
    B: "",
    C: "",
    D: "",
    D1: "",
  });

  const [historyText, setHistoryText] = useState("");
  const [userNotes, setUserNotes] = useState("");

  const [attributes, setAttributes] = useState({
    value: false,
    value1: false,
    value2: false,
    part: false,
    name: false,
    description: true,
    color: true,
  });

  if (!open) return null; // don't render if dialog is closed

  const handleMatrixToggle = (key) => {
    setShowMatrix((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleMatrixChange = (key, value) => {
    setMatrices((prev) => ({ ...prev, [key]: value }));
  };

  const handleAttrChange = (key) => {
    setAttributes((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleOkData = () => {
    console.log("Data saved:", { useFile, showMatrix, matrices });
    onClose && onClose();
  };

  const handleOkIC = () => {
    console.log("IC saved:", historyText);
    onClose && onClose();
  };

  const handleOkAttr = () => {
    console.log("Attributes saved:", attributes, userNotes);
    onClose && onClose();
  };

  return (
    <div id="propertiesPopup" className="popup" role="dialog" aria-modal="true">
      <div className="header" id="popupHeader">
        <div className="left">
          <h2>Properties for State-space equations</h2>
        </div>
        <div>
          <span className="close-btn" id="closeX" title="Close" onClick={onClose}>
            ×
          </span>
        </div>
      </div>

      <div className="content">
        {/* LEFT COLUMN */}
        <div className="left-column">
          <div className="tabs" role="tablist" aria-label="tabs">
            <div
              className={`tab ${activeTab === "data" ? "active" : ""}`}
              onClick={() => setActiveTab("data")}
            >
              Data
            </div>
            <div
              className={`tab ${activeTab === "ic" ? "active" : ""}`}
              onClick={() => setActiveTab("ic")}
            >
              IC
            </div>
            <div
              className={`tab ${activeTab === "attr" ? "active" : ""}`}
              onClick={() => setActiveTab("attr")}
            >
              Attributes
            </div>
          </div>

          <div id="leftControls">
            <div className="controls-row">
              <label className="checkbox-inline">
                <input
                  type="checkbox"
                  checked={useFile}
                  onChange={(e) => setUseFile(e.target.checked)}
                />
                Use file input
              </label>
            </div>

            <div className="controls-row">
              <strong>Show Matrices</strong>
            </div>

            <div className="controls-row" id="matrixToggles">
              {["A", "B", "C", "D", "D1"].map((key) => (
                <label key={key} className="checkbox-inline">
                  <input
                    type="checkbox"
                    checked={showMatrix[key]}
                    onChange={() => handleMatrixToggle(key)}
                  />
                  {key}
                </label>
              ))}
            </div>

            <div className="helptext">
              Tip: Toggle matrices to show/hide them. Content is kept in state.
            </div>

            <div style={{ marginTop: 12 }}>
              <div className="attr-box">
                <div
                  style={{
                    fontWeight: 700,
                    textAlign: "center",
                    marginBottom: 8,
                  }}
                >
                  Programmable scopes
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: 6,
                    alignItems: "center",
                    marginBottom: 6,
                  }}
                >
                  <div style={{ width: 70 }}>Phase A</div>
                  <input
                    type="text"
                    style={{ flex: 1, padding: 6, border: "1px solid #bbb" }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: 6,
                    alignItems: "center",
                    marginBottom: 6,
                  }}
                >
                  <div style={{ width: 70 }}>Phase B</div>
                  <input
                    type="text"
                    style={{ flex: 1, padding: 6, border: "1px solid #bbb" }}
                  />
                </div>
                <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  <div style={{ width: 70 }}>Phase C</div>
                  <input
                    type="text"
                    style={{ flex: 1, padding: 6, border: "1px solid #bbb" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="right-column">
          {/* DATA TAB */}
          {activeTab === "data" && (
            <div id="panel-data" className="panel activePanel">
              <h3 style={{ marginTop: 0 }}>State-space model matrices</h3>

              {["A", "B", "C", "D", "D1"].map((key) =>
                showMatrix[key] ? (
                  <div key={key} className="matrix-box" id={`${key}box`}>
                    <div className="matrix-header">
                      <b>
                        {key} matrix
                        {key === "D1" ? " (Can be left empty)" : ""}
                      </b>
                      <div className="controls">
                        <button className="btn-small">Expand</button>
                        <button className="btn-small">Contract</button>
                      </div>
                    </div>
                    <textarea
                      value={matrices[key]}
                      onChange={(e) =>
                        handleMatrixChange(key, e.target.value)
                      }
                      placeholder={`Enter ${key} matrix here`}
                    />
                  </div>
                ) : null
              )}

              <div className="bottom-actions">
                <button className="btn-main" onClick={handleOkData}>
                  OK
                </button>
                <button className="btn-main" onClick={onClose}>
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* IC TAB */}
          {activeTab === "ic" && (
            <div id="panel-ic" className="panel">
              <h3 style={{ marginTop: 0 }}>Initial conditions for states</h3>

              <div className="matrix-box">
                <div className="matrix-header">
                  <b>History matrix</b>
                  <div className="controls">
                    <button className="btn-small">Expand</button>
                    <button className="btn-small">Contract</button>
                  </div>
                </div>
                <textarea
                  id="historyText"
                  style={{ height: 120 }}
                  value={historyText}
                  onChange={(e) => setHistoryText(e.target.value)}
                  placeholder="Enter history matrix here: two columns line-by-line (state#, initial value)"
                />
              </div>

              <div className="helptext">
                This tab allows entering initial values for states. The History
                matrix is a two-column matrix, line-by-line, first column =
                state number, second = initial value. If omitted, state is 0.
              </div>

              <div style={{ height: 12 }} />

              <div className="bottom-actions">
                <button className="btn-main" onClick={handleOkIC}>
                  OK
                </button>
                <button className="btn-main" onClick={onClose}>
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* ATTRIBUTES TAB */}
          {activeTab === "attr" && (
            <div id="panel-attr" className="panel">
              <h3 style={{ marginTop: 0 }}>Device Attributes</h3>

              <div style={{ marginBottom: 10 }}>Select attribute visibility</div>

              <div
                style={{
                  display: "flex",
                  gap: 10,
                  flexWrap: "wrap",
                  marginBottom: 10,
                }}
              >
                {[
                  ["value", "Value"],
                  ["value1", "Value1"],
                  ["value2", "Value2"],
                  ["part", "Part"],
                  ["name", "Name"],
                  ["description", "Description"],
                  ["color", "Allow color coding"],
                ].map(([key, label]) => (
                  <label key={key} className="checkbox-inline">
                    <input
                      type="checkbox"
                      checked={attributes[key]}
                      onChange={() => handleAttrChange(key)}
                    />
                    {label}
                  </label>
                ))}
              </div>

              <div className="user-notes matrix-box">
                <b>User Notes for this device</b>
                <textarea
                  value={userNotes}
                  onChange={(e) => setUserNotes(e.target.value)}
                  placeholder="User notes"
                />
              </div>

              <div style={{ height: 12 }} />

              <div className="bottom-actions">
                <button className="btn-main" onClick={handleOkAttr}>
                  OK
                </button>
                <button className="btn-main" onClick={onClose}>
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default StateSpaceDialog;
