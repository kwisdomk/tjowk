import Link from 'next/link';
import { TerminalSquare, Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-32 flex flex-col items-center justify-center text-center space-y-8 min-h-[70vh]">
      <div className="relative">
        <div className="absolute inset-0 bg-emerald-500/20 blur-3xl rounded-full" />
        <TerminalSquare className="w-24 h-24 text-emerald relative z-10" strokeWidth={1} />
      </div>
      
      <div className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-mono font-bold text-primary tracking-tight">
          <span className="text-emerald">404</span> | Process Terminated
        </h1>
        <p className="text-secondary-custom font-mono text-sm max-w-lg mx-auto">
          The requested system resource could not be found. 
          It may have been moved, deleted, or you lack sufficient clearance.
        </p>
      </div>

      <div className="p-6 border border-border-subtle rounded-xl bg-surface-2 w-full max-w-md text-left font-mono text-xs text-muted-custom">
        <p><span className="text-emerald">wisdom@kOS:~$</span> ping resource</p>
        <p>ping: resource: Name or service not known</p>
        <p className="mt-2"><span className="text-emerald">wisdom@kOS:~$</span> _</p>
      </div>

      <div className="flex gap-4 pt-4">
        <Link 
          href="/"
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border-subtle bg-surface hover:border-emerald/50 hover:text-emerald transition-colors font-mono text-sm"
        >
          <Home className="w-4 h-4" />
          Return to Base
        </Link>
      </div>
    </div>
  );
}
