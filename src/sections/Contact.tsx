import React, { useState } from 'react';
import { Send, Mail, ShieldAlert, AlertTriangle, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    severity: 'LOW',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      setFormData({ name: '', email: '', severity: 'LOW', message: '' });
      
      // Reset success state after a few seconds
      setTimeout(() => setIsSent(false), 5000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-20 md:py-28 px-4 relative">
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyber-cyan/5 blur-[120px] rounded-full pointer-events-none z-0" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col gap-2 mb-12 border-l-2 border-cyber-cyan pl-4">
          <span className="font-mono text-xs text-cyber-cyan uppercase tracking-widest font-bold">[NODE: 06_DISPATCH_PORT]</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white uppercase tracking-tight">Report Incident</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-stretch">
          {/* Form Box (Left 3/5) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-3 cyber-glass rounded-lg border border-cyber-cyan-border/20 p-5 md:p-8 flex flex-col justify-between cyber-corners"
          >
            <div>
              <div className="flex items-center gap-3 border-b border-cyber-cyan-border/20 pb-4 mb-6">
                <ShieldAlert className="w-5 h-5 text-cyber-cyan animate-pulse" />
                <h3 className="font-display text-base font-bold text-white uppercase tracking-wider">
                  Ticket Creation Module
                </h3>
              </div>

              {isSent ? (
                <div className="py-10 text-center flex flex-col items-center gap-3 font-mono">
                  <CheckCircle className="w-12 h-12 text-cyber-green animate-bounce" />
                  <span className="text-white font-bold text-sm uppercase">[TICKET TRANSMITTED SUCCESSFULLY]</span>
                  <span className="text-xs text-slate-400 max-w-sm">
                    SecOps dispatch router has received your payload. An incident responder will initiate contact via the provided email endpoint shortly.
                  </span>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Reporter Name */}
                    <div className="flex flex-col gap-1.5">
                      <label className="font-mono text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                        Reporter Identity (Name) *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Recruiter / Security Manager"
                        className="bg-slate-950 border border-cyber-cyan-border/20 rounded p-2.5 text-sm text-white font-mono outline-none focus:border-cyber-cyan focus:shadow-[0_0_10px_rgba(0,240,255,0.15)] transition-all"
                      />
                    </div>

                    {/* Reporter Email */}
                    <div className="flex flex-col gap-1.5">
                      <label className="font-mono text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                        Response Endpoint (Email) *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. contact@company.com"
                        className="bg-slate-950 border border-cyber-cyan-border/20 rounded p-2.5 text-sm text-white font-mono outline-none focus:border-cyber-cyan focus:shadow-[0_0_10px_rgba(0,240,255,0.15)] transition-all"
                      />
                    </div>
                  </div>

                  {/* Incident Severity */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                      Message Severity Level
                    </label>
                    <select
                      name="severity"
                      value={formData.severity}
                      onChange={handleChange}
                      className="bg-slate-950 border border-cyber-cyan-border/20 rounded p-2.5 text-sm text-white font-mono outline-none focus:border-cyber-cyan transition-all"
                    >
                      <option value="LOW">LOW - Standard Networking / Hello</option>
                      <option value="MEDIUM">MEDIUM - Career Opportunity / Consulting</option>
                      <option value="HIGH">HIGH - Urgent Contract / Fast Hiring</option>
                      <option value="CRITICAL">CRITICAL - System Breach / Immediate Call</option>
                    </select>
                  </div>

                  {/* Payload (Message) */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                      Incident Payload (Message Description) *
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Write your dispatch request details here..."
                      className="bg-slate-950 border border-cyber-cyan-border/20 rounded p-2.5 text-sm text-white font-mono outline-none focus:border-cyber-cyan focus:shadow-[0_0_10px_rgba(0,240,255,0.15)] transition-all resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-2 py-3 px-6 border border-cyber-cyan bg-cyber-cyan-dim text-cyber-cyan rounded font-mono text-xs font-bold uppercase tracking-widest hover:bg-cyber-cyan/15 transition-colors duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-glow"
                  >
                    <Send className={`w-4 h-4 ${isSubmitting ? 'animate-ping' : ''}`} />
                    {isSubmitting ? 'TRANSMITTING PAYLOAD...' : 'TRANSMIT TICKET'}
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Social Links (Right 2/5) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 flex flex-col justify-between gap-6"
          >
            {/* Contact details Card */}
            <div className="cyber-glass rounded-lg border border-cyber-cyan-border/20 p-5 md:p-6 cyber-corners flex-1 flex flex-col justify-center gap-6">
              <div className="flex items-center gap-3 border-b border-cyber-cyan-border/10 pb-3">
                <AlertTriangle className="w-5 h-5 text-cyber-orange" />
                <h4 className="font-display text-sm font-bold text-white uppercase tracking-wider">
                  Contact Coordinates
                </h4>
              </div>

              <div className="space-y-4 font-mono text-xs">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded bg-slate-900 border border-cyber-cyan-border/10">
                    <Mail className="w-4 h-4 text-cyber-cyan" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] text-slate-500 uppercase tracking-widest font-semibold">Primary SMTP Endpoint</span>
                    <a href="mailto:akshaipb03@gmail.com" className="text-white hover:underline select-all">akshaipb03@gmail.com</a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 rounded bg-slate-900 border border-cyber-cyan-border/10">
                    <svg className="w-4 h-4 text-cyber-cyan" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] text-slate-500 uppercase tracking-widest font-semibold">Secure Professional Mesh</span>
                    <a href="https://linkedin.com/in/akshai-pb" target="_blank" rel="noopener noreferrer" className="text-white hover:underline">linkedin.com/in/akshai-pb</a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 rounded bg-slate-900 border border-cyber-cyan-border/10">
                    <svg className="w-4 h-4 text-cyber-cyan" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] text-slate-500 uppercase tracking-widest font-semibold">Source Code Repository</span>
                    <a href="https://github.com/akshaipb-03" target="_blank" rel="noopener noreferrer" className="text-white hover:underline">github.com/akshaipb-03</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Warning block (Footer vibe) */}
            <div className="cyber-glass rounded-lg border border-cyber-red/20 p-4 font-mono text-[10px] bg-cyber-red/5">
              <span className="text-cyber-red font-bold block mb-1">⚠️ SECURITY CLASSIFICATION NOTICE:</span>
              <p className="text-slate-400 leading-normal">
                This channel is end-to-end encrypted (simulated). Unsolicited spam, automated scanner crawls, and SQL injection payloads will be logged and matched against threat signature tables.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
