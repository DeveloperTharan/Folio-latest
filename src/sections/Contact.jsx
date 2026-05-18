import React from "react";
import { motion } from "framer-motion";
import Section from "../components/Section.jsx";
import Icon from "../components/Icon.jsx";
import personal from "../data/personal.json";

export default function Contact() {
  const items = [
    { icon: "Mail", label: "Email", value: personal.email, href: `mailto:${personal.email}` },
    { icon: "Phone", label: "Phone", value: personal.phone, href: `tel:${personal.phone}` },
    { icon: "MapPin", label: "Location", value: personal.location },
    { icon: "Linkedin", label: "LinkedIn", value: personal.social.linkedin.replace("https://", ""), href: personal.social.linkedin },
    { icon: "Github", label: "GitHub", value: personal.social.github.replace("https://", ""), href: personal.social.github },
  ];

  return (
    <Section
      eyebrow="Contact"
      title="Let's build something."
      kicker="Working on payment infrastructure, settlement systems, or fintech platforms? I'd like to hear about it."
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 space-y-2">
          {items.map((it, i) => (
            <motion.a
              key={it.label}
              href={it.href || "#"}
              target={it.href?.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ x: 3 }}
              className="card card-hover p-4 flex items-center justify-between group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="h-10 w-10 rounded-xl bg-ink-50 text-ink-700 group-hover:bg-moss-500 group-hover:text-white flex items-center justify-center transition-colors flex-shrink-0">
                  <Icon name={it.icon} className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] uppercase tracking-[0.18em] text-ink-400 font-medium">{it.label}</div>
                  <div className="text-sm font-medium text-ink-900 truncate">{it.value}</div>
                </div>
              </div>
              {it.href && (
                <Icon name="ArrowUpRight" className="w-4 h-4 text-ink-300 group-hover:text-moss-600 group-hover:rotate-12 transition-all flex-shrink-0" />
              )}
            </motion.a>
          ))}
        </div>

        {/* Availability card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-5 rounded-3xl bg-gradient-to-br from-ink-900 via-ink-800 to-moss-900 text-white p-6 relative overflow-hidden"
        >
          <div className="absolute inset-0 mesh-lines opacity-10" />
          <div className="absolute -bottom-20 -right-20 w-48 h-48 rounded-full bg-moss-500/20 blur-3xl" />

          <div className="relative">
            <div className="text-[10px] uppercase tracking-[0.22em] text-white/50 mb-3 flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-moss-300 opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-moss-300" />
              </span>
              Status
            </div>
            <div className="text-2xl font-display leading-tight mb-3">{personal.availability}</div>
            <p className="text-sm text-white/70 leading-relaxed">
              Open to senior backend, fintech platform, and payment infrastructure roles.
              Immediate joining. Open to relocation.
            </p>
          </div>

          <div className="relative mt-6 pt-6 border-t border-white/10">
            <div className="text-[10px] uppercase tracking-[0.22em] text-white/50 mb-2">Languages</div>
            <div className="flex flex-wrap gap-1.5">
              {personal.languages.map((l) => (
                <span key={l} className="pill bg-white/10 text-white border border-white/15">
                  {l}
                </span>
              ))}
            </div>
          </div>

          <a
            href={`mailto:${personal.email}`}
            className="relative mt-6 w-full inline-flex items-center justify-center gap-2 bg-moss-500 hover:bg-moss-400 text-white py-3 rounded-xl text-sm font-medium transition-colors shadow-lg shadow-moss-500/30"
          >
            <Icon name="Mail" className="w-4 h-4" />
            Send a message
          </a>
        </motion.div>
      </div>
    </Section>
  );
}
