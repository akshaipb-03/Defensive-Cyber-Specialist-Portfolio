import React from 'react';
import { InteractiveTerminal } from '../components/InteractiveTerminal';
import { Shield, Terminal, Fingerprint, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-20 md:py-28 px-4 border-b border-cyber-cyan-border/20 relative">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-cyber-blue/5 blur-[120px] rounded-full pointer-events-none z-0" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col gap-2 mb-12 border-l-2 border-cyber-cyan pl-4">
          <span className="font-mono text-xs text-cyber-cyan uppercase tracking-widest font-bold">[NODE: 01_ABOUT_ME]</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white uppercase tracking-tight">System Profile</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Narrative Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6"
          >
            <div className="cyber-glass p-5 rounded-lg border border-cyber-cyan-border/20 cyber-corners">
              <h3 className="font-mono text-sm text-cyber-cyan font-bold mb-3 uppercase flex items-center gap-2">
                <Fingerprint className="w-4 h-4" />
                Operational Mission Summary
              </h3>
              <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                As a cybersecurity-focused Computer Science graduate and current Cyber Security Researcher Intern at Trivandrum Offenso Hackers Academy, my primary objective is to identify, analyze, and intercept security threats. I possess hands-on experience in SIEM monitoring (Splunk & Wazuh), threat detection, vulnerability assessments, and malware analysis.
              </p>
              <p className="text-slate-400 text-sm md:text-base leading-relaxed mt-4">
                With a strong foundation in CCNA-level networking, incident response workflows, and security operations (SOC), I leverage scripting (Python/Bash) and AI-driven threat detection research to automate log auditing and enhance defensive capabilities.
              </p>
            </div>

            {/* Core Values / Focus Areas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { 
                  icon: <Shield className="text-cyber-green w-5 h-5 shrink-0" />, 
                  title: "Defense in Depth", 
                  desc: "Designing overlapping security controls to mitigate singular points of failure." 
                },
                { 
                  icon: <Eye className="text-cyber-cyan w-5 h-5 shrink-0" />, 
                  title: "Proactive Hunting", 
                  desc: "Developing Sigma and Snort rules to detect anomalous attacker behaviors early." 
                },
                { 
                  icon: <Terminal className="text-cyber-purple w-5 h-5 shrink-0" />, 
                  title: "Security Automation", 
                  desc: "Writing custom Python/Bash parsers to ingest, filter, and structure raw security logs." 
                },
                { 
                  icon: <Fingerprint className="text-cyber-orange w-5 h-5 shrink-0" />, 
                  title: "Incident Auditing", 
                  desc: "Conducting host and network forensic traces to reconstruct adversarial kill chains." 
                }
              ].map((value, idx) => (
                <div key={idx} className="cyber-glass p-4 rounded border border-cyber-cyan-border/10 flex gap-3">
                  <div className="mt-1">{value.icon}</div>
                  <div>
                    <h4 className="font-display text-sm font-bold text-white">{value.title}</h4>
                    <p className="text-slate-500 text-xs mt-1 leading-normal">{value.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Interactive Terminal Column */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-3"
          >
            <div className="flex justify-between items-center px-1 font-mono text-[10px] text-slate-500">
              <span>CONSOLE INITIALIZED</span>
              <span>INPUT PROTOCOL: UTF-8</span>
            </div>
            
            {/* The terminal widget */}
            <InteractiveTerminal />

            <div className="text-[11px] font-mono text-slate-500 text-center mt-1">
              *Interactive system. Click on the terminal command line above and type to query the profile.
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
