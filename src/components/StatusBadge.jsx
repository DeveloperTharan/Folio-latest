import React from "react";
import Icon from "./Icon.jsx";

const VARIANTS = {
  production: {
    label: "Production",
    icon: "CheckCircle2",
    className: "bg-moss-50 text-moss-700 border-moss-200",
  },
  internal: {
    label: "Internal",
    icon: "Circle",
    className: "bg-ink-50 text-ink-700 border-ink-200",
  },
  beta: {
    label: "Beta",
    icon: "Clock",
    className: "bg-amber-50 text-amber-700 border-amber-200",
  },
  archived: {
    label: "Archived",
    icon: "Circle",
    className: "bg-ink-50 text-ink-500 border-ink-200",
  },
};

export default function StatusBadge({ status }) {
  const v = VARIANTS[status] || VARIANTS.internal;
  return (
    <span className={`pill border ${v.className}`}>
      <Icon name={v.icon} className="w-3 h-3" />
      {v.label}
    </span>
  );
}
