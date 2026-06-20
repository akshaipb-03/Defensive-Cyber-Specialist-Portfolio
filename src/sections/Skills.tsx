import { Shield, Terminal, Cpu, Database } from 'lucide-react';
import { motion } from 'framer-motion';

interface Skill {
  name: string;
  level: number; // 0-100
}

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: Skill[];
}

export const Skills: React.FC = () => {
  const categories: SkillCategory[] = [
    {
      title: "SIEM & Security Tools",
      icon: <Shield className="w-5 h-5 text-cyber-cyan" />,
      skills: [
        { name: "Splunk & Wazuh SIEM", level: 85 },
        { name: "Wireshark Traffic Analysis", level: 80 },
        { name: "Burp Suite & Nmap Scanning", level: 80 },
        { name: "Metasploit Framework", level: 75 },
      ]
    },
    {
      title: "Security Domains & Operations",
      icon: <Cpu className="w-5 h-5 text-cyber-purple" />,
      skills: [
        { name: "Threat Hunting & Intelligence", level: 85 },
        { name: "Malware Analysis & Reverse Eng.", level: 80 },
        { name: "Incident Response Workflows", level: 80 },
        { name: "SOC Operations & Alerting", level: 85 },
      ]
    },
    {
      title: "Infrastructure & Networking",
      icon: <Database className="w-5 h-5 text-cyber-green" />,
      skills: [
        { name: "Linux OS Hardening", level: 85 },
        { name: "Cisco Networking (Routing/Switching)", level: 80 },
        { name: "Endpoint Security & Monitoring", level: 75 },
        { name: "VLANs, OSPF & TCP/IP Protocols", level: 80 },
      ]
    },
    {
      title: "Development & Automation",
      icon: <Terminal className="w-5 h-5 text-cyber-orange" />,
      skills: [
        { name: "Python Security Scripting", level: 85 },
        { name: "SQL Database Auditing & Queries", level: 80 },
        { name: "JavaScript Programming", level: 75 },
        { name: "Bash Automation & Git Pipelines", level: 80 },
      ]
    }
  ];

  // Helper to draw terminal-like ASCII progress bar: [██████░░░░]
  const renderProgressBar = (level: number) => {
    const totalBlocks = 10;
    const activeBlocks = Math.round(level / 10);
    const inactiveBlocks = totalBlocks - activeBlocks;
    
    return (
      <div className="flex items-center gap-2 font-mono text-xs mt-1 text-slate-400 select-none">
        <span className="text-cyber-cyan font-bold">{`[`}</span>
        <span className="text-cyber-cyan font-semibold">
          {"█".repeat(activeBlocks)}
          <span className="opacity-20">{"█".repeat(inactiveBlocks)}</span>
        </span>
        <span className="text-cyber-cyan font-bold">{`]`}</span>
        <span className="font-bold text-[10px] text-cyber-cyan">{level}%</span>
      </div>
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="skills" className="py-20 md:py-28 px-4 border-b border-cyber-cyan-border/20 cyber-grid-dots">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col gap-2 mb-12 border-l-2 border-cyber-cyan pl-4">
          <span className="font-mono text-xs text-cyber-cyan uppercase tracking-widest font-bold">[NODE: 02_SKILLS_MATRIX]</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white uppercase tracking-tight">Defensive Capabilities</h2>
        </div>

        {/* Skills Cards Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {categories.map((category, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              className="cyber-glass p-5 rounded-lg border border-cyber-cyan-border/20 hover:border-cyber-cyan/50 transition-all duration-300 relative group glow-cyan-hover"
            >
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-cyber-cyan/40 group-hover:border-cyber-cyan transition-colors" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-cyber-cyan/40 group-hover:border-cyber-cyan transition-colors" />
              
              {/* Card Title Bar */}
              <div className="flex items-center gap-3 border-b border-cyber-cyan-border/20 pb-3 mb-4">
                <div className="p-1.5 rounded bg-slate-900 border border-cyber-cyan-border/20">
                  {category.icon}
                </div>
                <h3 className="font-display text-base font-bold text-white uppercase tracking-wide">
                  {category.title}
                </h3>
              </div>

              {/* Skills List */}
              <div className="space-y-4">
                {category.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="flex flex-col gap-1">
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-medium text-slate-300 font-sans">{skill.name}</span>
                      <span className="font-mono text-xs text-slate-500">
                        {skill.level >= 85 ? "EXPERT" : skill.level >= 75 ? "ADVANCED" : "INTERMEDIATE"}
                      </span>
                    </div>
                    {/* ASCII Meter */}
                    {renderProgressBar(skill.level)}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
