import { useState } from "react";
import "./ICWindow.css";

export default function ICWindow({ onClose }) {
  const [visible, setVisible] = useState({
    A: true,
    B: true,
    C: true,
    D: true,
    D1: true,
  });

  return (
    <div className="ic-window">
      <div className="ic-header">
        <span>Initial Conditions</span>
        <button className="close-btn" onClick={onClose}>X</button>
      </div>

      <div className="ic-content">

        <div className="left-panel">
          <label>
            <input
              type="checkbox"
              checked={visible.A}
              onChange={() => setVisible({ ...visible, A: !visible.A })}
            />
            A
          </label>

          <label>
            <input
              type="checkbox"
              checked={visible.B}
              onChange={() => setVisible({ ...visible, B: !visible.B })}
            />
            B
          </label>

          <label>
            <input
              type="checkbox"
              checked={visible.C}
              onChange={() => setVisible({ ...visible, C: !visible.C })}
            />
            C
          </label>

          <label>
            <input
              type="checkbox"
              checked={visible.D}
              onChange={() => setVisible({ ...visible, D: !visible.D })}
            />
            D
          </label>

          <label>
            <input
              type="checkbox"
              checked={visible.D1}
              onChange={() => setVisible({ ...visible, D1: !visible.D1 })}
            />
            D1
          </label>
        </div>

        <div className="right-panel">
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

        </div>
      </div>

      <div className="ic-footer">
        <button className="footer-btn">OK</button>
        <button className="footer-btn">Cancel</button>
      </div>
    </div>
  );
}