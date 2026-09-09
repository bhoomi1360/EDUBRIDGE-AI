import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FileText, Sparkles, AlertCircle, CheckCircle2, Plus, ArrowRight, BookOpen } from 'lucide-react';

export default function CurriculumHarmonizer() {
  const { curricula, addCurriculumAudit } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [courseName, setCourseName] = useState('');
  const [department, setDepartment] = useState('Computer Science & Engineering');
  const [rawSyllabus, setRawSyllabus] = useState('');

  const handleAuditSubmit = (e) => {
    e.preventDefault();
    if (courseName.trim()) {
      addCurriculumAudit({
        courseName: courseName.trim(),
        department,
        status: 'Audit Completed',
        industryGapIndex: '28% Outdated',
        outdatedTopics: ['Legacy SOAP Services', 'Manual FTP Web Deployment'],
        recommendedTopics: ['FastAPI REST Framework', 'Docker Containerization', 'Vector DBs'],
        alignmentScore: 72
      });
      setCourseName('');
      setRawSyllabus('');
      setIsModalOpen(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Top Banner */}
      <div className="glass-card flex-between" style={{ gap: '20px', flexWrap: 'wrap' }}>
        <div>
          <span className="badge badge-indigo" style={{ marginBottom: '8px' }}>
            <Sparkles size={12} /> AI Syllabus Audit Engine
          </span>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>
            Industry-Academia <span className="gradient-text">Curriculum Harmonizer</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
            AI tool analyzing university course syllabi against real-time industry job posting requirements.
          </p>
        </div>

        <button 
          className="btn btn-primary"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus size={16} /> Audit New Course Syllabus
        </button>
      </div>

      {/* Syllabi Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {curricula.map((item) => (
          <div key={item.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            <div className="flex-between" style={{ flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--accent-indigo)', fontWeight: 600 }}>{item.department}</div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>{item.courseName}</h3>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  Last Syllabus Revision: {item.lastUpdatedYear}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div className="glass-card glass-card-sm" style={{ textAlign: 'center', background: 'var(--bg-input)' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>ALIGNMENT SCORE</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: item.alignmentScore >= 80 ? 'var(--accent-emerald)' : 'var(--accent-amber)' }}>
                    {item.alignmentScore}%
                  </div>
                </div>
                <span className={`badge ${item.alignmentScore >= 80 ? 'badge-emerald' : 'badge-amber'}`}>
                  {item.industryGapIndex}
                </span>
              </div>
            </div>

            {/* Outdated vs Recommended Comparison Grid */}
            <div className="grid-2">
              
              {/* Outdated Topics */}
              <div style={{ background: 'rgba(244, 63, 94, 0.08)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid rgba(244, 63, 94, 0.2)' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fb7185', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <AlertCircle size={16} /> Outdated / Low Demand Topics (Recommend Deprecation)
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {item.outdatedTopics.map(t => (
                    <span key={t} className="badge badge-rose" style={{ textTransform: 'none' }}>
                      ❌ {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Recommended Industry Topics */}
              <div style={{ background: 'rgba(16, 185, 129, 0.08)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#34d399', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={16} /> Recommended Trending Industry Modules (To Include)
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {item.recommendedTopics.map(t => (
                    <span key={t} className="badge badge-emerald" style={{ textTransform: 'none' }}>
                      ✨ {t}
                    </span>
                  ))}
                </div>
              </div>

            </div>

          </div>
        ))}
      </div>

      {/* Modal for auditing new course */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="flex-between" style={{ marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Run AI Audit on Course Syllabus</h3>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1.2rem' }}>✕</button>
            </div>

            <form onSubmit={handleAuditSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Course Title & Code</label>
                <input 
                  type="text" 
                  placeholder="e.g. CS405: Cloud Native Microservices" 
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  required
                  style={{ width: '100%', background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', padding: '10px', color: 'var(--text-primary)', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Department</label>
                <select 
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  style={{ width: '100%', background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', padding: '10px', color: 'var(--text-primary)', outline: 'none' }}
                >
                  <option value="Computer Science & Engineering">Computer Science & Engineering</option>
                  <option value="Data Science & AI">Data Science & AI</option>
                  <option value="Information Technology">Information Technology</option>
                  <option value="Electronics & Communication">Electronics & Communication</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Paste Syllabus Syllabus Modules</label>
                <textarea 
                  rows={5} 
                  placeholder="Paste unit 1, unit 2, unit 3 syllabus text here..." 
                  value={rawSyllabus}
                  onChange={(e) => setRawSyllabus(e.target.value)}
                  style={{ width: '100%', background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', padding: '10px', color: 'var(--text-primary)', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '10px' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary"><Sparkles size={16} /> Run AI Harmonizer Audit</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
