import { Shield, Bug, Terminal, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

interface Project {
  title: string;
  category: string;
  icon: React.ReactNode;
  description: string;
  features: string[];
  tags: string[];
  githubUrl: string;
  demoUrl?: string;
}

export const Projects: React.FC = () => {
  const projects: Project[] = [
    {
      title: "SOCSight Log-Based Intrusion Detection System",
      category: "Network Defense / Log Analytics",
      icon: <Shield className="w-5 h-5 text-cyber-cyan" />,
      description: "A Python and Streamlit-based Intrusion Detection System (IDS) that parses log data in real-time, profiling attackers and detecting SQL Injection, XSS, and Command Injection attacks with a customized SOC dashboard.",
      features: [
        "Built dynamic log parsing and pattern-based threat detection using Python and Regex.",
        "Created an interactive real-time SOC-style dashboard for alert monitoring and visualization.",
        "Implemented detailed attacker profiling based on malicious patterns and payloads."
      ],
      tags: ["Python", "Streamlit", "Regex", "IDS", "Threat Detection", "SOC Dashboard"],
      githubUrl: "https://github.com/akshaipb-03",
    },
    {
      title: "Web Application Security & Defacement Research Lab",
      category: "Web Security / Penetration Testing",
      icon: <Terminal className="w-5 h-5 text-cyber-purple" />,
      description: "A full-stack airline booking application converted into a controlled security testing environment to simulate, analyze, and mitigate common web vulnerabilities and defacement attacks.",
      features: [
        "Conducted vulnerability assessments and web defacement simulations to evaluate attack surface.",
        "Explored and analyzed SQL Injection, XSS, authentication bypasses, and insecure configurations.",
        "Configured secure coding remediations to resolve OWASP Top 10 vulnerabilities in the application."
      ],
      tags: ["Full-Stack", "Web Security", "OWASP Top 10", "Vulnerability Assessment", "Defacement Simulation"],
      githubUrl: "https://github.com/akshaipb-03",
    },
    {
      title: "Malware Detection using Hybrid Algorithms",
      category: "Endpoint Security / Machine Learning",
      icon: <Bug className="w-5 h-5 text-cyber-red" />,
      description: "A machine learning malware classification system trained on large-scale security datasets using deep learning hybrid architectures to optimize classification accuracy and malicious behavior detection.",
      features: [
        "Developed neural network models using TensorFlow and Keras to classify malware samples.",
        "Executed feature engineering, data preprocessing, and hyperparameter tuning for optimization.",
        "Evaluated classification performance metrics using cybersecurity-specific validation frameworks."
      ],
      tags: ["TensorFlow", "Keras", "Python", "Machine Learning", "Malware Classification", "Data Science"],
      githubUrl: "https://github.com/akshaipb-03",
    }
  ];

  return (
    <section id="projects" className="py-20 md:py-28 px-4 border-b border-cyber-cyan-border/20 cyber-grid">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col gap-2 mb-12 border-l-2 border-cyber-cyan pl-4">
          <span className="font-mono text-xs text-cyber-cyan uppercase tracking-widest font-bold">[NODE: 04_SECURITY_PROJECTS]</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white uppercase tracking-tight">Technical Implementations</h2>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="cyber-glass rounded-lg border border-cyber-cyan-border/20 p-5 md:p-6 flex flex-col justify-between hover:border-cyber-cyan/40 hover:shadow-[0_0_25px_rgba(0,240,255,0.1)] transition-all duration-300 relative group glow-cyan-hover"
            >
              {/* Corner accent decorations */}
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyber-cyan-border/20 group-hover:border-cyber-cyan transition-colors" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyber-cyan-border/20 group-hover:border-cyber-cyan transition-colors" />

              <div>
                {/* Project Category & Icon */}
                <div className="flex justify-between items-start mb-4">
                  <span className="font-mono text-[10px] text-cyber-cyan uppercase tracking-wider bg-cyber-cyan-dim border border-cyber-cyan/25 px-2 py-0.5 rounded">
                    {project.category}
                  </span>
                  <div className="p-2 rounded bg-slate-900 border border-cyber-cyan-border/10">
                    {project.icon}
                  </div>
                </div>

                {/* Project Title */}
                <h3 className="font-display text-lg md:text-xl font-bold text-white mb-3 tracking-tight group-hover:text-cyber-cyan transition-colors">
                  {project.title}
                </h3>

                {/* Project Description */}
                <p className="text-slate-400 text-xs md:text-sm leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Bullet key highlights */}
                <ul className="space-y-2 mb-6 text-xs text-slate-400 font-sans list-disc list-inside border-l border-cyber-cyan-border/20 pl-3">
                  {project.features.map((feat, fIdx) => (
                    <li key={fIdx} className="leading-relaxed">
                      <span className="text-slate-300">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tags & Action links */}
              <div>
                <div className="flex flex-wrap gap-1.5 mb-5 select-none">
                  {project.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="font-mono text-[10px] text-slate-500 bg-slate-900/60 border border-cyber-cyan-border/10 px-2 py-0.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4 font-mono text-xs border-t border-cyber-cyan-border/15 pt-4">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                    Source Code
                  </a>
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      className="inline-flex items-center gap-1.5 text-cyber-cyan hover:underline transition-all"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Walkthrough
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
