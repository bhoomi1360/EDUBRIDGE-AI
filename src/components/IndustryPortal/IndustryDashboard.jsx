import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { Briefcase, Plus, Users, Trophy, X, Sparkles, Building2 } from 'lucide-react';
import TalentSearch from './TalentSearch';
import { useGsapStagger } from '../../utils/animations';

export default function IndustryDashboard({ setActiveTab }) {
  const { opportunities, students, challenges, addNewJob } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('TechCorp Solutions');
  const [stipend, setStipend] = useState('₹40,000 / month');
  const [skillsRequired, setSkillsRequired] = useState('React, Python, Cloud');
  const [description, setDescription] = useState('');
  const [applyUrl, setApplyUrl] = useState('');

  const containerRef = useRef(null);
  useGsapStagger(containerRef, '.gsap-ind-item', { y: 18, stagger: 0.08 });

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

  const activeCount = opportunities.filter(o => o.status === 'ACTIVE').length;
  const internshipsCount = opportunities.filter(o => o.type === 'INTERNSHIP').length;
  const jobsCount = opportunities.filter(o => o.type === 'JOB').length;

  return (
    <div ref={containerRef} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Top Banner */}
      <div className="glass-card flex-between gsap-ind-item" style={{ gap: '20px', flexWrap: 'wrap' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="badge badge-indigo">
              <Briefcase size={12} /> Industry Recruiter Command Center
            </span>
            <span className="badge badge-cyan">
              Live Verified Talent Feed
            </span>
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800 }}>
            Corporate Talent Acquisition &amp; <span className="gradient-text">Skill Matching</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
            Search candidates by verified skill matrix, dispatch 1-click interview invites, and post new openings.
          </p>
        </div>

        <button 
          className="btn btn-primary"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus size={16} /> Post New Opening
        </button>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid-3 gsap-ind-item">
        <div className="glass-card flex-between">
          <div>
            <div style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
              ACTIVE OPENINGS
            </div>
            <div style={{ fontSize: '2.1rem', fontWeight: 800, color: 'var(--accent-indigo)', fontFamily: 'var(--font-mono)', margin: '4px 0' }}>
              {activeCount} <span style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>Listings</span>
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
              {jobsCount} Fulltime • {internshipsCount} Internships
            </div>
          </div>
          <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'var(--accent-indigo-glow)', border: '1px solid rgba(99, 102, 241, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Briefcase size={26} color="var(--accent-indigo)" />
          </div>
        </div>

        <div className="glass-card flex-between">
          <div>
            <div style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
              VERIFIED CANDIDATES
            </div>
            <div style={{ fontSize: '2.1rem', fontWeight: 800, color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)', margin: '4px 0' }}>
              {students.length} <span style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>Profiles</span>
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
              Across Top Partner Universities
            </div>
          </div>
          <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'var(--accent-cyan-glow)', border: '1px solid rgba(6, 182, 212, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Users size={26} color="var(--accent-cyan)" />
          </div>
        </div>

        <div className="glass-card flex-between">
          <div>
            <div style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
              ACTIVE CHALLENGES
            </div>
            <div style={{ fontSize: '2.1rem', fontWeight: 800, color: 'var(--accent-amber)', fontFamily: 'var(--font-mono)', margin: '4px 0' }}>
              {challenges.length} <span style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>Challenges</span>
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--accent-amber)', fontWeight: 600 }}>
              Hackathons &amp; Innovation Bounties
            </div>
          </div>
          <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'var(--accent-amber-glow)', border: '1px solid rgba(245, 158, 11, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Trophy size={26} color="var(--accent-amber)" />
          </div>
        </div>
      </div>

      {/* Candidate Talent Search Matrix */}
      <div className="gsap-ind-item">
        <TalentSearch />
      </div>

      {/* Post Job Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="flex-between" style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Briefcase size={20} color="var(--accent-indigo)" />
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Post New Verified Opening</h3>
              </div>
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
                  style={{ width: '100%', background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', padding: '10px 14px', color: 'var(--text-primary)', outline: 'none', fontSize: '0.9rem' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Company Name</label>
                  <input 
                    type="text" 
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    style={{ width: '100%', background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', padding: '10px 14px', color: 'var(--text-primary)', outline: 'none', fontSize: '0.9rem' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Stipend / CTC</label>
                  <input 
                    type="text" 
                    value={stipend}
                    onChange={(e) => setStipend(e.target.value)}
                    style={{ width: '100%', background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', padding: '10px 14px', color: 'var(--text-primary)', outline: 'none', fontSize: '0.9rem' }}
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
                  style={{ width: '100%', background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', padding: '10px 14px', color: 'var(--text-primary)', outline: 'none', fontSize: '0.9rem' }}
                />
                <div style={{ fontSize: '0.74rem', color: 'var(--accent-amber)', marginTop: '4px' }}>Must be a valid URL for direct external candidate applications.</div>
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Required Skills (comma-separated)</label>
                <input 
                  type="text" 
                  placeholder="React, Node.js, Python, AWS" 
                  value={skillsRequired}
                  onChange={(e) => setSkillsRequired(e.target.value)}
                  style={{ width: '100%', background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', padding: '10px 14px', color: 'var(--text-primary)', outline: 'none', fontSize: '0.9rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Description</label>
                <textarea 
                  rows={3} 
                  placeholder="Describe key responsibilities..." 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  style={{ width: '100%', background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', padding: '10px 14px', color: 'var(--text-primary)', outline: 'none', fontSize: '0.9rem', resize: 'vertical' }}
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
