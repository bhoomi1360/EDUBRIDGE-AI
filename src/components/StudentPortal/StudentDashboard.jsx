import React from 'react';
import { useApp } from '../../context/AppContext';
import { Target, FileCheck2, Briefcase, Award, ArrowUpRight, CheckCircle2, Clock, ExternalLink } from 'lucide-react';
import SkillRadar from './SkillRadar';

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

  const STATUS_OPTIONS = [
    'Saved',
    'Applied Externally',
    'Shortlisted',
    'Interview',
    'Selected',
    'Rejected'
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Welcome Banner */}
      <div className="glass-card flex-between" style={{ gap: '20px', background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(6, 182, 212, 0.1) 100%)' }}>
        <div>
          <span className="badge badge-indigo" style={{ marginBottom: '8px' }}>
            🎓 Student Career Readiness Command Center
          </span>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>
            Welcome back, <span className="gradient-text">{currentStudent.name}</span>!
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '4px' }}>
            Target Role: <strong>{currentStudent.targetRole}</strong> • {currentStudent.university} ({currentStudent.department})
          </p>
        </div>

        <button 
          className="btn btn-primary"
          onClick={() => setActiveTab('skill_radar')}
        >
          <Target size={16} /> Open Skill Alignment Radar
        </button>
      </div>

      {/* 3 Real Metric Cards (Calculated Dynamically - NO HARDCODING!) */}
      <div className="grid-3">
        
        {/* Card 1: Computed Average Skill Match */}
        <div className="glass-card flex-between" style={{ cursor: 'pointer' }} onClick={() => setActiveTab('skill_radar')}>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>DYNAMIC AVG SKILL MATCH</div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-indigo)' }}>{avgMatchScore}%</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', marginTop: '4px' }}>Computed from {opportunities.length} live opportunities</div>
          </div>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--accent-indigo-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Target size={24} color="var(--accent-indigo)" />
          </div>
        </div>

        {/* Card 2: ATS Resume Score */}
        <div className="glass-card flex-between" style={{ cursor: 'pointer' }} onClick={() => setActiveTab('resume_analyzer')}>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>ATS RESUME SCORE</div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>{currentStudent.resumeATSScore}/100</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>Verified Profile Score</div>
          </div>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--accent-cyan-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FileCheck2 size={24} color="var(--accent-cyan)" />
          </div>
        </div>

        {/* Card 3: Real Applications Count */}
        <div className="glass-card flex-between" style={{ cursor: 'pointer' }} onClick={() => setActiveTab('internships')}>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>APPLICATIONS TRACKED</div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>
              {totalApplicationsCount} {totalApplicationsCount === 1 ? 'Application' : 'Applications'}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              {totalInterviewsCount} {totalInterviewsCount === 1 ? 'Interview' : 'Interviews'} Scheduled
            </div>
          </div>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--accent-emerald-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Briefcase size={24} color="var(--accent-emerald)" />
          </div>
        </div>

      </div>

      {/* Embedded Skill Radar Preview */}
      <SkillRadar />

      {/* Real Application Tracking System with Manual Status Progression */}
      <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div className="flex-between">
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Personal Application Tracker</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Track and manually update status progression for your external applications.
            </p>
          </div>
          <span className="badge badge-indigo">{studentApplications.length} Tracked Records</span>
        </div>

        {studentApplications.length === 0 ? (
          <div style={{ background: 'var(--bg-input)', padding: '24px', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
            <div style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '6px' }}>0 Applications Tracked</div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
              You have not tracked any external applications yet. Explore verified opportunities to apply!
            </p>
            <button className="btn btn-primary btn-sm" onClick={() => setActiveTab('internships')}>
              Browse Opportunities
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {studentApplications.map(app => (
              <div 
                key={app.id} 
                style={{ 
                  background: 'var(--bg-input)', 
                  padding: '16px', 
                  borderRadius: 'var(--radius-md)', 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '12px'
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{app.opportunityTitle}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--accent-indigo)' }}>
                    {app.company} • <span style={{ color: 'var(--text-muted)' }}>Applied via {app.source} ({app.appliedAt})</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  {/* Status Dropdown allowing Manual Progression */}
                  <div>
                    <label style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', marginBottom: '2px' }}>
                      Update Status:
                    </label>
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
                  </div>

                  <a 
                    href={app.externalUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="btn btn-secondary btn-sm"
                    style={{ padding: '6px 10px' }}
                  >
                    Link <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
