import React from "react";

// Container with lighter border and spacing
export const Timeline = ({ children, className = "" }) => (
  <ol className={`relative border-l-[3px] border-indigo-200 ml-6 ${className}`}>
    {children}
  </ol>
);

// Each item now looks distinct
export const TimelineItem = ({ children, className = "" }) => (
  <li className={`relative mb-12 pl-8 ${className}`}>
    {children}
  </li>
);

// Point (dot) with elevation and hover
export const TimelinePoint = ({ className = "" }) => (
  <span
    className={`absolute -left-[1.05rem] top-1.5 w-4 h-4 bg-indigo-600 rounded-full ring-4 ring-white shadow-md hover:scale-110 transition-transform ${className}`}
  />
);

// Content with better text hierarchy
export const TimelineContent = ({ title, timestamp, children, className = "" }) => (
  <div className={`flex flex-col gap-1 ${className}`}>
    {title && <h3 className="text-lg font-semibold text-gray-800">{title}</h3>}
    {timestamp && <p className="text-sm text-gray-400 italic">{timestamp}</p>}
    <div className="text-gray-700 text-sm leading-relaxed">
      {children}
    </div>
  </div>
);
