import { useState } from "react";
import "./ICWindow.css";

export default function ICWindow({ onClose }) {
  const [useFileInput, setUseFileInput] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const [visible, setVisible] = useState({
    A: true,
    B: true,
    C: true,
    D: true,
    D1: true,
  });

  function handleFileChoose(e) {
    if (e.target.files.length > 0) {
      setSelectedFile(e.target.files[0].name);
    }
  }

  return (
    <div className="ic-window">
      {/* HEADER */}
      <div className="ic-header">
        <span>Initial Conditions</span>
        <button className="close-btn" onClick={onClose}>X</button>
      </div>

      <div className="ic-content">
        {/* LEFT PANEL */}
        <div className="left-panel">

          {/* USE FILE INPUT CHECKBOX (ABOVE ABCDD1) */}
          <label className="use-file-label">
            <input
              type="checkbox"
              checked={useFileInput}
              onChange={() => setUseFileInput(!useFileInput)}
            />
            Use File Input
          </label>

          {/* A/B/C/D/D1 toggles (still visible, just ignored when file input is on) */}
          <label>
            <input
              type="checkbox"
              checked={visible.A}
              onChange={() => setVisible({ ...visible, A: !visible.A })}
              disabled={useFileInput}
            />
            A
          </label>

          <label>
            <input
              type="checkbox"
              checked={visible.B}
              onChange={() => setVisible({ ...visible, B: !visible.B })}
              disabled={useFileInput}
            />
            B
          </label>

          <label>
            <input
              type="checkbox"
              checked={visible.C}
              onChange={() => setVisible({ ...visible, C: !visible.C })}
              disabled={useFileInput}
            />
            C
          </label>

          <label>
            <input
              type="checkbox"
              checked={visible.D}
              onChange={() => setVisible({ ...visible, D: !visible.D })}
              disabled={useFileInput}
            />
            D
          </label>

          <label>
            <input
              type="checkbox"
              checked={visible.D1}
              onChange={() => setVisible({ ...visible, D1: !visible.D1 })}
              disabled={useFileInput}
            />
            D1
          </label>

        </div>

        {/* RIGHT PANEL */}
        <div className="right-panel">

          {/* IF USE FILE INPUT → show this text instead of matrices */}
          {useFileInput ? (
            <div className="file-input-box">
              
              <button
                className="file-select-btn"
                onClick={() => document.getElementById("hiddenFile").click()}
              >
                Select Data File
              </button>

              <input
                id="hiddenFile"
                type="file"
                accept=".txt,.dat"
                style={{ display: "none" }}
                onChange={handleFileChoose}
              />

              <div className="file-status">
                {selectedFile ? (
                  <>Selected file: <strong>{selectedFile}</strong></>
                ) : (
                  <>No file has been selected</>
                )}
              </div>

              <div className="file-warning">
                The selected file cannot be modified after clicking OK on
                this tab. The file's first line is used to define the drawing
                of this device. If the file is modified then the user must
                reopen this data tab and click OK to validate.
              </div>

            </div>
          ) : (
            <>
              {/* ORIGINAL MATRICES (unchanged) */}
              {visible.A && (
                <div className="matrix-box">
                  <div className="matrix-title">A Matrix</div>
                  <textarea className="matrix-input" rows={4}></textarea>
                </div>
              )}
              {visible.B && (
                <div className="matrix-box">
                  <div className="matrix-title">B Matrix</div>
                  <textarea className="matrix-input" rows={4}></textarea>
                </div>
              )}
              {visible.C && (
                <div className="matrix-box">
                  <div className="matrix-title">C Matrix</div>
                  <textarea className="matrix-input" rows={4}></textarea>
                </div>
              )}
              {visible.D && (
                <div className="matrix-box">
                  <div className="matrix-title">D Matrix</div>
                  <textarea className="matrix-input" rows={4}></textarea>
                </div>
              )}
              {visible.D1 && (
                <div className="matrix-box">
                  <div className="matrix-title">D1 Matrix</div>
                  <textarea className="matrix-input" rows={4}></textarea>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* FOOTER */}
      <div className="ic-footer">
        <button className="footer-btn">OK</button>
        <button className="footer-btn">Cancel</button>
      </div>
    </div>
  );
}
