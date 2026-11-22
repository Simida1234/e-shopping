// src/components/ProductArtwork.jsx
import React from 'react';

export default function ProductArtwork({ productId, className = 'h-36 w-full' }) {
  switch (productId) {
    case 'prod-laptop':
      return (
        <div
          className={`flex flex-col items-center justify-center rounded-xl bg-gradient-to-br from-stone-800 via-stone-700 to-amber-900/40 p-4 text-stone-100 ${className}`}
        >
          <div className="h-20 w-32 rounded-t-lg border-2 border-stone-300/70 bg-stone-950 p-1.5 shadow-md">
            <div className="flex h-full items-center justify-center rounded bg-amber-500/20 text-[10px] font-semibold tracking-wider text-amber-200">
              LAPTOP 15&quot;
            </div>
          </div>
          <div className="h-2 w-36 rounded-b-md bg-stone-300/80" />
        </div>
      );

    case 'prod-mouse':
      return (
        <div
          className={`flex items-center justify-center rounded-xl bg-gradient-to-br from-amber-100 via-stone-100 to-stone-200 p-4 ${className}`}
        >
          <div className="relative flex h-24 w-14 flex-col items-center rounded-[28px] border-2 border-stone-800 bg-stone-900 shadow-md">
            <div className="mt-4 h-5 w-1.5 rounded-full bg-amber-400" />
            <div className="mt-2 h-[1px] w-10 bg-stone-700" />
          </div>
        </div>
      );

    case 'prod-keyboard':
      return (
        <div
          className={`flex items-center justify-center rounded-xl bg-gradient-to-br from-stone-200 via-amber-50 to-stone-100 p-4 ${className}`}
        >
          <div className="grid grid-cols-6 gap-1.5 rounded-xl border border-stone-400 bg-stone-800 p-3 shadow-md">
            {Array.from({ length: 18 }).map((_, idx) => (
              <span
                key={idx}
                className="h-2.5 w-3.5 rounded-[2px] bg-stone-200"
              />
            ))}
          </div>
        </div>
      );

    case 'prod-monitor':
    default:
      return (
        <div
          className={`flex flex-col items-center justify-center rounded-xl bg-gradient-to-br from-stone-900 via-stone-800 to-stone-700 p-4 ${className}`}
        >
          <div className="flex h-20 w-32 items-center justify-center rounded-lg border-2 border-stone-400 bg-sky-950/70 text-[10px] font-semibold tracking-wider text-sky-200 shadow-md">
            24&quot; MONITOR
          </div>
          <div className="h-3 w-1 bg-stone-400" />
          <div className="h-1.5 w-12 rounded-full bg-stone-400" />
        </div>
      );
  }
}