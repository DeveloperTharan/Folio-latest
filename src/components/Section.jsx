import React from "react";
import { motion } from "framer-motion";

export default function Section({ eyebrow, title, kicker, children }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="w-full"
    >
      {(eyebrow || title) && (
        <header className="mb-8 md:mb-10">
          {eyebrow && (
            <div className="flex items-center gap-3 mb-3">
              <span className="h-px w-8 bg-moss-500" />
              <span className="text-[11px] uppercase tracking-[0.22em] font-medium text-moss-700">
                {eyebrow}
              </span>
            </div>
          )}
          {title && (
            <h1 className="text-display text-4xl md:text-5xl lg:text-6xl text-ink-900 leading-[1.05]">
              {title}
            </h1>
          )}
          {kicker && (
            <p className="mt-4 text-ink-500 text-base md:text-lg max-w-2xl leading-relaxed">
              {kicker}
            </p>
          )}
        </header>
      )}
      {children}
    </motion.section>
  );
}
