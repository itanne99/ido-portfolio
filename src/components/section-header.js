import React from "react";

export default function SectionHeader({ title, description, action }) {
  return (
    <div className="mb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="font-headline-md text-headline-md text-on-surface flex items-center gap-4 flex-1">
          {title} <span className="h-px flex-1 bg-outline-variant/30 hidden sm:block"></span>
        </h2>
        {action && <div className="flex-shrink-0">{action}</div>}
      </div>
      {description && (
        <p className="font-body-lg text-body-lg text-on-surface-variant mt-4 max-w-2xl leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
