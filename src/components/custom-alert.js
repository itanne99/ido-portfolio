import React, { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { X, CheckCircle2, AlertTriangle, AlertCircle, Info } from "lucide-react";

const getAlertStyles = (type, isToast) => {
  switch (type) {
    case "error": {
      return {
        bgColor: isToast ? "bg-white/95" : "bg-error-container/40",
        borderColor: "border-error/20",
        textColor: isToast ? "text-on-surface" : "text-on-error-container",
        iconColor: "text-error",
        progressBarColor: "bg-error",
        Icon: AlertTriangle,
      };
    }
    case "success": {
      return {
        bgColor: isToast ? "bg-white/95" : "bg-secondary-container/40",
        borderColor: "border-secondary/20",
        textColor: isToast ? "text-on-surface" : "text-on-secondary-container",
        iconColor: "text-secondary",
        progressBarColor: "bg-secondary",
        Icon: CheckCircle2,
      };
    }
    case "warning": {
      return {
        bgColor: isToast ? "bg-white/95" : "bg-primary-fixed/20",
        borderColor: "border-primary/20",
        textColor: isToast ? "text-on-surface" : "text-on-primary-fixed-variant",
        iconColor: "text-primary",
        progressBarColor: "bg-primary",
        Icon: AlertCircle,
      };
    }
    default: {
      return {
        bgColor: isToast ? "bg-white/95" : "bg-tertiary-container/30",
        borderColor: "border-tertiary/20",
        textColor: isToast ? "text-on-surface" : "text-on-tertiary-container",
        iconColor: "text-tertiary",
        progressBarColor: "bg-tertiary",
        Icon: Info,
      };
    }
  }
};

export default function CustomAlert({
  id,
  type = "info",
  title,
  message,
  duration,
  action,
  onClose,
  isToast = false,
}) {
  const shouldReduceMotion = useReducedMotion();
  const styles = getAlertStyles(type, isToast);
  const IconComponent = styles.Icon;

  useEffect(() => {
    if (isToast && duration && duration > 0 && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isToast, duration, onClose]);

  const alertContent = (
    <div
      role={type === "error" ? "alert" : "status"}
      aria-live={type === "error" ? "assertive" : "polite"}
      className={`relative overflow-hidden flex gap-4 p-5 rounded-2xl border ${styles.bgColor} ${styles.borderColor} ${styles.textColor} ${
        isToast ? "shadow-xl backdrop-blur-md" : ""
      }`}
    >
      {/* Icon */}
      <div className={`flex-shrink-0 mt-0.5 ${styles.iconColor}`}>
        <IconComponent size={20} className="stroke-[2]" />
      </div>

      {/* Body */}
      <div className="flex-1 space-y-3">
        <div>
          {title && (
            <h4 className="font-body-md font-bold leading-tight mb-1 text-on-surface">
              {title}
            </h4>
          )}
          <p className="font-body-md text-sm leading-relaxed text-on-surface-variant">
            {message}
          </p>
        </div>

        {/* Action Button */}
        {action && (
          <div className="flex pt-1">
            <button
              onClick={() => {
                action.onClick();
                if (isToast && onClose) onClose();
              }}
              className="px-4 py-2 bg-primary/10 text-primary font-label-caps text-[10px] rounded-full hover:bg-primary/20 transition-all font-bold cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2"
            >
              {action.label}
            </button>
          </div>
        )}
      </div>

      {/* Close Button */}
      {onClose && (
        <button
          onClick={onClose}
          className="flex-shrink-0 w-11 h-11 flex items-center justify-center rounded-full text-on-surface-variant hover:text-primary hover:bg-surface-variant/20 transition-all cursor-pointer self-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2"
          aria-label="Dismiss notification"
        >
          <X size={16} />
        </button>
      )}

      {/* Visual Progress Bar Timer for Toasts */}
      {isToast && duration && duration > 0 && (
        <motion.div
          initial={{ scaleX: 1 }}
          animate={{ scaleX: 0 }}
          style={{ originX: 0 }}
          transition={{ duration: duration / 1000, ease: "linear" }}
          className={`absolute bottom-0 left-0 right-0 h-[3px] ${styles.progressBarColor}`}
        />
      )}
    </div>
  );

  if (isToast) {
    return (
      <motion.div
        initial={{ 
          opacity: 0, 
          x: shouldReduceMotion ? 0 : 50, 
          scale: shouldReduceMotion ? 1 : 0.9 
        }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ 
          opacity: 0, 
          x: shouldReduceMotion ? 0 : 20, 
          scale: shouldReduceMotion ? 1 : 0.95 
        }}
        transition={
          shouldReduceMotion 
            ? { duration: 0.2 } 
            : { type: "spring", stiffness: 350, damping: 25 }
        }
        className="w-full"
      >
        {alertContent}
      </motion.div>
    );
  }

  return alertContent;
}
