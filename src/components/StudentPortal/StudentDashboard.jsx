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
  CheckCircle2,
  Clock
} from 'lucide-react';
import SkillRadar from './SkillRadar';
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
  useGsapStagger(containerRef, '.gsap-dash-item', { y: 20, stagger: 0.08 });

  const countScoreRef = useGsapCounter(avgMatchScore);
  const countAtsRef = useGsapCounter(currentStudent?.resumeATSScore || 0);
  const countAppsRef = useGsapCounter(totalApplicationsCount);

  const STATUS_OPTIONS = [
    'Saved',
    'Applied Externally',
    'Shortlisted',
    'Interview',
    'Selected',
    'Rejected'
  ];

  return (
    <div ref={containerRef} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Executive Welcome Banner */}
      <div 
        className="glass-card flex-between gsap-dash-item" 
        style={{ 
          gap: '20px', 
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.14) 0%, rgba(6, 182, 212, 0.09) 100%)',
          border: '1px solid rgba(99, 102, 241, 0.25)',
          flexWrap: 'wrap'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="badge badge-indigo">
              <Sparkles size={12} /> Career Readiness Command Center
            </span>
            <span className="badge badge-cyan">
              Live Real-Time Telemetry
            </span>
          </div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800, margin: '4px 0', lineHeight: 1.2 }}>
            Welcome back, <span className="gradient-text">{currentStudent?.name}</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginTop: '6px' }}>
            Target Trajectory: <strong style={{ color: 'var(--text-primary)' }}>{currentStudent?.targetRole}</strong> • {currentStudent?.university} ({currentStudent?.department})
          </p>
        </div>

        <button 
          className="btn btn-primary"
          onClick={() => setActiveTab('skill_radar')}
          style={{ whiteSpace: 'nowrap' }}
        >
          <Target size={16} /> Open Skill Alignment Radar
        </button>
      </div>

      {/* 3 Executive Dynamic Metric Cards */}
      <div className="grid-3 gsap-dash-item">
        
        {/* Metric 1: Dynamic Average Skill Match */}
        <div 
          className="glass-card glass-card-interactive flex-between" 
          onClick={() => setActiveTab('skill_radar')}
        >
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
              DYNAMIC AVG SKILL MATCH
            </div>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--accent-indigo)', margin: '4px 0', fontFamily: 'var(--font-mono)' }}>
              <span ref={countScoreRef}>{avgMatchScore}</span>%
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--accent-cyan)', fontWeight: 600 }}>
              Calculated across {opportunities.length} live job openings
            </div>
          </div>
          <div style={{
            width: '52px',
            height: '52px',
            borderRadius: '14px',
            background: 'var(--accent-indigo-glow)',
            border: '1px solid rgba(99, 102, 241, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Target size={26} color="var(--accent-indigo)" />
          </div>
        </div>

        {/* Metric 2: ATS Resume Score */}
        <div 
          className="glass-card glass-card-interactive flex-between" 
          onClick={() => setActiveTab('resume_analyzer')}
        >
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
              ATS RESUME COMPLIANCE
            </div>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--accent-cyan)', margin: '4px 0', fontFamily: 'var(--font-mono)' }}>
              <span ref={countAtsRef}>{currentStudent?.resumeATSScore || 0}</span>
              <span style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>/100</span>
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
              Verified Profile Optimization Index
            </div>
          </div>
          <div style={{
            width: '52px',
            height: '52px',
            borderRadius: '14px',
            background: 'var(--accent-cyan-glow)',
            border: '1px solid rgba(6, 182, 212, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <FileCheck2 size={26} color="var(--accent-cyan)" />
          </div>
        </div>

        {/* Metric 3: Applications & Interviews Tracker */}
        <div 
          className="glass-card glass-card-interactive flex-between" 
          onClick={() => setActiveTab('internships')}
        >
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
              APPLICATIONS PIPELINE
            </div>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--accent-emerald)', margin: '4px 0', fontFamily: 'var(--font-mono)' }}>
              <span ref={countAppsRef}>{totalApplicationsCount}</span>
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--accent-amber)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Clock size={13} /> {totalInterviewsCount} {totalInterviewsCount === 1 ? 'Interview' : 'Interviews'} Scheduled
            </div>
          </div>
          <div style={{
            width: '52px',
            height: '52px',
            borderRadius: '14px',
            background: 'var(--accent-emerald-glow)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Briefcase size={26} color="var(--accent-emerald)" />
          </div>
        </div>

      </div>

      {/* Embedded Skill Radar Component */}
      <div className="gsap-dash-item">
        <SkillRadar />
      </div>

      {/* Real Application Tracking System */}
      <div className="glass-card gsap-dash-item" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div className="flex-between" style={{ flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Personal Application Tracker</h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              Monitor, track, and update the live hiring progression for your targeted applications.
            </p>
          </div>
          <span className="badge badge-indigo">
            {studentApplications.length} Tracked {studentApplications.length === 1 ? 'Record' : 'Records'}
          </span>
        </div>

        {studentApplications.length === 0 ? (
          <div style={{
            background: 'var(--bg-input)',
            padding: '32px 24px',
            borderRadius: 'var(--radius-lg)',
            textAlign: 'center',
            border: '1px dashed var(--border-color)'
          }}>
            <Briefcase size={36} color="var(--text-muted)" style={{ margin: '0 auto 12px' }} />
            <div style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '6px' }}>No Applications Tracked Yet</div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', maxWidth: '480px', margin: '0 auto 16px' }}>
              Browse verified industry opportunities, apply with your aligned profile, and track your status pipeline here!
            </p>
            <button className="btn btn-primary btn-sm" onClick={() => setActiveTab('internships')}>
              Explore Opportunities <ArrowUpRight size={14} />
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {studentApplications.map(app => {
              const isInterview = app.status === 'Interview';
              const isSelected = app.status === 'Selected';
              const isRejected = app.status === 'Rejected';

              return (
                <div 
                  key={app.id} 
                  style={{ 
                    background: 'var(--bg-input)', 
                    padding: '16px 20px', 
                    borderRadius: 'var(--radius-md)', 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '14px',
                    border: isInterview ? '1px solid rgba(245, 158, 11, 0.4)' : isSelected ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid var(--border-subtle)',
                    transition: 'border-color 0.2s ease, background 0.2s ease'
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.98rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {app.opportunityTitle}
                      {isSelected && <span className="badge badge-emerald">Offered</span>}
                      {isInterview && <span className="badge badge-amber">Interview Stage</span>}
                    </div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--accent-indigo)', marginTop: '3px', fontWeight: 600 }}>
                      {app.company} • <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>Applied via {app.source} on {app.appliedAt}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    {/* Status Dropdown allowing Manual Progression */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                        Stage:
                      </label>
                      <select
                        value={app.status}
                        onChange={(e) => updateApplicationStatus(app.id, e.target.value)}
                        style={{
                          background: 'var(--bg-secondary)',
                          color: 'var(--text-primary)',
                          border: '1px solid var(--border-color)',
                          borderRadius: 'var(--radius-sm)',
                          padding: '7px 12px',
                          fontSize: '0.82rem',
                          fontWeight: 600,
                          outline: 'none',
                          cursor: 'pointer'
                        }}
                      >
                        {STATUS_OPTIONS.map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>

                    {app.externalUrl && (
                      <a 
                        href={app.externalUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '7px 12px' }}
                        title="Open external job listing"
                      >
                        <span>Listing</span>
                        <ExternalLink size={13} />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}
