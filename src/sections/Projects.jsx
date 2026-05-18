import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Section from "../components/Section.jsx";
import Icon from "../components/Icon.jsx";
import StatusBadge from "../components/StatusBadge.jsx";
import projects from "../data/projects.json";

export default function Projects() {
  const categories = useMemo(() => {
    const set = new Set(projects.map((p) => p.category));
    return ["All", ...Array.from(set)];
  }, []);
  const [filter, setFilter] = useState("All");
  const [expanded, setExpanded] = useState(null);

  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <Section
      eyebrow="Projects"
      title="Selected work."
      kicker="Production systems I've shipped end-to-end. Filter by category."
    >
      {/* Filter pills */}
      <div className="mb-6 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
              filter === c
                ? "bg-ink-900 text-white shadow-md"
                : "bg-white border border-ink-100 text-ink-600 hover:border-moss-300 hover:text-moss-700"
            }`}
          >
            {c}
            {filter === c && (
              <span className="ml-2 inline-flex items-center justify-center h-4 w-4 rounded-full bg-white/20 text-[10px]">
                {filtered.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((p, i) => (
            <ProjectCard
              key={p.id}
              project={p}
              index={i}
              expanded={expanded === p.id}
              onToggle={() => setExpanded(expanded === p.id ? null : p.id)}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </Section>
  );
}

function ProjectCard({ project, index, expanded, onToggle }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -3 }}
      className={`group card card-hover p-5 flex flex-col relative overflow-hidden ${expanded ? "md:col-span-2 xl:col-span-3" : ""}`}
    >
      {/* Subtle gradient on hover */}
      <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-moss-100/0 group-hover:bg-moss-100/40 blur-3xl transition-all duration-700" />

      <div className="relative flex items-start justify-between gap-3 mb-3">
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge status={project.status} />
          <span className="pill bg-ink-50 text-ink-600 border border-ink-100">
            {project.category}
          </span>
          <span className="text-[10px] font-mono text-ink-400">{project.year}</span>
        </div>
        <div className="flex items-center gap-1">
          {project.links?.github && (
            <a href={project.links.github} target="_blank" rel="noreferrer" className="h-7 w-7 rounded-lg hover:bg-ink-100 flex items-center justify-center text-ink-500 hover:text-ink-900 transition-colors">
              <Icon name="Github" className="w-3.5 h-3.5" />
            </a>
          )}
          {project.links?.live && (
            <a href={project.links.live} target="_blank" rel="noreferrer" className="h-7 w-7 rounded-lg hover:bg-ink-100 flex items-center justify-center text-ink-500 hover:text-ink-900 transition-colors">
              <Icon name="ExternalLink" className="w-3.5 h-3.5" />
            </a>
          )}
          <Icon name="ArrowUpRight" className="w-4 h-4 text-ink-300 group-hover:text-moss-600 group-hover:rotate-12 transition-all" />
        </div>
      </div>

      <h3 className="relative text-base font-semibold text-ink-900 leading-snug">{project.name}</h3>
      <p className="relative text-xs text-ink-500 mt-2 leading-relaxed">{project.summary}</p>

      {/* Impact metrics */}
      <div className="relative mt-4 pt-4 border-t border-ink-100 grid grid-cols-3 gap-2">
        {project.impact.map((m) => (
          <div key={m.label}>
            <div className="text-base font-display text-moss-700 leading-none">{m.metric}</div>
            <div className="text-[10px] text-ink-400 mt-1 leading-tight uppercase tracking-wider">{m.label}</div>
          </div>
        ))}
      </div>

      {/* Stack */}
      <div className="relative mt-4 flex flex-wrap gap-1">
        {project.stack.map((s, i) => (
          <React.Fragment key={s}>
            {i > 0 && <span className="text-[10px] text-ink-300">·</span>}
            <span className="text-[10px] font-mono text-ink-500">{s}</span>
          </React.Fragment>
        ))}
      </div>

      {/* Expand button */}
      <button
        onClick={onToggle}
        className="relative mt-4 inline-flex items-center gap-1.5 text-[11px] font-medium text-moss-700 hover:text-moss-800 self-start group/btn"
      >
        {expanded ? "Show less" : "View details"}
        <Icon
          name="ArrowRight"
          className={`w-3 h-3 transition-transform ${expanded ? "rotate-90" : "group-hover/btn:translate-x-0.5"}`}
        />
      </button>

      {/* Expanded content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="relative mt-5 pt-5 border-t border-ink-100 overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-ink-400 font-medium mb-2">Overview</div>
                <p className="text-sm text-ink-600 leading-relaxed">{project.description}</p>

                <div className="mt-4">
                  <div className="text-[10px] uppercase tracking-[0.18em] text-ink-400 font-medium mb-2">Architecture</div>
                  <p className="text-xs text-ink-600 font-mono leading-relaxed">{project.architecture}</p>
                </div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-ink-400 font-medium mb-2">Features</div>
                <ul className="space-y-1.5">
                  {project.features.map((f) => (
                    <li key={f} className="flex gap-2 text-xs text-ink-600 leading-relaxed">
                      <Icon name="CheckCircle2" className="w-3 h-3 text-moss-500 mt-0.5 flex-shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
