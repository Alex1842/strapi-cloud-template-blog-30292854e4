import React, { useState, useEffect } from "react";

const DeployButton = () => {
  const [progress, setProgress] = useState<number | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (progress === null) return;

    let value = progress;
    const timer = setInterval(() => {
      value += Math.random() * 2;
      if (value >= 100) {
        value = 100;
        clearInterval(timer);
        setDone(true);
        setTimeout(() => {
          setProgress(null);
          setDone(false);
        }, 5000);
      }
      setProgress(value);
    }, 1000);

    return () => clearInterval(timer);
  }, [progress]);

  const handleClick = async () => {
    setProgress(0);
    try {
      await fetch("/api/github-trigger", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
    } catch {
      setProgress(null);
      setDone(true);
    }
  };

  return (
    <div style={{ display: "inline-block" }}>
      <button
        style={{
          padding: "0px 1rem",
          height: "32px",
          border: "1px solid rgb(73, 69, 255)",
          background: "rgb(73, 69, 255)",
          color: "#fff",
          borderRadius: "4px",
          cursor: "pointer",
          fontWeight: 600,
          fontSize: "1.2rem",
        }}
        onClick={handleClick}
      >
        🚀 Publish to the Site 🚀
      </button>

      {progress !== null && (
        <div
          style={{
            marginTop: "0.5rem",
            width: "601px",
            height: "18px",
            borderRadius: "10px",
            overflow: "hidden",
            background: "rgba(0, 0, 0, 0.1)",
            boxShadow: "0 0 10px rgba(73, 69, 255, 0.6)",
            position: "absolute",
            top: "61px",
            right: "240px",
            maxWidth: "23vw",
            animation: done ? "fadeout 5s forwards" : "none",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${progress}%`,
              background:
                "linear-gradient(90deg, rgb(73, 69, 255), rgb(127, 125, 255), rgb(184, 183, 255))",
              transition: "width 0.3s",
              boxShadow: "0 0 15px rgba(127, 125, 255, 0.8)",
            }}
          />
          <span
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontSize: "1rem",
              fontWeight: 600,
              color: "#fff",
              textShadow: "0 0 4px rgba(0,0,0,0.6)",
            }}
          >
            {Math.floor(progress)}%
          </span>
        </div>
      )}

      {done && (
        <div
          style={{
            position: "absolute",
            top: "90px",
            right: "240px",
            padding: "0.4rem 0.8rem",
            borderRadius: "8px",
            background: "rgba(73, 69, 255, 0.9)",
            color: "#fff",
            fontSize: "0.9rem",
            fontWeight: 600,
            opacity: 1,
            animation: "fadeout 5s forwards",
          }}
        >
          ✅ Deploy complete!
        </div>
      )}

      <style>
        {`
          @keyframes fadeout {
            0% { opacity: 1; }
            80% { opacity: 1; }
            100% { opacity: 0; }
          }
        `}
      </style>
    </div>
  );
};

export default {
  register(app) {
    app.getPlugin("content-manager").injectComponent("listView", "actions", {
      name: "DeployButton",
      Component: DeployButton,
    });
  },
};
