'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, TerminalSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

const COMMANDS: Record<string, string | (() => string)> = {
  help: `Available commands:
  help       — show this list
  about      — who is φιλόσοφος
  projects   — active systems
  skills     — technical stack
  certs      — credentials
  contact    — how to reach me
  status     — current operations
  clear      — clear terminal`,

  about:
    'Wisdom Kinoti. Junior Cybersecurity Analyst. CS Sophomore at Zetech. IBM i3 Intern. Nairobi, Kenya · UTC+3. Machine: Athena (HP Victus 15). φιλόσοφος — not a persona. A disposition.',

  projects: `FEATURED SYSTEMS:
  OTDT       — OT Digital Twin. MAS 9.1 on OpenShift. EAAAIW 2026.
  WisdomAI   — 6-agent WhatsApp health triage. 78 tests.
  HAKI       — IBM DevDay. AI telemedicine. Team Lead.
  vulai      — Vulnerability CLI. Shipped on PyPI.
  AEGIS      — Windows diagnostics. Stateless. v1.0.`,

  skills: `CORE STACK:
  Security   — QRadar SIEM, Guardium, IAM, SOC ops
  AI/Agents  — LangGraph, IBM Granite, watsonx, RAG
  Systems    — RHEL 10, OpenShift, IBM MAS, Linux
  Frontend   — Next.js 15, TypeScript, Tailwind
  Languages  — Python, TypeScript, Bash, Java`,

  certs: `COMPLETE:
  IBM QRadar SIEM L2            88%
  IBM QRadar SIEM L3 Tech Sales 100%
  IBM QRadar Architecture       90%
  IBM Agentic AI Hands-On       Mar 2026
  Anthropic Claude 101          100%

IN PROGRESS:
  ISC2 CC                       → Sep 2026
  CompTIA Security+             → 2026
  CEH                           → 2026
  RHSA I (RH124)                ~46% · Ch9`,

  contact: `GitHub (primary)  github.com/kwisdomk
GitHub (secondary) github.com/6ofHertz
LinkedIn           linkedin.com/in/kwisdomk
Email              wisdomkinoti@proton.me`,

  status: `CURRENT OPERATIONS:
  Primary    → Building The Journey (portfolio v2)
  Secondary  → RHSA I — RH124 Ch9 I/O Redirection
  Machine    → Athena (HP Victus 15)
  Uptime     → ACTIVE`,
};

interface TerminalProps {
  onClose: () => void;
}

interface HistoryItem {
  command: string;
  output: string;
}

export function Terminal({ onClose }: TerminalProps) {
  const [history, setHistory] = useState<HistoryItem[]>([
    { command: '', output: 'Athena Terminal v1.0 — type "help" to begin' },
  ]);
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e: React.KeyboardEvent) => {
    if (e.key !== 'Enter') return;
    const cmd = input.trim().toLowerCase();

    if (cmd === 'clear') {
      setHistory([{ command: '', output: 'Terminal cleared.' }]);
      setInput('');
      return;
    }

    const output = COMMANDS[cmd] != null
      ? typeof COMMANDS[cmd] === 'function'
        ? (COMMANDS[cmd] as () => string)()
        : COMMANDS[cmd] as string
      : `Command not found: "${cmd}" — type "help" for available commands`;

    setHistory((prev) => [...prev, { command: cmd, output }]);
    setInput('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-4 md:inset-1/4 z-50 rounded-2xl border border-white/10 bg-black/90 backdrop-blur-2xl flex flex-col overflow-hidden shadow-2xl"
    >
      {/* Title bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06] flex-shrink-0">
        <div className="flex items-center gap-2">
          <TerminalSquare className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-xs font-mono text-neutral-400 tracking-widest uppercase">Athena Terminal</span>
        </div>
        <button
          onClick={onClose}
          className="text-neutral-600 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Output */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-3"
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((item, i) => (
          <div key={i} className="font-mono text-xs">
            {item.command && (
              <p className="text-emerald-400 mb-0.5">
                <span className="text-neutral-600">athena@wisdom</span>
                <span className="text-neutral-700"> ~ </span>
                <span className="text-emerald-400">$ </span>
                {item.command}
              </p>
            )}
            <pre className="text-neutral-300 whitespace-pre-wrap leading-relaxed">{item.output}</pre>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 px-4 py-3 border-t border-white/[0.06] flex-shrink-0">
        <span className="font-mono text-xs text-neutral-600">athena@wisdom</span>
        <span className="font-mono text-xs text-neutral-700">~</span>
        <span className="font-mono text-xs text-emerald-400">$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleCommand}
          className="flex-1 bg-transparent font-mono text-xs text-neutral-200 border-none outline-none"
          spellCheck={false}
          autoComplete="off"
          placeholder="type a command..."
        />
      </div>
    </motion.div>
  );
}

/* ── Trigger button ── */
interface TerminalButtonProps {
  className?: string;
}

export function TerminalButton({ className }: TerminalButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AnimatePresence>{open && <Terminal onClose={() => setOpen(false)} />}</AnimatePresence>
      <button
        onClick={() => setOpen(true)}
        className={cn(
          'fixed bottom-6 right-6 z-40 flex items-center gap-2 px-3 py-2 rounded-xl',
          'border border-white/10 bg-black/70 backdrop-blur-xl',
          'text-xs font-mono text-neutral-400 hover:text-emerald-400 hover:border-emerald-500/30',
          'transition-all duration-200 hover:shadow-lg hover:shadow-emerald-950/50',
          className
        )}
      >
        <TerminalSquare className="w-3.5 h-3.5" />
        Terminal
      </button>
    </>
  );
}
