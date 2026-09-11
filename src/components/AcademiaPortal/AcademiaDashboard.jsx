import React, { useRef } from 'react';
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
import { Building2, TrendingUp, Users, Award, BookOpen, Sparkles } from 'lucide-react';
import { useGsapStagger } from '../../utils/animations';

export default function AcademiaDashboard({ setActiveTab }) {
  const { placementStats } = useApp();

  const containerRef = useRef(null);
  useGsapStagger(containerRef, '.gsap-acad-item', { y: 20, stagger: 0.08 });

  return (
    <div ref={containerRef} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Top Banner */}
      <div className="glass-card flex-between gsap-acad-item" style={{ gap: '20px', flexWrap: 'wrap' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="badge badge-indigo">
              <Building2 size={12} /> University Training &amp; Placement (TPO) Hub
            </span>
            <span className="badge badge-cyan">
              Autonomous AI Audit
            </span>
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800 }}>
            Academic Institutional <span className="gradient-text">Skill &amp; Placement Analytics</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
            Track student placement velocity, departmental readiness gauges, and AI curriculum alignment.
          </p>
        </div>

        <button 
          className="btn btn-primary"
          onClick={() => setActiveTab('curriculum_harmonizer')}
        >
          <BookOpen size={16} /> Open Curriculum Harmonizer
        </button>
      </div>

      {/* 3 Executive Stat Cards */}
      <div className="grid-3 gsap-acad-item">
        <div className="glass-card flex-between">
          <div>
            <div style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
              PLACED CANDIDATES
            </div>
            <div style={{ fontSize: '2.1rem', fontWeight: 800, color: 'var(--accent-emerald)', fontFamily: 'var(--font-mono)', margin: '4px 0' }}>
              360 <span style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>/ 400</span>
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>
              90% Placement Rate (2025-26)
            </div>
          </div>
          <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'var(--accent-emerald-glow)', border: '1px solid rgba(16, 185, 129, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Users size={26} color="var(--accent-emerald)" />
          </div>
        </div>

        <div className="glass-card flex-between">
          <div>
            <div style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
              MEDIAN COMPENSATION
            </div>
            <div style={{ fontSize: '2.1rem', fontWeight: 800, color: 'var(--accent-indigo)', fontFamily: 'var(--font-mono)', margin: '4px 0' }}>
              ₹13.2 <span style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>LPA</span>
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--accent-indigo)', fontWeight: 600 }}>
              Highest Package: ₹44.0 LPA
            </div>
          </div>
          <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'var(--accent-indigo-glow)', border: '1px solid rgba(99, 102, 241, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <TrendingUp size={26} color="var(--accent-indigo)" />
          </div>
        </div>

        <div className="glass-card flex-between">
          <div>
            <div style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
              CURRICULUM HARMONY
            </div>
            <div style={{ fontSize: '2.1rem', fontWeight: 800, color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)', margin: '4px 0' }}>
              74% <span style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>Aligned</span>
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--accent-amber)', fontWeight: 600 }}>
              3 Syllabi Need AI Refactoring
            </div>
          </div>
          <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'var(--accent-cyan-glow)', border: '1px solid rgba(6, 182, 212, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Award size={26} color="var(--accent-cyan)" />
          </div>
        </div>
      </div>

      {/* Placement Trend Bar Chart */}
      <div className="glass-card gsap-acad-item" style={{ height: '430px', display: 'flex', flexDirection: 'column' }}>
        <div className="flex-between" style={{ marginBottom: '16px' }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Monthly Placement Velocity &amp; Targets</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Cumulative placed students vs monthly recruitment target</p>
          </div>
          <span className="badge badge-indigo">Academic Year 2025-2026</span>
        </div>

        <div style={{ flex: 1, minHeight: 0 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={placementStats}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" />
              <XAxis dataKey="month" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} />
              <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} />
              <Tooltip 
                contentStyle={{ 
                  background: 'var(--bg-secondary)', 
                  borderColor: 'var(--border-color)', 
                  borderRadius: '10px',
                  color: 'var(--text-primary)',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.35)'
                }} 
              />
              <Legend />
              <Bar dataKey="placed" name="Placed Candidates" fill="var(--accent-indigo)" radius={[6, 6, 0, 0]} />
              <Bar dataKey="target" name="Target Placements" fill="var(--accent-cyan)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Department Readiness Matrix */}
      <div className="glass-card gsap-acad-item" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div className="flex-between">
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Departmental Skill Readiness Index</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Real-time skill coverage across university academic branches</p>
          </div>
          <span className="badge badge-cyan">4 Branches Monitored</span>
        </div>
        
        <div className="grid-2">
          {[
            { dept: 'Computer Science & Engineering', readiness: 88, placed: '94%', topSkill: 'React, Next.js, Python, AWS' },
            { dept: 'Data Science & Artificial Intelligence', readiness: 82, placed: '89%', topSkill: 'PyTorch, ML, Data Eng' },
            { dept: 'Information Technology', readiness: 78, placed: '85%', topSkill: 'Node.js, Docker, Kubernetes' },
            { dept: 'Electronics & Communication', readiness: 68, placed: '74%', topSkill: 'Embedded Systems, C++, Python' }
          ].map(d => (
            <div key={d.dept} style={{ background: 'var(--bg-input)', padding: '18px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <div className="flex-between" style={{ marginBottom: '10px' }}>
                <div style={{ fontWeight: 700, fontSize: '0.98rem' }}>{d.dept}</div>
                <span className="badge badge-emerald">{d.placed} Placed</span>
              </div>
              
              <div className="flex-between" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                <span>Skill Readiness Benchmark</span>
                <strong style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>{d.readiness}%</strong>
              </div>
              <div style={{ width: '100%', height: '7px', background: 'var(--bg-primary)', borderRadius: '4px', overflow: 'hidden', marginBottom: '10px' }}>
                <div style={{ width: `${d.readiness}%`, height: '100%', background: 'linear-gradient(90deg, var(--accent-indigo), var(--accent-cyan))' }}></div>
              </div>

              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                Trending Industry Skills: <strong style={{ color: 'var(--accent-indigo)' }}>{d.topSkill}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
