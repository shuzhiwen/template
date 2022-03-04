import React, { useMemo } from "react";

export function App() {
  const linkStyle = useMemo(() => ({
    color: "red",
    cursor: "pointer",
    width: "100%",
    height: "100%",
    display: "grid",
    placeItems: "center",
    fontSize: 20,
  }));

  return (
    <div
      onClick={() => window.open("https://www.google.com")}
      style={linkStyle}
    >
      点击跳转
    </div>
  );
}
