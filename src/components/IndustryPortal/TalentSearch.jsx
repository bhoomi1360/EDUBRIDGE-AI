import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Users, Search, Award, GraduationCap, CheckCircle, 
  Send, X, Building2, Briefcase, MessageSquare, CheckCircle2, Sparkles 
} from 'lucide-react';
import { useGsapStagger } from '../../utils/animations';

// ── Interview Invite Compose Modal ──────────────────────────────────────────
function InviteModal({ student, onClose, onSent }) {
  const { sendInterviewInvite } = useApp();

  const [companyName, setCompanyName] = useState('');
  const [recruiterName, setRecruiterName] = useState('');
  const [role, setRole] = useState(student.targetRole);
  const [message, setMessage] = useState(
    `Hi ${student.name},\n\nWe were impressed by your profile and verified skill set. We would like to invite you for an interview for the ${student.targetRole} position at our company.\n\nPlease feel free to reach out if you have any questions.\n\nBest regards`
  );
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!companyName.trim()) e.companyName = 'Company name is required';
    if (!recruiterName.trim()) e.recruiterName = 'Your name is required';
    if (!role.trim()) e.role = 'Role is required';
    if (!message.trim()) e.message = 'Message cannot be empty';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSend = () => {
    if (!validate()) return;
    sendInterviewInvite({
      studentId: student.id,
      studentName: student.name,
      companyName: companyName.trim(),
      recruiterName: recruiterName.trim(),
      role: role.trim(),
      message: message.trim()
    });
    setSent(true);
    setTimeout(() => {
      onSent();
      onClose();
    }, 1800);
  };

  const inputStyle = (hasError) => ({
    width: '100%',
    background: 'var(--bg-input)',
    border: `1px solid ${hasError ? 'var(--accent-rose)' : 'var(--border-color)'}`,
    borderRadius: 'var(--radius-sm)',
    padding: '9px 12px',
    color: 'var(--text-primary)',
    fontSize: '0.88rem',
    outline: 'none'
  });

  return (
    <div
      className="modal-overlay"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="modal-content" style={{ maxWidth: '540px' }}>
        {/* Header */}
        <div className="flex-between" style={{ marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '38px', height: '38px', borderRadius: '10px',
              background: 'linear-gradient(135deg, var(--accent-indigo), var(--accent-cyan))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(99,102,241,0.3)'
            }}>
              <Send size={18} color="#fff" />
            </div>
            <div>
              <div style={{ fontSize: '1.05rem', fontWeight: 800 }}>Send Interview Invite</div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                Candidate: <strong style={{ color: 'var(--accent-cyan)' }}>{student.name}</strong> • {student.university}
              </div>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

          {sent ? (
            <div style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              justifyContent: 'center', gap: '12px', padding: '32px 0', textAlign: 'center'
            }}>
              <div style={{ fontSize: '3rem' }}>🎉</div>
              <CheckCircle2 size={48} color="var(--accent-emerald)" />
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>Invite Dispatched!</div>
              <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                <strong>{student.name}</strong> will receive your interview invite inside their <br />
                <strong style={{ color: 'var(--accent-cyan)' }}>Student Hub → Notifications inbox</strong>.
              </div>
            </div>
          ) : (
            <>
              {/* Student preview */}
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', background: 'var(--bg-input)', padding: '12px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                <img src={student.avatar} alt={student.name} style={{ width: '46px', height: '46px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--accent-indigo)' }} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{student.name}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--accent-indigo)', fontWeight: 600 }}>{student.targetRole}</div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>{student.university} • ATS Score {student.resumeATSScore}%</div>
                </div>
              </div>

              {/* Your Company Name */}
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, marginBottom: '5px', color: 'var(--text-secondary)' }}>Your Company Name *</label>
                <div style={{ position: 'relative' }}>
                  <Building2 size={14} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="text"
                    placeholder="e.g. Google, Microsoft, Razorpay..."
                    value={companyName}
                    onChange={(e) => { setCompanyName(e.target.value); setErrors(p => ({ ...p, companyName: '' })); }}
                    style={{ ...inputStyle(errors.companyName), paddingLeft: '34px' }}
                  />
                </div>
                {errors.companyName && <div style={{ fontSize: '0.72rem', color: 'var(--accent-rose)', marginTop: '3px' }}>{errors.companyName}</div>}
              </div>

              {/* Your Name */}
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, marginBottom: '5px', color: 'var(--text-secondary)' }}>Your Name (Recruiter) *</label>
                <div style={{ position: 'relative' }}>
                  <Users size={14} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="text"
                    placeholder="e.g. Priya Menon"
                    value={recruiterName}
                    onChange={(e) => { setRecruiterName(e.target.value); setErrors(p => ({ ...p, recruiterName: '' })); }}
                    style={{ ...inputStyle(errors.recruiterName), paddingLeft: '34px' }}
                  />
                </div>
                {errors.recruiterName && <div style={{ fontSize: '0.72rem', color: 'var(--accent-rose)', marginTop: '3px' }}>{errors.recruiterName}</div>}
              </div>

              {/* Role */}
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, marginBottom: '5px', color: 'var(--text-secondary)' }}>Position / Role *</label>
                <div style={{ position: 'relative' }}>
                  <Briefcase size={14} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="text"
                    placeholder="e.g. SDE-2, AI/ML Engineer..."
                    value={role}
                    onChange={(e) => { setRole(e.target.value); setErrors(p => ({ ...p, role: '' })); }}
                    style={{ ...inputStyle(errors.role), paddingLeft: '34px' }}
                  />
                </div>
                {errors.role && <div style={{ fontSize: '0.72rem', color: 'var(--accent-rose)', marginTop: '3px' }}>{errors.role}</div>}
              </div>

              {/* Message */}
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, marginBottom: '5px', color: 'var(--text-secondary)' }}>
                  Message to Candidate *
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => { setMessage(e.target.value); setErrors(p => ({ ...p, message: '' })); }}
                  style={{ ...inputStyle(errors.message), resize: 'vertical', lineHeight: 1.6 }}
                />
                {errors.message && <div style={{ fontSize: '0.72rem', color: 'var(--accent-rose)', marginTop: '3px' }}>{errors.message}</div>}
              </div>

              <div style={{
                fontSize: '0.74rem', color: 'var(--text-muted)',
                background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)',
                borderRadius: 'var(--radius-sm)', padding: '8px 12px',
                display: 'flex', alignItems: 'center', gap: '6px'
              }}>
                <MessageSquare size={13} color="var(--accent-indigo)" />
                The invite will appear in <strong style={{ color: 'var(--accent-cyan)' }}>{student.name}'s</strong> notification inbox in real-time.
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '6px' }}>
                <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
                <button className="btn btn-primary" onClick={handleSend} style={{ gap: '6px' }}>
                  <Send size={15} /> Dispatch Invite
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Main TalentSearch Component ────────────────────────────────────────────
export default function TalentSearch() {
  const { students, interviewInvites } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkillFilter, setSelectedSkillFilter] = useState('All');
  const [inviteTarget, setInviteTarget] = useState(null);
  const [sentIds, setSentIds] = useState([]);

  const containerRef = useRef(null);
  useGsapStagger(containerRef, '.gsap-talent-card', { y: 18, stagger: 0.07 });

  const availableSkills = ['All', 'React / Next.js', 'Python & PyTorch', 'Cloud (AWS/GCP)', 'Docker & DevOps'];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          student.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          student.targetRole.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSkill = selectedSkillFilter === 'All' ||
                         student.skills.some(s => s.name === selectedSkillFilter && s.level >= 60);
    return matchesSearch && matchesSkill;
  });

  const inviteCountForStudent = (studentId) =>
    interviewInvites.filter(inv => inv.studentId === studentId).length;

  return (
    <div ref={containerRef} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

      {/* Invite Compose Modal */}
      {inviteTarget && (
        <InviteModal
          student={inviteTarget}
          onClose={() => setInviteTarget(null)}
          onSent={() => setSentIds(prev => [...prev, inviteTarget.id])}
        />
      )}

      {/* Header */}
      <div className="glass-card flex-between gsap-talent-card" style={{ gap: '20px', flexWrap: 'wrap' }}>
        <div>
          <span className="badge badge-cyan" style={{ marginBottom: '8px' }}>
            <Users size={12} /> Verified Skill Repository
          </span>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800 }}>
            Skill-Based <span className="gradient-text">Candidate Talent Explorer</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
            Discover candidates filtered by verified hands-on engineering competencies and live ATS benchmarks.
          </p>
        </div>

        {/* Filter Bar */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ position: 'relative', minWidth: '220px' }}>
            <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search candidate, university..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%', background: 'var(--bg-input)',
                border: '1px solid var(--border-color)', borderRadius: 'var(--radius-full)',
                padding: '9px 16px 9px 36px', color: 'var(--text-primary)',
                fontSize: '0.85rem', outline: 'none'
              }}
            />
          </div>

          <div className="role-pill">
            {availableSkills.map(sk => (
              <button
                key={sk}
                onClick={() => setSelectedSkillFilter(sk)}
                className={`role-tab ${selectedSkillFilter === sk ? 'active' : ''}`}
                style={{ fontSize: '0.76rem', padding: '6px 11px' }}
              >
                {sk}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Student Cards Grid */}
      <div className="grid-2">
        {filteredStudents.map((std) => {
          const alreadySent = sentIds.includes(std.id);
          const totalSent = inviteCountForStudent(std.id);
          return (
            <div key={std.id} className="glass-card gsap-talent-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <img
                  src={std.avatar}
                  alt={std.name}
                  style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--accent-indigo)' }}
                />
                <div style={{ flex: 1 }}>
                  <div className="flex-between">
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>{std.name}</h3>
                    <span className="badge badge-emerald">GPA {std.gpa}</span>
                  </div>
                  <div style={{ fontSize: '0.86rem', color: 'var(--accent-indigo)', fontWeight: 600 }}>{std.targetRole}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                    <GraduationCap size={14} /> {std.university} • {std.department} ({std.graduationYear})
                  </div>
                </div>
              </div>

              {/* Verified Badges */}
              <div>
                <div style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '6px' }}>VERIFIED BADGES &amp; CERTIFICATIONS</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {std.verifiedBadges.map(b => (
                    <span key={b} className="badge badge-indigo">
                      <CheckCircle size={10} /> {b}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Skill Levels */}
              <div style={{ background: 'var(--bg-input)', padding: '14px', borderRadius: 'var(--radius-md)', display: 'flex', flexDirection: 'column', gap: '8px', border: '1px solid var(--border-subtle)' }}>
                {std.skills.slice(0, 3).map(sk => (
                  <div key={sk.name} className="flex-between" style={{ fontSize: '0.82rem' }}>
                    <span>{sk.name}</span>
                    <span style={{ fontWeight: 700, color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>{sk.level}% Mastery</span>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex-between" style={{ paddingTop: '10px', borderTop: '1px solid var(--border-color)', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    ATS Resume: <strong style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>{std.resumeATSScore}% Score</strong>
                  </span>
                  {totalSent > 0 && (
                    <div style={{ fontSize: '0.7rem', color: 'var(--accent-amber)', marginTop: '2px', fontWeight: 600 }}>
                      📨 {totalSent} invite{totalSent > 1 ? 's' : ''} sent
                    </div>
                  )}
                </div>

                <button
                  className={`btn btn-sm ${alreadySent ? 'btn-secondary' : 'btn-primary'}`}
                  onClick={() => setInviteTarget(std)}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  {alreadySent ? (
                    <><CheckCircle2 size={14} /> Invite Sent</>
                  ) : (
                    <><Send size={14} /> Dispatch Interview Invite</>
                  )}
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
