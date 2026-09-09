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
import { Globe2, Building, Users, Award, ShieldAlert } from 'lucide-react';

export default function NationalObservatory() {
  const { nationalStats } = useApp();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Top Banner */}
      <div className="glass-card flex-between" style={{ gap: '20px', flexWrap: 'wrap', background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(99, 102, 241, 0.1) 100%)' }}>
        <div>
          <span className="badge badge-cyan" style={{ marginBottom: '8px' }}>
            <Globe2 size={12} /> National Skill Observatory
          </span>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>
            Macro Academia-Industry <span className="gradient-text">Skill Supply & Demand Index</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
            Real-time analytics monitoring regional tech skill gaps and university performance metrics across India.
          </p>
        </div>
      </div>

      {/* 4 National KPI Cards */}
      <div className="grid-3">
        <div className="glass-card flex-between">
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>REGISTERED STUDENTS</div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-indigo)' }}>{nationalStats.totalStudentsRegistered}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', marginTop: '4px' }}>+18% Year-over-Year</div>
          </div>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--accent-indigo-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Users size={24} color="var(--accent-indigo)" />
          </div>
        </div>

        <div className="glass-card flex-between">
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>PARTNER UNIVERSITIES</div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>{nationalStats.partnerColleges}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>Across 22 States</div>
          </div>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--accent-cyan-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Building size={24} color="var(--accent-cyan)" />
          </div>
        </div>

        <div className="glass-card flex-between">
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>VERIFIED PLACEMENTS</div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>{nationalStats.totalPlacementsDone}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', marginTop: '4px' }}>84% Verification Rate</div>
          </div>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--accent-emerald-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Award size={24} color="var(--accent-emerald)" />
          </div>
        </div>
      </div>

      {/* Demand vs Supply Chart */}
      <div className="glass-card" style={{ height: '420px', display: 'flex', flexDirection: 'column' }}>
        <div className="flex-between" style={{ marginBottom: '16px' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Industry Skill Demand vs Student Supply Deficit</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Comparing recruiter job opening requirements against graduate skill readiness</p>
          </div>
          <span className="badge badge-amber">Critical Gaps Highlighted</span>
        </div>

        <div style={{ flex: 1, minHeight: 0 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={nationalStats.topSkillDemands}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
              <XAxis dataKey="skill" tick={{ fill: 'var(--text-secondary)' }} />
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
              <Bar dataKey="demand" name="Industry Demand Index" fill="var(--accent-cyan)" radius={[6, 6, 0, 0]} />
              <Bar dataKey="supply" name="Student Ready Supply %" fill="var(--accent-rose)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Regional Tech Hub Matrix */}
      <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Regional Tech Hub Skill Deficit Index</h3>

        <div className="grid-3">
          {[
            { region: 'Bangalore Tech Corridor', topDeficit: 'Generative AI & LLM Systems', readinessIndex: '82%', demandGrowth: '+32%' },
            { region: 'NCR (Gurugram / Noida)', topDeficit: 'Cloud DevOps & Kubernetes', readinessIndex: '76%', demandGrowth: '+28%' },
            { region: 'Hyderabad Cyberabad', topDeficit: 'Data Engineering & Snowflake', readinessIndex: '79%', demandGrowth: '+25%' },
            { region: 'Pune IT Park', topDeficit: 'Zero-Trust Cybersecurity', readinessIndex: '71%', demandGrowth: '+22%' }
          ].map(r => (
            <div key={r.region} style={{ background: 'var(--bg-input)', padding: '16px', borderRadius: 'var(--radius-md)' }}>
              <div className="flex-between" style={{ marginBottom: '8px' }}>
                <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{r.region}</div>
                <span className="badge badge-cyan">{r.demandGrowth}</span>
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Top Deficit Skill:</div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-rose)', marginBottom: '8px' }}>{r.topDeficit}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Graduate Readiness Index: <strong>{r.readinessIndex}</strong></div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
