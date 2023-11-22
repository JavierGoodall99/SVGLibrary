"use client";

// pages/embed-widget.tsx
import React, { useEffect } from "react";

const EmbedWidget: React.FC = () => {
  useEffect(() => {
    // Load the widget.js script dynamically
    const script = document.createElement("script");
    script.src = "/widget.js";
    script.defer = true;
    document.body.appendChild(script);

    

    return () => {
      // Clean up the script tag when the component unmounts
      document.body.removeChild(script);
    };
  }, []);

  return <div id="widgetContainer"></div>;
};

export default EmbedWidget;
