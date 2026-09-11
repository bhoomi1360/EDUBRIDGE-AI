import React, { useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Target, 
  FileCheck2, 
  Briefcase, 
  ArrowUpRight, 
  ExternalLink,
  Sparkles,
  TrendingUp,
  Clock,
  Activity,
  Layers,
  Award,
  Zap,
  Flame
} from 'lucide-react';
import { 
  TelemetryCompassMeter, 
  SegmentedRadialArcMeter, 
  StreamGlowActivityChart, 
  ResourceAllocationProgress 
} from '../Common/CyberTelemetryWidgets';
import { useGsapStagger, useGsapCounter } from '../../utils/animations';

export default function StudentDashboard({ setActiveTab }) {
  const { 
    currentStudent, 
    opportunities, 
    studentApplications, 
    totalApplicationsCount, 
    totalInterviewsCount,
    avgMatchScore,
    updateApplicationStatus 
  } = useApp();

  const containerRef = useRef(null);
  useGsapStagger(containerRef, '.gsap-dash-item', { y: 16, stagger: 0.06 });

  const countScoreRef = useGsapCounter(avgMatchScore);
  const countAtsRef = useGsapCounter(currentStudent?.resumeATSScore || 0);
  const countAppsRef = useGsapCounter(totalApplicationsCount);
  const countInterviewsRef = useGsapCounter(totalInterviewsCount);

  const STATUS_OPTIONS = [
    'Saved',
    'Applied Externally',
    'Shortlisted',
    'Interview',
    'Selected',
    'Rejected'
  ];

  return (
    <div ref={containerRef} style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      
      {/* Reference Sub-Navigation Underline Tabs */}
      <div className="subnav-tabs gsap-dash-item">
        {[
          { id: 'dashboard', label: 'Overview' },
          { id: 'skill_radar', label: 'Skill Radar' },
          { id: 'resume_analyzer', label: 'ATS Parser' },
          { id: 'internships', label: 'Opportunities' },
          { id: 'upskilling', label: 'Upskilling Roadmap' },
          { id: 'invite_inbox', label: 'Interview Invites' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`subnav-tab-btn ${tab.id === 'dashboard' ? 'active' : ''}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Reference 4-Card Metric Strip */}
      <div className="grid-4 gsap-dash-item">
        
        {/* Card 1: Dynamic Avg Skill Match */}
        <div 
          className="metric-stat-card glass-card-interactive"
          onClick={() => setActiveTab('skill_radar')}
        >
          <div className="flex-between">
            <TrendingUp size={16} color="var(--accent-orange)" />
            <div className="metric-circle-badge">
              <ArrowUpRight size={14} />
            </div>
          </div>
          <div>
            <div style={{ fontSize: '1.9rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', lineHeight: 1.1 }}>
              <span ref={countScoreRef}>{avgMatchScore}</span>%
            </div>
            <div className="flex-between" style={{ marginTop: '4px' }}>
              <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Avg Skill Match</span>
              <span className="badge badge-emerald" style={{ fontSize: '0.65rem' }}>+12%</span>
            </div>
          </div>
        </div>

        {/* Card 2: ATS Compliance Score */}
        <div 
          className="metric-stat-card glass-card-interactive"
          onClick={() => setActiveTab('resume_analyzer')}
        >
          <div className="flex-between">
            <FileCheck2 size={16} color="var(--accent-cyan)" />
            <div className="metric-circle-badge">
              <ArrowUpRight size={14} />
            </div>
          </div>
          <div>
            <div style={{ fontSize: '1.9rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', lineHeight: 1.1 }}>
              <span ref={countAtsRef}>{currentStudent?.resumeATSScore || 0}</span>
              <span style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>/100</span>
            </div>
            <div className="flex-between" style={{ marginTop: '4px' }}>
              <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>ATS Compliance</span>
              <span className="badge badge-emerald" style={{ fontSize: '0.65rem' }}>+24%</span>
            </div>
          </div>
        </div>

        {/* Card 3: Tracked Applications */}
        <div 
          className="metric-stat-card glass-card-interactive"
          onClick={() => setActiveTab('internships')}
        >
          <div className="flex-between">
            <Briefcase size={16} color="var(--accent-emerald)" />
            <div className="metric-circle-badge">
              <ArrowUpRight size={14} />
            </div>
          </div>
          <div>
            <div style={{ fontSize: '1.9rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', lineHeight: 1.1 }}>
              <span ref={countAppsRef}>{totalApplicationsCount}</span>
            </div>
            <div className="flex-between" style={{ marginTop: '4px' }}>
              <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Applications Sent</span>
              <span className="badge badge-orange" style={{ fontSize: '0.65rem' }}>Active</span>
            </div>
          </div>
        </div>

        {/* Card 4: Scheduled Interviews */}
        <div 
          className="metric-stat-card glass-card-interactive"
          onClick={() => setActiveTab('invite_inbox')}
        >
          <div className="flex-between">
            <Clock size={16} color="var(--accent-amber)" />
            <div className="metric-circle-badge">
              <ArrowUpRight size={14} />
            </div>
          </div>
          <div>
            <div style={{ fontSize: '1.9rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', lineHeight: 1.1 }}>
              <span ref={countInterviewsRef}>{totalInterviewsCount}</span>
            </div>
            <div className="flex-between" style={{ marginTop: '4px' }}>
              <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Scheduled Interviews</span>
              <span className="badge badge-amber" style={{ fontSize: '0.65rem' }}>Live</span>
            </div>
          </div>
        </div>

      </div>

      {/* Main Visual Telemetry Row (Stream Glow Chart & Gauges) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '20px' }}>
        
        {/* LEFT: Activity Stream Glow + Regional Placement Matrix */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} className="gsap-dash-item">
          
          <StreamGlowActivityChart 
            title="Skill Matching & Generation Activity"
            weeklyCount="2,197"
            monthlyCount="8,903"
          />

          {/* Reference Region / Placement Compensation Matrix */}
          <div className="glass-card" style={{ padding: '18px 20px' }}>
            <div className="flex-between" style={{ marginBottom: '12px' }}>
              <span style={{ fontSize: '0.88rem', fontWeight: 700 }}>Regional Placement Compensation Hubs</span>
              <span className="badge badge-orange">Live Index</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { city: 'Bangalore Tech Corridor', median: '₹14.2 LPA', highest: '₹44.0 LPA' },
                { city: 'Hyderabad Cyberabad', median: '₹12.8 LPA', highest: '₹38.5 LPA' },
                { city: 'NCR (Gurugram / Noida)', median: '₹11.5 LPA', highest: '₹34.0 LPA' },
                { city: 'Pune IT Park', median: '₹10.8 LPA', highest: '₹28.0 LPA' }
              ].map((row, i) => (
                <div 
                  key={i} 
                  className="flex-between"
                  style={{
                    padding: '8px 12px',
                    background: 'var(--bg-input)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.82rem',
                    border: '1px solid var(--border-subtle)'
                  }}
                >
                  <span style={{ color: 'var(--text-secondary)' }}>{row.city}</span>
                  <div style={{ display: 'flex', gap: '18px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Median: <strong style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>{row.median}</strong></span>
                    <span style={{ color: 'var(--accent-orange)', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>{row.highest}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT: Circular Telemetry Dial & Tachometer Gauge */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} className="gsap-dash-item">
          
          {/* Reference Circular Load Meter */}
          <TelemetryCompassMeter 
            value={avgMatchScore}
            title="Skill Alignment Telemetry"
            unit="Overall Match"
            metric1={{ label: "Candidate", val: currentStudent?.name?.split(' ')[0] || "Student" }}
            metric2={{ label: "Target Role", val: currentStudent?.targetRole?.split(' ')[0] || "Eng" }}
            metric3={{ label: "Readiness", val: `${avgMatchScore}%` }}
          />

          {/* Reference Segmented Radial Arc Tachometer */}
          <SegmentedRadialArcMeter 
            percentage={currentStudent?.resumeATSScore || 84}
            label="ATS Resume Compliance Meter"
            sublabel="Verified ATS Score"
          />

          {/* Resource Allocation Bars */}
          <ResourceAllocationProgress 
            items={[
              { label: "Core Algorithms & DSA", percentage: 88 },
              { label: "React / Frontend Systems", percentage: 80 },
              { label: "Python & AI Models", percentage: 70 },
              { label: "Cloud & Container DevOps", percentage: 65 }
            ]}
          />

        </div>

      </div>

      {/* Real Application Tracking System */}
      <div className="glass-card gsap-dash-item" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div className="flex-between" style={{ flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Personal Application Tracker</h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              Track status progression for your active external opportunities.
            </p>
          </div>
          <span className="badge badge-orange">
            {studentApplications.length} Tracked Records
          </span>
        </div>

        {studentApplications.length === 0 ? (
          <div style={{
            background: 'var(--bg-input)',
            padding: '28px 20px',
            borderRadius: 'var(--radius-md)',
            textAlign: 'center',
            border: '1px dashed var(--border-color)'
          }}>
            <Briefcase size={32} color="var(--text-muted)" style={{ margin: '0 auto 10px' }} />
            <div style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '4px' }}>No Active Applications Tracked</div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', maxWidth: '420px', margin: '0 auto 14px' }}>
              Browse verified industry opportunities, apply with your aligned profile, and track your status pipeline here!
            </p>
            <button className="btn glowing-btn-orange btn-sm" onClick={() => setActiveTab('internships')}>
              Explore Opportunities <ArrowUpRight size={13} />
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {studentApplications.map(app => (
              <div 
                key={app.id} 
                style={{ 
                  background: 'var(--bg-input)', 
                  padding: '14px 18px', 
                  borderRadius: 'var(--radius-md)', 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '12px',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.92rem' }}>{app.opportunityTitle}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--accent-orange)', marginTop: '2px', fontWeight: 600 }}>
                    {app.company} • <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>Applied via {app.source} on {app.appliedAt}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <select
                    value={app.status}
                    onChange={(e) => updateApplicationStatus(app.id, e.target.value)}
                    style={{
                      background: 'var(--bg-secondary)',
                      color: 'var(--text-primary)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '6px 10px',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    {STATUS_OPTIONS.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>

                  {app.externalUrl && (
                    <a 
                      href={app.externalUrl} 
                      target="_blank" 
                      rel="noreferrer"
                      className="btn btn-secondary btn-sm"
                      style={{ padding: '6px 10px' }}
                    >
                      <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
