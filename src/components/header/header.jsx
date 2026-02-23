import React from "react";
import "./header.css";

const Header = () => {
  return (
    <header className="app-header">
      <h1 className="app-title">🌤 SkyCast Weather</h1>
      <p className="app-subtitle">
        Real-time weather forecasts powered by OpenWeather API
      </p>
    </header>
  );
};

export default Header;