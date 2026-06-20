import { Shield, Terminal, Cpu, Database, ShieldCheck, Calendar, FileText, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface Skill {
  name: string;
  level: number;
}

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: Skill[];
}

interface Certification {
  name: string;
  issuer: string;
  date: string;
  id: string;
  verificationUrl: string;
  description: string;
}

export const SkillsAndCerts: React.FC = () => {
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

  const certs: Certification[] = [
    {
      name: "Google Cybersecurity Specialization",
      issuer: "Google",
      date: "Feb 2026",
      id: "5C9N3CQLZYH9",
      verificationUrl: "https://coursera.org/verify/professional-cert/5C9N3CQLZYH9",
      description: "Professional certificate covering security operations, threat detection, incident response, SIEM tools, Python automation for security, and Linux/SQL foundations for cybersecurity.",
    },
    {
      name: "Cisco CCNA (200-301) Specialization",
      issuer: "Packt",
      date: "May 2026",
      id: "8Z7JOUC9WFPG",
      verificationUrl: "https://coursera.org/verify/specialization/8Z7JOUC9WFPG",
      description: "Networking fundamentals covering IP addressing, subnetting, routing protocols, switching, VLANs, network security, and infrastructure automation aligned with the Cisco CCNA exam.",
    },
  ];

  const renderProgressBar = (level: number) => {
    const totalBlocks = 10;
    const activeBlocks = Math.round(level / 10);
    const inactiveBlocks = totalBlocks - activeBlocks;
    return (
      <div className="flex items-center gap-2 font-mono text-xs mt-1 text-slate-400 select-none">
        <span className="text-cyber-cyan font-bold">{'['}</span>
        <span className="text-cyber-cyan font-semibold">
          {"█".repeat(activeBlocks)}
          <span className="opacity-20">{"█".repeat(inactiveBlocks)}</span>
        </span>
        <span className="text-cyber-cyan font-bold">{']'}</span>
        <span className="font-bold text-[10px] text-cyber-cyan">{level}%</span>
      </div>
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
  };
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="skills" className="py-20 md:py-28 px-4 border-b border-cyber-cyan-border/20 relative">
      {/* Background accents */}
      <div className="absolute inset-0 cyber-grid-dots pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-[300px] h-[300px] bg-cyber-purple/5 blur-[120px] rounded-full pointer-events-none z-0" />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* ─────────────── SKILLS MATRIX ─────────────── */}
        <div className="flex flex-col gap-2 mb-12 border-l-2 border-cyber-cyan pl-4">
          <span className="font-mono text-xs text-cyber-cyan uppercase tracking-widest font-bold">[NODE: 02_SKILLS_MATRIX]</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white uppercase tracking-tight">Defensive Capabilities</h2>
        </div>

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
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-cyber-cyan/40 group-hover:border-cyber-cyan transition-colors" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-cyber-cyan/40 group-hover:border-cyber-cyan transition-colors" />

              <div className="flex items-center gap-3 border-b border-cyber-cyan-border/20 pb-3 mb-4">
                <div className="p-1.5 rounded bg-slate-900 border border-cyber-cyan-border/20">
                  {category.icon}
                </div>
                <h3 className="font-display text-base font-bold text-white uppercase tracking-wide">
                  {category.title}
                </h3>
              </div>

              <div className="space-y-4">
                {category.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="flex flex-col gap-1">
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-medium text-slate-300 font-sans">{skill.name}</span>
                      <span className="font-mono text-xs text-slate-500">
                        {skill.level >= 85 ? "EXPERT" : skill.level >= 75 ? "ADVANCED" : "INTERMEDIATE"}
                      </span>
                    </div>
                    {renderProgressBar(skill.level)}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ─────────────── DIVIDER ─────────────── */}
        <div className="flex items-center gap-4 my-16">
          <div className="flex-1 h-px bg-cyber-cyan-border/20" />
          <span className="font-mono text-[10px] text-slate-600 uppercase tracking-widest px-3">
            ◆ ACTIVE CREDENTIALS ◆
          </span>
          <div className="flex-1 h-px bg-cyber-cyan-border/20" />
        </div>

        {/* ─────────────── CERTIFICATIONS ─────────────── */}
        <div id="certifications" className="flex flex-col gap-2 mb-12 border-l-2 border-cyber-cyan pl-4">
          <span className="font-mono text-xs text-cyber-cyan uppercase tracking-widest font-bold">[NODE: 03_CREDENTIALS]</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white uppercase tracking-tight">Active Certifications</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certs.map((cert, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="cyber-glass p-5 rounded-lg border border-cyber-cyan-border/20 relative group hover:border-cyber-cyan/40 transition-colors flex flex-col justify-between"
            >
              {/* Badge Icon */}
              <div className="absolute top-4 right-4 p-2 rounded-full border border-cyber-cyan-border/10 bg-slate-900">
                <ShieldCheck className="w-5 h-5 text-cyber-cyan" />
              </div>

              <div>
                <div className="flex flex-col gap-1 pr-10">
                  <span className="font-mono text-[10px] text-slate-500 uppercase tracking-widest">{cert.issuer}</span>
                  <h3 className="font-display text-base md:text-lg font-bold text-white leading-tight group-hover:text-cyber-cyan transition-colors">
                    {cert.name}
                  </h3>
                </div>

                <p className="text-slate-400 text-xs mt-3 leading-relaxed">{cert.description}</p>

                <div className="flex flex-wrap gap-x-4 gap-y-2 mt-4 pt-3 border-t border-cyber-cyan-border/10 font-mono text-[10px] text-slate-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-cyber-cyan/60" />
                    Issued: {cert.date}
                  </span>
                  <span className="flex items-center gap-1 select-all">
                    <FileText className="w-3.5 h-3.5 text-cyber-cyan/60" />
                    ID: {cert.id}
                  </span>
                </div>
              </div>

              <div className="mt-5 pt-1">
                <a
                  href={cert.verificationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-cyber-cyan/30 rounded text-cyber-cyan hover:border-cyber-cyan hover:bg-cyber-cyan/10 transition-colors font-mono text-[10px] uppercase tracking-wider"
                >
                  <CheckCircle2 className="w-3 h-3 text-cyber-green" />
                  Verify Credential
                </a>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
