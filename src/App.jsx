import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Sidebar from "./components/Sidebar.jsx";
import MobileTopBar from "./components/MobileTopBar.jsx";
import useMediaQuery from "./hooks/useMediaQuery.js";
import navigation from "./data/navigation.json";

import Home from "./sections/Home.jsx";
import About from "./sections/About.jsx";
import Experience from "./sections/Experience.jsx";
import Projects from "./sections/Projects.jsx";
import Systems from "./sections/Systems.jsx";
import Skills from "./sections/Skills.jsx";
import Education from "./sections/Education.jsx";
import Contact from "./sections/Contact.jsx";

const sectionMap = {
  home: Home,
  about: About,
  experience: Experience,
  projects: Projects,
  systems: Systems,
  skills: Skills,
  education: Education,
  contact: Contact,
};

export default function App() {
  const [active, setActive] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const isLarge = useMediaQuery("(min-width: 1024px)");

  // Reflect section in URL hash (so back/forward works, shareable links)
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash && sectionMap[hash]) setActive(hash);
    const onHash = () => {
      const h = window.location.hash.replace("#", "");
      if (h && sectionMap[h]) setActive(h);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const navigate = (id) => {
    setActive(id);
    window.history.replaceState(null, "", `#${id}`);
    // Scroll content area to top on section change
    document
      .getElementById("content-scroll")
      ?.scrollTo({ top: 0, behavior: "smooth" });
  };

  const ActiveSection = sectionMap[active] || Home;
  const activeLabel = navigation.find((n) => n.id === active)?.label || "";

  return (
    <div className="min-h-screen bg-[#f7f8f7] gradient-mesh">
      <Sidebar
        active={active}
        onChange={navigate}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
        collapsed={false}
      />

      {/* Main scroll area — pushed right of sidebar on desktop */}
      <div className="lg:pl-64">
        <MobileTopBar
          onMenuClick={() => setMobileOpen(true)}
          activeLabel={activeLabel}
        />

        <main
          id="content-scroll"
          className="px-4 sm:px-6 lg:px-10 py-6 lg:py-10 max-w-7xl mx-auto"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <ActiveSection onNavigate={navigate} />
            </motion.div>
          </AnimatePresence>

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-ink-100 flex items-center justify-between flex-wrap gap-3 text-[11px] font-mono text-ink-400">
            {/* Left */}
            <div className="flex items-center gap-2 flex-wrap">
              <span>© {new Date().getFullYear()} Dharanitharan P</span>
              <span className="hidden sm:inline">·</span>
              <span>fintech.backend</span>
            </div>

            {/* Right */}
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-1.5">
                <span className="h-1 w-1 rounded-full bg-moss-500 animate-pulse-soft" />
                <span>Systems-first</span>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="h-1 w-1 rounded-full bg-moss-500 animate-pulse-soft" />
                <span>Failure-aware</span>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="h-1 w-1 rounded-full bg-moss-500" />
                <span>Scale-ready</span>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
