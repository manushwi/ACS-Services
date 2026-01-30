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
      category: serviceName,
    };

    try {
      if (!supabase) {
        throw new Error("Supabase not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.");
      }
      
      console.log("Starting submission with payload:", payload);
      
      // Insert the registration data
      const { data: insertData, error: insertError } = await supabase
        .from("registrations")
        .insert({
          name: payload.name,
          phone: payload.phone,
          date: payload.date,
          units: payload.units,
          address: payload.address,
          category: payload.category,
        })
        .select();
      
      if (insertError) {
        console.error("Insert error:", insertError);
        throw insertError;
      }
      
      console.log("Data inserted successfully:", insertData);

      // Call Edge Function - using direct fetch with proper headers
      console.log("Attempting to invoke Edge Function...");
      
      const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/notify-registration`;
      const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      
      console.log("Calling Edge Function at:", url);
      
      const headers = {
        "Content-Type": "application/json",
        "apikey": anonKey,
        "Authorization": `Bearer ${anonKey}`,
      };
      
      const res = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
      });
      
      console.log("Edge function response status:", res.status);
      
      if (res.ok) {
        const responseData = await res.json();
        console.log("Edge function success:", responseData);
        
        // Show success toast
        window.dispatchEvent(
          new CustomEvent("toast", { 
            detail: { message: "Thanks for registering! You'll receive a confirmation soon." } 
          })
        );
        onOpenChange(false);
      } else {
        const errorText = await res.text();
        console.error("Edge function failed:", errorText);
        
        // Still close the form since data was saved
        window.dispatchEvent(
          new CustomEvent("toast", { 
            detail: { message: "Registration saved! (Notification may be delayed)" } 
          })
        );
        onOpenChange(false);
      }
      
    } catch (error) {
      console.error("Submission failed:", error);
      try {
        window.dispatchEvent(
          new CustomEvent("toast", { 
            detail: { 
              message: error.message || "Submission failed. Please try again." 
            } 
          })
        );
      } catch (e) { 
        console.error(e); 
      }
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
          <div>
            <label className="block text-sm font-semibold text-[#2b1d14] mb-2">
              Date of Work
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              className="w-full h-12 rounded-xl bg-[#f7efe5] px-4 text-[#2b1d14] outline-none focus:ring-2 focus:ring-[#b8956a]"
              required
            />
          </div>

          {/* Units or Area */}
          <div>
            <label className="block text-sm font-semibold text-[#2b1d14] mb-2">
              {serviceName?.toLowerCase() === "sofa cleaning" ? "Units" : "Area (sq.ft)"}
            </label>
            <input
              type="number"
              placeholder={serviceName?.toLowerCase() === "sofa cleaning" ? "Enter number of units" : "Enter area in square feet"}
              value={formData.units}
              onChange={(e) =>
                setFormData({ ...formData, units: e.target.value })
              }
              min={1}
              step={serviceName?.toLowerCase() === "sofa cleaning" ? 1 : 0.1}
              className="w-full h-12 rounded-xl bg-[#f7efe5] px-4 text-[#2b1d14] placeholder:text-[#2b1d14]/50 outline-none focus:ring-2 focus:ring-[#b8956a]"
              required
            />
          </div>

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