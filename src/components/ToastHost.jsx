import { useEffect, useState } from "react";

const ToastHost = () => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const handler = (e) => {
      const msg = e?.detail?.message || "Thanks for registering";
      setMessage(msg);
      setVisible(true);

      // Play a short beep sound using Web Audio API
      try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.value = 880; // A5 tone
        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.1, ctx.currentTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
        osc.connect(gain).connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.25);
      } catch (e) { console.error(e); }

      // Auto-hide after 3 seconds
      setTimeout(() => setVisible(false), 3000);
    };
    window.addEventListener("toast", handler);
    return () => window.removeEventListener("toast", handler);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <div className="rounded-xl shadow-lg px-5 py-3 bg-[#2b1d14] text-[#f7efe5]">
        {message}
      </div>
    </div>
  );
};

export default ToastHost;
