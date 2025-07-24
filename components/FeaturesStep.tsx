// components/FeaturesStep.tsx
"use client";

import { useState } from "react";

export default function FeaturesStep({
  data,
  onNext
}: {
  data: { type: string };
  onNext: (u: { features: string[] }) => void;
}) {
  const feats = ["Authentication","Payments","CMS","SEO","Chat","Analytics","Responsive"];
  const [sel, setSel] = useState<string[]>([]);

  const toggle = (f: string) =>
    setSel(s => s.includes(f) ? s.filter(x => x !== f) : [...s, f]);

  return (
    <div className="bg-white p-6 rounded-lg shadow space-y-4">
      <h2 className="text-xl font-semibold">
        2. Features for “{data.type}”
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {feats.map(f => (
          <label key={f} className="inline-flex items-center space-x-2">
            <input
              type="checkbox"
              value={f}
              checked={sel.includes(f)}
              onChange={() => toggle(f)}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span>{f}</span>
          </label>
        ))}
      </div>
      <button
        disabled={sel.length === 0}
        onClick={() => onNext({ features: sel })}
        className="mt-4 px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
