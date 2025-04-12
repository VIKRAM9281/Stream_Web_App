// src/components/MyVideoUI.jsx
import React from "react";
import { Call } from "@stream-io/video-react-sdk";

const MyVideoUI = ({ call }) => {
  const handleEndCall = async () => {
    try {
      await call.leave();
      console.log("Call ended successfully.");
      // Optionally: redirect or show message
    } catch (err) {
      console.error("Failed to leave call:", err);
    }
  };

  return (
    <div style={{ position: "absolute", top: 20, right: 20, zIndex: 1000 }}>
      <button
        onClick={handleEndCall}
        style={{
          padding: "10px 15px",
          background: "red",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        End Call
      </button>
    </div>
  );
};

export default MyVideoUI;
