import { motion } from "framer-motion";

export default function Preloader({ onFinish }) {
  return (
    <>
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-gray-950 via-black to-gray-900 overflow-hidden"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Animated Background Elements */}
        
        {/* Radial gradient glow */}
        <motion.div 
          className="absolute inset-0 bg-gradient-radial from-[#C6AC8F]/10 via-transparent to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
        
        {/* Floating orbs */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#C6AC8F]/5 rounded-full blur-3xl"
          animate={{ 
            x: [0, 30, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-yellow-500/5 rounded-full blur-3xl"
          animate={{ 
            x: [0, -40, 0],
            y: [0, 40, 0],
            scale: [1, 1.15, 1]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div 
          className="absolute top-1/3 right-1/3 w-64 h-64 bg-[#C6AC8F]/5 rounded-full blur-3xl"
          animate={{ 
            x: [0, 20, 0],
            y: [0, 30, 0],
            scale: [1, 1.08, 1]
          }}
          transition={{ 
            duration: 7, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Grid pattern overlay */}
        <motion.div 
          className="absolute inset-0 opacity-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1.5 }}
        >
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(212, 175, 55, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(212, 175, 55, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}></div>
        </motion.div>
        
        {/* Scanline effect */}
        <motion.div 
          className="absolute inset-0 opacity-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          transition={{ duration: 1 }}
        >
          <motion.div 
            className="absolute inset-0 bg-gradient-to-b from-transparent via-[#C6AC8F] to-transparent h-32"
            animate={{ y: ['-100%', '100vh'] }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </motion.div>
        
        {/* Animated particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#C6AC8F]/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Corner decorative elements with animation */}
        <motion.div 
          className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-[#C6AC8F]/20"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
        <motion.div 
          className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-[#C6AC8F]/20"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 w-32 h-32 border-b-2 border-l-2 border-[#C6AC8F]/20"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        />
        <motion.div 
          className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-[#C6AC8F]/20"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        />
        
        
        {/* Pulsing glow behind ring */}
        <motion.div
          className="absolute w-64 h-64 bg-[#C6AC8F]/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Ring */}
        <motion.img
          src="/ring.png" // put your ring image in public/
          alt="ornamental ring"
          className="absolute h-auto w-auto z-10"
          initial={{ scale: 10, rotate: 0 }}
          animate={{
            scale: 1,
            rotate: 70,
          }}
          transition={{
            duration: 1.5,
            ease: "easeOut",
          }}
        />
        
        {/* Logo text */}
        <motion.img
          src="/logotext.png" // put your text image in public/
          alt="logo text"
          className="absolute h-auto w-auto z-20"
          initial={{ scale: 0.2, opacity: 0, rotate: 70 }}
          animate={{
            scale: [0.2, 1, 20],
            opacity: [0, 1, 1],
            rotate: [70, 0, 0]
          }}
          transition={{
            times: [0, 0.5, 1],
            duration: 1.3,
            delay: 0.8,
            ease: "easeIn",
          }}
          onAnimationComplete={() => {
            if (onFinish) onFinish();
          }}
        />
        
        {/* Progress dots below */}
        <motion.div 
          className="absolute bottom-32 flex gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-[#C6AC8F]/40 rounded-full"
              animate={{
                y: [0, -10, 0],
                opacity: [0.4, 1, 0.4]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>
        
        {/* Loading text */}
        <motion.div 
          className="absolute bottom-20 text-[#C6AC8F]/60 text-sm font-light tracking-widest"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          LOADING...
        </motion.div>
      </motion.div>
      
      {/* Bottom decorative line */}
      <motion.div 
        className="fixed bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C6AC8F]/30 to-transparent z-[9999]"
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      />

      <style jsx>{`
        .bg-gradient-radial {
          background: radial-gradient(circle at center, var(--tw-gradient-stops));
        }
      `}</style>
    </>
  );
}