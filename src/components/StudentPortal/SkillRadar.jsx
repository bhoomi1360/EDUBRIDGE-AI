import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer, 
  Tooltip, 
  Legend 
} from 'recharts';
import { Target, Plus, Zap, CheckCircle2, Sliders, Sparkles } from 'lucide-react';
import { useGsapStagger } from '../../utils/animations';

export default function SkillRadar() {
  const { currentStudent, updateStudentSkill, addStudentSkill } = useApp();
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState(70);

  const containerRef = useRef(null);
  useGsapStagger(containerRef, '.gsap-radar-item', { y: 18, stagger: 0.08 });

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (newSkillName.trim()) {
      addStudentSkill(newSkillName.trim(), Number(newSkillLevel), 85);
      setNewSkillName('');
    }
  };

  // Compute average match score
  const avgStudentScore = Math.round(
    currentStudent.skills.reduce((acc, s) => acc + s.level, 0) / (currentStudent.skills.length || 1)
  );
  const avgBenchmark = Math.round(
    currentStudent.skills.reduce((acc, s) => acc + s.benchmark, 0) / (currentStudent.skills.length || 1)
  );
  const gapPercentage = Math.max(0, avgBenchmark - avgStudentScore);

  return (
    <div ref={containerRef} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header Info */}
      <div className="glass-card flex-between gsap-radar-item" style={{ gap: '20px', flexWrap: 'wrap' }}>
        <div>
          <div className="badge badge-cyan" style={{ marginBottom: '8px' }}>
            <Target size={12} /> AI Skill Alignment Engine
          </div>
          <h2 style={{ fontSize: '1.7rem', fontWeight: 800 }}>
            Skill Gap Radar for <span className="gradient-text">{currentStudent?.targetRole}</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
            Comparing {currentStudent?.name}'s verified skill matrix against real-time industry benchmarks.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
          <div className="glass-card glass-card-sm" style={{ textAlign: 'center', minWidth: '125px', background: 'var(--bg-input)' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)' }}>YOUR AVG LEVEL</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--accent-indigo)', fontFamily: 'var(--font-mono)' }}>
              {avgStudentScore}%
            </div>
          </div>
          <div className="glass-card glass-card-sm" style={{ textAlign: 'center', minWidth: '125px', background: 'var(--bg-input)' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)' }}>INDUSTRY TARGET</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>
              {avgBenchmark}%
            </div>
          </div>
          <div className="glass-card glass-card-sm" style={{ textAlign: 'center', minWidth: '125px', background: 'var(--bg-input)' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)' }}>SKILL GAP</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: gapPercentage === 0 ? 'var(--accent-emerald)' : 'var(--accent-amber)', fontFamily: 'var(--font-mono)' }}>
              {gapPercentage === 0 ? 'Aligned' : `-${gapPercentage}%`}
            </div>
          </div>
        </div>
      </div>

      <div className="grid-2 gsap-radar-item">
        
        {/* Radar Chart Card */}
        <div className="glass-card" style={{ height: '490px', display: 'flex', flexDirection: 'column' }}>
          <div className="flex-between" style={{ marginBottom: '14px' }}>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Interactive Skill Polygon</h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Multi-dimensional skill proficiency overlay</p>
            </div>
            <span className="badge badge-indigo">Live Recharts Vector</span>
          </div>

          <div style={{ flex: 1, minHeight: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={currentStudent?.skills || []}>
                <PolarGrid stroke="var(--border-color)" />
                <PolarAngleAxis 
                  dataKey="name" 
                  tick={{ fill: 'var(--text-secondary)', fontSize: 11, fontWeight: 600 }} 
                />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: 'var(--text-muted)', fontSize: 10 }} />
                
                <Radar 
                  name="Student Skill Level" 
                  dataKey="level" 
                  stroke="var(--accent-indigo)" 
                  fill="var(--accent-indigo)" 
                  fillOpacity={0.42} 
                />
                <Radar 
                  name="Industry Benchmark" 
                  dataKey="benchmark" 
                  stroke="var(--accent-cyan)" 
                  fill="var(--accent-cyan)" 
                  fillOpacity={0.22} 
                />
                
                <Tooltip 
                  contentStyle={{ 
                    background: 'var(--bg-secondary)', 
                    borderColor: 'var(--border-color)', 
                    borderRadius: '10px',
                    color: 'var(--text-primary)',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.4)',
                    fontSize: '0.85rem'
                  }} 
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Live Skill Adjustment Controls */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <Sliders size={18} color="var(--accent-indigo)" />
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Live Skill Adjuster & Simulator</h3>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Adjust proficiency sliders to simulate learning. Match score & radar polygon synchronize dynamically!
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '270px', overflowY: 'auto', paddingRight: '6px' }}>
            {(currentStudent?.skills || []).map((skill) => {
              const gap = skill.benchmark - skill.level;
              return (
                <div 
                  key={skill.name} 
                  style={{ 
                    background: 'var(--bg-input)', 
                    padding: '12px 16px', 
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-subtle)'
                  }}
                >
                  <div className="flex-between" style={{ marginBottom: '6px' }}>
                    <span style={{ fontWeight: 600, fontSize: '0.88rem' }}>{skill.name}</span>
                    <span style={{ fontSize: '0.82rem', fontWeight: 700, fontFamily: 'var(--font-mono)', color: skill.level >= skill.benchmark ? 'var(--accent-emerald)' : 'var(--accent-amber)' }}>
                      {skill.level}% <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>/ {skill.benchmark}%</span>
                    </span>
                  </div>
                  
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={skill.level} 
                    onChange={(e) => updateStudentSkill(skill.name, Number(e.target.value))}
                    style={{ width: '100%', accentColor: 'var(--accent-indigo)', cursor: 'pointer' }}
                  />
                  
                  <div style={{ fontSize: '0.74rem', color: gap <= 0 ? 'var(--accent-emerald)' : 'var(--text-muted)', marginTop: '4px', fontWeight: 500 }}>
                    {gap <= 0 ? '✓ Exceeds Target Industry Benchmark' : `Benchmark Gap: -${gap}%`}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Add New Skill Form */}
          <form 
            onSubmit={handleAddSkill} 
            style={{ 
              background: 'var(--bg-input)', 
              padding: '14px', 
              borderRadius: 'var(--radius-md)', 
              border: '1px dashed var(--border-color)' 
            }}
          >
            <div style={{ fontSize: '0.82rem', fontWeight: 700, marginBottom: '8px', color: 'var(--text-secondary)' }}>
              Add Custom Skill to Target Radar
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input 
                type="text" 
                placeholder="e.g. Kubernetes, PyTorch, GraphQL" 
                value={newSkillName}
                onChange={(e) => setNewSkillName(e.target.value)}
                style={{
                  flex: 1,
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '8px 12px',
                  color: 'var(--text-primary)',
                  fontSize: '0.85rem',
                  outline: 'none'
                }}
              />
              <button type="submit" className="btn btn-primary btn-sm">
                <Plus size={14} /> Add
              </button>
            </div>
          </form>

        </div>

      </div>

    </div>
  );
}
