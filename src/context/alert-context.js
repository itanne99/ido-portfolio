import React, { createContext, useContext, useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import CustomAlert from "@/components/custom-alert";

const AlertContext = createContext(undefined);

export function AlertProvider({ children }) {
  const [alerts, setAlerts] = useState([]);

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

  return (
    <AlertContext.Provider value={{ showAlert, dismissAlert }}>
      {children}
      
      {/* Floating Toast Container */}
      <div 
        className="fixed bottom-6 right-6 z-50 flex flex-col gap-4 max-w-sm w-full pointer-events-none"
        role="log"
        aria-label="Notifications"
      >
        <AnimatePresence>
          {alerts.map((alert) => (
            <div key={alert.id} className="pointer-events-auto w-full">
              <CustomAlert
                id={alert.id}
                type={alert.type}
                title={alert.title}
                message={alert.message}
                duration={alert.duration}
                action={alert.action}
                onClose={() => dismissAlert(alert.id)}
                isToast={true}
              />
            </div>
          ))}
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
