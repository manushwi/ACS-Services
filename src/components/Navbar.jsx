import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";

const navItems = [
  { name: "Services", link: "#features" },
  { name: "Pricing", link: "#pricing" },
  { name: "Contact", link: "#contact" },
];

const Navbar = () => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const direction = current - (scrollYProgress.getPrevious() ?? 0);

      if (scrollYProgress.get() < 0.05) {
        setVisible(true);
        setScrolled(false);
      } else {
        setScrolled(true);
        setVisible(direction < 0);
      }
    }
  });
const [active, setActive] = useState(null);
  return (
    <AnimatePresence>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: visible ? 0 : -80, opacity: visible ? 1 : 0 }}
        exit={{ y: -80, opacity: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="fixed top-6 inset-x-0 z-[5000] flex justify-center"
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
      {/* Floating pill */}
      {active && (
        <motion.div
          className="absolute inset-y-1 rounded-full bg-[#C6AC8F]"
          layout
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 30,
          }}
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
            <button className="text-sm font-medium text-white hover:text-zinc-300 transition hidden sm:block">
              Login
            </button>

            <button className="px-5 py-2 rounded-full bg-[#C6AC8F] text-black text-sm font-semibold">
              Book a call
            </button>
          </div>
        </div>
      </motion.header>
    </AnimatePresence>
  );
};

export default Navbar;
