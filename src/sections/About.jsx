import React from "react";
import { motion } from "framer-motion";
import Section from "../components/Section.jsx";
import Icon from "../components/Icon.jsx";
import personal from "../data/personal.json";

export default function About() {
  return (
    <Section eyebrow="About" title="How I think about systems.">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        <div className="lg:col-span-7 space-y-5 text-ink-600 text-base leading-relaxed">
          <p>{personal.longBio}</p>
          <p>
            Go is my primary language, Java when the JVM ecosystem fits better.
            I care about latency budgets, connection pools, and the difference
            between p50 and p99. The rest is conversation.
          </p>

          <div className="pt-4 grid grid-cols-2 gap-3">
            <InfoTile
              icon="MapPin"
              label="Based in"
              value={personal.location.split(",")[0]}
            />
            <InfoTile
              icon="Globe"
              label="Languages"
              value={personal.languages.join(" · ")}
            />
            <InfoTile
              icon="Mail"
              label="Email"
              value={personal.email}
              truncate
            />
            <InfoTile icon="Phone" label="Availability" value="Immediate" />
          </div>
        </div>

        <div className="lg:col-span-5 space-y-3">
          {personal.principles.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ x: 4 }}
              className="card card-hover p-5 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-moss-100/40 rounded-full blur-2xl" />
              <div className="relative flex items-start gap-4">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-moss-500 to-moss-700 text-white flex items-center justify-center flex-shrink-0 shadow-lg shadow-moss-500/20">
                  <Icon name={p.icon} className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-ink-900 mb-1">
                    {p.title}
                  </div>
                  <div className="text-xs text-ink-500 leading-relaxed">
                    {p.body}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function InfoTile({ icon, label, value, truncate }) {
  return (
    <div className="card p-4">
      <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-ink-400 font-medium mb-2">
        <Icon name={icon} className="w-3 h-3" />
        {label}
      </div>
      <div
        className={`text-sm font-medium text-ink-900 ${truncate ? "truncate" : ""}`}
      >
        {value}
      </div>
    </div>
  );
}
