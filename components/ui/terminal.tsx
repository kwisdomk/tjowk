'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Square, TerminalSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

const FS: Record<string, string> = {
  'README.md': 'The Journey\nOperator: Wisdom Kinoti\nRole: Junior Cybersecurity Analyst\nLocation: Nairobi, Kenya . UTC+3\nMachine: Athena (HP Victus 15 - i5-13420H / RTX 3050 / 8GB DDR4)\n\nphilosophos - not a persona. A disposition.',
  '/etc/os-release': 'NAME="kOS"\nVERSION="2026.1"\nPRETTY_NAME="kOS Rolling"\nHOME_URL="https://wisdomkinoti.com/"',
  '/etc/passwd': 'root:x:0:0:root:/root:/bin/bash\nwisdom:x:1000:1000:Wisdom Kinoti:/home/wisdom:/bin/zsh',
  'projects.txt': '[ACTIVE SYSTEMS]\n  OTDT      - OT Digital Twin. MAS 9.1 on OpenShift. EAAAIW 2026.\n  WisdomAI  - 6-agent WhatsApp health triage. 78 tests passed.\n  HAKI      - IBM DevDay. AI telemedicine. Team Lead.\n  vulai     - Vulnerability CLI. Shipped on PyPI.\n  AEGIS     - Windows diagnostics. Stateless. v1.0.',
  'skills.txt': '[CORE STACK]\n  Security  - QRadar SIEM, Guardium, IAM, SOC ops\n  AI/Agents - LangGraph, IBM Granite, watsonx, RAG\n  Systems   - RHEL 10, OpenShift, IBM MAS, Linux\n  Frontend  - Next.js 15, TypeScript, Tailwind\n  Languages - Python, TypeScript, Bash, Java',
};

type CmdFn = (args: string[], cwd: string) => { output: string; newCwd?: string };

const BOOT_MSG = 'kOS Terminal v2.0\nType \'help\' for available commands.';

function makeCommands(setCwd: (c: string) => void): Record<string, CmdFn> {
  return {
    help: () => ({ output: 'Available Commands:\n  Navigation  : ls, pwd, cd <dir>\n  Files       : cat <file>, file <file>\n  System      : uname, uname -a, whoami, id, uptime\n  Network     : ifconfig, ip addr, ping <host>\n  Security    : nmap, nmap -sV, whois <domain>\n  Info        : history, env, ps, top\n  Portfolio   : projects, skills, certs, contact\n  Terminal    : clear, exit, man <cmd>' }),
    ls: (_args, cwd) => ({ output: cwd === '~' ? 'drwxr-xr-x  Documents\ndrwxr-xr-x  Downloads\n-rw-r--r--  README.md\n-rw-r--r--  projects.txt\n-rw-r--r--  skills.txt' : '-rw-r--r--  file.txt' }),
    pwd: (_args, cwd) => ({ output: cwd === '~' ? '/home/wisdom' : '/home/wisdom/' + cwd }),
    cd: (args, cwd) => {
      if (!args[0] || args[0] === '~') { setCwd('~'); return { output: '', newCwd: '~' }; }
      if (args[0] === '..') { setCwd('~'); return { output: '', newCwd: '~' }; }
      if (['Documents', 'Downloads'].includes(args[0]) && cwd === '~') { setCwd(args[0]); return { output: '', newCwd: args[0] }; }
      return { output: 'bash: cd: ' + args[0] + ': No such file or directory' };
    },
    cat: (args) => {
      if (!args[0]) return { output: 'Usage: cat <filename>' };
      const content = FS[args[0]] || FS['/etc/' + args[0]];
      if (content) return { output: content };
      return { output: 'cat: ' + args[0] + ': No such file or directory' };
    },
    file: (args) => {
      if (!args[0]) return { output: 'Usage: file <filename>' };
      if (FS[args[0]]) return { output: args[0] + ': ASCII text' };
      return { output: 'file: ' + args[0] + ': Cannot open' };
    },
    whoami: () => ({ output: 'wisdom' }),
    id: () => ({ output: 'uid=1000(wisdom) gid=1000(wisdom) groups=1000(wisdom),27(sudo)' }),
    uname: (args) => { if (args[0] === '-a') return { output: 'kOS wisdom-kos 6.18.12-kos-amd64 x86_64 kOS' }; return { output: 'kOS' }; },
    uptime: () => { const now = new Date(); const h = now.getHours().toString().padStart(2, '0'); const m = now.getMinutes().toString().padStart(2, '0'); return { output: h + ':' + m + ':00 up 47 days, 1 user, load: 0.42' }; },
    ifconfig: () => ({ output: 'eth0: inet 192.168.1.42  netmask 255.255.255.0\nlo:   inet 127.0.0.1  netmask 255.0.0.0' }),
    ip: (args) => { if (args[0] === 'addr' || args[0] === 'a') return { output: '1: lo: inet 127.0.0.1/8\n2: eth0: inet 192.168.1.42/24' }; return { output: 'Usage: ip addr' }; },
    ping: (args) => { if (!args[0]) return { output: 'Usage: ping <host>' }; return { output: 'PING ' + args[0] + ': icmp_seq=1 time=12.4 ms\n2 packets transmitted, 0% packet loss' }; },
    nmap: (args) => { if (args[0] === '-sV') return { output: '22/tcp  open ssh     OpenSSH 9.6p1\n80/tcp  open http    nginx 1.26.0\n3000/tcp open http   Node.js' }; return { output: '22/tcp  open ssh\n80/tcp  open http\n3000/tcp open ppp' }; },
    whois: (args) => { if (!args[0]) return { output: 'Usage: whois <domain>' }; return { output: 'Domain: ' + args[0].toUpperCase() + '\nRegistrar: GoDaddy.com\nRegistrant: REDACTED' }; },
    ps: () => ({ output: '  PID CMD\n    1 systemd\n  847 sshd\n 1891 node\n 2341 ps' }),
    top: () => ({ output: 'top: up 47 days | Tasks: 187 | %Cpu: 4.2 us | MiB Mem: 7832.0 total' }),
    env: () => ({ output: 'SHELL=/bin/zsh\nUSER=wisdom\nHOME=/home/wisdom\nKOS_VERSION=2026.1' }),
    history: () => ({ output: '    1  sudo apt update\n    2  nmap -sV 192.168.1.1\n    3  cat /etc/os-release\n    4  git clone https://github.com/kwisdomk/aegis\n    5  help' }),
    man: (args) => { if (!args[0]) return { output: 'Usage: man <command>' }; return { output: 'MAN(1) -- ' + args[0] + ': manual page not found.\nTry: ' + args[0] + ' --help' }; },
    projects: () => ({ output: FS['projects.txt'] }),
    skills: () => ({ output: FS['skills.txt'] }),
    certs: () => ({ output: '[COMPLETE]\n  IBM QRadar SIEM L2          88%\n  IBM Agentic AI Hands-On     Mar 2026\n  Anthropic Claude 101        100%\n\n[IN PROGRESS]\n  ISC2 CC           -> Sep 2026\n  CompTIA Security+ -> 2026\n  RHSA I (RH124)    ~46%' }),
    contact: () => ({ output: 'GitHub   github.com/kwisdomk\nLinkedIn linkedin.com/in/kwisdomk\nEmail    wisdomkinoti@proton.me' }),
    exit: () => ({ output: 'Use the x button to close the terminal.' }),
  };
}

interface HistoryItem { command: string; output: string; prompt: string; }
interface TerminalProps { onClose: () => void; }

export function Terminal({ onClose }: TerminalProps) {
  const [cwd, setCwd] = useState('~');
  const [history, setHistory] = useState<HistoryItem[]>([{ command: '', output: BOOT_MSG, prompt: '' }]);
  const [input, setInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const COMMANDS = makeCommands(setCwd);
  const promptInline = 'wisdom@kOS:' + cwd + '$';

  useEffect(() => { inputRef.current?.focus(); }, []);
  useEffect(() => { scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' }); }, [history]);

  const handleCommand = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') { e.preventDefault(); const idx = Math.min(histIdx + 1, cmdHistory.length - 1); setHistIdx(idx); setInput(cmdHistory[idx] ?? ''); return; }
    if (e.key === 'ArrowDown') { e.preventDefault(); const idx = Math.max(histIdx - 1, -1); setHistIdx(idx); setInput(idx === -1 ? '' : cmdHistory[idx] ?? ''); return; }
    if (e.key !== 'Enter') return;
    const raw = input.trim();
    const [cmd, ...args] = raw.toLowerCase().split(/\s+/);
    if (raw === 'clear') { setHistory([{ command: '', output: 'Terminal cleared.', prompt: '' }]); setInput(''); setCmdHistory((h) => [raw, ...h]); setHistIdx(-1); return; }
    const handler = COMMANDS[cmd];
    const result = handler ? handler(args, cwd) : { output: 'bash: ' + cmd + ': command not found\nTry \'help\' for available commands.' };
    if (result.newCwd) setCwd(result.newCwd);
    setHistory((prev) => [...prev, { command: raw, output: result.output, prompt: promptInline }]);
    setCmdHistory((h) => [raw, ...h]);
    setHistIdx(-1);
    setInput('');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input, cwd, histIdx, cmdHistory]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: 12 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="fixed inset-4 md:inset-[8%] z-50 flex flex-col rounded-xl overflow-hidden shadow-2xl glass"
    >
      <div className="flex items-center justify-between px-4 py-3 flex-shrink-0 select-none border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <button onClick={onClose} className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors flex items-center justify-center group">
            <X className="w-2 h-2 text-red-900 opacity-0 group-hover:opacity-100" />
          </button>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80 hover:bg-emerald-500 transition-colors" />
        </div>
        <div className="flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
          <TerminalSquare className="w-4 h-4 text-emerald" />
          <span className="text-xs font-mono tracking-wider text-muted-custom">kOS Terminal</span>
        </div>
        <div className="flex items-center gap-2 text-muted-custom">
          <Minus className="w-3.5 h-3.5 cursor-pointer hover:text-primary transition-colors" />
          <Square className="w-3.5 h-3.5 cursor-pointer hover:text-primary transition-colors" />
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 font-mono text-xs leading-relaxed text-secondary-custom" onClick={() => inputRef.current?.focus()}>
        {history.map((item, i) => (
          <div key={i}>
            {item.command && (
              <div className="flex gap-2 whitespace-pre-wrap mb-1">
                <span className="text-emerald">{item.prompt}</span>
                <span className="text-primary">{item.command}</span>
              </div>
            )}
            {item.output && <pre className="whitespace-pre-wrap leading-relaxed font-mono-custom text-muted-custom">{item.output}</pre>}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 px-4 py-3 flex-shrink-0 border-t border-border-subtle">
        <span className="text-emerald font-mono text-xs whitespace-nowrap">{promptInline}</span>
        <input ref={inputRef} type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleCommand} className="flex-1 bg-transparent font-mono text-xs text-primary border-none outline-none caret-emerald" spellCheck={false} autoComplete="off" autoCorrect="off" />
        <span className="w-2 h-4 animate-pulse bg-emerald/80" />
      </div>
    </motion.div>
  );
}

interface TerminalButtonProps { className?: string; }

export function TerminalButton({ className }: TerminalButtonProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <AnimatePresence>{open && <Terminal onClose={() => setOpen(false)} />}</AnimatePresence>
      <button
        onClick={() => setOpen((o) => !o)}
        className={cn('fixed bottom-6 right-6 z-40 flex items-center gap-2 px-3 py-2 rounded-xl glass', 'text-xs font-mono transition-all duration-200', 'text-muted-custom hover:text-emerald', open ? 'text-emerald' : '', className)}
      >
        <TerminalSquare className="w-3.5 h-3.5" />
        {open ? 'close' : 'Terminal'}
      </button>
    </>
  );
}