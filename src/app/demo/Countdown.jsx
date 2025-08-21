import { useState, useEffect } from "react";

export default function CountdownLoader() {
  const [timeLeft, setTimeLeft] = useState(90);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer); 
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <div className="loader mb-4 w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      <p className="text-lg font-semibold">... {formatTime(timeLeft)}</p>
    </div>
  );
}
