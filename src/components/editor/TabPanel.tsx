"use client";

import { useState } from "react";

interface Tab {
  id: string;
  label: string;
  icon: string;
  content: React.ReactNode;
}

export function TabPanel({ tabs }: { tabs: Tab[] }) {
  const [active, setActive] = useState(tabs[0]?.id ?? null);

  return (
    <div>
      <div className="flex border-b border-slate-800">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`flex items-center gap-1.5 px-3 py-2 text-[10px] font-medium uppercase tracking-wider transition ${
              active === tab.id
                ? "border-b-2 border-blue-500 text-blue-400"
                : "text-slate-500 hover:text-slate-300"
            }`}
            title={tab.label}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
      <div>
        {tabs.map((tab) =>
          active === tab.id ? <div key={tab.id}>{tab.content}</div> : null
        )}
      </div>
    </div>
  );
}