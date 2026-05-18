import React from "react";
import { motion } from "framer-motion";
import Section from "../components/Section.jsx";
import Icon from "../components/Icon.jsx";
import skills from "../data/skills.json";

export default function Skills() {
  return (
    <Section
      eyebrow="Skills"
      title="The toolkit."
      kicker="What I reach for, organized by domain."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {skills.map((cat, i) => (
          <motion.div
            key={cat.category}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ y: -3 }}
            className="card card-hover p-5 relative overflow-hidden group"
          >
            <div className="absolute -top-16 -right-16 w-32 h-32 rounded-full bg-moss-100/0 group-hover:bg-moss-100/40 blur-3xl transition-all duration-500" />

            <div className="relative flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-moss-50 text-moss-700 flex items-center justify-center">
                  <Icon name={cat.icon} className="w-3.5 h-3.5" />
                </div>
                <div className="text-xs font-semibold text-ink-900">{cat.category}</div>
              </div>
              <span className="text-[10px] font-mono text-ink-400">{cat.items.length}</span>
            </div>

            <div className="relative flex flex-wrap gap-1.5">
              {cat.items.map((item) => (
                <motion.span
                  key={item.name}
                  whileHover={{ y: -1, scale: 1.02 }}
                  className={`text-xs px-2.5 py-1 rounded-lg transition-colors ${
                    item.level === "primary"
                      ? "bg-moss-500 text-white shadow-sm"
                      : "bg-ink-50 text-ink-700 border border-ink-100"
                  }`}
                >
                  {item.name}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-6 flex items-center gap-5 text-[11px] text-ink-500">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded bg-moss-500" />
          Primary
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded bg-ink-100 border border-ink-200" />
          Proficient
        </div>
      </div>
    </Section>
  );
}
