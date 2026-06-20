import React, { useState, useRef, useEffect } from 'react';

interface TerminalLine {
  text: string;
  type: 'input' | 'output' | 'error' | 'success' | 'system';
}

export const InteractiveTerminal: React.FC = () => {
  const [history, setHistory] = useState<TerminalLine[]>([
    { text: 'SEC-OPS CORE SECURITY CONSOLE v4.2.1-SECURE', type: 'system' },
    { text: 'Initializing connection protocols...', type: 'output' },
    { text: 'Access Level: Guest Recruiter (Authenticated)', type: 'success' },
    { text: 'Type "help" to view a list of available system commands.', type: 'output' },
  ]);
  const [input, setInput] = useState('');
  const terminalEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    const newHistory = [...history, { text: `guest@sec-ops:~$ ${input}`, type: 'input' as const }];
    let response: TerminalLine[] = [];

    switch (cmd) {
      case 'help':
        response = [
          { text: 'Available Command Matrix:', type: 'system' },
          { text: '  about      - Display cybersecurity bio & mission profile', type: 'output' },
          { text: '  skills     - Query defensive & offensive technical expertise', type: 'output' },
          { text: '  projects   - Retrieve major engineering & analysis projects', type: 'output' },
          { text: '  contact    - Query direct incident report / contact channels', type: 'output' },
          { text: '  system     - Run diagnostic scan of portfolio network systems', type: 'output' },
          { text: '  clear      - Purge console buffer history', type: 'output' },
        ];
        break;
      case 'about':
        response = [
          { text: '[BIO SCANNER READOUT]', type: 'system' },
          { text: 'Name: Akshai P B', type: 'success' },
          { text: 'Role: Cyber Security Researcher Intern & SOC Operations Analyst.', type: 'output' },
          { text: 'Specialization: SIEM monitoring (Splunk, Wazuh), threat hunting, malware analysis, and vulnerability assessment.', type: 'output' },
          { text: 'Education: B.E. Computer Science and Engineering (Rohini College of Engineering and Technology, CGPA: 7.94/10).', type: 'output' },
        ];
        break;
      case 'skills':
        response = [
          { text: '[TECHNICAL INVENTORY MODULE]', type: 'system' },
          { text: '  - SIEM: Splunk, Wazuh', type: 'success' },
          { text: '  - Security Tools: Burp Suite, Wireshark, Nmap, Metasploit', type: 'success' },
          { text: '  - Programming: Python, SQL, JavaScript', type: 'success' },
          { text: '  - Domains: Threat Hunting, Malware Analysis, Incident Response, SOC, Threat Intelligence, Security Monitoring, Endpoint Security', type: 'success' },
        ];
        break;
      case 'projects':
        response = [
          { text: '[DEFENSIVE ARCHIVE RETRIEVAL]', type: 'system' },
          { text: '  - SOCSight Log-Based IDS: Streamlit & Python application detecting SQL Injection, XSS, and Command Injection attacks with a real-time SOC-style dashboard.', type: 'output' },
          { text: '  - Web App Security & Defacement Lab: Full-stack airline booking app converted to a testing ground for vulnerability assessment.', type: 'output' },
          { text: '  - Malware Detection System: TensorFlow & Keras deep learning system for classification of security datasets.', type: 'output' },
          { text: 'Type "projects" section in the navigation to view detail sheets.', type: 'success' },
        ];
        break;
      case 'contact':
        response = [
          { text: '[CONTACT INTEGRATION PATH]', type: 'system' },
          { text: '  - Email: akshaipb03@gmail.com', type: 'output' },
          { text: '  - Secure Form: Please submit an incident report at the bottom of the dashboard.', type: 'success' },
          { text: '  - LinkedIn: linkedin.com/in/akshai-pb', type: 'output' },
          { text: '  - GitHub: github.com/akshaipb-03', type: 'output' },
        ];
        break;
      case 'system':
        response = [
          { text: '[SYSTEM DIAGNOSTIC IN PROGRESS...]', type: 'system' },
          { text: '  - Core Core Integrity: 100% (Kernel patched)', type: 'success' },
          { text: '  - Defensive Mesh: ACTIVE (Suricata: 0 packet drops)', type: 'success' },
          { text: '  - Threat Mitigation Agent: ACTIVE (SIGMA engine operational)', type: 'success' },
          { text: '  - Local Time: ' + new Date().toLocaleTimeString(), type: 'output' },
          { text: 'All portfolio nodes operational. No telemetry leaks detected.', type: 'success' },
        ];
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      default:
        response = [
          { text: `Command not found: "${cmd}". Type "help" for a list of valid commands.`, type: 'error' },
        ];
        break;
    }

    setHistory([...newHistory, ...response]);
    setInput('');
  };

  return (
    <div 
      onClick={focusInput}
      className="cyber-glass rounded-lg border border-cyber-cyan-border shadow-glow p-4 font-mono text-sm h-80 overflow-y-auto flex flex-col scanlines cursor-text relative select-none"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-cyber-cyan-border pb-2 mb-3 sticky top-0 bg-[#080c1c]/90 z-20">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-cyber-red opacity-80"></span>
          <span className="w-3 h-3 rounded-full bg-cyber-orange opacity-80"></span>
          <span className="w-3 h-3 rounded-full bg-cyber-green opacity-80"></span>
          <span className="text-xs text-slate-400 font-bold ml-2">SEC-OPS TERMINAL v4.2</span>
        </div>
        <div className="text-[10px] text-cyber-cyan animate-pulse font-semibold">
          SYSTEM_STATE: SECURE
        </div>
      </div>

      {/* Output Stream */}
      <div className="flex-1 space-y-1">
        {history.map((line, idx) => {
          let colorClass = 'text-slate-300';
          if (line.type === 'input') colorClass = 'text-white font-semibold';
          if (line.type === 'error') colorClass = 'text-cyber-red';
          if (line.type === 'success') colorClass = 'text-cyber-green';
          if (line.type === 'system') colorClass = 'text-cyber-cyan font-bold';

          return (
            <div key={idx} className={`${colorClass} leading-relaxed break-words`}>
              {line.text}
            </div>
          );
        })}
        <div ref={terminalEndRef} />
      </div>

      {/* Input Prompt */}
      <form onSubmit={handleCommand} className="flex items-center mt-3 pt-2 border-t border-cyber-cyan-border/20 sticky bottom-0 bg-[#080c1c]">
        <span className="text-cyber-cyan mr-2 font-bold">guest@sec-ops:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent border-none outline-none text-white font-mono caret-cyber-cyan"
          maxLength={50}
          autoComplete="off"
          spellCheck={false}
        />
      </form>
    </div>
  );
};
