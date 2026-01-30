import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (!supabase) {
        throw new Error("Supabase not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.");
      }
      const { data, error: err } = await supabase.auth.signInWithPassword({ email, password });
      if (err) throw err;
      if (data?.session) {
        navigate("/admin");
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (err) {
      setError(err.message || String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7efe5] relative">
      {/* Back button */}
      <button
        type="button"
        onClick={() => navigate("/")}
        className="absolute top-4 left-4 px-3 py-1.5 rounded-md bg-[#2b1d14] text-[#f7efe5] text-xs font-semibold hover:bg-[#2b1d14]/90"
      >
        ← Back
      </button>
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
        <h1 className="text-2xl font-bold text-center text-[#2b1d14] mb-2">Admin Login</h1>
        <p className="text-center text-[#2b1d14]/70 mb-6">This area is for administrators only.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Admin email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-12 rounded-xl bg-[#f7efe5] px-4 text-[#2b1d14] placeholder:text-[#2b1d14]/50 outline-none focus:ring-2 focus:ring-[#b8956a]"
            required
          />
          <input
            type="password"
            placeholder="Admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-12 rounded-xl bg-[#f7efe5] px-4 text-[#2b1d14] placeholder:text-[#2b1d14]/50 outline-none focus:ring-2 focus:ring-[#b8956a]"
            required
          />
          {error && (
            <div className="text-red-600 text-sm">{error}</div>
          )}
          <button
            type="submit"
            className="w-full h-12 rounded-xl bg-[#2b1d14] text-[#f7efe5] font-semibold hover:bg-[#2b1d14]/90 transition disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}