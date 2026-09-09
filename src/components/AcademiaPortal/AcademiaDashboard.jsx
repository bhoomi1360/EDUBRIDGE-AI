import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { Building2, TrendingUp, Users, Award, BookOpen, ArrowUpRight } from 'lucide-react';

export default function AcademiaDashboard({ setActiveTab }) {
  const { placementStats, curricula } = useApp();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Top Banner */}
      <div className="glass-card flex-between" style={{ gap: '20px', flexWrap: 'wrap' }}>
        <div>
          <span className="badge badge-indigo" style={{ marginBottom: '8px' }}>
            <Building2 size={12} /> University Training & Placement (TPO) Hub
          </span>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>
            Academic Institutional <span className="gradient-text">Skill & Placement Analytics</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
            Track student placement trends, department readiness scores, and AI curriculum alignment.
          </p>
        </div>

        <button 
          className="btn btn-primary"
          onClick={() => setActiveTab('curriculum_harmonizer')}
        >
          <BookOpen size={16} /> Open Curriculum Harmonizer
        </button>
      </div>

      {/* 4 Quick Stat Cards */}
      <div className="grid-3">
        <div className="glass-card flex-between">
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>PLACED STUDENTS</div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>360 / 400</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', marginTop: '4px' }}>90% Placement Rate</div>
          </div>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--accent-emerald-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Users size={24} color="var(--accent-emerald)" />
          </div>
        </div>

        <div className="glass-card flex-between">
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>MEDIAN PACKAGE</div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-indigo)' }}>₹13.2 LPA</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--accent-indigo)', marginTop: '4px' }}>Highest: ₹44.0 LPA</div>
          </div>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--accent-indigo-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <TrendingUp size={24} color="var(--accent-indigo)" />
          </div>
        </div>

        <div className="glass-card flex-between">
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>CURRICULUM HARMONY</div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>74% Aligned</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>3 Courses Need Audit</div>
          </div>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--accent-cyan-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Award size={24} color="var(--accent-cyan)" />
          </div>
        </div>
      </div>

      {/* Placement Trend Bar Chart */}
      <div className="glass-card" style={{ height: '420px', display: 'flex', flexDirection: 'column' }}>
        <div className="flex-between" style={{ marginBottom: '16px' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Monthly Placement Velocity & Packages</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Cumulative placed students vs monthly target drive goals</p>
          </div>
          <span className="badge badge-indigo">2025-2026 Batch</span>
        </div>

        <div style={{ flex: 1, minHeight: 0 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={placementStats}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
              <XAxis dataKey="month" tick={{ fill: 'var(--text-secondary)' }} />
              <YAxis tick={{ fill: 'var(--text-muted)' }} />
              <Tooltip 
                contentStyle={{ 
                  background: 'var(--bg-secondary)', 
                  borderColor: 'var(--border-color)', 
                  borderRadius: '8px',
                  color: 'var(--text-primary)'
                }} 
              />
              <Legend />
              <Bar dataKey="placed" name="Placed Students" fill="var(--accent-indigo)" radius={[6, 6, 0, 0]} />
              <Bar dataKey="target" name="Target Placements" fill="var(--accent-cyan)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Department Readiness Matrix */}
      <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Departmental Skill Readiness Index</h3>
        
        <div className="grid-3">
          {[
            { dept: 'Computer Science & Eng', readiness: 88, placed: '94%', topSkill: 'React, Next.js, Python, AWS' },
            { dept: 'Data Science & AI', readiness: 82, placed: '89%', topSkill: 'PyTorch, ML, Data Eng' },
            { dept: 'Information Technology', readiness: 78, placed: '85%', topSkill: 'Node.js, Docker, Kubernetes' },
            { dept: 'Electronics & Comm', readiness: 68, placed: '74%', topSkill: 'Embedded Systems, C++, Python' }
          ].map(d => (
            <div key={d.dept} style={{ background: 'var(--bg-input)', padding: '16px', borderRadius: 'var(--radius-md)' }}>
              <div className="flex-between" style={{ marginBottom: '8px' }}>
                <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{d.dept}</div>
                <span className="badge badge-emerald">{d.placed} Placed</span>
              </div>
              
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Skill Readiness: {d.readiness}%</div>
              <div style={{ width: '100%', height: '6px', background: 'var(--bg-primary)', borderRadius: '3px', overflow: 'hidden', marginBottom: '8px' }}>
                <div style={{ width: `${d.readiness}%`, height: '100%', background: 'linear-gradient(90deg, var(--accent-indigo), var(--accent-cyan))' }}></div>
              </div>

              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                Trending Skills: <strong>{d.topSkill}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
