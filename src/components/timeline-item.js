import React from "react";

export default function TimelineItem({ title, subtitle, period, children }) {
  return (
    <div className="relative pl-8 border-l-2 border-primary/20">
      <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-primary border-4 border-surface" />
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
        <div>
          <h3 className="font-headline-sm text-xl md:text-2xl font-bold text-on-surface">{title}</h3>
          <p className="font-body-md text-primary font-medium">{subtitle}</p>
        </div>
        <span className="font-label-caps text-xs text-on-surface-variant bg-outline-variant/20 px-3 py-1 rounded-full w-fit">
          {period}
        </span>
      </div>
      {children && <div className="mt-6">{children}</div>}
    </div>
  );
}
