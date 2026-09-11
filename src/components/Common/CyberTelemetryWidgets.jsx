import React from 'react';
import { ArrowUpRight, TrendingUp, Sparkles, Activity } from 'lucide-react';

/**
 * Reference Circular Telemetry Compass Load Meter
 */
export function TelemetryCompassMeter({ 
  value = 88, 
  title = "Skill Readiness Load Meter", 
  unit = "pts",
  metric1 = { label: "Response", val: "1.2s" },
  metric2 = { label: "Peak Match", val: "94%" },
  metric3 = { label: "ATS Health", val: "Optimal" }
}) {
  const ticks = Array.from({ length: 36 });
  const activeCount = Math.round((value / 100) * 36);

  return (
    <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: '300px' }}>
      <div className="flex-between" style={{ marginBottom: '12px' }}>
        <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)' }}>{title}</span>
        <span className="badge badge-orange">Live Telemetry</span>
      </div>

      <div style={{ position: 'relative', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '190px' }}>
        {/* Compass Cardinal Points */}
        <span style={{ position: 'absolute', top: 4, fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-muted)' }}>N</span>
        <span style={{ position: 'absolute', right: 8, fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-muted)' }}>E</span>
        <span style={{ position: 'absolute', bottom: 4, fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-muted)' }}>S</span>
        <span style={{ position: 'absolute', left: 8, fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-muted)' }}>W</span>

        {/* Circular Radar Ticks */}
        <svg width="180" height="180" viewBox="0 0 180 180">
          <circle cx="90" cy="90" r="76" fill="none" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1" />
          <circle cx="90" cy="90" r="62" fill="none" stroke="rgba(255, 85, 0, 0.15)" strokeWidth="1" strokeDasharray="3 3" />
          
          {ticks.map((_, i) => {
            const angle = (i * 10) * (Math.PI / 180);
            const r1 = 70;
            const r2 = i % 3 === 0 ? 80 : 75;
            const x1 = 90 + r1 * Math.cos(angle);
            const y1 = 90 + r1 * Math.sin(angle);
            const x2 = 90 + r2 * Math.cos(angle);
            const y2 = 90 + r2 * Math.sin(angle);
            const isActive = i <= activeCount;

            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={isActive ? '#ff5500' : 'rgba(255, 255, 255, 0.12)'}
                strokeWidth={i % 3 === 0 ? 2 : 1.2}
                strokeLinecap="round"
                style={{
                  filter: isActive ? 'drop-shadow(0 0 3px rgba(255, 85, 0, 0.6))' : 'none'
                }}
              />
            );
          })}
        </svg>

        {/* Center Readout */}
        <div style={{ position: 'absolute', textAlign: 'center' }}>
          <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Current Alignment
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', lineHeight: 1.1 }}>
            {value}
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--accent-orange)', fontWeight: 600 }}>
            {unit}
          </div>
        </div>
      </div>

      {/* Bottom 3 Sub-Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', paddingTop: '12px', borderTop: '1px solid var(--border-subtle)', textAlign: 'center' }}>
        <div>
          <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{metric1.label}</div>
          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>{metric1.val}</div>
        </div>
        <div>
          <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{metric2.label}</div>
          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-orange)' }}>{metric2.val}</div>
        </div>
        <div>
          <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{metric3.label}</div>
          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-emerald)' }}>{metric3.val}</div>
        </div>
      </div>
    </div>
  );
}

/**
 * Reference Segmented Radial Arc Tachometer Gauge
 */
export function SegmentedRadialArcMeter({ 
  percentage = 85, 
  label = "ATS Readiness Rate", 
  sublabel = "Verified Score" 
}) {
  const totalBars = 24;
  const activeBars = Math.round((percentage / 100) * totalBars);

  return (
    <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: '220px', justifyContent: 'space-between' }}>
      <div className="flex-between">
        <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)' }}>{label}</span>
        <span className="badge badge-orange">{percentage}%</span>
      </div>

      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '120px', overflow: 'hidden' }}>
        <svg width="220" height="120" viewBox="0 0 220 120">
          {Array.from({ length: totalBars }).map((_, i) => {
            // Arc from -180 deg to 0 deg
            const angle = Math.PI + (i / (totalBars - 1)) * Math.PI;
            const r1 = 68;
            const r2 = 92;
            const cx = 110;
            const cy = 105;

            const x1 = cx + r1 * Math.cos(angle);
            const y1 = cy + r1 * Math.sin(angle);
            const x2 = cx + r2 * Math.cos(angle);
            const y2 = cy + r2 * Math.sin(angle);
            const isActive = i < activeBars;

            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={isActive ? '#ff5500' : 'rgba(255, 255, 255, 0.12)'}
                strokeWidth="4.5"
                strokeLinecap="round"
                style={{
                  filter: isActive ? 'drop-shadow(0 0 4px rgba(255, 85, 0, 0.6))' : 'none',
                  transition: 'stroke 0.3s ease'
                }}
              />
            );
          })}
        </svg>

        <div style={{ position: 'absolute', bottom: 6, textAlign: 'center' }}>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', lineHeight: 1 }}>
            {percentage}%
          </div>
          <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            {sublabel}
          </div>
        </div>
      </div>

      <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
        Calculated dynamically against enterprise recruiter requirements.
      </div>
    </div>
  );
}

/**
 * Reference Horizon Stream / Glow Activity Flow Visualization
 */
export function StreamGlowActivityChart({ 
  title = "Skill Alignment Activity Stream",
  weeklyCount = "2,197",
  monthlyCount = "8,903"
}) {
  return (
    <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div className="flex-between" style={{ flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>{title}</h3>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Dynamic talent matching density across active pipelines</p>
        </div>

        <div style={{ display: 'flex', gap: '20px' }}>
          <div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Weekly Matches</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
              {weeklyCount} <span style={{ fontSize: '0.72rem', color: 'var(--accent-emerald)', fontWeight: 700 }}>+12.6%</span>
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Monthly Audits</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
              {monthlyCount} <span style={{ fontSize: '0.72rem', color: 'var(--accent-orange)', fontWeight: 700 }}>+8.4%</span>
            </div>
          </div>
        </div>
      </div>

      {/* SVG Glowing Ribbon Stream */}
      <div style={{ position: 'relative', width: '100%', height: '160px', background: 'rgba(0,0,0,0.3)', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border-subtle)' }}>
        <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 600 160">
          <defs>
            <linearGradient id="emberStreamGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ff3b30" stopOpacity="0.4" />
              <stop offset="40%" stopColor="#ff5500" stopOpacity="0.85" />
              <stop offset="70%" stopColor="#ff7a00" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#ff3b30" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="emberStreamSoft" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ff5500" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#ff5500" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#ff5500" stopOpacity="0.05" />
            </linearGradient>
          </defs>

          {/* Background Ambient Wave */}
          <path
            d="M 0 80 Q 150 40 300 90 T 600 70 L 600 130 Q 450 150 300 110 T 0 120 Z"
            fill="url(#emberStreamSoft)"
          />

          {/* Foreground Radiant Stream Wave */}
          <path
            d="M 0 80 C 120 70, 200 45, 300 75 C 400 105, 480 50, 600 65 L 600 105 C 480 125, 400 85, 300 115 C 200 145, 120 100, 0 100 Z"
            fill="url(#emberStreamGrad)"
            style={{ filter: 'drop-shadow(0 0 12px rgba(255, 85, 0, 0.5))' }}
          />

          {/* Stream Guideline Markers */}
          <line x1="150" y1="20" x2="150" y2="140" stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
          <line x1="300" y1="20" x2="300" y2="140" stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
          <line x1="450" y1="20" x2="450" y2="140" stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />

          {/* Glowing Nodes */}
          <circle cx="150" cy="74" r="4" fill="#ffffff" stroke="#ff5500" strokeWidth="2" style={{ filter: 'drop-shadow(0 0 6px #ff5500)' }} />
          <circle cx="300" cy="75" r="4" fill="#ffffff" stroke="#ff5500" strokeWidth="2" style={{ filter: 'drop-shadow(0 0 6px #ff5500)' }} />
          <circle cx="450" cy="60" r="4" fill="#ffffff" stroke="#ff5500" strokeWidth="2" style={{ filter: 'drop-shadow(0 0 6px #ff5500)' }} />
        </svg>

        {/* Floating Data Value Tags */}
        <div style={{ position: 'absolute', top: 14, left: '22%', background: '#181922', padding: '2px 7px', borderRadius: '4px', fontSize: '0.68rem', border: '1px solid rgba(255,85,0,0.3)', color: '#fff', fontFamily: 'var(--font-mono)' }}>
          21,980
        </div>
        <div style={{ position: 'absolute', top: 14, left: '48%', background: '#181922', padding: '2px 7px', borderRadius: '4px', fontSize: '0.68rem', border: '1px solid rgba(255,85,0,0.3)', color: '#fff', fontFamily: 'var(--font-mono)' }}>
          1,322
        </div>
        <div style={{ position: 'absolute', top: 14, left: '72%', background: '#181922', padding: '2px 7px', borderRadius: '4px', fontSize: '0.68rem', border: '1px solid rgba(255,85,0,0.3)', color: '#fff', fontFamily: 'var(--font-mono)' }}>
          18,400
        </div>
      </div>
    </div>
  );
}

/**
 * Reference Resource Allocation Bars
 */
export function ResourceAllocationProgress({ items = [] }) {
  const defaultItems = items.length > 0 ? items : [
    { label: "Full Stack AI Match", percentage: 88 },
    { label: "Cloud & DevOps", percentage: 72 },
    { label: "ATS Optimization", percentage: 84 },
    { label: "System Architecture", percentage: 65 }
  ];

  return (
    <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '14px', height: '100%' }}>
      <div className="flex-between">
        <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)' }}>Skill Resource Allocation</span>
        <span className="badge badge-orange">Coverage</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {defaultItems.map((item, idx) => (
          <div key={idx}>
            <div className="flex-between" style={{ fontSize: '0.78rem', marginBottom: '5px' }}>
              <span style={{ color: 'var(--text-secondary)' }}>{item.label}</span>
              <span style={{ fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>{item.percentage}%</span>
            </div>
            <div style={{ width: '100%', height: '6px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '3px', overflow: 'hidden' }}>
              <div
                style={{
                  width: `${item.percentage}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #ff3b30 0%, #ff5500 70%, #ff7a00 100%)',
                  boxShadow: '0 0 8px rgba(255, 85, 0, 0.4)',
                  borderRadius: '3px'
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
