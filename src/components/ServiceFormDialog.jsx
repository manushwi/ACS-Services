import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

const ServiceFormDialog = ({ open, onOpenChange, serviceName }) => {

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    units: "",
    address: "",
  });

  useEffect(() => {
    if (!open) {
      setFormData({
        name: "",
        phone: "",
        date: "",
        units: "",
        address: "",
      });
    }
    // Notify navbar to adjust z-index while modal is open
    try {
      window.dispatchEvent(new CustomEvent("modalOpen", { detail: { open } }));
    } catch (e) { console.error(e); }
  }, [open]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      category: serviceName, // 🔥 auto from card
    };

    try {
      if (!supabase) {
        throw new Error("Supabase not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.");
      }
      const { error } = await supabase.from("registrations").insert({
        name: payload.name,
        phone: payload.phone,
        date: payload.date,
        units: payload.units,
        address: payload.address,
        category: payload.category,
      });
      if (error) throw error;
      // Show global toast
      window.dispatchEvent(
        new CustomEvent("toast", { detail: { message: "Thanks for registering" } })
      );
      onOpenChange(false);
    } catch (error) {
      console.error("Submission failed:", error);
      try {
        window.dispatchEvent(new CustomEvent("toast", { detail: { message: error.message || "Submission failed" } }));
      } catch (e) { console.error(e); }
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => onOpenChange(false)}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md rounded-3xl bg-[#d6b48c] p-8 shadow-2xl">
        <h2 className="text-2xl font-bold text-center text-[#2b1d14] mb-6">
          Request {serviceName}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <input
            type="text"
            placeholder="Your Name"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            className="w-full h-12 rounded-xl bg-[#f7efe5] px-4 text-[#2b1d14] placeholder:text-[#2b1d14]/50 outline-none focus:ring-2 focus:ring-[#b8956a]"
            required
          />

          {/* Phone */}
          <input
            type="tel"
            placeholder="Phone (91XXXXXXXXXX)"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            className="w-full h-12 rounded-xl bg-[#f7efe5] px-4 text-[#2b1d14] placeholder:text-[#2b1d14]/50 outline-none focus:ring-2 focus:ring-[#b8956a]"
            required
          />

          {/* Date of Work */}
          <input
            type="date"
            value={formData.date}
            placeholder="Date of Work"
            onChange={(e) =>
              setFormData({ ...formData, date: e.target.value })
            }
            className="w-full h-12 rounded-xl bg-[#f7efe5] px-4 text-[#2b1d14] outline-none placeholder:text-[#2b1d14]/50 focus:ring-2 focus:ring-[#b8956a]"
            required
          />

          {/* Units */}
          <input
            type="number"
            placeholder="Units / Sq.ft"
            value={formData.units}
            onChange={(e) =>
              setFormData({ ...formData, units: e.target.value })
            }
            className="w-full h-12 rounded-xl bg-[#f7efe5] px-4 text-[#2b1d14] placeholder:text-[#2b1d14]/50 outline-none focus:ring-2 focus:ring-[#b8956a]"
            required
          />

          {/* Address */}
          <textarea
            placeholder="Address of work"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            className="w-full min-h-[100px] resize-none rounded-xl bg-[#f7efe5] px-4 py-3 text-[#2b1d14] placeholder:text-[#2b1d14]/50 outline-none focus:ring-2 focus:ring-[#b8956a]"
            required
          />

          {/* Submit */}
          <button
            type="submit"
            className="w-full h-12 rounded-xl bg-[#2b1d14] text-[#f7efe5] font-semibold hover:bg-[#2b1d14]/90 transition"
          >
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default ServiceFormDialog;
