import React from 'react';
import { ParticleNetwork } from '../components/ParticleNetwork';
import { TerminalEffect } from '../components/TerminalEffect';
import { Shield, Terminal, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

/* ─────────────────────────────────────────────
   Animated Donut / Ring — pure CSS-in-JSX
   Each ring spins at a different speed & tilt
───────────────────────────────────────────── */
const DonutRing: React.FC<{
  size: number;
  thickness: number;
  color: string;
  duration: number;
  delay?: number;
  tiltX?: number;
  tiltZ?: number;
  opacity?: number;
}> = ({ size, thickness, color, duration, delay = 0, tiltX = 60, tiltZ = 0, opacity = 0.6 }) => (
  <div
    style={{
      position: 'absolute',
      width: size,
      height: size,
      left: '50%',
      top: '50%',
      marginLeft: -size / 2,
      marginTop: -size / 2,
      borderRadius: '50%',
      border: `${thickness}px solid ${color}`,
      opacity,
      transform: `rotateX(${tiltX}deg) rotateZ(${tiltZ}deg)`,
      animation: `donutSpin${duration} ${duration}s linear ${delay}s infinite`,
    }}
  />
);

export const Hero: React.FC = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-[90vh] flex flex-col justify-center items-center px-4 overflow-hidden border-b border-cyber-cyan-border/20 cyber-grid">

      {/* ── Inline keyframes for each ring spin ── */}
      <style>{`
        @keyframes donutSpin8  { from { transform: rotateX(60deg) rotateZ(0deg);   } to { transform: rotateX(60deg)  rotateZ(360deg);  } }
        @keyframes donutSpin12 { from { transform: rotateX(65deg) rotateZ(0deg);   } to { transform: rotateX(65deg)  rotateZ(-360deg); } }
        @keyframes donutSpin18 { from { transform: rotateX(55deg) rotateZ(30deg);  } to { transform: rotateX(55deg)  rotateZ(390deg);  } }
        @keyframes donutSpin24 { from { transform: rotateX(70deg) rotateZ(-20deg); } to { transform: rotateX(70deg)  rotateZ(340deg);  } }
        @keyframes donutSpin32 { from { transform: rotateX(50deg) rotateZ(10deg);  } to { transform: rotateX(50deg)  rotateZ(-350deg); } }
        @keyframes donutPulse  { 0%,100% { opacity: 0.08; } 50% { opacity: 0.18; } }
      `}</style>

      {/* Dynamic Particle Canvas */}
      <ParticleNetwork />

      {/* Decorative Radial Grid Mask */}
      <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_40%,#060816_90%] pointer-events-none z-1" />

      {/* ═══════════════════════════════════════
          DONUT / RING ANIMATIONS — centred behind
      ═══════════════════════════════════════ */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-2">

        {/* Outer large soft glow blob */}
        <div style={{
          position: 'absolute', width: 560, height: 560,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,240,255,0.05) 0%, transparent 70%)',
          animation: 'donutPulse 4s ease-in-out infinite',
        }} />

        {/* Ring 1 – cyan, wide tilt, slow */}
        <DonutRing size={520} thickness={1.5} color="rgba(0,240,255,0.35)" duration={32} delay={0} tiltX={60} tiltZ={10} opacity={0.7} />
        {/* Ring 2 – cyan reverse, tighter tilt */}
        <DonutRing size={420} thickness={1}   color="rgba(0,240,255,0.25)" duration={24} delay={1} tiltX={65} tiltZ={-20} opacity={0.6} />
        {/* Ring 3 – green accent */}
        <DonutRing size={340} thickness={1.5} color="rgba(0,255,102,0.20)" duration={18} delay={0.5} tiltX={55} tiltZ={30} opacity={0.5} />
        {/* Ring 4 – purple inner */}
        <DonutRing size={260} thickness={1}   color="rgba(139,92,246,0.30)" duration={12} delay={0.2} tiltX={70} tiltZ={-10} opacity={0.6} />
        {/* Ring 5 – cyan innermost fast */}
        <DonutRing size={180} thickness={2}   color="rgba(0,240,255,0.50)" duration={8}  delay={0}   tiltX={60} tiltZ={0}   opacity={0.5} />

        {/* Center dot pulse */}
        <div style={{
          position: 'absolute', width: 8, height: 8,
          borderRadius: '50%',
          background: '#00f0ff',
          boxShadow: '0 0 16px 4px rgba(0,240,255,0.6)',
          animation: 'donutPulse 2s ease-in-out infinite',
        }} />
      </div>
      {/* ═══════════════════════════════════════ */}

      {/* Glowing accent circle */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyber-cyan/5 blur-[120px] rounded-full pointer-events-none z-1" />

      <div className="max-w-4xl w-full z-10 text-center flex flex-col items-center gap-6 mt-16 md:mt-24">
        {/* Terminal Title Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-cyber-cyan-dim border border-cyber-cyan/30 text-cyber-cyan font-mono text-xs uppercase tracking-widest"
        >
          <Shield className="w-3.5 h-3.5 animate-pulse" />
          <span>Operational State: Secure</span>
        </motion.div>

        {/* Main H1 */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display font-bold text-4xl md:text-6xl text-white tracking-tight uppercase leading-none"
        >
          Securing Digital Frontiers
        </motion.h1>

        {/* Subtitle with Terminal typing effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-mono text-lg md:text-2xl h-8 text-slate-300 font-medium tracking-tight mt-2 flex items-center justify-center gap-2"
        >
          <Terminal className="w-5 h-5 text-cyber-cyan opacity-80" />
          <span>I am a </span>
          <TerminalEffect
            words={[
              "Cyber Security Researcher",
              "SOC Operations Analyst",
              "Threat Detection Engineer",
              "Incident Responder"
            ]}
          />
        </motion.div>

        {/* Professional summary block */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-slate-400 max-w-xl text-sm md:text-base leading-relaxed font-sans"
        >
          Cybersecurity-focused computer science graduate with hands-on experience in SIEM monitoring, threat detection, vulnerability assessment, and security analysis. Skilled in Splunk, Python, Linux, Wireshark, and network security concepts.
        </motion.p>

        {/* Mock Live telemetry stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 w-full max-w-2xl mt-4 font-mono text-xs"
        >
          {[
            { label: "DEFENSE LEVEL", value: "OPTIMAL", color: "text-cyber-green" },
            { label: "IP ADDRESS", value: "192.168.10.85", color: "text-slate-400" },
            { label: "PACKET SCANNER", value: "ACTIVE", color: "text-cyber-cyan" },
            { label: "THREAT MITIGATION", value: "INTEGRATED", color: "text-cyber-green" }
          ].map((stat, idx) => (
            <div key={idx} className="cyber-glass border border-cyber-cyan-border/20 p-2.5 rounded text-center cyber-corners flex flex-col gap-1">
              <span className="text-[9px] text-slate-500 tracking-wider font-semibold">{stat.label}</span>
              <span className={`font-bold tracking-widest ${stat.color}`}>{stat.value}</span>
            </div>
          ))}
        </motion.div>

        {/* Scroll CTA Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          onClick={() => scrollToSection('about')}
          className="mt-10 px-6 py-3 border border-cyber-cyan text-cyber-cyan font-mono text-sm tracking-widest uppercase hover:bg-cyber-cyan/10 transition-all duration-300 ease-out cursor-pointer flex items-center gap-2 group relative overflow-hidden glow-cyan-hover"
        >
          <span className="relative z-10 flex items-center gap-2 font-bold">
            Initialize Scan / Enter Site
            <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </span>
          {/* Subtle moving button gradient background */}
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-cyber-cyan/20 to-transparent transition-transform duration-500 pointer-events-none" />
        </motion.button>
      </div>
    </section>
  );
};
