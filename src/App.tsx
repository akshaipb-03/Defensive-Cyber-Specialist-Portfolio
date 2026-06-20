import { Navbar } from './components/Navbar';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { SkillsAndCerts } from './sections/SkillsAndCerts';
import { Projects } from './sections/Projects';
import { LogStream } from './components/LogStream';
import { SocAnalytics } from './sections/SocAnalytics';
import { Contact } from './sections/Contact';
import { Shield, Lock } from 'lucide-react';

function App() {
  return (
    <div className="bg-cyber-bg min-h-screen text-slate-300 relative flex flex-col font-sans selection:bg-cyber-cyan/30 selection:text-cyber-cyan scroll-smooth">
      {/* Scanline overlay for cyber terminal effect */}
      <div className="fixed inset-0 pointer-events-none z-40 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.12)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[size:100%_4px,4px_100%] opacity-40" />

      {/* Global Navigation & Telemetry */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-1 w-full pt-16 md:pt-24 z-10">
        <Hero />
        <About />
        <SkillsAndCerts />
        <Projects />

        {/* Dynamic Telemetry Panel Section */}
        <section className="py-12 px-4 border-b border-cyber-cyan-border/20 bg-slate-950/40">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            <div className="lg:col-span-1 flex flex-col gap-3">
              <span className="font-mono text-[10px] text-cyber-cyan uppercase tracking-widest font-bold">
                [SYSTEM_INTEGRATION_FEEDS]
              </span>
              <h3 className="font-display text-xl font-bold text-white uppercase tracking-wide flex items-center gap-2">
                <Lock className="w-5 h-5 text-cyber-cyan" />
                SIEM Ingestion Deck
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                This live telemetry module simulates threat landscape activity inside a mock virtual network. It parses simulated auditd, sshd, and Suricata IDS events, reflecting real-world incident response alerting logic.
              </p>
            </div>
            
            <div className="lg:col-span-2">
              <LogStream />
            </div>
          </div>
        </section>

        <SocAnalytics />

        <Contact />
      </main>

      {/* Footer */}
      <footer className="border-t border-cyber-cyan-border/20 bg-slate-950 py-8 px-4 font-mono text-center text-[10px] text-slate-600 tracking-wider relative z-10 select-none">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-cyber-cyan" />
            <span>SEC-OPS SECURE PROFILE // BUILD 9822</span>
          </div>
          <div>
            <span>© {new Date().getFullYear()} ALL RIGhTS RESERVED. ENCRYPTED PACKETS REGISTERED.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
