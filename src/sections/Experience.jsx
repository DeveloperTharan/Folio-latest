import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Section from "../components/Section.jsx";
import Icon from "../components/Icon.jsx";
import experience from "../data/experience.json";

export default function Experience() {
  const [active, setActive] = useState(experience[0].id);
  const current = experience.find((e) => e.id === active);

  return (
    <Section
      eyebrow="Experience"
      title="Production payment infrastructure."
      kicker="Where I've built systems that move real money for real customers."
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Tab list */}
        <div className="lg:col-span-4 space-y-2">
          {experience.map((e, i) => {
            const isActive = active === e.id;
            return (
              <motion.button
                key={e.id}
                onClick={() => setActive(e.id)}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ x: isActive ? 0 : 3 }}
                className={`group relative w-full text-left p-4 rounded-2xl border transition-all ${
                  isActive
                    ? "bg-ink-900 border-ink-900 text-white shadow-xl shadow-ink-900/10"
                    : "bg-white border-ink-100 hover:border-moss-300 text-ink-900"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div
                    className={`text-[10px] font-mono uppercase tracking-wider ${isActive ? "text-moss-300" : "text-ink-400"}`}
                  >
                    {e.period}
                  </div>
                  {e.current && (
                    <span
                      className={`pill ${isActive ? "bg-moss-500/20 text-moss-200" : "bg-moss-50 text-moss-700 border border-moss-200"}`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse-soft" />
                      Current
                    </span>
                  )}
                </div>
                <div className="mt-2 text-sm font-semibold leading-snug">
                  {e.company}
                </div>
                <div
                  className={`text-xs mt-1 ${isActive ? "text-white/70" : "text-ink-500"}`}
                >
                  {e.role}
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Detail panel */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="card p-6 md:p-7 relative overflow-hidden"
            >
              <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-moss-100/40 blur-3xl" />

              <div className="relative flex items-start justify-between flex-wrap gap-3 mb-5">
                <div>
                  <div className="text-base md:text-lg font-semibold text-ink-900">
                    {current.role}
                  </div>
                  <div className="text-xs text-ink-500 mt-1">
                    {current.products.join(" · ")} · {current.location}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {current.stack.map((s) => (
                    <span
                      key={s}
                      className="pill bg-moss-50 text-moss-700 border border-moss-200"
                    >
                      {s}
                    </span>
                  ))}
                </div>
                {current.impact && (
                  <div className="mb-4 flex flex-wrap gap-2">
                    {current.impact.map((imp, i) => (
                      <span
                        key={i}
                        className="pill bg-ink-100 text-ink-700 border border-ink-200"
                      >
                        {imp}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="relative space-y-5 max-h-[440px] overflow-y-auto scroll-thin pr-2">
                {current.groups.map((g, gi) => (
                  <motion.div
                    key={g.title}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: gi * 0.08 }}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <div className="h-1.5 w-1.5 rounded-full bg-moss-500" />
                      <h4 className="text-sm font-semibold text-ink-900">
                        {g.title}
                      </h4>
                    </div>
                    <ul className="space-y-2 pl-4">
                      {g.highlights.map((h, hi) => (
                        <motion.li
                          key={hi}
                          initial={{ opacity: 0, x: -4 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: gi * 0.08 + hi * 0.03 }}
                          className="flex gap-3 text-sm text-ink-600 leading-relaxed"
                        >
                          <Icon
                            name="ArrowRight"
                            className="w-3.5 h-3.5 text-moss-500 mt-1 flex-shrink-0"
                          />
                          <span>{h}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}
