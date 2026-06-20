import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Sector, Tooltip, ResponsiveContainer } from 'recharts';
import { AlertTriangle, Target, ShieldCheck, Wifi, Monitor, Bell, Shield, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

// ─── TYPES ──────────────────────────────────────────────────────
interface ChartSegment {
  name: string;
  value: number;
  color: string;
}

interface ChartCardConfig {
  title: string;
  icon: React.ReactNode;
  centerLabel: string;
  totalCount: number;
  data: ChartSegment[];
}

// ─── CHART DATA ─────────────────────────────────────────────────
const CHART_CARDS: ChartCardConfig[] = [
  {
    title: 'Threat Severity Distribution',
    icon: <AlertTriangle className="w-4 h-4 text-cyber-orange" />,
    centerLabel: 'Threats',
    totalCount: 892,
    data: [
      { name: 'Critical', value: 12, color: '#ff0055' },
      { name: 'High', value: 28, color: '#ffaa00' },
      { name: 'Medium', value: 41, color: '#3b82f6' },
      { name: 'Low', value: 19, color: '#00ff66' },
    ],
  },
  {
    title: 'Attack Vector Analysis',
    icon: <Target className="w-4 h-4 text-cyber-red" />,
    centerLabel: 'Vectors',
    totalCount: 1247,
    data: [
      { name: 'Malware', value: 34, color: '#ff0055' },
      { name: 'Phishing', value: 22, color: '#ffaa00' },
      { name: 'Brute Force', value: 18, color: '#8b5cf6' },
      { name: 'Web Exploits', value: 16, color: '#00f0ff' },
      { name: 'Insider Threats', value: 10, color: '#3b82f6' },
    ],
  },
  {
    title: 'Incident Response Status',
    icon: <ShieldCheck className="w-4 h-4 text-cyber-green" />,
    centerLabel: 'Incidents',
    totalCount: 456,
    data: [
      { name: 'Resolved', value: 72, color: '#00ff66' },
      { name: 'Investigating', value: 18, color: '#ffaa00' },
      { name: 'Escalated', value: 10, color: '#ff0055' },
    ],
  },
  {
    title: 'Network Traffic Classification',
    icon: <Wifi className="w-4 h-4 text-cyber-cyan" />,
    centerLabel: 'Traffic',
    totalCount: 32840,
    data: [
      { name: 'Normal Traffic', value: 68, color: '#00f0ff' },
      { name: 'Suspicious', value: 20, color: '#ffaa00' },
      { name: 'Malicious', value: 12, color: '#ff0055' },
    ],
  },
];

// ─── ANIMATED COUNTER HOOK ──────────────────────────────────────
const useAnimatedCounter = (target: number, isActive: boolean, duration = 2500) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    let startTime: number | null = null;
    let rafId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setValue(Math.round(target * eased));

      if (progress < 1) {
        rafId = requestAnimationFrame(animate);
      }
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [isActive, target, duration]);

  return value;
};

// ─── FORMAT NUMBER ──────────────────────────────────────────────
const formatNumber = (n: number): string => {
  if (n >= 10000) return `${(n / 1000).toFixed(1)}K`;
  return n.toLocaleString();
};

// ─── CUSTOM TOOLTIP ─────────────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  const item = payload[0].payload;
  return (
    <div className="bg-slate-950/95 backdrop-blur-md border border-cyber-cyan-border/40 rounded-lg px-3 py-2 font-mono text-xs shadow-[0_0_20px_rgba(0,240,255,0.15)]">
      <div className="flex items-center gap-2 mb-1">
        <span
          className="w-2 h-2 rounded-full shrink-0"
          style={{ backgroundColor: item.color }}
        />
        <span className="text-white font-semibold tracking-wide">{item.name}</span>
      </div>
      <span className="text-cyber-cyan font-bold text-sm">{item.value}%</span>
    </div>
  );
};

// ─── ACTIVE SHAPE RENDERER ─────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
  return (
    <g>
      {/* Expanded glowing sector */}
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius - 2}
        outerRadius={outerRadius + 8}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        style={{ filter: `drop-shadow(0 0 12px ${fill})` }}
      />
      {/* Thin outer ring accent */}
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={outerRadius + 11}
        outerRadius={outerRadius + 13}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        opacity={0.4}
      />
    </g>
  );
};

// ─── DONUT CHART CARD ───────────────────────────────────────────
const PieComponent = Pie as any;

const DonutChartCard: React.FC<{ card: ChartCardConfig; index: number }> = ({
  card,
  index,
}) => {
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);
  const [isVisible, setIsVisible] = useState(false);
  const animatedCount = useAnimatedCounter(card.totalCount, isVisible, 2500);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      onViewportEnter={() => setIsVisible(true)}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="cyber-glass rounded-lg border border-cyber-cyan-border/20 p-5 relative group hover:border-cyber-cyan/40 hover:shadow-[0_0_30px_rgba(0,240,255,0.08)] transition-all duration-500"
    >
      {/* Floating grid texture */}
      <div className="absolute inset-0 cyber-grid-dots opacity-30 pointer-events-none rounded-lg" />

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-cyber-cyan/30 group-hover:border-cyber-cyan/60 transition-colors" />
      <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-cyber-cyan/30 group-hover:border-cyber-cyan/60 transition-colors" />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-cyber-cyan/30 group-hover:border-cyber-cyan/60 transition-colors" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-cyber-cyan/30 group-hover:border-cyber-cyan/60 transition-colors" />

      {/* Subtle glow orb */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyber-cyan/5 blur-[60px] rounded-full pointer-events-none group-hover:bg-cyber-cyan/10 transition-colors duration-700" />

      {/* Floating particles */}
      <div
        className="absolute top-10 right-14 w-1 h-1 rounded-full bg-cyber-cyan/30 animate-ping pointer-events-none"
        style={{ animationDuration: '3s' }}
      />
      <div
        className="absolute bottom-20 left-10 w-1 h-1 rounded-full bg-cyber-cyan/20 animate-ping pointer-events-none"
        style={{ animationDuration: '4.5s', animationDelay: '1s' }}
      />
      <div
        className="absolute top-24 left-20 w-0.5 h-0.5 rounded-full bg-cyber-cyan/40 animate-ping pointer-events-none"
        style={{ animationDuration: '5s', animationDelay: '2s' }}
      />

      {/* ── Title Bar ── */}
      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded bg-slate-900/80 border border-cyber-cyan-border/20">
            {card.icon}
          </div>
          <h3 className="font-display text-xs md:text-sm font-bold text-white uppercase tracking-wider leading-tight">
            {card.title}
          </h3>
        </div>
        <span className="flex items-center gap-1.5 text-[8px] font-mono text-cyber-green font-bold tracking-widest shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-cyber-green animate-pulse" />
          LIVE
        </span>
      </div>

      {/* ── Donut Chart ── */}
      <div className="relative z-10 flex justify-center">
        <div className="w-[180px] h-[180px] md:w-[200px] md:h-[200px] relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              {isVisible && (
                <PieComponent
                  data={card.data}
                  cx="50%"
                  cy="50%"
                  innerRadius="55%"
                  outerRadius="80%"
                  paddingAngle={3}
                  dataKey="value"
                  strokeWidth={0}
                  activeIndex={activeIndex}
                  activeShape={renderActiveShape}
                  onMouseEnter={(_: any, idx: any) => setActiveIndex(idx)}
                  onMouseLeave={() => setActiveIndex(undefined)}
                  animationBegin={index * 150}
                  animationDuration={1400}
                  animationEasing="ease-out"
                >
                  {card.data.map((entry, idx) => (
                    <Cell
                      key={idx}
                      fill={entry.color}
                      style={{
                        filter:
                          activeIndex === idx
                            ? `drop-shadow(0 0 8px ${entry.color})`
                            : 'none',
                        transition: 'filter 0.3s ease',
                      }}
                    />
                  ))}
                </PieComponent>
              )}
              <Tooltip
                content={<CustomTooltip />}
                wrapperStyle={{ zIndex: 50 }}
              />
            </PieChart>
          </ResponsiveContainer>

          {/* Center Label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="font-display text-xl md:text-2xl font-bold text-white leading-none">
              {formatNumber(animatedCount)}
            </span>
            <span className="font-mono text-[9px] text-slate-500 uppercase tracking-widest mt-1">
              {card.centerLabel}
            </span>
          </div>
        </div>
      </div>

      {/* ── Legend ── */}
      <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-1.5 relative z-10">
        {card.data.map((segment, idx) => (
          <div
            key={idx}
            className="flex items-center gap-1.5 text-[10px] font-mono cursor-default group/legend"
            onMouseEnter={() => setActiveIndex(idx)}
            onMouseLeave={() => setActiveIndex(undefined)}
          >
            <span
              className="w-2 h-2 rounded-full shrink-0 transition-shadow duration-300"
              style={{
                backgroundColor: segment.color,
                boxShadow:
                  activeIndex === idx ? `0 0 8px ${segment.color}` : 'none',
              }}
            />
            <span className="text-slate-400 truncate group-hover/legend:text-slate-200 transition-colors">
              {segment.name}
            </span>
            <span className="text-slate-500 font-bold ml-auto">
              {segment.value}%
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

// ─── STATUS METRICS DATA ────────────────────────────────────────
const STATUS_METRICS = [
  {
    label: 'ACTIVE MONITORS',
    value: '16',
    icon: <Monitor className="w-3.5 h-3.5 text-cyber-cyan" />,
    color: 'text-cyber-cyan',
  },
  {
    label: 'ALERTS TODAY',
    value: '248',
    icon: <Bell className="w-3.5 h-3.5 text-cyber-orange" />,
    color: 'text-cyber-orange',
  },
  {
    label: 'INCIDENTS BLOCKED',
    value: '91%',
    icon: <Shield className="w-3.5 h-3.5 text-cyber-green" />,
    color: 'text-cyber-green',
  },
  {
    label: 'PIPELINE HEALTH',
    value: 'STABLE',
    icon: <Activity className="w-3.5 h-3.5 text-cyber-green" />,
    color: 'text-cyber-green',
  },
];

// ─── MAIN COMPONENT ─────────────────────────────────────────────
export const SocAnalytics: React.FC = () => {
  return (
    <section
      id="soc-analytics"
      className="py-20 md:py-28 px-4 border-b border-cyber-cyan-border/20 relative overflow-hidden"
    >
      {/* Background glow orbs */}
      <div className="absolute top-1/4 right-0 w-[350px] h-[350px] bg-cyber-cyan/4 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-cyber-purple/5 blur-[120px] rounded-full pointer-events-none z-0" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* ── Section Header ── */}
        <div className="flex flex-col gap-2 mb-12 border-l-2 border-cyber-cyan pl-4">
          <span className="font-mono text-xs text-cyber-cyan uppercase tracking-widest font-bold">
            [NODE: 03_SOC_ANALYTICS]
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white uppercase tracking-tight">
            Threat Intelligence Overview
          </h2>
        </div>

        {/* ── 2×2 Dashboard Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CHART_CARDS.map((card, idx) => (
            <DonutChartCard key={idx} card={card} index={idx} />
          ))}
        </div>

        {/* ── Bottom Status Metrics Bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 cyber-glass rounded-lg border border-cyber-cyan-border/20 p-4 md:p-5 grid grid-cols-2 md:grid-cols-4 gap-4 relative overflow-hidden"
        >
          {/* Background grid */}
          <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />

          {STATUS_METRICS.map((metric, idx) => (
            <div key={idx} className="flex items-center gap-3 relative z-10">
              <div className="p-1.5 rounded bg-slate-900/80 border border-cyber-cyan-border/15">
                {metric.icon}
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-[9px] text-slate-500 uppercase tracking-widest font-semibold">
                  {metric.label}
                </span>
                <span
                  className={`font-display text-sm font-bold ${metric.color} tracking-wide`}
                >
                  {metric.value}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
