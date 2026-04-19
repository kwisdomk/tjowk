'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

type FormState = 'idle' | 'sending' | 'success' | 'error';

export function ContactForm() {
  const [state, setState] = useState<FormState>('idle');
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setState('sending');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setState(res.ok ? 'success' : 'error');
    } catch {
      setState('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="label-mono block mb-1.5">NAME</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            required
            placeholder="Your name"
            className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm font-mono text-neutral-300
                       placeholder:text-neutral-700 focus:outline-none focus:border-emerald-500/40 focus:bg-white/[0.05] transition-all"
          />
        </div>
        <div>
          <label className="label-mono block mb-1.5">EMAIL</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            required
            placeholder="your@email.com"
            className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm font-mono text-neutral-300
                       placeholder:text-neutral-700 focus:outline-none focus:border-emerald-500/40 focus:bg-white/[0.05] transition-all"
          />
        </div>
      </div>

      <div>
        <label className="label-mono block mb-1.5">MESSAGE</label>
        <textarea
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          required
          rows={5}
          placeholder="What are you building?"
          className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-sm font-mono text-neutral-300
                     placeholder:text-neutral-700 focus:outline-none focus:border-emerald-500/40 focus:bg-white/[0.05] transition-all resize-none"
        />
      </div>

      <div className="flex items-center justify-between">
        <AnimatePresence mode="wait">
          {state === 'success' && (
            <motion.p
              key="success"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 text-xs font-mono text-emerald-400"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              Message sent. I&apos;ll respond.
            </motion.p>
          )}
          {state === 'error' && (
            <motion.p
              key="error"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 text-xs font-mono text-red-400"
            >
              <AlertCircle className="w-3.5 h-3.5" />
              Failed to send. Try emailing directly.
            </motion.p>
          )}
          {state === 'idle' && <span />}
        </AnimatePresence>

        <button
          type="submit"
          disabled={state === 'sending' || state === 'success'}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30
                     text-xs font-mono text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-500/50
                     disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          {state === 'sending' ? (
            <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Sending...</>
          ) : (
            <><Send className="w-3.5 h-3.5" /> Send</>
          )}
        </button>
      </div>
    </form>
  );
}
