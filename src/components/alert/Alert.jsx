import React, { useState, useEffect } from "react";

const Alert = ({ message, type, duration }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => setVisible(false), duration);
      return () => clearTimeout(timer);
    }
  }, [duration]);

  if (!visible) return null;

  const alertStyles = {
    success: "bg-green-500",
    error: "bg-red-500",
    warning: "bg-yellow-500",
    info: "bg-blue-500",
  };

  return (
    <div
      className={`fixed top-[60px] sm:top-[72px] left-0 right-0 p-4 text-white  sm:px-20 text-base sm:text-xl sm:font-semibold ${alertStyles[type]}`}
    >
      {message}!
    </div>
  );
};

export default Alert;
