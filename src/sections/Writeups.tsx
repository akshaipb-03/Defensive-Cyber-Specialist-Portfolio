import { Terminal, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface Writeup {
  title: string;
  platform: 'TryHackMe' | 'HackTheBox';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  focus: string;
  date: string;
  url: string;
  summary: string;
}

export const Writeups: React.FC = () => {
  const writeups: Writeup[] = [
    {
      title: "Mr. Robot Machine Walkthrough",
      platform: "TryHackMe",
      difficulty: "Medium",
      focus: "WordPress exploitation, Linux Privilege Escalation, key retrieval",
      date: "May 2026",
      url: "https://github.com/",
      summary: "Detailed walkthrough of identifying hidden paths via robots.txt, attacking WordPress site directories, decrypting raw password hashes, and gaining root permissions via nmap SUID shell escape."
    },
    {
      title: "Active AD Domain Controller Root",
      platform: "HackTheBox",
      difficulty: "Medium",
      focus: "Active Directory, Kerberoasting, Group Policy Preferences (GPP)",
      date: "Apr 2026",
      url: "https://github.com/",
      summary: "Exploiting SYSVOL share permissions to extract encrypted GPP credentials, roasting Kerberos service tickets, and using BloodHound to map and compromise the AD Domain Administrator account."
    },
    {
      title: "Blue - EternalBlue Exploitation",
      platform: "HackTheBox",
      difficulty: "Easy",
      focus: "Windows SMBv1 exploit, MS17-010, Metasploit, shellcode analysis",
      date: "Mar 2026",
      url: "https://github.com/",
      summary: "Manual and automated exploitation of the MS17-010 (EternalBlue) vulnerability on a Windows 7 machine, including kernel pool grooming analysis and custom payload delivery without Metasploit."
    }
  ];

  return (
    <section id="writeups" className="py-20 md:py-28 px-4 border-b border-cyber-cyan-border/20 relative">
      <div className="absolute top-1/2 right-0 w-[300px] h-[300px] bg-cyber-purple/5 blur-[120px] rounded-full pointer-events-none z-0" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col gap-2 mb-12 border-l-2 border-cyber-cyan pl-4">
          <span className="font-mono text-xs text-cyber-cyan uppercase tracking-widest font-bold">[NODE: 05_REPORTS]</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white uppercase tracking-tight">Walkthroughs & Writeups</h2>
        </div>

        {/* Writeups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {writeups.map((w, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="cyber-glass p-5 rounded-lg border border-cyber-cyan-border/20 relative group hover:border-cyber-cyan/40 transition-colors flex flex-col justify-between"
            >
              {/* Header metadata */}
              <div className="flex justify-between items-start gap-2 mb-3">
                <div className="flex gap-2">
                  <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-wider border ${
                    w.platform === 'TryHackMe'
                      ? 'border-cyber-red/30 text-cyber-red bg-cyber-red/5'
                      : 'border-cyber-green/30 text-cyber-green bg-cyber-green/5'
                  }`}>
                    {w.platform}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-wider border ${
                    w.difficulty === 'Easy'
                      ? 'border-cyber-green/30 text-cyber-green bg-cyber-green/5'
                      : w.difficulty === 'Medium'
                      ? 'border-cyber-orange/30 text-cyber-orange bg-cyber-orange/5'
                      : 'border-cyber-red/30 text-cyber-red bg-cyber-red/5'
                  }`}>
                      {w.difficulty.toUpperCase()}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-slate-500">{w.date}</span>
                </div>

                {/* Title */}
                <h4 className="font-display text-base font-bold text-white group-hover:text-cyber-cyan transition-colors leading-snug">
                  {w.title}
                </h4>

                {/* Focus Area */}
                <div className="font-mono text-[10px] text-slate-400 mt-2 flex items-center gap-1">
                  <Terminal className="w-3.5 h-3.5 text-cyber-cyan opacity-80" />
                  <span className="text-[9px] text-slate-500 shrink-0 font-bold uppercase tracking-wider">Focus:</span>
                  <span className="truncate">{w.focus}</span>
                </div>

                {/* Summary text */}
                <p className="text-slate-400 text-xs mt-3 leading-relaxed">
                  {w.summary}
                </p>

                {/* Read Button */}
                <div className="mt-4 pt-3 border-t border-cyber-cyan-border/10 flex justify-end">
                  <a
                    href={w.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-cyber-cyan hover:underline group-hover:translate-x-1 transition-transform"
                  >
                    Load Report
                    <ChevronRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
    </section>
  );
};

