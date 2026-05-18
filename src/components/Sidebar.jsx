import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "./Icon.jsx";
import navigation from "../data/navigation.json";
import personal from "../data/personal.json";

export default function Sidebar({
  active,
  onChange,
  mobileOpen,
  onMobileClose,
  collapsed,
}) {
  return (
    <>
      {/* Desktop */}
      <aside
        className={`hidden lg:flex flex-col fixed top-0 left-0 h-screen z-30 transition-all duration-300 ${
          collapsed ? "w-20" : "w-64"
        }`}
      >
        <div className="m-4 h-[calc(100vh-2rem)] glass rounded-3xl flex flex-col overflow-hidden">
          <BrandHeader collapsed={collapsed} />
          <Divider />
          <NavList active={active} onChange={onChange} collapsed={collapsed} />
          <Divider />
          <FooterBlock collapsed={collapsed} />
        </div>
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="lg:hidden fixed inset-0 bg-ink-950/30 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onMobileClose}
            />
            <motion.aside
              className="lg:hidden fixed top-0 left-0 h-screen w-72 max-w-[85vw] z-50"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
            >
              <div className="m-3 h-[calc(100vh-1.5rem)] glass-strong rounded-3xl flex flex-col overflow-hidden">
                <div className="flex items-center justify-between p-5">
                  <BrandHeader collapsed={false} />
                  <button
                    onClick={onMobileClose}
                    className="h-9 w-9 rounded-full bg-ink-100 hover:bg-ink-200 flex items-center justify-center transition-colors"
                    aria-label="Close menu"
                  >
                    <Icon name="X" className="w-4 h-4" />
                  </button>
                </div>
                <Divider />
                <NavList
                  active={active}
                  onChange={(id) => {
                    onChange(id);
                    onMobileClose();
                  }}
                  collapsed={false}
                />
                <Divider />
                <FooterBlock collapsed={false} />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function BrandHeader({ collapsed }) {
  const firstName = personal.name.split(" ")[0] || "";
  const initials = (firstName[0] || "") + (firstName[7] || "");
  return (
    <div
      className={`flex items-center gap-3 ${collapsed ? "p-3 justify-center" : "p-5"}`}
    >
      <div className="relative flex-shrink-0">
        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-moss-500 to-moss-700 flex items-center justify-center shadow-lg shadow-moss-500/20">
          <span className="text-white font-display text-lg italic">
            {personal.name.length >= 7 ? initials : personal.name.charAt(0)}
          </span>
        </div>
        <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-moss-400 border-2 border-white animate-pulse-soft" />
      </div>
      {!collapsed && (
        <div className="min-w-0">
          <div className="text-sm font-semibold text-ink-900 truncate">
            {personal.name}
          </div>
          <div className="text-[11px] text-ink-500 font-mono truncate">
            fintech.backend
          </div>
        </div>
      )}
    </div>
  );
}

function Divider() {
  return (
    <div className="mx-5 h-px bg-gradient-to-r from-transparent via-ink-200 to-transparent" />
  );
}

function NavList({ active, onChange, collapsed }) {
  return (
    <nav className="flex-1 p-3 space-y-1 overflow-y-auto scroll-thin">
      {navigation.map((item, i) => {
        const isActive = active === item.id;
        return (
          <motion.button
            key={item.id}
            onClick={() => onChange(item.id)}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04, duration: 0.3 }}
            className={`group relative w-full flex items-center gap-3 rounded-xl text-sm font-medium transition-all ${
              collapsed ? "justify-center p-3" : "px-3 py-2.5"
            } ${
              isActive
                ? "bg-moss-500 text-white shadow-lg shadow-moss-500/25"
                : "text-ink-600 hover:bg-ink-100 hover:text-ink-900"
            }`}
            title={collapsed ? item.label : undefined}
          >
            {isActive && !collapsed && (
              <motion.div
                layoutId="nav-glow"
                className="absolute inset-0 rounded-xl bg-gradient-to-r from-moss-500 to-moss-600"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative flex items-center gap-3 w-full">
              <Icon name={item.icon} className="w-4 h-4 flex-shrink-0" />
              {!collapsed && (
                <span className="flex-1 text-left">{item.label}</span>
              )}
              {!collapsed && isActive && (
                <motion.span
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="h-1.5 w-1.5 rounded-full bg-white/80"
                />
              )}
            </span>
          </motion.button>
        );
      })}
    </nav>
  );
}

function FooterBlock({ collapsed }) {
  if (collapsed) {
    return (
      <div className="p-3 flex flex-col items-center gap-2">
        <a
          href={personal.social.github}
          className="h-9 w-9 rounded-lg bg-ink-100 hover:bg-moss-500 hover:text-white flex items-center justify-center transition-colors"
        >
          <Icon name="Github" className="w-4 h-4" />
        </a>
        <a
          href={personal.social.linkedin}
          className="h-9 w-9 rounded-lg bg-ink-100 hover:bg-moss-500 hover:text-white flex items-center justify-center transition-colors"
        >
          <Icon name="Linkedin" className="w-4 h-4" />
        </a>
      </div>
    );
  }
  return (
    <div className="p-5 space-y-3">
      <div className="flex items-center gap-2 text-[11px]">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full rounded-full bg-moss-400 opacity-75 animate-ping" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-moss-500" />
        </span>
        <span className="text-ink-600 font-medium">
          {personal.availability}
        </span>
      </div>
      <div className="flex gap-2">
        <a
          href={personal.social.github}
          target="_blank"
          rel="noreferrer"
          className="flex-1 h-9 rounded-lg bg-ink-100 hover:bg-ink-900 hover:text-white flex items-center justify-center transition-colors"
          aria-label="GitHub"
        >
          <Icon name="Github" className="w-4 h-4" />
        </a>
        <a
          href={personal.social.linkedin}
          target="_blank"
          rel="noreferrer"
          className="flex-1 h-9 rounded-lg bg-ink-100 hover:bg-ink-900 hover:text-white flex items-center justify-center transition-colors"
          aria-label="LinkedIn"
        >
          <Icon name="Linkedin" className="w-4 h-4" />
        </a>
        <a
          href={`mailto:${personal.email}`}
          className="flex-1 h-9 rounded-lg bg-ink-100 hover:bg-ink-900 hover:text-white flex items-center justify-center transition-colors"
          aria-label="Email"
        >
          <Icon name="Mail" className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
