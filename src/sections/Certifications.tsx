import { ShieldCheck, Calendar, FileText, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface Certification {
  name: string;
  issuer: string;
  date: string;
  id: string;
  badgeColor: string; // Tailwind colors
  verificationUrl: string;
  description: string;
}

export const Certifications: React.FC = () => {
  const certs: Certification[] = [
    {
      name: "Google Cybersecurity Specialization",
      issuer: "Google",
      date: "Feb 2026",
      id: "5C9N3CQLZYH9",
      badgeColor: "border-cyber-cyan text-cyber-cyan bg-cyber-cyan/5",
      verificationUrl: "https://coursera.org/verify/professional-cert/5C9N3CQLZYH9",
      description: "Professional certificate covering security operations, threat detection, incident response, SIEM tools, Python automation for security, and Linux/SQL foundations for cybersecurity.",
    },
    {
      name: "Cisco CCNA (200-301) Specialization",
      issuer: "Packt",
      date: "May 2026",
      id: "8Z7JOUC9WFPG",
      badgeColor: "border-cyber-green text-cyber-green bg-cyber-green/5",
      verificationUrl: "https://coursera.org/verify/specialization/8Z7JOUC9WFPG",
      description: "Networking fundamentals covering IP addressing, subnetting, routing protocols, switching, VLANs, network security, and infrastructure automation aligned with the Cisco CCNA exam.",
    },
  ];

  return (
    <section id="certifications" className="py-20 md:py-28 px-4 border-b border-cyber-cyan-border/20 relative">
      <div className="absolute top-1/2 left-0 w-[300px] h-[300px] bg-cyber-purple/5 blur-[120px] rounded-full pointer-events-none z-0" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col gap-2 mb-12 border-l-2 border-cyber-cyan pl-4">
          <span className="font-mono text-xs text-cyber-cyan uppercase tracking-widest font-bold">[NODE: 03_CREDENTIALS]</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white uppercase tracking-tight">Active Certifications</h2>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certs.map((cert, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="cyber-glass p-5 rounded-lg border border-cyber-cyan-border/20 relative group hover:border-cyber-cyan/40 transition-colors flex flex-col justify-between"
            >
              {/* Badge Icon Accent */}
              <div className="absolute top-4 right-4 p-2 rounded-full border border-cyber-cyan-border/10 bg-slate-900">
                <ShieldCheck className="w-5 h-5 text-cyber-cyan" />
              </div>

              <div>
                {/* Header info */}
                <div className="flex flex-col gap-1 pr-10">
                  <span className="font-mono text-[10px] text-slate-500 uppercase tracking-widest">{cert.issuer}</span>
                  <h3 className="font-display text-base md:text-lg font-bold text-white leading-tight group-hover:text-cyber-cyan transition-colors">
                    {cert.name}
                  </h3>
                </div>

                <p className="text-slate-400 text-xs mt-3 leading-relaxed">
                  {cert.description}
                </p>

                {/* Metadata Row */}
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

              {/* Action verification button */}
              <div className="mt-5 pt-1">
                <a
                  href={cert.verificationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-cyber-cyan/30 rounded text-cyber-cyan hover:border-cyber-cyan hover:bg-cyber-cyan/10 transition-colors font-mono text-2xs uppercase tracking-wider"
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
