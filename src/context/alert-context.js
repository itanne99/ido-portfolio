import React, { createContext, useContext, useState, useCallback, useEffect, useMemo, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import CustomAlert from "@/components/custom-alert";

const AlertContext = createContext(undefined);

function ToastWrapper({ alert, y, scale, opacity, zIndex, onHeightChange, children }) {
  const reference = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (reference.current && onHeightChange) {
      const measure = () => {
        if (reference.current) {
          onHeightChange(alert.id, reference.current.offsetHeight);
        }
      };
      measure();

      const observer = new ResizeObserver(measure);
      observer.observe(reference.current);
      return () => {
        observer.disconnect();
        onHeightChange(alert.id);
      };
    }
  }, [alert.id, onHeightChange]);

  return (
    <motion.div
      ref={reference}
      style={{
        position: "absolute",
        bottom: 0,
        right: 0,
        width: "100%",
        pointerEvents: "auto",
        zIndex,
      }}
      initial={{ 
        opacity: 0, 
        y: shouldReduceMotion ? 0 : 50, 
        scale: shouldReduceMotion ? 1 : 0.9 
      }}
      animate={{ 
        y, 
        scale, 
        opacity,
      }}
      exit={{ 
        opacity: 0, 
        y: shouldReduceMotion ? 0 : 15,
        scale: 0.9,
        transition: { duration: 0.15, ease: "easeIn" } 
      }}
      transition={
        shouldReduceMotion 
          ? { duration: 0.2 } 
          : { type: "spring", stiffness: 350, damping: 25 }
      }
    >
      {children}
    </motion.div>
  );
}

export function AlertProvider({ children }) {
  const [alerts, setAlerts] = useState([]);
  const [toastHeights, setToastHeights] = useState({});
  const [viewportHeight, setViewportHeight] = useState(800);
  const [isHovered, setIsHovered] = useState(false);

  // Sync viewport height on resize
  useEffect(() => {
    if (globalThis.window === undefined) return;
    const handleResize = () => setViewportHeight(window.innerHeight);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleHeightChange = useCallback((id, height) => {
    setToastHeights((previous) => {
      if (height === undefined) {
        if (!(id in previous)) return previous;
        const copy = { ...previous };
        delete copy[id];
        return copy;
      }
      if (previous[id] === height) return previous;
      return { ...previous, [id]: height };
    });
  }, []);

  const dismissAlert = useCallback((id) => {
    setAlerts((previous) => previous.filter((alert) => alert.id !== id));
  }, []);

  const showAlert = useCallback((message, options = {}) => {
    const id = Math.random().toString(36).slice(2, 9);
    const newAlert = {
      id,
      message,
      type: options.type || "info",
      title: options.title,
      duration: options.duration === undefined ? 5000 : options.duration,
      action: options.action,
    };

    setAlerts((previous) => [...previous, newAlert]);
    return id;
  }, []);

  // Compute positions, scale, opacity and z-indices for stacking
  const alertStyles = useMemo(() => {
    const gap = 16;
    const maxStackHeight = viewportHeight - 120; // safe area
    let currentHeight = 0;
    const stackedIds = new Set();

    // Loop from newest to oldest to find which ones go off-screen
    if (!isHovered) {
      for (let index = alerts.length - 1; index >= 0; index--) {
        const alert = alerts[index];
        const height = toastHeights[alert.id] || 88;
        if (currentHeight + height > maxStackHeight) {
          for (let index_ = index; index_ >= 0; index_--) {
            stackedIds.add(alerts[index_].id);
          }
          break;
        }
        currentHeight += height + gap;
      }
    }

    const oldestVisibleIndex = alerts.findIndex((alert) => !stackedIds.has(alert.id));
    const stackedAlerts = alerts.filter((alert) => stackedIds.has(alert.id));
    const S = stackedAlerts.length;

    const stylesMap = {};
    let runningY = 0;

    // Calculate Y for visible ones (newest to oldest)
    for (let index = alerts.length - 1; index >= 0; index--) {
      const alert = alerts[index];
      const isStacked = stackedIds.has(alert.id);

      if (!isStacked) {
        stylesMap[alert.id] = {
          y: runningY,
          scale: 1,
          opacity: 1,
          zIndex: 50,
        };
        const height = toastHeights[alert.id] || 88;
        runningY -= (height + gap);
      }
    }

    // Calculate Y for stacked ones (relative to oldest visible)
    const baseStackedY = oldestVisibleIndex === -1 
      ? 0 
      : stylesMap[alerts[oldestVisibleIndex].id].y;

    for (const alert of alerts) {
      if (stackedIds.has(alert.id)) {
        const indexInStacked = stackedAlerts.findIndex((a) => a.id === alert.id);
        const stackIndex = S - 1 - indexInStacked; // 0 is closest to visible, 1 is behind that

        stylesMap[alert.id] = {
          y: baseStackedY - (stackIndex + 1) * 12,
          scale: Math.max(0.8, 1 - (stackIndex + 1) * 0.05),
          opacity: stackIndex >= 2 ? 0 : 0.8 - stackIndex * 0.4,
          zIndex: 40 - stackIndex,
        };
      }
    }

    return stylesMap;
  }, [alerts, toastHeights, viewportHeight, isHovered]);

  return (
    <AlertContext.Provider value={{ showAlert, dismissAlert }}>
      {children}
      
      {/* Floating Toast Container */}
      <div 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="fixed bottom-6 right-6 z-50 max-w-sm w-full pointer-events-none"
        role="log"
        aria-label="Notifications"
        style={{
          position: "fixed",
          height: "1px",
        }}
      >
        <AnimatePresence>
          {alerts.map((alert) => {
            const styles = alertStyles[alert.id] || { y: 0, scale: 1, opacity: 0, zIndex: 50 };
            return (
              <ToastWrapper
                key={alert.id}
                alert={alert}
                y={styles.y}
                scale={styles.scale}
                opacity={styles.opacity}
                zIndex={styles.zIndex}
                onHeightChange={handleHeightChange}
              >
                <CustomAlert
                  id={alert.id}
                  type={alert.type}
                  title={alert.title}
                  message={alert.message}
                  duration={alert.duration}
                  action={alert.action}
                  onClose={() => dismissAlert(alert.id)}
                  isToast={true}
                  paused={isHovered}
                />
              </ToastWrapper>
            );
          })}
        </AnimatePresence>
      </div>
    </AlertContext.Provider>
  );
}

export function useAlert() {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
}
