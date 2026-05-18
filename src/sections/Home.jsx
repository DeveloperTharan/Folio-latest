import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "../components/Icon.jsx";
import personal from "../data/personal.json";
import projects from "../data/projects.json";

export default function Home({ onNavigate }) {
  const [roleIdx, setRoleIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setRoleIdx((i) => (i + 1) % personal.roles.length);
    }, 2600);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
      {/* LEFT — main column */}
      <div className="lg:col-span-7 xl:col-span-8 space-y-8">
        {/* Status chip */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 pl-2 pr-4 py-1.5 rounded-full bg-white border border-ink-100 shadow-sm"
        >
          <span className="relative flex h-5 w-5 items-center justify-center">
            <span className="absolute inline-flex h-full w-full rounded-full bg-moss-400 opacity-30 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-moss-500" />
          </span>
          <span className="text-xs text-ink-600 font-medium">
            {personal.availability} · {personal.location.split(",")[0]}
          </span>
        </motion.div>

        {/* Headline */}
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-[11px] font-mono uppercase tracking-[0.22em] text-moss-700"
          >
            ◆ {personal.title}
          </motion.div>

          <h1 className="text-display text-5xl sm:text-6xl md:text-7xl xl:text-8xl text-ink-900 leading-[0.95]">
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="block"
            >
              Building the rails
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="block italic text-moss-700"
            >
              that move money.
            </motion.span>
          </h1>

          {/* Rotating role */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-3 text-base md:text-lg"
          >
            <span className="text-ink-400">I'm a</span>
            <div className="relative h-7 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={roleIdx}
                  initial={{ y: 28, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -28, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block text-ink-900 font-medium"
                >
                  {personal.roles[roleIdx]}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-ink-500 max-w-xl text-base leading-relaxed"
          >
            {personal.summary}
          </motion.p>
        </div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-wrap gap-3"
        >
          <button
            onClick={() => onNavigate("projects")}
            className="group inline-flex items-center gap-2 bg-ink-900 hover:bg-ink-800 text-white px-5 py-3 rounded-full text-sm font-medium transition-all shadow-lg shadow-ink-900/10 hover:shadow-ink-900/20 hover:scale-[1.02]"
          >
            Explore work
            <Icon name="ArrowUpRight" className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
          <button
            onClick={() => onNavigate("systems")}
            className="inline-flex items-center gap-2 bg-white hover:bg-moss-50 text-ink-700 hover:text-moss-700 border border-ink-200 hover:border-moss-300 px-5 py-3 rounded-full text-sm font-medium transition-all"
          >
            System designs
            <Icon name="Network" className="w-4 h-4" />
          </button>
          <a
            href={`mailto:${personal.email}`}
            className="inline-flex items-center gap-2 text-ink-600 hover:text-ink-900 px-3 py-3 text-sm font-medium transition-colors"
          >
            Get in touch
            <Icon name="ArrowRight" className="w-4 h-4" />
          </a>
        </motion.div>

        {/* Metrics strip */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4"
        >
          {personal.metrics.map((m, i) => (
            <motion.div
              key={m.label}
              whileHover={{ y: -2 }}
              className="card card-hover p-4"
            >
              <div className="text-2xl md:text-3xl font-display text-ink-900 leading-none">{m.value}</div>
              <div className="mt-2 text-xs font-medium text-ink-700">{m.label}</div>
              <div className="mt-0.5 text-[10px] text-ink-400">{m.sub}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* RIGHT — avatar + ambient card */}
      <div className="lg:col-span-5 xl:col-span-4 space-y-4">
        <ProfileCard />
        <FloatingTxnCard />
      </div>
    </div>
  );
}

function ProfileCard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative card p-6 overflow-hidden"
    >
      {/* Decorative gradient */}
      <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-gradient-to-br from-moss-200 to-moss-400 opacity-30 blur-3xl" />

      <div className="relative flex items-center gap-4">
        <div className="relative">
          <div className="h-20 w-20 rounded-2xl overflow-hidden ring-4 ring-white shadow-xl">
            <img src={personal.avatar} alt={personal.name} className="h-full w-full object-cover" />
          </div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8, type: "spring", stiffness: 300 }}
            className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-moss-500 border-2 border-white flex items-center justify-center"
          >
            <Icon name="CheckCircle2" className="w-3 h-3 text-white" />
          </motion.div>
        </div>
        <div className="min-w-0">
          <div className="text-[10px] uppercase tracking-[0.18em] text-ink-400 font-medium mb-1">Engineer</div>
          <div className="text-lg font-semibold text-ink-900 truncate">{personal.name}</div>
          <div className="text-xs text-ink-500 truncate">{personal.location}</div>
        </div>
      </div>

      <div className="relative mt-5 pt-5 border-t border-ink-100">
        <div className="text-xs text-ink-500 leading-relaxed line-clamp-3">
          {personal.longBio}
        </div>
      </div>

      <div className="relative mt-5 grid grid-cols-2 gap-2">
        <a
          href={personal.social.github}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-ink-50 hover:bg-ink-900 hover:text-white text-ink-700 text-xs font-medium transition-colors"
        >
          <Icon name="Github" className="w-3.5 h-3.5" />
          GitHub
        </a>
        <a
          href={personal.social.linkedin}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-ink-50 hover:bg-ink-900 hover:text-white text-ink-700 text-xs font-medium transition-colors"
        >
          <Icon name="Linkedin" className="w-3.5 h-3.5" />
          LinkedIn
        </a>
      </div>
    </motion.div>
  );
}

function FloatingTxnCard() {
  // Mini fintech-flavored ambient card showing a live "transaction"
  const featured = projects[0];
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="relative rounded-3xl bg-gradient-to-br from-ink-900 via-ink-800 to-moss-900 text-white p-5 overflow-hidden"
    >
      {/* Live indicator */}
      <div className="absolute inset-0 opacity-10 mesh-lines" />
      <div className="relative flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-moss-300 opacity-75 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-moss-300" />
          </span>
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/60 font-mono">Live · prod</span>
        </div>
        <Icon name="Activity" className="w-3.5 h-3.5 text-white/40" />
      </div>

      <div className="relative space-y-3">
        <div>
          <div className="text-[10px] uppercase tracking-[0.18em] text-white/50 mb-1">Featured</div>
          <div className="text-base font-semibold leading-tight">{featured.name}</div>
        </div>

        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10">
          {featured.impact.slice(0, 3).map((m) => (
            <div key={m.label}>
              <div className="text-base font-display text-moss-200">{m.metric}</div>
              <div className="text-[9px] text-white/50 uppercase tracking-wider mt-0.5 leading-tight">{m.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Animated bars (mini TPS chart) */}
      <div className="relative mt-4 flex items-end gap-1 h-8">
        {[40, 65, 50, 80, 60, 90, 75, 85, 70, 95, 80, 92].map((h, i) => (
          <motion.div
            key={i}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 0.6 + i * 0.04, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ height: `${h}%`, transformOrigin: "bottom" }}
            className="flex-1 bg-gradient-to-t from-moss-400/40 to-moss-300/80 rounded-sm"
          />
        ))}
      </div>
    </motion.div>
  );
}
