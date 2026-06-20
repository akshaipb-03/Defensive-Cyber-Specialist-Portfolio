import React, { useState, useEffect } from 'react';
import { Shield, Menu, X, Activity, Server, Clock } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [ping, setPing] = useState(15);
  const [currentTime, setCurrentTime] = useState('');

  // Simulating fluctuating network ping
  useEffect(() => {
    const interval = setInterval(() => {
      setPing((prev) => {
        const diff = Math.floor(Math.random() * 7) - 3; // -3 to +3
        const next = prev + diff;
        return next < 8 ? 8 : next > 32 ? 32 : next;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Syncing system clock readout
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toTimeString().split(' ')[0]);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { label: "About", id: "about" },
    { label: "Skills & Certs", id: "skills" },
    { label: "Projects", id: "projects" },
    { label: "Contact", id: "contact" }
  ];

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-cyber-cyan-border/20 cyber-glass select-none">
      {/* Top Telemetry Strip */}
      <div className="bg-slate-950/80 border-b border-cyber-cyan-border/10 py-1 px-4 hidden md:flex items-center justify-between font-mono text-[9px] text-slate-500 tracking-wider">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <Server className="w-3 h-3 text-cyber-cyan" />
            NODE: PORTFOLIO-SEC-01
          </span>
          <span className="flex items-center gap-1">
            <Activity className="w-3 h-3 text-cyber-cyan" />
            PING: <span className="text-cyber-cyan font-bold">{ping}ms</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-cyber-green animate-pulse"></span>
            DEFENSE: OPTIMAL
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-cyber-cyan bg-cyber-cyan/10 border border-cyber-cyan/20 px-1 rounded text-[8px] font-bold">
            THREAT LEVEL: LOW
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-slate-500" />
            SYS_TIME: <span className="text-slate-300 font-bold">{currentTime}</span>
          </span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-6xl mx-auto px-4 py-3 md:py-4 flex justify-between items-center">
        {/* Logo */}
        <a 
          href="#hero" 
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('hero');
          }}
          className="flex items-center gap-2 text-white font-display font-bold text-sm tracking-widest uppercase hover:opacity-85 transition-opacity"
        >
          <Shield className="w-5 h-5 text-cyber-cyan animate-pulse" />
          <span className="text-cyber-cyan font-extrabold">//</span> SEC-OPS
        </a>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="font-mono text-xs text-slate-400 hover:text-cyber-cyan tracking-wider uppercase transition-colors cursor-pointer relative py-1 group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-cyber-cyan transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-1.5 text-slate-400 hover:text-white border border-cyber-cyan-border/20 rounded cursor-pointer"
        >
          {isOpen ? <X className="w-5 h-5 text-cyber-cyan" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden border-t border-cyber-cyan-border/20 bg-[#060816]/95 backdrop-blur-xl py-4 px-4 font-mono text-xs flex flex-col gap-4">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="text-left py-2 border-b border-slate-900 text-slate-400 hover:text-cyber-cyan tracking-wider uppercase transition-colors"
            >
              {`> `} {link.label}
            </button>
          ))}
          {/* Telemetry panel for mobile */}
          <div className="bg-slate-950 p-3 rounded border border-cyber-cyan-border/10 flex flex-col gap-2 text-[10px] text-slate-500 mt-2">
            <div className="flex justify-between">
              <span>STATUS: SECURE</span>
              <span className="text-cyber-green">ONLINE</span>
            </div>
            <div className="flex justify-between">
              <span>PING: {ping}ms</span>
              <span>SYS_TIME: {currentTime}</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
