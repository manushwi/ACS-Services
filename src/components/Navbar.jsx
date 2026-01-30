import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  useScroll,
  useMotionValueEvent,
  motion,
} from "framer-motion";

const MotionDiv = motion.div;
const navItems = [
  { name: "Services", link: "#services" },
  { name: "Pricing", link: "#pricing" },
  { name: "Gallery", link: "/gallery" },
];

const services = [
  "Marble Polishing",
  "Facade Cleaning",
  "Sofa Cleaning",
  "Carpet Cleaning",
  "Floor Scrubbing",
  "Tile & Grout Cleaning",
];

const Navbar = () => {
  const { scrollYProgress } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [chooseOpen, setChooseOpen] = useState(false);
  const [active, setActive] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      if (scrollYProgress.get() < 0.05) {
        setScrolled(false);
      } else {
        setScrolled(true);
      }
    }
  });
  useEffect(() => {
    const handler = (e) => setModalOpen(Boolean(e?.detail?.open));
    window.addEventListener("modalOpen", handler);
    return () => window.removeEventListener("modalOpen", handler);
  }, []);
  return (
    <>
      <header
        className={`fixed top-6 inset-x-0 ${modalOpen ? "z-40" : "z-[5000]"} flex justify-center`}
      >
        <div
          className={`
            flex items-center justify-between gap-10
            px-6 py-3
            rounded-full
            bg-[#0A0908]/70 backdrop-blur-xl
            border border-white/10
            shadow-lg
            transition-all duration-300
            ${scrolled ? "w-[92%] max-w-6xl" : "w-[85%] max-w-5xl"}
          `}
        >
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center">
              <img src="/logo.png" alt="" />
            </div>
            <span className="w-10 h-10 flex justify-center items-center font-semibold text-base h">
              <img src="/logotext.png" alt="" />
            </span>
          </a>

          {/* Nav Links */}
          <nav
            className="relative hidden md:flex items-center gap-2 px-2 py-1 rounded-full"
            onMouseLeave={() => setActive(null)}
          >
            {active && (
              <MotionDiv
                className="absolute inset-y-1 rounded-full bg-[#C6AC8F]"
                layout
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                style={{
                  left: active.left,
                  width: active.width,
                }}
              />
            )}
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.link}
                onClick={(e) => {
                  if (item.link.startsWith("#")) {
                    e.preventDefault();
                    const id = item.link.slice(1);
                    if (location.pathname !== "/") {
                      navigate("/");
                      setTimeout(() => {
                        try {
                          const el = document.querySelector(`#${id}`);
                          el?.scrollIntoView({ behavior: "smooth", block: "start" });
                        } catch (e) { console.error(e); }
                      }, 50);
                    } else {
                      try {
                        const el = document.querySelector(`#${id}`);
                        el?.scrollIntoView({ behavior: "smooth", block: "start" });
                      } catch (e) { console.error(e); }
                    }
                  } else if (item.link.startsWith("/")) {
                    e.preventDefault();
                    navigate(item.link);
                  }
                }}
                onMouseEnter={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const parent = e.currentTarget.parentElement.getBoundingClientRect();
                  setActive({
                    left: rect.left - parent.left,
                    width: rect.width,
                  });
                }}
                className="relative z-10 px-6 py-2 text-sm font-medium text-zinc-300 hover:text-[#0A0908] transition-colors"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/admin/login")}
              className="text-sm font-medium text-white hover:text-zinc-300 transition hidden sm:block"
              title="Admins only"
            >
              Login
            </button>

            <button
              onClick={() => {
                setChooseOpen(true);
                try { window.dispatchEvent(new CustomEvent("modalOpen", { detail: { open: true } })); } catch (e) { console.error(e); }
              }}
              className="px-5 py-2 rounded-full bg-[#C6AC8F] text-black text-sm font-semibold"
            >
              Book a call
            </button>
          </div>
        </div>
      </header>
    {chooseOpen && (
      <div className="fixed inset-0 z-[6000] flex items-center justify-center">
        <div className="absolute inset-0 bg-black/50" onClick={() => { setChooseOpen(false); try { window.dispatchEvent(new CustomEvent("modalOpen", { detail: { open: false } })); } catch (e) { console.error(e); } }} />
        <div className="relative z-10 w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
          <div className="text-lg font-semibold text-[#2b1d14] mb-4">To book a call first select a service</div>
          <div className="grid grid-cols-1 gap-2 mb-4">
            {services.map((svc) => (
              <button
                key={svc}
                onClick={() => {
                  setChooseOpen(false);
                  try {
                    window.dispatchEvent(new CustomEvent("modalOpen", { detail: { open: false } }));
                    window.dispatchEvent(new CustomEvent("toast", { detail: { message: `Selected: ${svc}` } }));
                  } catch (e) { console.error(e); }
                  navigate("/");
                  setTimeout(() => {
                    try {
                      const el = document.querySelector("#pricing");
                      el?.scrollIntoView({ behavior: "smooth", block: "start" });
                    } catch (e) { console.error(e); }
                  }, 50);
                }}
                className="px-4 py-2 rounded-lg bg-[#f7efe5] text-[#2b1d14] text-sm border border-[#2b1d14]/20 hover:bg-[#f7efe5]/80 text-left"
              >
                {svc}
              </button>
            ))}
          </div>
          <button
            onClick={() => {
              setChooseOpen(false);
              try { window.dispatchEvent(new CustomEvent("modalOpen", { detail: { open: false } })); } catch (e) { console.error(e); }
            }}
            className="w-full px-4 py-2 rounded-lg bg-[#2b1d14] text-[#f7efe5] text-sm font-semibold hover:bg-[#2b1d14]/90"
          >
            Close
          </button>
        </div>
      </div>
    )}
    </>
  );
};

export default Navbar;
