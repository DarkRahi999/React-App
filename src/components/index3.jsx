import React, { useState, useEffect, useRef } from "react";

export default function FullWidthSorry() {
  const totalMiniSorry = 50;
  const maxVisibleMiniSorry = 15;
  const emojis = ["❤️", "🥺", "🙏", "😔", "💔"];

  const [miniSorryPool] = useState(() => {
    const arr = [];
    const width = window.innerWidth;
    const height = window.innerHeight;
    for (let i = 0; i < totalMiniSorry; i++) {
      arr.push({
        id: i,
        left: Math.random() * width,
        top: Math.random() * height,
        size: 0.8 + Math.random() * 0.7,
        rotate: Math.random() * 40 - 20,
        emoji: emojis[i % emojis.length],
        fadeDelay: Math.random() * 7000,
      });
    }
    return arr;
  });

  const [visibleMiniSorry, setVisibleMiniSorry] = useState([]);
  const [showFinalBatch, setShowFinalBatch] = useState(false);
  const [showMainSorry, setShowMainSorry] = useState(true);
  const [showFinalMessage, setShowFinalMessage] = useState(false);

  const timers = useRef([]);

  const startAnimation = () => {
    if (timers.current.length) return;

    setVisibleMiniSorry(
      miniSorryPool
        .sort(() => 0.5 - Math.random())
        .slice(0, maxVisibleMiniSorry)
        .map((s) => s.id)
    );
    setShowMainSorry(true);
    setShowFinalBatch(false);
    setShowFinalMessage(false);

    const t1 = setTimeout(() => {
      setVisibleMiniSorry([]);
      setShowFinalBatch(true);
    }, 14000);

    const t2 = setTimeout(() => {
      setShowMainSorry(false);
      setShowFinalBatch(false);
    }, 21000);

    const t3 = setTimeout(() => {
      setShowFinalMessage(true);
    }, 22000);

    const t4 = setTimeout(() => {
      setVisibleMiniSorry([]);
      setShowFinalBatch(false);
      setShowMainSorry(true);
      setShowFinalMessage(false);
      timers.current = [];
    }, 60000);

    timers.current.push(t1, t2, t3, t4);
  };

  useEffect(() => {
    return () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
  }, []);

  const finalBatchCount = 15;
  const centerX = window.innerWidth / 2;
  const finalBatchStartY = window.innerHeight / 2 - 160;
  const spacingX = 50;

  const finalBatch = Array.from({ length: finalBatchCount }, (_, i) => {
    const angle = (Math.PI / (finalBatchCount - 1)) * i - Math.PI / 2;
    return {
      id: i,
      left: centerX + spacingX * Math.cos(angle) - 25,
      top: finalBatchStartY + spacingX * Math.sin(angle) - 40,
      size: 1.1,
      emoji: emojis[i % emojis.length],
      rotate: Math.random() * 20 - 10,
      delay: i * 200,
    };
  });

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        position: "relative",
        background:
          "linear-gradient(135deg, #fef3f2 0%, #fee2e2 50%, #fecaca 100%)",
        overflow: "hidden",
        userSelect: "none",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      {/* Main Sorry */}
      {showMainSorry && !showFinalMessage && (
        <div
          onClick={startAnimation}
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            cursor: timers.current.length ? "default" : "pointer",
            fontSize: "4rem",
            fontWeight: "800",
            color: "#b91c1c",
            textShadow: "0 2px 6px rgba(0,0,0,0.2)",
            userSelect: "none",
            zIndex: 20,
            textAlign: "center",
            padding: "0 1rem",
            opacity: showFinalBatch ? 0 : 1,
            transition: "opacity 7s ease",
          }}
          title={timers.current.length ? "Animation running" : "Click to start Sorry animation"}
        >
          Sorry
        </div>
      )}

      {/* Mini Sorry fullscreen fading */}
      {visibleMiniSorry.length > 0 &&
        visibleMiniSorry.map((id) => {
          const s = miniSorryPool.find((x) => x.id === id);
          if (!s) return null;
          return (
            <span
              key={id}
              style={{
                position: "fixed",
                left: s.left,
                top: s.top,
                fontSize: `${s.size}rem`,
                color: "#991b1b",
                fontWeight: "600",
                userSelect: "none",
                whiteSpace: "nowrap",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                opacity: 1,
                animation: `fadeInOut 14s ease-in-out infinite`,
                animationDelay: `${s.fadeDelay}ms`,
                pointerEvents: "none",
                transform: `rotate(${s.rotate}deg)`,
                zIndex: 10,
              }}
              aria-hidden="true"
            >
              Sorry <span>{s.emoji}</span>
            </span>
          );
        })}

      {/* Final batch near main Sorry */}
      {showFinalBatch &&
        finalBatch.map(({ id, left, top, size, emoji, rotate, delay }) => (
          <span
            key={"final-" + id}
            style={{
              position: "fixed",
              left,
              top,
              fontSize: `${size}rem`,
              color: "#b91c1c",
              fontWeight: "700",
              userSelect: "none",
              whiteSpace: "nowrap",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              pointerEvents: "none",
              opacity: 1,
              animation: `fallFade 7s ease forwards`,
              animationDelay: `${delay}ms`,
              transform: `rotate(${rotate}deg)`,
              zIndex: 15,
              filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.15))",
            }}
            aria-hidden="true"
          >
            Sorry <span>{emoji}</span>
          </span>
        ))}

      {/* Final message */}
      {showFinalMessage && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "2.5rem",
            fontWeight: "bold",
            color: "#b91c1c",
            userSelect: "none",
            textAlign: "center",
            opacity: 1,
            animation: "fadeInMessage 3s ease forwards",
            zIndex: 25,
            padding: "0 1rem",
          }}
        >
          Thank you for your patience ❤️
        </div>
      )}

      <style>{`
        @keyframes fadeInOut {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }
        @keyframes fallFade {
          0% {
            opacity: 0;
            transform: translateY(-100px) rotate(0deg);
          }
          50% {
            opacity: 1;
            transform: translateY(0) rotate(10deg);
          }
          100% {
            opacity: 0;
            transform: translateY(150px) rotate(20deg);
          }
        }
        @keyframes fadeInMessage {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @media (max-width: 600px) {
          div[style*='font-size: 4rem'] {
            font-size: 3rem !important;
          }
          span {
            font-size: 0.9rem !important;
            gap: 3px !important;
          }
          div[style*='font-size: 2.5rem'] {
            font-size: 1.8rem !important;
          }
        }
      `}</style>
    </div>
  );
}
