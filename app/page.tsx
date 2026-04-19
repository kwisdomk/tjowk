'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Maximize2, Terminal as TerminalIcon, X } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { ModeToggle } from '@/components/ui/theme-toggle';

// --- Data ---
const skillsData = [
  { subject: 'Security', A: 100, fullMark: 100 },
  { subject: 'AI Orchestration', A: 85, fullMark: 100 },
  { subject: 'Frontend', A: 80, fullMark: 100 },
  { subject: 'Backend', A: 70, fullMark: 100 },
  { subject: 'Cloud', A: 40, fullMark: 100 },
  { subject: 'DevOps', A: 40, fullMark: 100 },
];

const projects = {
    HAKI: { title: 'Agentic Healthcare Orchestrator', tagline: 'Team Lead in the IBM Dev Day Hackathon.', tech: ['Granite', 'watsonx', 'IBM Maximo'], details: { problem: 'Rural diagnostic gaps.', solution: 'Agentic AI triage via IBM Granite.', result: 'IBM Dev Day Team Lead.' }, link: 'github.com/kwisdomk/haki' },
    AELPHER: { title: 'Personal Execution OS', tagline: 'A RAG-powered dashboard to synchronize high-velocity context.', tech: ['Next.js', 'Python', 'RAG'], details: { problem: 'High-velocity context switching.', solution: 'Personal RAG pipeline.', result: 'Zero missed deliverables/3.8 GPA.' }, link: 'github.com/kwisdomk/aelpher' },
};

// --- Components ---

const GlassCard = ({ children, className = '', title, onClick, controls }) => (
  <motion.div layout className={`group relative overflow-hidden rounded-2xl border border-white/5 bg-black/50 backdrop-blur-2xl transition-all duration-300 hover:border-white/20 ${className}`} onClick={onClick}>
    <div className="relative p-6 h-full flex flex-col">
        <div className="mb-4 border-b border-white/10 pb-2 flex justify-between items-center">
          <h3 className="text-sm font-mono text-neutral-400 uppercase tracking-wider">{title}</h3>
          <div className="flex items-center gap-2">{controls}</div>
        </div>
      {children}
    </div>
  </motion.div>
);

const UtilBar = ({ label, value, colorClass }) => (
    <div className="w-full"><div className="flex justify-between items-center text-xs text-neutral-400 mb-1 font-mono"><span>{label}</span><span>{value}%</span></div><div className="h-1.5 bg-white/5 rounded-full overflow-hidden"><div className={`h-full ${colorClass}`} style={{ width: `${value}%`, transition: 'width 0.5s ease-in-out' }}></div></div></div>
);

const ActiveLogEntry = ({ number, date, title, status, focus }) => {
    const statusColor = status === 'ACTIVE' ? 'text-emerald-400' : status === 'STABLE' ? 'text-blue-400' : 'text-red-400';
    return (<div className="font-mono text-sm text-neutral-300 mb-4"><p><span className="text-neutral-500">ENTRY {number} ({date}):</span> {title}. <span className={statusColor}>Status: [{status}]</span>. <span className="text-neutral-500">Focus:</span> {focus}</p></div>);
};

const Clock = () => {
  const [time, setTime] = useState('');
  useEffect(() => { const timerId = setInterval(() => { const date = new Date(); const utc3Time = new Date(date.getTime() + (3 * 60 * 60 * 1000)); setTime(utc3Time.toLocaleTimeString('en-GB', { hour12: false, timeZone: 'UTC' })); }, 1000); return () => clearInterval(timerId); }, []);
  return <span className="text-neutral-500">{time} UTC+3</span>;
};

const Badge = ({ title, status }) => {
    const statusColor = status === 'Complete' ? 'bg-green-500' : 'bg-yellow-500';
    return (<div className="flex items-center justify-between text-xs font-mono p-2 rounded border border-white/10 bg-black/40"><span>{title}</span><div className="flex items-center"><span className={`w-2 h-2 rounded-full ${statusColor} mr-2`}></span><span className="text-neutral-400">{status}</span></div></div>);
};

const Terminal = ({ onClose }) => {
    const [history, setHistory] = useState([]);
    const [input, setInput] = useState('');
    const inputRef = useRef(null);

    const commands = {
        help: 'Available commands: help, projects, skills, contact, about, clear',
        projects: '01: HAKI [Healthcare AI] | 02: AELPHER [Personal RAG]',
        skills: JSON.stringify({ security: 100, ai_orchestration: 85, frontend: 80, backend: 70, cloud: 40, devops: 40 }, null, 2),
        contact: 'LinkedIn: /wisdomkinoti | GitHub: /kwisdomk',
        about: 'Stoic discipline applied to systems architecture. Architecting resilient agentic AI.',
        clear: () => setHistory([]),
    };

    const handleCommand = (e) => {
        if (e.key === 'Enter') {
            const command = input.trim().toLowerCase();
            const output = commands[command];
            const newHistory = [...history, { command, output: output ? output : `Command not found: ${command}` }];
            if (command === 'clear') {
                setHistory([]);
            } else {
                setHistory(newHistory);
            }
            setInput('');
        }
    };

    useEffect(() => { inputRef.current?.focus(); }, []);

    return (
        <GlassCard title="Terminal" className="fixed inset-1/4 z-50" controls={<button onClick={onClose}><X className="w-4 h-4 text-neutral-500 hover:text-white"/></button>}>
            <div className="h-full overflow-y-auto font-mono text-xs" onClick={() => inputRef.current?.focus()}>
                {history.map((item, index) => (
                    <div key={index}>
                        <span className="text-emerald-400">> </span>{item.command}
                        <pre className="text-neutral-300 whitespace-pre-wrap">{typeof item.output === 'function' ? '' : item.output}</pre>
                    </div>
                ))}
                <div className="flex">
                    <span className="text-emerald-400">> </span>
                    <input ref={inputRef} type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleCommand} className="bg-transparent border-none text-neutral-200 w-full focus:outline-none" />
                </div>
            </div>
        </GlassCard>
    );
};

export default function Portfolio() {
  const [util, setUtil] = useState({ cpu: 75, ram: 58 });
  const [expandedNode, setExpandedNode] = useState(null);
  const [showTerminal, setShowTerminal] = useState(false);

  useEffect(() => {
      const utilInterval = setInterval(() => { setUtil({ cpu: Math.floor(Math.random() * 25) + 60, ram: Math.floor(Math.random() * 15) + 50 }); }, 2000);
      return () => clearInterval(utilInterval);
  }, []);

  const terminalButton = <button onClick={() => setShowTerminal(true)} className="p-1 rounded-md hover:bg-white/10"><TerminalIcon className="w-4 h-4" /></button>;

  return (
    <main className="min-h-screen bg-background text-foreground p-4 md:p-8 font-mono selection:bg-emerald-500/30" style={{ scrollBehavior: 'smooth' }}>
      <AnimatePresence>{showTerminal && <Terminal onClose={() => setShowTerminal(false)} />}</AnimatePresence>
      <header className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row justify-between items-start md:items-end">
        <div><h1 className="text-3xl md:text-4xl font-bold text-white tracking-tighter">WISDOM KINOTI</h1><p className="text-sm text-neutral-400 font-mono mt-1">SYSTEM ARCHITECT // IBM INTERN // [ACTIVATED: 19.01.26]</p></div>
        <div className="text-right mt-4 md:mt-0"><div className="flex items-center gap-2 text-emerald-400 text-xs font-mono bg-emerald-950/50 px-3 py-1.5 rounded-full border border-emerald-500/30"><span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span></span>STATUS: ACTIVE // ATHENA_ENGINE_STABLE</div><div className="text-xs mt-2 flex items-center gap-2"><Clock /><ModeToggle /></div></div>
      </header>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-auto">
        <div className="md:col-span-12"><GlassCard title="Active Execution Log"><ActiveLogEntry number="01" date="Jan 19, 2026" title="IBM Software Developer Internship" status="ACTIVE" focus="Architecting Agentic AI workflows via IBM Granite and watsonx Orchestrate." /><ActiveLogEntry number="02" date="Current" title="Zetech University // Year 2, Semester 2" status="STABLE" focus="Mastering Data Science and Calculus II while synchronizing academic theory with corporate deliverables." /><ActiveLogEntry number="03" date="Lab Environment" title="RHEL 10 Hardening (RH124)" status="CRITICAL" focus="Kernel optimization, SELinux policies, and enterprise virtualization within VMware sandboxes." /></GlassCard></div>
        <div className="md:col-span-3"><GlassCard title="Host: Athena v1.2" controls={terminalButton}><p className="font-mono text-xs text-neutral-400">13th Gen i5-13420H // RTX 3050 6GB // 8.00 GB DDR4</p><div className="mt-4 space-y-3"><UtilBar label="CPU_UTIL" value={util.cpu} colorClass="bg-green-500" /><UtilBar label="RAM_UTIL" value={util.ram} colorClass="bg-blue-500" /></div></GlassCard></div>
        <AnimatePresence>{expandedNode ? (<motion.div layoutId={expandedNode} className="md:col-span-6"><GlassCard title={`NODE: ${expandedNode}`} controls={<button onClick={() => setExpandedNode(null)}><X className="w-4 h-4 text-neutral-500 hover:text-white"/></button>}><h2 className="text-lg font-bold text-white mb-2">{projects[expandedNode].title}</h2><div className="text-xs font-mono space-y-2 text-neutral-300"><p><strong className='text-neutral-500'>Problem:</strong> {projects[expandedNode].details.problem}</p><p><strong className='text-neutral-500'>Solution:</strong> {projects[expandedNode].details.solution}</p><p><strong className='text-neutral-500'>Result:</strong> {projects[expandedNode].details.result}</p></div><a href={`https://${projects[expandedNode].link}`} target="_blank" className="text-xs font-mono mt-4 text-emerald-400 hover:underline">{projects[expandedNode].link}</a></GlassCard></motion.div>) : (<><div className="md:col-span-3"><GlassCard title="NODE: HAKI" controls={<button onClick={() => setExpandedNode('HAKI')}><Maximize2 className="w-4 h-4 text-neutral-500 group-hover:text-white transition-colors"/></button>}><h2 className="text-lg font-bold text-white mb-2">{projects.HAKI.title}</h2><p className="text-xs text-neutral-400 mb-3">{projects.HAKI.tagline}</p><div className="flex flex-wrap gap-2">{projects.HAKI.tech.map(tech => <span key={tech} className="text-[10px] font-mono px-2 py-1 bg-white/5 border border-white/10 rounded text-neutral-300">{tech}</span>)}</div></GlassCard></div><div className="md:col-span-3"><GlassCard title="NODE: AELPHER" controls={<button onClick={() => setExpandedNode('AELPHER')}><Maximize2 className="w-4 h-4 text-neutral-500 group-hover:text-white transition-colors"/></button>}><h2 className="text-lg font-bold text-white mb-2">{projects.AELPHER.title}</h2><p className="text-xs text-neutral-400">{projects.AELPHER.tagline}</p><div className="flex flex-wrap gap-2">{projects.AELPHER.tech.map(tech => <span key={tech} className="text-[10px] font-mono px-2 py-1 bg-white/5 border border-white/10 rounded text-neutral-300">{tech}</span>)}</div></GlassCard></div></>)}</AnimatePresence>
        <div className="md:col-span-3"><GlassCard title="Technical Arsenal"><ResponsiveContainer width="100%" height={200}><RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillsData}><PolarGrid stroke="rgba(255, 255, 255, 0.2)"/><PolarAngleAxis dataKey="subject" stroke="rgba(255, 255, 255, 0.7)" tickLine={false} axisLine={false} fontSize={10} /><Radar name="Skills" dataKey="A" stroke="#10B981" fill="#10B981" fillOpacity={0.6} /></RadarChart></ResponsiveContainer></GlassCard></div>
        <div className="md:col-span-3"><GlassCard title="Badge Wall"><div className="space-y-3"><Badge title="IBM QRadar SIEM Specialist" status="Complete" /><Badge title="IBM Guardium Data Protection" status="Complete" /><Badge title="Red Hat System Admin [RH124]" status="In-Progress" /></div></GlassCard></div>
      </div>
      <footer className="max-w-7xl mx-auto mt-12 pt-6 border-t border-white/10 text-center"><p className="text-sm text-neutral-400 mb-4 font-mono">"I operate at the intersection of technical mastery and philosophical inquiry. Prioritizing deep system understanding over surface-level completion."</p><p className="text-xs text-neutral-600 font-mono">Built with Next.js 14 & Athena Engine | © 2026 WISDOM KINOTI</p></footer>
    </main>
  );
}
