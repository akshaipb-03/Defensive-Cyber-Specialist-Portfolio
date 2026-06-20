import React, { useEffect, useState, useRef } from 'react';

interface LogEntry {
  timestamp: string;
  type: 'INFO' | 'WARN' | 'ALERT' | 'SUCCESS';
  message: string;
  id: string;
}

const INITIAL_LOGS: LogEntry[] = [
  { timestamp: '12:30:01', type: 'INFO', message: 'Sigma Engine initialized. Loaded 140 core rulesets.', id: '1' },
  { timestamp: '12:30:05', type: 'SUCCESS', message: 'ClamAV daemon synced successfully with threat feed.', id: '2' },
  { timestamp: '12:30:12', type: 'INFO', message: 'Snort IDS interface [eth0] listening on 192.168.1.0/24', id: '3' },
  { timestamp: '12:30:20', type: 'WARN', message: 'SSH Authentication Failure: admin from 103.22.4.99 (port 22)', id: '4' },
];

const LOG_MESSAGES = [
  { type: 'INFO', message: 'Nginx connection received: IP 192.168.10.150 GET /api/v1/auth' },
  { type: 'SUCCESS', message: 'Vulnerability scan complete: 0 critical, 2 low severity findings.' },
  { type: 'WARN', message: 'IDS Alert: Web shell traversal attempt detected on target 172.16.42.1' },
  { type: 'ALERT', message: 'Brute force mitigation: IP 103.22.4.99 blocked by Fail2Ban for 3600s' },
  { type: 'INFO', message: 'Auditd daemon: User ID 1001 modified file /etc/hosts' },
  { type: 'ALERT', message: 'Threat Hunter alert: Mimikatz LSASS process dump pattern matched (T1003)' },
  { type: 'SUCCESS', message: 'Splunk forwarder successfully shipped 420 events to Indexer' },
  { type: 'WARN', message: 'Windows Security Event: Logon failure type 3 (Network) for user account guest' },
  { type: 'INFO', message: 'Elastic Agent: Policy updated. File integrity monitoring re-enabled' },
  { type: 'SUCCESS', message: 'SSL Certificate validation: HTTPS traffic decrypted & inspected by proxy' },
];

export const LogStream: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>(INITIAL_LOGS);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomMsg = LOG_MESSAGES[Math.floor(Math.random() * LOG_MESSAGES.length)];
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0];
      
      const newEntry: LogEntry = {
        timestamp: timeStr,
        type: randomMsg.type as any,
        message: randomMsg.message,
        id: Math.random().toString(36).substr(2, 9),
      };

      setLogs((prev) => {
        const sliced = prev.length >= 12 ? prev.slice(1) : prev;
        return [...sliced, newEntry];
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="cyber-glass rounded border border-cyber-cyan-border/40 p-3 h-[250px] font-mono text-[11px] leading-relaxed relative overflow-hidden select-none">
      <div className="flex items-center justify-between border-b border-cyber-cyan-border/20 pb-1.5 mb-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
        <span>[ACTIVE SYSTEM MONITOR]</span>
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-cyber-green animate-ping"></span>
          <span className="text-cyber-green">LIVE</span>
        </span>
      </div>

      <div ref={containerRef} className="h-[190px] overflow-y-auto space-y-1.5 scrollbar-thin">
        {logs.map((log) => {
          let badgeColor = 'bg-slate-500/20 text-slate-400';
          let textColor = 'text-slate-300';
          
          if (log.type === 'WARN') {
            badgeColor = 'bg-cyber-orange/20 text-cyber-orange border border-cyber-orange/30';
            textColor = 'text-cyber-orange/90';
          } else if (log.type === 'ALERT') {
            badgeColor = 'bg-cyber-red/20 text-cyber-red border border-cyber-red/40';
            textColor = 'text-cyber-red/90 font-semibold';
          } else if (log.type === 'SUCCESS') {
            badgeColor = 'bg-cyber-green/20 text-cyber-green border border-cyber-green/30';
            textColor = 'text-cyber-green/90';
          } else if (log.type === 'INFO') {
            badgeColor = 'bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/20';
            textColor = 'text-slate-300';
          }

          return (
            <div key={log.id} className="flex items-start gap-2 border-b border-slate-900 pb-1 select-all hover:bg-slate-900/40">
              <span className="text-slate-500 shrink-0">{log.timestamp}</span>
              <span className={`px-1 rounded text-[9px] font-bold shrink-0 ${badgeColor}`}>{log.type}</span>
              <span className={`break-words ${textColor}`}>{log.message}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
