import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Briefcase, Plus, Users, Trophy, X } from 'lucide-react';
import TalentSearch from './TalentSearch';

export default function IndustryDashboard({ setActiveTab }) {
  const { opportunities, addNewJob } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('TechCorp Solutions');
  const [stipend, setStipend] = useState('₹40,000 / month');
  const [skillsRequired, setSkillsRequired] = useState('React, Python, Cloud');
  const [description, setDescription] = useState('');
  const [applyUrl, setApplyUrl] = useState('');

  const handlePostJob = (e) => {
    e.preventDefault();
    if (jobTitle.trim() && applyUrl.trim()) {
      addNewJob({
        title: jobTitle.trim(),
        company,
        stipend,
        skills: skillsRequired.split(',').map(s => s.trim()),
        description: description || 'Exciting engineering internship role.',
        applyUrl: applyUrl.trim(),
        type: 'INTERNSHIP',
        workMode: 'HYBRID'
      });
      setJobTitle('');
      setDescription('');
      setApplyUrl('');
      setIsModalOpen(false);
    }
  };

  // Count by type from real opportunities
  const activeCount = opportunities.filter(o => o.status === 'ACTIVE').length;
  const internshipsCount = opportunities.filter(o => o.type === 'INTERNSHIP').length;
  const jobsCount = opportunities.filter(o => o.type === 'JOB').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Top Banner */}
      <div className="glass-card flex-between" style={{ gap: '20px', flexWrap: 'wrap' }}>
        <div>
          <span className="badge badge-indigo" style={{ marginBottom: '8px' }}>
            <Briefcase size={12} /> Industry Partner Command Center
          </span>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>
            Corporate Talent Acquisition & <span className="gradient-text">Skill Matching</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
            Search candidates by verified skill matrix, post new openings, and manage corporate hackathons.
          </p>
        </div>

        <button 
          className="btn btn-primary"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus size={16} /> Post New Opening
        </button>
      </div>

      {/* Overview Stat Cards (real data) */}
      <div className="grid-3">
        <div className="glass-card flex-between">
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>ACTIVE OPENINGS</div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-indigo)' }}>{activeCount} Listings</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              {jobsCount} Jobs • {internshipsCount} Internships
            </div>
          </div>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--accent-indigo-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Briefcase size={24} color="var(--accent-indigo)" />
          </div>
        </div>

        <div className="glass-card flex-between">
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>VERIFIED CANDIDATES</div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>3 Profiles</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>Across 3 Universities</div>
          </div>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--accent-cyan-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Users size={24} color="var(--accent-cyan)" />
          </div>
        </div>

        <div className="glass-card flex-between">
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>ACTIVE CHALLENGES</div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-amber)' }}>2 Challenges</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>42 Student Teams</div>
          </div>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(245, 158, 11, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Trophy size={24} color="var(--accent-amber)" />
          </div>
        </div>
      </div>

      {/* Candidate Talent Search Matrix */}
      <TalentSearch />

      {/* Post Job Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="flex-between" style={{ marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Post New Verified Opening</h3>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handlePostJob} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Job / Internship Title *</label>
                <input 
                  type="text" 
                  placeholder="e.g. Frontend AI Engineer Intern" 
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  required
                  style={{ width: '100%', background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', padding: '10px', color: 'var(--text-primary)', outline: 'none', fontSize: '0.9rem' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Company Name</label>
                  <input 
                    type="text" 
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    style={{ width: '100%', background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', padding: '10px', color: 'var(--text-primary)', outline: 'none', fontSize: '0.9rem' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Stipend / CTC</label>
                  <input 
                    type="text" 
                    value={stipend}
                    onChange={(e) => setStipend(e.target.value)}
                    style={{ width: '100%', background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', padding: '10px', color: 'var(--text-primary)', outline: 'none', fontSize: '0.9rem' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '4px' }}>External Apply URL *</label>
                <input 
                  type="url" 
                  placeholder="https://careers.yourcompany.com/role-link" 
                  value={applyUrl}
                  onChange={(e) => setApplyUrl(e.target.value)}
                  required
                  style={{ width: '100%', background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', padding: '10px', color: 'var(--text-primary)', outline: 'none', fontSize: '0.9rem' }}
                />
                <div style={{ fontSize: '0.75rem', color: 'var(--accent-amber)', marginTop: '4px' }}>Must be a real, publicly accessible career page URL.</div>
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Required Skills (comma-separated)</label>
                <input 
                  type="text" 
                  placeholder="React, Node.js, Python, AWS" 
                  value={skillsRequired}
                  onChange={(e) => setSkillsRequired(e.target.value)}
                  style={{ width: '100%', background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', padding: '10px', color: 'var(--text-primary)', outline: 'none', fontSize: '0.9rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Description</label>
                <textarea 
                  rows={3} 
                  placeholder="Describe key responsibilities..." 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  style={{ width: '100%', background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', padding: '10px', color: 'var(--text-primary)', outline: 'none', fontSize: '0.9rem', resize: 'vertical' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '6px' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Publish Opening</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
