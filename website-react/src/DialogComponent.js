import React, { useState } from "react";

export default function DialogComponent() {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <button onClick={() => setVisible(true)}>Click Here</button>

      {visible && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "1rem",
              borderRadius: "8px",
              width: "80%",
              maxWidth: "400px",
            }}
          >
            <h1>Click Here</h1>
            <p>We are happy to host you here on our doctors website.</p>
            <button onClick={() => setVisible(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
