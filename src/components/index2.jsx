import React, { useState } from "react";

export default function MafKor() {
  const [showMsg, setShowMsg] = useState(false);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        background:
          "linear-gradient(135deg, #fce7f3 0%, #fbcfe8 50%, #f9a8d4 100%)",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        userSelect: "none",
        padding: "1rem",
      }}
      onClick={() => setShowMsg(true)}
      title="Click here to say sorry"
    >
      <div
        style={{
          fontSize: "4rem",
          fontWeight: "700",
          color: "#be185d",
          cursor: "pointer",
          userSelect: "none",
          textShadow: "0 2px 6px rgba(0,0,0,0.2)",
          transition: "transform 0.2s ease",
        }}
        onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.95)")}
        onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        Maf Koro 💖
      </div>

      {showMsg && (
        <div
          style={{
            marginTop: "20px",
            fontSize: "1.5rem",
            color: "#831843",
            fontWeight: "600",
            textAlign: "center",
            maxWidth: "300px",
            animation: "fadeIn 2s ease forwards",
            opacity: 0,
          }}
          className="fade-msg"
        >
          Ami khub dukkhito, tmk kosto dite chai ni. Please amake maf koro 💕
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
