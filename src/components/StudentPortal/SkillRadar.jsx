import React, { useState } from 'react';
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
import { Target, Plus, Zap, CheckCircle2 } from 'lucide-react';

export default function SkillRadar() {
  const { currentStudent, updateStudentSkill, addStudentSkill } = useApp();
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState(70);

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (newSkillName.trim()) {
      addStudentSkill(newSkillName.trim(), Number(newSkillLevel), 85);
      setNewSkillName('');
    }
  };

  // Compute average match score
  const avgStudentScore = Math.round(
    currentStudent.skills.reduce((acc, s) => acc + s.level, 0) / currentStudent.skills.length
  );
  const avgBenchmark = Math.round(
    currentStudent.skills.reduce((acc, s) => acc + s.benchmark, 0) / currentStudent.skills.length
  );
  const gapPercentage = Math.max(0, avgBenchmark - avgStudentScore);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header Info */}
      <div className="glass-card flex-between" style={{ gap: '20px', flexWrap: 'wrap' }}>
        <div>
          <div className="badge badge-cyan" style={{ marginBottom: '8px' }}>
            <Target size={12} /> AI Skill Alignment Engine
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>
            Skill Gap Radar for <span className="gradient-text">{currentStudent.targetRole}</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
            Comparing {currentStudent.name}'s current verified skill levels against real-time industry job posting benchmarks.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '16px' }}>
          <div className="glass-card glass-card-sm" style={{ textAlign: 'center', minWidth: '130px', background: 'var(--bg-input)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>YOUR AVG LEVEL</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-indigo)' }}>{avgStudentScore}%</div>
          </div>
          <div className="glass-card glass-card-sm" style={{ textAlign: 'center', minWidth: '130px', background: 'var(--bg-input)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>INDUSTRY TARGET</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>{avgBenchmark}%</div>
          </div>
          <div className="glass-card glass-card-sm" style={{ textAlign: 'center', minWidth: '130px', background: 'var(--bg-input)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>SKILL GAP GAP</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: gapPercentage === 0 ? 'var(--accent-emerald)' : 'var(--accent-amber)' }}>
              -{gapPercentage}%
            </div>
          </div>
        </div>
      </div>

      <div className="grid-2">
        
        {/* Radar Chart Card */}
        <div className="glass-card" style={{ height: '480px', display: 'flex', flexDirection: 'column' }}>
          <div className="flex-between" style={{ marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Interactive Skill Polygon</h3>
            <span className="badge badge-indigo">Live Recharts</span>
          </div>

          <div style={{ flex: 1, minHeight: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={currentStudent.skills}>
                <PolarGrid stroke="var(--border-color)" />
                <PolarAngleAxis 
                  dataKey="name" 
                  tick={{ fill: 'var(--text-secondary)', fontSize: 12, fontWeight: 600 }} 
                />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: 'var(--text-muted)', fontSize: 10 }} />
                
                <Radar 
                  name="Student Skill Level" 
                  dataKey="level" 
                  stroke="var(--accent-indigo)" 
                  fill="var(--accent-indigo)" 
                  fillOpacity={0.4} 
                />
                <Radar 
                  name="Industry Benchmark" 
                  dataKey="benchmark" 
                  stroke="var(--accent-cyan)" 
                  fill="var(--accent-cyan)" 
                  fillOpacity={0.2} 
                />
                
                <Tooltip 
                  contentStyle={{ 
                    background: 'var(--bg-secondary)', 
                    borderColor: 'var(--border-color)', 
                    borderRadius: '8px',
                    color: 'var(--text-primary)'
                  }} 
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Live Skill Adjustment Controls */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '4px' }}>Live Skill Level Adjuster</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Drag the sliders below to simulate completing courses or acquiring new skills. Watch the radar update in real time!
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxHeight: '250px', overflowY: 'auto', paddingRight: '6px' }}>
            {currentStudent.skills.map((skill) => {
              const gap = skill.benchmark - skill.level;
              return (
                <div key={skill.name} style={{ background: 'var(--bg-input)', padding: '12px 16px', borderRadius: 'var(--radius-md)' }}>
                  <div className="flex-between" style={{ marginBottom: '6px' }}>
                    <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{skill.name}</span>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: skill.level >= skill.benchmark ? 'var(--accent-emerald)' : 'var(--accent-amber)' }}>
                      {skill.level}% / {skill.benchmark}%
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
                  
                  <div style={{ fontSize: '0.75rem', color: gap <= 0 ? 'var(--accent-emerald)' : 'var(--text-muted)', marginTop: '4px' }}>
                    {gap <= 0 ? '✓ Exceeds Industry Benchmark' : `Gap to close: ${gap}%`}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Add New Skill Form */}
          <form onSubmit={handleAddSkill} style={{ background: 'var(--bg-card)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px dashed var(--border-color)' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '8px' }}>Add Target Skill to Radar</div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input 
                type="text" 
                placeholder="e.g. Kubernetes, PyTorch, GraphQL" 
                value={newSkillName}
                onChange={(e) => setNewSkillName(e.target.value)}
                style={{
                  flex: 1,
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '8px 12px',
                  color: 'var(--text-primary)',
                  fontSize: '0.85rem',
                  outline: 'none'
                }}
              />
              <button type="submit" className="btn btn-primary btn-sm">
                <Plus size={14} /> Add Skill
              </button>
            </div>
          </form>

        </div>

      </div>

    </div>
  );
}
