// components/CostStep.tsx
"use client";

import { useState, useEffect } from "react";

export default function CostStep({
  data,
  onNext
}: {
  data: { type: string; features: string[] };
  onNext: (u: { cost: number; requirements: string[] }) => void;
}) {
  const base: Record<string,number> = {
    "E-commerce": 2000,
    Blog: 500, Portfolio: 700, Corporate: 1000, Other: 800
  };
  const perFeat = 200;
  const [cost, setCost] = useState(0);

  useEffect(() => {
    setCost(base[data.type] + perFeat * data.features.length);
  }, [data]);

  return (
    <div className="bg-white p-6 rounded-lg shadow space-y-4">
      <h2 className="text-xl font-semibold">3. Cost Estimate</h2>
      <p className="text-lg">
        Base for <strong>{data.type}</strong>: ${base[data.type]}<br/>
        + ${perFeat} × {data.features.length} features ={" "}
        <strong>${cost}</strong>
      </p>
      <button
        onClick={() => onNext({
          cost,
          requirements: [data.type, ...data.features, `$${cost}`]
        })}
        className="mt-4 px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Accept & Continue
      </button>
    </div>
  );
}
