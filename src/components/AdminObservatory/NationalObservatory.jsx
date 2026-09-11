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
import { Globe2, Building, Users, Award, ShieldAlert, TrendingUp } from 'lucide-react';
import { useGsapStagger } from '../../utils/animations';

export default function NationalObservatory() {
  const { nationalStats } = useApp();
  const containerRef = useRef(null);
  useGsapStagger(containerRef, '.gsap-obs-item', { y: 18, stagger: 0.08 });

  return (
    <div ref={containerRef} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Top Banner */}
      <div 
        className="glass-card flex-between gsap-obs-item" 
        style={{ 
          gap: '20px', 
          flexWrap: 'wrap', 
          background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(99, 102, 241, 0.12) 100%)',
          border: '1px solid rgba(6, 182, 212, 0.3)'
        }}
      >
        <div>
          <span className="badge badge-cyan" style={{ marginBottom: '8px' }}>
            <Globe2 size={12} /> National Skill Observatory
          </span>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800 }}>
            Macro Academia-Industry <span className="gradient-text">Skill Supply &amp; Demand Index</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
            Real-time analytics monitoring regional tech skill shortages and university placement readiness across India.
          </p>
        </div>
      </div>

      {/* 3 National KPI Cards */}
      <div className="grid-3 gsap-obs-item">
        <div className="glass-card flex-between">
          <div>
            <div style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
              REGISTERED STUDENTS
            </div>
            <div style={{ fontSize: '2.1rem', fontWeight: 800, color: 'var(--accent-indigo)', fontFamily: 'var(--font-mono)', margin: '4px 0' }}>
              {nationalStats.totalStudentsRegistered}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>
              +18% Year-over-Year Growth
            </div>
          </div>
          <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'var(--accent-indigo-glow)', border: '1px solid rgba(99, 102, 241, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Users size={26} color="var(--accent-indigo)" />
          </div>
        </div>

        <div className="glass-card flex-between">
          <div>
            <div style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
              PARTNER UNIVERSITIES
            </div>
            <div style={{ fontSize: '2.1rem', fontWeight: 800, color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)', margin: '4px 0' }}>
              {nationalStats.partnerColleges}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
              Across 22 States &amp; UTs
            </div>
          </div>
          <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'var(--accent-cyan-glow)', border: '1px solid rgba(6, 182, 212, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Building size={26} color="var(--accent-cyan)" />
          </div>
        </div>

        <div className="glass-card flex-between">
          <div>
            <div style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
              VERIFIED PLACEMENTS
            </div>
            <div style={{ fontSize: '2.1rem', fontWeight: 800, color: 'var(--accent-emerald)', fontFamily: 'var(--font-mono)', margin: '4px 0' }}>
              {nationalStats.totalPlacementsDone}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>
              84% Direct Verification Rate
            </div>
          </div>
          <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'var(--accent-emerald-glow)', border: '1px solid rgba(16, 185, 129, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Award size={26} color="var(--accent-emerald)" />
          </div>
        </div>
      </div>

      {/* Demand vs Supply Chart */}
      <div className="glass-card gsap-obs-item" style={{ height: '430px', display: 'flex', flexDirection: 'column' }}>
        <div className="flex-between" style={{ marginBottom: '16px' }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Industry Skill Demand vs Student Supply Deficit</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Comparing recruiter job opening requirements against graduate skill readiness</p>
          </div>
          <span className="badge badge-amber">Critical Shortage Matrix</span>
        </div>

        <div style={{ flex: 1, minHeight: 0 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={nationalStats.topSkillDemands}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" />
              <XAxis dataKey="skill" tick={{ fill: 'var(--text-secondary)', fontSize: 11 }} />
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
              <Bar dataKey="demand" name="Industry Demand Index" fill="var(--accent-cyan)" radius={[6, 6, 0, 0]} />
              <Bar dataKey="supply" name="Student Ready Supply %" fill="var(--accent-rose)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Regional Tech Hub Matrix */}
      <div className="glass-card gsap-obs-item" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div className="flex-between">
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Regional Tech Hub Skill Deficit Index</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Regional analytics across primary industrial clusters</p>
          </div>
          <span className="badge badge-cyan">4 Tech Corridors</span>
        </div>

        <div className="grid-2">
          {[
            { region: 'Bangalore Tech Corridor', topDeficit: 'Generative AI & LLM Systems', readinessIndex: '82%', demandGrowth: '+32%' },
            { region: 'NCR (Gurugram / Noida)', topDeficit: 'Cloud DevOps & Kubernetes', readinessIndex: '76%', demandGrowth: '+28%' },
            { region: 'Hyderabad Cyberabad', topDeficit: 'Data Engineering & Snowflake', readinessIndex: '79%', demandGrowth: '+25%' },
            { region: 'Pune IT Park', topDeficit: 'Zero-Trust Cybersecurity', readinessIndex: '71%', demandGrowth: '+22%' }
          ].map(r => (
            <div key={r.region} style={{ background: 'var(--bg-input)', padding: '18px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <div className="flex-between" style={{ marginBottom: '8px' }}>
                <div style={{ fontWeight: 700, fontSize: '0.98rem' }}>{r.region}</div>
                <span className="badge badge-cyan">{r.demandGrowth} YoY</span>
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Top Deficit Skill:</div>
              <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--accent-rose)', marginBottom: '8px' }}>{r.topDeficit}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Graduate Readiness Index: <strong style={{ color: 'var(--accent-emerald)' }}>{r.readinessIndex}</strong></div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
