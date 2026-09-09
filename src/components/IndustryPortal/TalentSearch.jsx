import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Users, Search, Award, GraduationCap, CheckCircle, 
  Send, X, Building2, Briefcase, MessageSquare, CheckCircle2
} from 'lucide-react';

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
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)',
        zIndex: 1000, display: 'flex', alignItems: 'center',
        justifyContent: 'center', padding: '16px', animation: 'fadeIn 0.2s ease-out'
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{
        width: '100%', maxWidth: '520px', maxHeight: '92vh',
        display: 'flex', flexDirection: 'column',
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: '0 24px 48px rgba(0,0,0,0.5)',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          padding: '16px 22px', borderBottom: '1px solid var(--border-color)',
          background: 'var(--bg-card)', display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', flexShrink: 0
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--accent-indigo), var(--accent-cyan))',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <Send size={17} color="#fff" />
            </div>
            <div>
              <div style={{ fontSize: '1rem', fontWeight: 800 }}>Send Interview Invite</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                To: <strong style={{ color: 'var(--accent-cyan)' }}>{student.name}</strong> • {student.university}
              </div>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px' }}>
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '20px 22px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '14px' }}>

          {sent ? (
            <div style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              justifyContent: 'center', gap: '12px', padding: '32px 0', textAlign: 'center'
            }}>
              <div style={{ fontSize: '3rem' }}>🎉</div>
              <CheckCircle2 size={48} color="var(--accent-emerald)" />
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>Invite Sent!</div>
              <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                <strong>{student.name}</strong> will see your interview invite in their <br />
                <strong style={{ color: 'var(--accent-cyan)' }}>Student Hub → Notifications inbox</strong>.
              </div>
            </div>
          ) : (
            <>
              {/* Student preview */}
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', background: 'var(--bg-input)', padding: '12px', borderRadius: 'var(--radius-md)' }}>
                <img src={student.avatar} alt={student.name} style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--accent-indigo)' }} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{student.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--accent-indigo)' }}>{student.targetRole}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{student.university} • ATS {student.resumeATSScore}%</div>
                </div>
              </div>

              {/* Your Company Name */}
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, marginBottom: '5px', color: 'var(--text-secondary)' }}>Your Company Name *</label>
                <div style={{ position: 'relative' }}>
                  <Building2 size={14} color="var(--text-muted)" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="text"
                    placeholder="e.g. Google, Microsoft, Razorpay..."
                    value={companyName}
                    onChange={(e) => { setCompanyName(e.target.value); setErrors(p => ({ ...p, companyName: '' })); }}
                    style={{ ...inputStyle(errors.companyName), paddingLeft: '32px' }}
                  />
                </div>
                {errors.companyName && <div style={{ fontSize: '0.72rem', color: 'var(--accent-rose)', marginTop: '3px' }}>{errors.companyName}</div>}
              </div>

              {/* Your Name */}
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, marginBottom: '5px', color: 'var(--text-secondary)' }}>Your Name (Recruiter) *</label>
                <div style={{ position: 'relative' }}>
                  <Users size={14} color="var(--text-muted)" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="text"
                    placeholder="e.g. Priya Menon"
                    value={recruiterName}
                    onChange={(e) => { setRecruiterName(e.target.value); setErrors(p => ({ ...p, recruiterName: '' })); }}
                    style={{ ...inputStyle(errors.recruiterName), paddingLeft: '32px' }}
                  />
                </div>
                {errors.recruiterName && <div style={{ fontSize: '0.72rem', color: 'var(--accent-rose)', marginTop: '3px' }}>{errors.recruiterName}</div>}
              </div>

              {/* Role */}
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, marginBottom: '5px', color: 'var(--text-secondary)' }}>Position / Role *</label>
                <div style={{ position: 'relative' }}>
                  <Briefcase size={14} color="var(--text-muted)" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="text"
                    placeholder="e.g. SDE-2, AI/ML Engineer..."
                    value={role}
                    onChange={(e) => { setRole(e.target.value); setErrors(p => ({ ...p, role: '' })); }}
                    style={{ ...inputStyle(errors.role), paddingLeft: '32px' }}
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
                  rows={5}
                  value={message}
                  onChange={(e) => { setMessage(e.target.value); setErrors(p => ({ ...p, message: '' })); }}
                  style={{ ...inputStyle(errors.message), resize: 'vertical', lineHeight: 1.6 }}
                />
                {errors.message && <div style={{ fontSize: '0.72rem', color: 'var(--accent-rose)', marginTop: '3px' }}>{errors.message}</div>}
              </div>

              <div style={{
                fontSize: '0.72rem', color: 'var(--text-muted)',
                background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)',
                borderRadius: 'var(--radius-sm)', padding: '8px 12px',
                display: 'flex', alignItems: 'center', gap: '6px'
              }}>
                <MessageSquare size={12} color="var(--accent-indigo)" />
                The invite will appear in <strong style={{ color: 'var(--accent-cyan)' }}>{student.name}'s</strong> notification inbox inside the Student Hub instantly.
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        {!sent && (
          <div style={{
            padding: '14px 22px', borderTop: '1px solid var(--border-color)',
            background: 'var(--bg-card)', display: 'flex',
            justifyContent: 'flex-end', gap: '10px', flexShrink: 0
          }}>
            <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button className="btn btn-primary" onClick={handleSend} style={{ gap: '6px' }}>
              <Send size={15} /> Send Invite
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main TalentSearch Component ────────────────────────────────────────────
export default function TalentSearch() {
  const { students, interviewInvites } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkillFilter, setSelectedSkillFilter] = useState('All');
  const [inviteTarget, setInviteTarget] = useState(null); // student to invite
  const [sentIds, setSentIds] = useState([]); // student IDs that already got an invite this session

  const availableSkills = ['All', 'React / Next.js', 'Python & PyTorch', 'Cloud (AWS/GCP)', 'Docker & DevOps'];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          student.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          student.targetRole.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSkill = selectedSkillFilter === 'All' ||
                         student.skills.some(s => s.name === selectedSkillFilter && s.level >= 60);
    return matchesSearch && matchesSkill;
  });

  // Count how many invites a student has already received (persisted)
  const inviteCountForStudent = (studentId) =>
    interviewInvites.filter(inv => inv.studentId === studentId).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

      {/* Invite Compose Modal */}
      {inviteTarget && (
        <InviteModal
          student={inviteTarget}
          onClose={() => setInviteTarget(null)}
          onSent={() => setSentIds(prev => [...prev, inviteTarget.id])}
        />
      )}

      {/* Header */}
      <div className="glass-card flex-between" style={{ gap: '20px', flexWrap: 'wrap' }}>
        <div>
          <span className="badge badge-cyan" style={{ marginBottom: '8px' }}>
            <Users size={12} /> Verified Skill Database
          </span>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>
            Skill-Based <span className="gradient-text">Candidate Talent Explorer</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
            Find students filtered by actual verified project skills rather than keywords alone.
          </p>
        </div>

        {/* Filter Bar */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ position: 'relative', minWidth: '220px' }}>
            <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search candidate name, university..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%', background: 'var(--bg-input)',
                border: '1px solid var(--border-color)', borderRadius: 'var(--radius-full)',
                padding: '8px 16px 8px 36px', color: 'var(--text-primary)',
                fontSize: '0.85rem', outline: 'none'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '6px', background: 'var(--bg-input)', padding: '4px', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-color)' }}>
            {availableSkills.map(sk => (
              <button
                key={sk}
                onClick={() => setSelectedSkillFilter(sk)}
                style={{
                  background: selectedSkillFilter === sk ? 'var(--accent-indigo)' : 'transparent',
                  color: selectedSkillFilter === sk ? 'white' : 'var(--text-secondary)',
                  border: 'none', borderRadius: 'var(--radius-full)',
                  padding: '6px 10px', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer'
                }}
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
            <div key={std.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <img
                  src={std.avatar}
                  alt={std.name}
                  style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--accent-indigo)' }}
                />
                <div style={{ flex: 1 }}>
                  <div className="flex-between">
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>{std.name}</h3>
                    <span className="badge badge-emerald">GPA {std.gpa}</span>
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--accent-indigo)', fontWeight: 600 }}>{std.targetRole}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <GraduationCap size={14} /> {std.university} • {std.department} ({std.graduationYear})
                  </div>
                </div>
              </div>

              {/* Verified Badges */}
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '6px' }}>VERIFIED BADGES & SKILLS</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {std.verifiedBadges.map(b => (
                    <span key={b} className="badge badge-indigo">
                      <CheckCircle size={10} /> {b}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Skill Levels */}
              <div style={{ background: 'var(--bg-input)', padding: '12px', borderRadius: 'var(--radius-md)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {std.skills.slice(0, 3).map(sk => (
                  <div key={sk.name} className="flex-between" style={{ fontSize: '0.8rem' }}>
                    <span>{sk.name}</span>
                    <span style={{ fontWeight: 700, color: 'var(--accent-cyan)' }}>{sk.level}% Mastery</span>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex-between" style={{ paddingTop: '8px', borderTop: '1px solid var(--border-color)' }}>
                <div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    ATS Resume: <strong style={{ color: 'var(--text-primary)' }}>{std.resumeATSScore}% Score</strong>
                  </span>
                  {totalSent > 0 && (
                    <div style={{ fontSize: '0.68rem', color: 'var(--accent-amber)', marginTop: '2px' }}>
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
                    <><Send size={14} /> Request Interview Invite</>
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
