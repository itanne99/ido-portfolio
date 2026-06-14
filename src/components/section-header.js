import React from "react";

export default function SectionHeader({ title, description }) {
  return (
    <div className="mb-12">
      <h2 className="font-headline-md text-headline-md text-on-surface flex items-center gap-4">
        {title} <span className="h-px flex-1 bg-outline-variant/30"></span>
      </h2>
      {description && (
        <p className="font-body-lg text-body-lg text-on-surface-variant mt-4 max-w-2xl leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
