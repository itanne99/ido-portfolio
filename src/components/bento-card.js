import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

export default function BentoCard({ children, className = "", styleVariant = "normal" }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  let containerClasses = "relative group overflow-hidden p-8 md:p-10 rounded-3xl border transition-all duration-500 ";

  switch (styleVariant) {
    case "primary": {
      containerClasses += "bg-surface-container border-outline-variant/20 shadow-sm hover:shadow-xl";
      break;
    }
    case "high": {
      containerClasses += "bg-surface-container-high border-outline-variant/20 shadow-sm hover:shadow-xl";
      break;
    }
    case "highest": {
      containerClasses += "bg-surface-container-highest border-outline-variant/20 shadow-sm hover:shadow-xl";
      break;
    }
    case "secondary": {
      containerClasses += "bg-secondary-container text-on-secondary-container border-transparent shadow-sm hover:shadow-xl";
      break;
    }
    default: {
      containerClasses += "bg-surface-container-low border-outline-variant/20 shadow-sm hover:shadow-xl";
      break;
    }
  }

  // Choose a subtle glow color based on the variant
  const glowColor = styleVariant === "secondary" 
    ? "rgba(92, 97, 77, 0.15)" // Olive Green shade
    : "rgba(217, 119, 87, 0.1)";  // Terracotta shade

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      className={`${containerClasses} ${className}`}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      {/* Dynamic radial glow overlay */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              300px circle at ${mouseX}px ${mouseY}px,
              ${glowColor},
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative z-10 h-full flex flex-col justify-between">
        {children}
      </div>
    </motion.div>
  );
}
