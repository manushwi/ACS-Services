import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export default function AdminDashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [approving, setApproving] = useState(null);
  const [rejecting, setRejecting] = useState(null);
  const [filter, setFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");
  const navigate = useNavigate();

  useEffect(() => {
    if (!supabase) {
      navigate("/admin/login");
      return;
    }
    let unsub = supabase.auth.onAuthStateChange((_event, session) => {
      const authed = Boolean(session);
      if (!authed) {
        navigate("/admin/login");
        return;
      }
      const run = async () => {
        try {
          const { data: rows, error: err } = await supabase
            .from("registrations")
            .select("*")
            .order("created_at", { ascending: false });
          if (err) throw err;
          setData(rows || []);
        } catch (err) {
          setError(err.message || String(err));
        } finally {
          setLoading(false);
        }
      };
      run();
    });
    return () => {
      try { unsub?.data?.subscription?.unsubscribe?.(); } catch (e) { console.error(e); }
    };
  }, [navigate]);

  useEffect(() => {
    const runCleanup = async () => {
      const now = Date.now();
      const threshold = 90 * 24 * 60 * 60 * 1000;
      const toDelete = data.filter(
        (item) =>
          (item.status || "pending") === "rejected" &&
          item.rejected_at &&
          now - new Date(item.rejected_at).getTime() > threshold
      );
      if (toDelete.length === 0) return;
      for (const item of toDelete) {
        try {
          const { error: err } = await supabase.from("registrations").delete().eq("id", item.id);
          if (!err) {
            setData((prev) => prev.filter((x) => x.id !== item.id));
          }
        } catch (e) { console.error(e); }
      }
    };
    runCleanup();
  }, [data]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-600">{error}</div>;

  const handleApprove = async (index) => {
    setApproving(index);
    try {
      const id = data[index]?.id;
      if (!id) throw new Error("Missing registration id");
      const now = new Date().toISOString();
      const { error: err } = await supabase
        .from("registrations")
        .update({ status: "approved", approved_at: now })
        .eq("id", id);
      if (err) {
        setData((prev) =>
          prev.map((item, i) => (i === index ? { ...item, status: "approved", approved_at: now } : item))
        );
      } else {
        setData((prev) =>
          prev.map((item, i) => (i === index ? { ...item, status: "approved", approved_at: now } : item))
        );
      }
      try { window.dispatchEvent(new CustomEvent("toast", { detail: { message: "Marked as approved" } })); } catch (e) { console.error(e); }
    } catch (err) {
      alert(err.message || String(err));
    } finally {
      setApproving(null);
    }
  };

  const handleReject = async (index) => {
    if (!confirm("Reject this registration?")) return;
    setRejecting(index);
    try {
      const id = data[index]?.id;
      if (!id) throw new Error("Missing registration id");
      const now = new Date().toISOString();
      const { error: err } = await supabase
        .from("registrations")
        .update({ status: "rejected", rejected_at: now })
        .eq("id", id);
      if (err) {
        setData((prev) =>
          prev.map((item, i) => (i === index ? { ...item, status: "rejected", rejected_at: now } : item))
        );
      } else {
        setData((prev) =>
          prev.map((item, i) => (i === index ? { ...item, status: "rejected", rejected_at: now } : item))
        );
      }
      try { window.dispatchEvent(new CustomEvent("toast", { detail: { message: "Marked as rejected" } })); } catch (e) { console.error(e); }
    } catch (err) {
      alert(err.message || String(err));
    } finally {
      setRejecting(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7efe5] p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-[#2b1d14]">Admin Dashboard</h1>
            <button
              className="px-3 py-1.5 rounded-md bg-[#f7efe5] text-[#2b1d14] text-xs font-semibold hover:bg-[#f7efe5]/80 border border-[#2b1d14]/20"
              onClick={() => navigate("/")}
            >
              Go to Home
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="px-3 py-1.5 rounded-md bg-[#2b1d14] text-[#f7efe5] text-xs font-semibold hover:bg-[#2b1d14]/90"
              onClick={async () => {
                await supabase.auth.signOut();
                navigate("/admin/login");
              }}
            >
              Sign Out
            </button>
          </div>
        </div>
        <p className="text-[#2b1d14]/70 mb-8">Review all registration entries.</p>
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold border ${filter === "all" ? "bg-[#2b1d14] text-[#f7efe5] border-[#2b1d14]" : "bg-[#f7efe5] text-[#2b1d14] border-[#2b1d14]/20"}`}
            >
              All Registrations
            </button>
            <button
              onClick={() => setFilter("approved")}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold border ${filter === "approved" ? "bg-[#2b1d14] text-[#f7efe5] border-[#2b1d14]" : "bg-[#f7efe5] text-[#2b1d14] border-[#2b1d14]/20"}`}
            >
              Approved
            </button>
            <button
              onClick={() => setFilter("rejected")}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold border ${filter === "rejected" ? "bg-[#2b1d14] text-[#f7efe5] border-[#2b1d14]" : "bg-[#f7efe5] text-[#2b1d14] border-[#2b1d14]/20"}`}
            >
              Rejected
            </button>
          </div>
          <div>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="px-3 py-1.5 rounded-md bg-[#f7efe5] text-[#2b1d14] text-xs font-semibold border border-[#2b1d14]/20"
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {([...data]
            .filter((item) => {
              const s = item.status || "pending";
              if (filter === "approved") return s === "approved";
              if (filter === "rejected") return s === "rejected";
              return true;
            })
            .sort((a, b) => {
              const ca = new Date(a.created_at ?? a.createdAt).getTime();
              const cb = new Date(b.created_at ?? b.createdAt).getTime();
              return sortOrder === "newest" ? cb - ca : ca - cb;
            })
          ).map((item, index) => (
            <div
              key={item.id ?? index}
              className={`rounded-2xl shadow-lg p-6 ${
                filter === "all" && (item.status || "pending") === "approved" ? "bg-green-50" : "bg-white"
              } ${filter === "all" && (item.status || "pending") === "rejected" ? "opacity-50" : ""}`}
            >
              <div className="flex items-center justify-between mb-2">
                <h2 className={`text-xl font-semibold text-[#2b1d14] ${filter === "all" && (item.status || "pending") === "rejected" ? "line-through" : ""}`}>{item.name}</h2>
                <span className="text-xs text-[#2b1d14]/60">{new Date(item.created_at ?? item.createdAt).toLocaleString()}</span>
              </div>
              <div className={`space-y-2 text-sm text-[#2b1d14] ${filter === "all" && (item.status || "pending") === "rejected" ? "line-through" : ""}`}>
                <div><span className="font-semibold">Phone:</span> {item.phone}</div>
                <div><span className="font-semibold">Date of Work:</span> {item.date}</div>
                <div><span className="font-semibold">Units:</span> {item.units}</div>
                <div><span className="font-semibold">Address:</span> {item.address}</div>
                <div><span className="font-semibold">Category:</span> {item.category}</div>
              </div>
              <div className="mt-4 flex gap-3 justify-end">
                <button
                  onClick={() => handleApprove(index)}
                  className="px-3 py-1.5 rounded-md bg-green-600 text-white text-xs font-semibold hover:bg-green-700 disabled:opacity-60"
                  disabled={approving === index || (item.status || "pending") !== "pending"}
                >
                  {approving === index
                    ? "Approving..."
                    : (item.status || "pending") === "approved"
                      ? "Approved"
                      : "Approve"}
                </button>
                <button
                  onClick={() => handleReject(index)}
                  className="px-3 py-1.5 rounded-md bg-red-500 text-white text-xs font-semibold hover:bg-red-700 disabled:opacity-60"
                  disabled={rejecting === index || (item.status || "pending") !== "pending"}
                >
                  {rejecting === index
                    ? "Rejecting..."
                    : (item.status || "pending") === "rejected"
                      ? "Rejected"
                      : "Reject"}
                </button>
              </div>
            </div>
          ))}
        </div>
        {data.length === 0 && (
          <div className="text-center text-[#2b1d14]/70 mt-10">No registrations yet.</div>
        )}
      </div>
    </div>
  );
}
