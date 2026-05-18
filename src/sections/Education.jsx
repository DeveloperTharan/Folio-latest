import React from "react";
import { motion } from "framer-motion";
import Section from "../components/Section.jsx";
import Icon from "../components/Icon.jsx";
import education from "../data/education.json";
import certifications from "../data/certifications.json";

export default function Education() {
  return (
    <Section
      eyebrow="Education & Credentials"
      title="Where I learned the basics."
      kicker="Formal education and professional certifications."
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Education */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="GraduationCap" className="w-4 h-4 text-moss-700" />
            <h3 className="text-sm font-semibold text-ink-900">Education</h3>
          </div>
          {education.map((edu, i) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="card card-hover p-5 relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-moss-400 to-moss-600" />
              <div className="absolute -top-16 -right-16 w-32 h-32 rounded-full bg-moss-100/30 blur-2xl" />

              <div className="relative">
                <div className="flex items-start justify-between flex-wrap gap-2 mb-2">
                  <div className="text-sm font-semibold text-ink-900">{edu.degree}</div>
                  <span className="pill bg-ink-50 text-ink-600 border border-ink-100 font-mono">
                    {edu.period}
                  </span>
                </div>
                <div className="text-xs text-ink-500">{edu.institution} · {edu.location}</div>
                {edu.details && (
                  <p className="text-xs text-ink-600 mt-3 leading-relaxed">{edu.details}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="Award" className="w-4 h-4 text-moss-700" />
            <h3 className="text-sm font-semibold text-ink-900">Certifications</h3>
          </div>
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ x: 2 }}
              className="card card-hover p-4 flex items-center gap-3"
            >
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-moss-100 to-moss-200 flex items-center justify-center flex-shrink-0">
                <Icon name="Award" className="w-4 h-4 text-moss-700" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium text-ink-900 truncate">{cert.name}</div>
                <div className="text-[11px] text-ink-500 truncate">{cert.issuer} · {cert.year}</div>
              </div>
              {cert.link && (
                <a href={cert.link} target="_blank" rel="noreferrer" className="text-ink-400 hover:text-moss-700">
                  <Icon name="ExternalLink" className="w-3.5 h-3.5" />
                </a>
              )}
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="card p-4 border-dashed bg-ink-50/40"
          >
            <div className="text-xs text-ink-400 italic">
              Add new certifications by editing <code className="text-moss-700 font-mono">certifications.json</code>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
