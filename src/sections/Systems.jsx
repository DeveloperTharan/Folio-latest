import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Section from "../components/Section.jsx";
import Icon from "../components/Icon.jsx";
import systems from "../data/systems.json";

export default function Systems() {
  const [active, setActive] = useState(systems[0].id);
  const current = systems.find((s) => s.id === active);

  return (
    <Section
      eyebrow="Systems & Architecture"
      title="How it actually works."
      kicker="Designs I've built that handle scale, concurrency, and failure modes."
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Card list */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-2 lg:max-h-[600px] lg:overflow-y-auto scroll-thin lg:pr-2">
          {systems.map((s, i) => (
            <SystemCard
              key={s.id}
              system={s}
              index={i}
              isActive={active === s.id}
              onClick={() => setActive(s.id)}
            />
          ))}
        </div>

        {/* Detail */}
        <div className="lg:col-span-7 xl:col-span-8">
          <AnimatePresence mode="wait">
            <SystemDetail key={current.id} system={current} />
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}

function SystemCard({ system, index, isActive, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ x: isActive ? 0 : 3 }}
      className={`w-full text-left p-4 rounded-2xl border transition-all relative overflow-hidden ${
        isActive
          ? "bg-gradient-to-br from-moss-500 to-moss-700 border-moss-500 text-white shadow-xl shadow-moss-500/20"
          : "bg-white border-ink-100 hover:border-moss-300"
      }`}
    >
      {isActive && <div className="absolute inset-0 mesh-lines opacity-20" />}
      <div className="relative flex items-start justify-between gap-2 mb-2">
        <span
          className={`pill ${isActive ? "bg-white/20 text-white" : "bg-moss-50 text-moss-700 border border-moss-200"}`}
        >
          {system.category}
        </span>
        <span
          className={`text-[10px] font-mono ${isActive ? "text-white/60" : "text-ink-400"}`}
        >
          {system.complexity}
        </span>
      </div>
      <div
        className={`relative text-sm font-semibold leading-snug ${isActive ? "text-white" : "text-ink-900"}`}
      >
        {system.title}
      </div>
      <div
        className={`relative text-xs mt-1 leading-relaxed ${isActive ? "text-white/70" : "text-ink-500"}`}
      >
        {system.subtitle}
      </div>
    </motion.button>
  );
}

function SystemDetail({ system }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="card p-5 md:p-6 relative overflow-hidden"
    >
      <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-moss-100/40 blur-3xl" />

      <div className="relative">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-moss-700 font-medium mb-2">
          <Icon name="CircuitBoard" className="w-3 h-3" />
          {system.category}
        </div>
        <h3 className="text-xl md:text-2xl font-display text-ink-900 leading-tight">
          {system.title}
        </h3>
        <p className="text-sm text-ink-500 mt-1">{system.subtitle}</p>
      </div>

      {/* Diagram */}
      <div className="relative mt-5 rounded-2xl bg-gradient-to-br from-ink-50 to-moss-50/40 border border-ink-100 p-4 overflow-hidden">
        <DiagramRenderer kind={system.diagram} />
      </div>

      {/* Two-column details */}
      <div className="relative mt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <div className="text-[10px] uppercase tracking-[0.18em] text-ink-400 font-medium mb-2">
            Challenges
          </div>
          <ul className="space-y-1.5">
            {system.challenges.map((c) => (
              <li
                key={c}
                className="flex gap-2 text-xs text-ink-600 leading-relaxed"
              >
                <Icon
                  name="Circle"
                  className="w-2 h-2 text-amber-500 mt-1.5 flex-shrink-0 fill-current"
                />
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-[0.18em] text-ink-400 font-medium mb-2">
            Decisions
          </div>
          <ul className="space-y-1.5">
            {system.decisions.map((d) => (
              <li
                key={d}
                className="flex gap-2 text-xs text-ink-600 leading-relaxed"
              >
                <Icon
                  name="CheckCircle2"
                  className="w-3 h-3 text-moss-500 mt-0.5 flex-shrink-0"
                />
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Components + outcome */}
      <div className="relative mt-5 pt-5 border-t border-ink-100 space-y-3">
        <div className="flex flex-wrap gap-1.5">
          {system.components.map((c) => (
            <span
              key={c}
              className="pill bg-ink-50 text-ink-700 border border-ink-100 font-mono"
            >
              {c}
            </span>
          ))}
        </div>
        <div className="flex items-start gap-2 text-xs">
          <Icon
            name="TrendingUp"
            className="w-3.5 h-3.5 text-moss-600 mt-0.5 flex-shrink-0"
          />
          <span className="text-ink-700 font-medium">{system.outcome}</span>
        </div>
      </div>
    </motion.div>
  );
}

// ───────────────────────────────────────────────────────────────
// Diagrams — SVG, light theme, animated
// ───────────────────────────────────────────────────────────────
function DiagramRenderer({ kind }) {
  switch (kind) {
    case "payout":
      return <PayoutDiagram />;
    case "wallet":
      return <WalletDiagram />;
    case "retry":
      return <RetryDiagram />;
    case "ratelimit":
      return <RateLimitDiagram />;
    case "liquidity":
      return <LiquidityDiagram />;
    case "idempotency":
      return <IdempotencyDiagram />;
    default:
      return <PayoutDiagram />;
  }
}

const arrowDefs = (
  <defs>
    <marker
      id="arr-light"
      markerWidth="8"
      markerHeight="8"
      refX="7"
      refY="4"
      orient="auto"
    >
      <path d="M0,0 L8,4 L0,8" fill="#9aa39a" />
    </marker>
    <marker
      id="arr-em"
      markerWidth="8"
      markerHeight="8"
      refX="7"
      refY="4"
      orient="auto"
    >
      <path d="M0,0 L8,4 L0,8" fill="#4a8460" />
    </marker>
  </defs>
);

function Node({ x, y, w, h, primary, label, sub, dashed }) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="10"
        fill={primary ? "#4a8460" : "#ffffff"}
        stroke={primary ? "#386a4b" : "#c7cdc7"}
        strokeWidth="1.2"
        strokeDasharray={dashed ? "4 3" : "0"}
      />
      <text
        x={x + w / 2}
        y={y + h / 2 - (sub ? 5 : 0)}
        textAnchor="middle"
        fontSize="11"
        fill={primary ? "white" : "#1f3527"}
        fontWeight="600"
      >
        {label}
      </text>
      {sub && (
        <text
          x={x + w / 2}
          y={y + h / 2 + 10}
          textAnchor="middle"
          fontSize="9"
          fill={primary ? "#c7dccd" : "#6c776c"}
        >
          {sub}
        </text>
      )}
    </g>
  );
}

function AnimLine({ x1, y1, x2, y2, em, delay = 0, dashed }) {
  return (
    <motion.line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={em ? "#4a8460" : "#9aa39a"}
      strokeWidth={em ? "1.6" : "1"}
      strokeDasharray={dashed ? "3 3" : "0"}
      markerEnd={em ? "url(#arr-em)" : "url(#arr-light)"}
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.6, delay, ease: "easeInOut" }}
    />
  );
}

function PayoutDiagram() {
  return (
    <svg viewBox="0 0 600 280" className="w-full h-auto">
      {arrowDefs}
      <Node x={20} y={115} w={100} h={50} label="Merchant" sub="API" />
      <g>
        <rect
          x={170}
          y={80}
          width={150}
          height={120}
          rx="12"
          fill="#4a8460"
          stroke="#386a4b"
        />
        <text
          x={245}
          y={105}
          textAnchor="middle"
          fontSize="11"
          fill="white"
          fontWeight="700"
        >
          Orchestrator
        </text>
        <line
          x1={185}
          y1={115}
          x2={305}
          y2={115}
          stroke="#c7dccd"
          opacity="0.4"
        />
        <text x={245} y={132} textAnchor="middle" fontSize="9" fill="#e3ede5">
          Smart Router
        </text>
        <text x={245} y={148} textAnchor="middle" fontSize="9" fill="#e3ede5">
          IFT Cost Engine
        </text>
        <text x={245} y={164} textAnchor="middle" fontSize="9" fill="#e3ede5">
          Sliding Window
        </text>
        <text
          x={245}
          y={180}
          textAnchor="middle"
          fontSize="9"
          fill="#c7dccd"
          fontWeight="600"
        >
          Failover
        </text>
      </g>
      {[
        { y: 20, name: "Bank A", note: "IMPS · NEFT" },
        { y: 90, name: "Bank B", note: "RTGS · UPI", selected: true },
        { y: 160, name: "Bank C", note: "IMPS · UPI" },
        { y: 230, name: "Bank D", note: "Standby", dashed: true },
      ].map((b) => (
        <Node
          key={b.name}
          x={420}
          y={b.y}
          w={130}
          h={42}
          label={b.name}
          sub={b.note}
          dashed={b.dashed}
        />
      ))}
      <AnimLine x1={120} y1={140} x2={168} y2={140} delay={0} />
      <AnimLine x1={320} y1={140} x2={418} y2={41} delay={0.3} />
      <AnimLine x1={320} y1={140} x2={418} y2={111} em delay={0.4} />
      <AnimLine x1={320} y1={140} x2={418} y2={181} delay={0.5} />
      <AnimLine x1={320} y1={140} x2={418} y2={251} dashed delay={0.6} />
      <text x={345} y={108} fontSize="9" fill="#4a8460" fontWeight="700">
        selected
      </text>
    </svg>
  );
}

function WalletDiagram() {
  return (
    <svg viewBox="0 0 600 280" className="w-full h-auto">
      {arrowDefs}
      {[20, 80, 140].map((y, i) => (
        <g key={y}>
          <Node x={20} y={y} w={90} h={34} label={`TX #${i + 1}`} />
          <AnimLine x1={110} y1={y + 17} x2={200} y2={140} delay={i * 0.1} />
        </g>
      ))}
      <g>
        <rect
          x={200}
          y={110}
          width={140}
          height={70}
          rx="12"
          fill="#fff7ed"
          stroke="#f59e0b"
          strokeWidth="1.2"
        />
        <text
          x={270}
          y={135}
          textAnchor="middle"
          fontSize="11"
          fill="#92400e"
          fontWeight="700"
        >
          Redis Lock
        </text>
        <text x={270} y={152} textAnchor="middle" fontSize="9" fill="#92400e">
          SETNX + TTL
        </text>
        <text x={270} y={167} textAnchor="middle" fontSize="9" fill="#92400e">
          Fencing Token
        </text>
      </g>
      <Node
        x={400}
        y={90}
        w={130}
        h={60}
        primary
        label="Wallet Svc"
        sub="debit / credit"
      />
      <g>
        <ellipse
          cx={465}
          cy={230}
          rx={70}
          ry={14}
          fill="white"
          stroke="#c7cdc7"
        />
        <path
          d="M395,230 Q395,250 465,250 Q535,250 535,230"
          fill="none"
          stroke="#c7cdc7"
        />
        <text
          x={465}
          y={235}
          textAnchor="middle"
          fontSize="10"
          fill="#1f3527"
          fontWeight="600"
        >
          PostgreSQL
        </text>
      </g>
      <AnimLine x1={340} y1={140} x2={398} y2={115} em delay={0.5} />
      <AnimLine x1={465} y1={150} x2={465} y2={215} em delay={0.7} />
      <text x={360} y={105} fontSize="9" fill="#525d52">
        acquire
      </text>
      <text x={475} y={185} fontSize="9" fill="#525d52">
        commit
      </text>
    </svg>
  );
}

function RetryDiagram() {
  return (
    <svg viewBox="0 0 600 280" className="w-full h-auto">
      {arrowDefs}
      <Node
        x={20}
        y={115}
        w={80}
        h={50}
        primary
        label="TX init"
        sub="pending"
      />
      <Node x={140} y={115} w={110} h={50} label="Kafka" sub="status.poll" />
      <Node
        x={290}
        y={115}
        w={120}
        h={50}
        primary
        label="Poll Worker"
        sub="exp. backoff"
      />
      <g>
        <rect
          x={460}
          y={40}
          width={110}
          height={42}
          rx="10"
          fill="#f0fdf4"
          stroke="#10b981"
        />
        <text
          x={515}
          y={58}
          textAnchor="middle"
          fontSize="10"
          fill="#065f46"
          fontWeight="700"
        >
          SUCCESS
        </text>
        <text x={515} y={72} textAnchor="middle" fontSize="9" fill="#065f46">
          ack & exit
        </text>
      </g>
      <Node x={460} y={115} w={110} h={42} label="PENDING" sub="re-enqueue" />
      <g>
        <rect
          x={460}
          y={190}
          width={110}
          height={42}
          rx="10"
          fill="#fef2f2"
          stroke="#ef4444"
        />
        <text
          x={515}
          y={208}
          textAnchor="middle"
          fontSize="10"
          fill="#991b1b"
          fontWeight="700"
        >
          DLQ
        </text>
        <text x={515} y={222} textAnchor="middle" fontSize="9" fill="#991b1b">
          manual review
        </text>
      </g>
      <AnimLine x1={100} y1={140} x2={138} y2={140} delay={0} />
      <AnimLine x1={250} y1={140} x2={288} y2={140} delay={0.2} />
      <AnimLine x1={410} y1={130} x2={458} y2={62} em delay={0.4} />
      <AnimLine x1={410} y1={140} x2={458} y2={135} delay={0.5} />
      <AnimLine x1={410} y1={150} x2={458} y2={210} delay={0.6} />
      <motion.path
        d="M 515 158 Q 555 175 555 200 Q 555 225 510 200 L 280 200 Q 200 200 200 168"
        fill="none"
        stroke="#9aa39a"
        strokeWidth="1"
        strokeDasharray="3 3"
        markerEnd="url(#arr-light)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.9, delay: 0.85, ease: "easeInOut" }}
      />
    </svg>
  );
}

function RateLimitDiagram() {
  return (
    <svg viewBox="0 0 600 280" className="w-full h-auto">
      {arrowDefs}
      <Node x={20} y={115} w={100} h={50} label="Request" sub="incoming" />
      <Node
        x={170}
        y={115}
        w={130}
        h={50}
        primary
        label="Limiter"
        sub="sliding window"
      />
      <g>
        <rect
          x={350}
          y={50}
          width={220}
          height={180}
          rx="14"
          fill="white"
          stroke="#c7cdc7"
        />
        <text
          x={460}
          y={70}
          textAnchor="middle"
          fontSize="10"
          fill="#525d52"
          fontWeight="600"
        >
          Redis Sorted Set
        </text>
        {/* Time buckets */}
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i}>
            <rect
              x={370 + i * 40}
              y={90}
              width="32"
              height="20"
              rx="3"
              fill={i === 4 ? "#4a8460" : "#e3ede5"}
            />
            <text
              x={386 + i * 40}
              y={104}
              textAnchor="middle"
              fontSize="9"
              fill={i === 4 ? "white" : "#525d52"}
            >
              t-{4 - i}
            </text>
          </g>
        ))}
        {/* Bars (count per window) */}
        {[20, 35, 50, 42, 60].map((h, i) => (
          <motion.rect
            key={i}
            x={370 + i * 40}
            y={210 - h}
            width="32"
            height={h}
            fill={h > 55 ? "#dc2626" : "#6a9f7b"}
            rx="3"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 0.3 + i * 0.08, duration: 0.4 }}
            style={{ transformOrigin: `${386 + i * 40}px 210px` }}
          />
        ))}
        <line
          x1={365}
          y1={150}
          x2={580}
          y2={150}
          stroke="#dc2626"
          strokeWidth="1"
          strokeDasharray="3 3"
        />
        <text
          x={575}
          y={148}
          textAnchor="end"
          fontSize="9"
          fill="#dc2626"
          fontWeight="600"
        >
          limit
        </text>
      </g>
      <AnimLine x1={120} y1={140} x2={168} y2={140} delay={0} />
      <AnimLine x1={300} y1={140} x2={348} y2={140} em delay={0.2} />
    </svg>
  );
}

function LiquidityDiagram() {
  return (
    <svg viewBox="0 0 600 280" className="w-full h-auto">
      {arrowDefs}
      <g>
        <rect
          x={200}
          y={20}
          width={200}
          height={50}
          rx="12"
          fill="#4a8460"
          stroke="#386a4b"
        />
        <text
          x={300}
          y={42}
          textAnchor="middle"
          fontSize="11"
          fill="white"
          fontWeight="700"
        >
          Allocation Engine
        </text>
        <text x={300} y={58} textAnchor="middle" fontSize="9" fill="#c7dccd">
          TPS · success · cost
        </text>
      </g>
      {[
        { x: 30, name: "Bank A", pct: 35, util: 60 },
        { x: 175, name: "Bank B", pct: 28, util: 80 },
        { x: 320, name: "Bank C", pct: 22, util: 45 },
        { x: 465, name: "Bank D", pct: 15, util: 30 },
      ].map((b, i) => (
        <g key={b.name}>
          <rect
            x={b.x}
            y={130}
            width="105"
            height={42}
            rx="10"
            fill="white"
            stroke="#c7cdc7"
          />
          <text
            x={b.x + 52}
            y={148}
            textAnchor="middle"
            fontSize="10"
            fill="#1f3527"
            fontWeight="600"
          >
            {b.name}
          </text>
          <text
            x={b.x + 52}
            y={163}
            textAnchor="middle"
            fontSize="9"
            fill="#525d52"
          >
            {b.pct}% capital
          </text>

          {/* utilization bar */}
          <rect x={b.x} y={195} width="105" height="8" rx="4" fill="#e3ede5" />
          <motion.rect
            x={b.x}
            y={195}
            height="8"
            rx="4"
            fill={b.util > 75 ? "#dc2626" : "#4a8460"}
            initial={{ width: 0 }}
            animate={{ width: 105 * (b.util / 100) }}
            transition={{ delay: 0.4 + i * 0.1, duration: 0.6 }}
          />
          <text x={b.x} y={220} fontSize="9" fill="#525d52">
            util: {b.util}%
          </text>

          <AnimLine
            x1={300}
            y1={70}
            x2={b.x + 52}
            y2={128}
            em
            delay={0.1 + i * 0.08}
          />
        </g>
      ))}
      <text x={20} y={250} fontSize="9" fill="#525d52" fontWeight="600">
        Rebalancer continuously redistributes based on utilization
      </text>
    </svg>
  );
}

function IdempotencyDiagram() {
  return (
    <svg viewBox="0 0 600 280" className="w-full h-auto">
      {arrowDefs}

      {/* Client */}
      <g>
        <rect
          x={40}
          y={110}
          width={110}
          height={45}
          rx="10"
          fill="#ffffff"
          stroke="#c7cdc7"
        />
        <text
          x={95}
          y={132}
          textAnchor="middle"
          fontSize="10"
          fill="#1f3527"
          fontWeight="600"
        >
          Client
        </text>
        <text x={95} y={147} textAnchor="middle" fontSize="9" fill="#525d52">
          Retry / Duplicate
        </text>
      </g>

      {/* Idempotency Layer */}
      <g>
        <rect
          x={220}
          y={20}
          width={160}
          height={50}
          rx="12"
          fill="#4a8460"
          stroke="#386a4b"
        />
        <text
          x={300}
          y={42}
          textAnchor="middle"
          fontSize="11"
          fill="white"
          fontWeight="700"
        >
          Idempotency Layer
        </text>
        <text x={300} y={58} textAnchor="middle" fontSize="9" fill="#c7dccd">
          Key · Hash · Cache
        </text>
      </g>

      {/* Processing Service */}
      <g>
        <rect
          x={240}
          y={110}
          width={120}
          height={45}
          rx="10"
          fill="#ffffff"
          stroke="#c7cdc7"
        />
        <text
          x={300}
          y={132}
          textAnchor="middle"
          fontSize="10"
          fill="#1f3527"
          fontWeight="600"
        >
          Payment Service
        </text>
        <text x={300} y={147} textAnchor="middle" fontSize="9" fill="#525d52">
          Process once
        </text>
      </g>

      {/* Response Store */}
      <g>
        <rect
          x={420}
          y={110}
          width={120}
          height={45}
          rx="10"
          fill="#ffffff"
          stroke="#c7cdc7"
        />
        <text
          x={480}
          y={132}
          textAnchor="middle"
          fontSize="10"
          fill="#1f3527"
          fontWeight="600"
        >
          Response Store
        </text>
        <text x={480} y={147} textAnchor="middle" fontSize="9" fill="#525d52">
          Cached Result
        </text>
      </g>

      {/* Arrows */}
      <AnimLine x1={150} y1={132} x2={220} y2={45} em delay={0.1} />
      <AnimLine x1={300} y1={70} x2={300} y2={110} em delay={0.2} />
      <AnimLine x1={360} y1={132} x2={420} y2={132} em delay={0.3} />

      {/* Replay path (duplicate request) */}
      <AnimLine x1={420} y1={155} x2={150} y2={155} em delay={0.5} />

      {/* Labels */}
      <text x={180} y={90} fontSize="9" fill="#525d52">
        check key
      </text>
      <text x={310} y={95} fontSize="9" fill="#525d52">
        process if new
      </text>
      <text x={450} y={100} fontSize="9" fill="#525d52">
        store response
      </text>
      <text x={260} y={175} fontSize="9" fill="#525d52">
        replay on duplicate
      </text>

      <text x={20} y={250} fontSize="9" fill="#525d52" fontWeight="600">
        Ensures exactly-once processing by caching and replaying responses for
        duplicate requests
      </text>
    </svg>
  );
}
