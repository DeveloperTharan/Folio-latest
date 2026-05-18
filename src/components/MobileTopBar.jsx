import React from "react";
import Icon from "./Icon.jsx";
import personal from "../data/personal.json";

export default function MobileTopBar({ onMenuClick, activeLabel }) {
  return (
    <div className="lg:hidden sticky top-0 z-20 px-4 pt-4">
      <div className="glass rounded-2xl flex items-center justify-between px-3 py-2.5">
        <button
          onClick={onMenuClick}
          className="h-10 w-10 rounded-xl bg-white hover:bg-ink-50 border border-ink-100 flex items-center justify-center transition-colors"
          aria-label="Open menu"
        >
          <Icon name="Menu" className="w-4 h-4 text-ink-700" />
        </button>
        <div className="flex items-center gap-2">
          <div className="text-[10px] uppercase tracking-[0.18em] text-ink-400 font-medium">{activeLabel}</div>
          <span className="h-1 w-1 rounded-full bg-moss-500" />
        </div>
        <div className="h-10 w-10 rounded-xl overflow-hidden border border-ink-100">
          <img src={personal.avatar} alt={personal.name} className="h-full w-full object-cover" />
        </div>
      </div>
    </div>
  );
}
