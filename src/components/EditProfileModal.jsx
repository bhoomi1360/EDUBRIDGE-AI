import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { 
  User, 
  Mail, 
  Phone, 
  Target, 
  X, 
  Save, 
  CheckCircle2,
  Camera,
  Link,
  GraduationCap
} from 'lucide-react';

const COMMON_TARGET_ROLES = [
  'Full Stack AI Engineer',
  'AI/ML Engineer',
  'Data Scientist & ML Engineer',
  'DevOps & Cloud Architect',
  'Frontend Architect',
  'Backend & Distributed Systems Engineer',
  'Cybersecurity & Cloud Security Analyst'
];

// Curated set of diverse Unsplash avatar photos students can choose
const AVATAR_PRESETS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=250',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=250',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=250',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=250',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=250',
];

export default function EditProfileModal() {
  const { 
    currentStudent, 
    updateStudentProfile, 
    isEditProfileOpen, 
    setIsEditProfileOpen 
  } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [university, setUniversity] = useState('');
  const [targetRole, setTargetRole] = useState('');
  const [avatar, setAvatar] = useState('');
  const [customAvatarUrl, setCustomAvatarUrl] = useState('');
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [avatarUrlError, setAvatarUrlError] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Sync form inputs with currentStudent when modal opens or active student changes
  useEffect(() => {
    if (currentStudent) {
      setName(currentStudent.name || '');
      setEmail(currentStudent.email || `${currentStudent.name.toLowerCase().replace(/\s+/g, '.')}@college.edu`);
      setPhone(currentStudent.phone || '+91 98765 43210');
      setUniversity(currentStudent.university || '');
      setTargetRole(currentStudent.targetRole || 'Full Stack AI Engineer');
      setAvatar(currentStudent.avatar || AVATAR_PRESETS[0]);
      setCustomAvatarUrl('');
      setSaveSuccess(false);
      setShowAvatarPicker(false);
      setShowUrlInput(false);
      setAvatarUrlError('');
    }
  }, [currentStudent, isEditProfileOpen]);

  if (!isEditProfileOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !targetRole.trim()) return;

    updateStudentProfile(currentStudent.id, {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      university: university.trim(),
      targetRole: targetRole.trim(),
      avatar: avatar
    });

    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      setIsEditProfileOpen(false);
    }, 700);
  };

  const handleCustomUrlApply = () => {
    const url = customAvatarUrl.trim();
    if (!url) return;
    if (!url.startsWith('http')) {
      setAvatarUrlError('Please enter a valid URL starting with http:// or https://');
      return;
    }
    setAvatarUrlError('');
    setAvatar(url);
    setShowUrlInput(false);
    setShowAvatarPicker(false);
  };

  const fieldStyle = {
    width: '100%',
    background: 'var(--bg-input)',
    border: '1px solid var(--border-color)',
    borderRadius: 'var(--radius-sm)',
    padding: '10px 12px 10px 38px',
    color: 'var(--text-primary)',
    fontSize: '0.9rem',
    outline: 'none'
  };

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(8px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        animation: 'fadeIn 0.2s ease-out'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsEditProfileOpen(false);
      }}
    >
      <div 
        style={{
          width: '100%',
          maxWidth: '540px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        {/* ── Fixed Header ── */}
        <div 
          className="flex-between"
          style={{
            padding: '16px 22px',
            borderBottom: '1px solid var(--border-color)',
            background: 'var(--bg-card)',
            flexShrink: 0
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--accent-indigo), var(--accent-cyan))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <User size={18} color="#fff" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>Edit Student Profile</h3>
              <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                {currentStudent.university} • {currentStudent.department}
              </p>
            </div>
          </div>

          <button 
            onClick={() => setIsEditProfileOpen(false)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              alignItems: 'center'
            }}
            title="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* ── Scrollable Form Body ── */}
        <form 
          onSubmit={handleSubmit} 
          style={{ 
            padding: '20px 22px', 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '16px',
            overflowY: 'auto',
            flex: 1
          }}
        >
          {/* ── Profile Image Section ── */}
          <div style={{
            background: 'var(--bg-input)',
            padding: '16px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-color)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: showAvatarPicker ? '14px' : 0 }}>
              {/* Live avatar preview */}
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <img 
                  src={avatar} 
                  alt={name}
                  onError={(e) => { e.target.src = AVATAR_PRESETS[0]; }}
                  style={{ 
                    width: '62px', 
                    height: '62px', 
                    borderRadius: '50%', 
                    objectFit: 'cover', 
                    border: '2px solid var(--accent-indigo)',
                    display: 'block'
                  }}
                />
                <button
                  type="button"
                  onClick={() => { setShowAvatarPicker(!showAvatarPicker); setShowUrlInput(false); }}
                  style={{
                    position: 'absolute',
                    bottom: -2,
                    right: -2,
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    background: 'var(--accent-indigo)',
                    border: '2px solid var(--bg-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    padding: 0
                  }}
                  title="Change profile photo"
                >
                  <Camera size={11} color="#fff" />
                </button>
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '2px' }}>
                  {name || 'Student Name'}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--accent-cyan)', marginBottom: '1px' }}>
                  Target Role: <strong>{targetRole || 'Not Set'}</strong>
                </div>
                {university && (
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '3px' }}>
                    <GraduationCap size={10} /> {university}
                  </div>
                )}
                {!university && <div style={{ marginBottom: '8px' }} />}
                <button
                  type="button"
                  onClick={() => { setShowAvatarPicker(!showAvatarPicker); setShowUrlInput(false); }}
                  className="btn btn-secondary btn-sm"
                  style={{ fontSize: '0.72rem', padding: '4px 10px', display: 'flex', alignItems: 'center', gap: '5px' }}
                >
                  <Camera size={12} /> Change Photo
                </button>
              </div>
            </div>

            {/* ── Avatar Picker Panel ── */}
            {showAvatarPicker && (
              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
                <div style={{ fontSize: '0.76rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '8px' }}>
                  Choose a profile photo:
                </div>

                {/* Preset grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '10px' }}>
                  {AVATAR_PRESETS.map((url, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => { setAvatar(url); setShowAvatarPicker(false); }}
                      style={{
                        padding: 0,
                        background: 'none',
                        border: avatar === url ? '2px solid var(--accent-cyan)' : '2px solid transparent',
                        borderRadius: '50%',
                        cursor: 'pointer',
                        transition: 'border-color 0.15s'
                      }}
                    >
                      <img
                        src={url}
                        alt={`Avatar option ${idx + 1}`}
                        style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', display: 'block' }}
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    </button>
                  ))}
                </div>

                {/* Custom URL */}
                <div>
                  <button
                    type="button"
                    onClick={() => setShowUrlInput(!showUrlInput)}
                    style={{ fontSize: '0.72rem', background: 'none', border: 'none', color: 'var(--accent-indigo)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', padding: 0 }}
                  >
                    <Link size={11} /> Use custom image URL
                  </button>

                  {showUrlInput && (
                    <div style={{ marginTop: '8px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <input
                        type="url"
                        placeholder="https://example.com/photo.jpg"
                        value={customAvatarUrl}
                        onChange={(e) => { setCustomAvatarUrl(e.target.value); setAvatarUrlError(''); }}
                        style={{
                          flex: 1,
                          background: 'var(--bg-secondary)',
                          border: `1px solid ${avatarUrlError ? 'var(--accent-rose)' : 'var(--border-color)'}`,
                          borderRadius: 'var(--radius-sm)',
                          padding: '7px 10px',
                          color: 'var(--text-primary)',
                          fontSize: '0.78rem',
                          outline: 'none'
                        }}
                      />
                      <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        onClick={handleCustomUrlApply}
                        style={{ fontSize: '0.75rem', whiteSpace: 'nowrap' }}
                      >
                        Apply
                      </button>
                    </div>
                  )}
                  {avatarUrlError && (
                    <div style={{ fontSize: '0.72rem', color: 'var(--accent-rose)', marginTop: '4px' }}>
                      {avatarUrlError}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* ── Name Field ── */}
          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, marginBottom: '6px', color: 'var(--text-secondary)' }}>
              Full Name
            </label>
            <div style={{ position: 'relative' }}>
              <User size={15} color="var(--text-muted)" style={{ position: 'absolute', left: '11px', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                id="edit-profile-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter full name"
                style={fieldStyle}
              />
            </div>
          </div>

          {/* ── Email Field ── */}
          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, marginBottom: '6px', color: 'var(--text-secondary)' }}>
              Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={15} color="var(--text-muted)" style={{ position: 'absolute', left: '11px', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                id="edit-profile-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@university.edu"
                style={fieldStyle}
              />
            </div>
          </div>

          {/* ── Phone Number Field ── */}
          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, marginBottom: '6px', color: 'var(--text-secondary)' }}>
              Phone Number
            </label>
            <div style={{ position: 'relative' }}>
              <Phone size={15} color="var(--text-muted)" style={{ position: 'absolute', left: '11px', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                id="edit-profile-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                style={fieldStyle}
              />
            </div>
          </div>

          {/* ── College / University Field ── */}
          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, marginBottom: '6px', color: 'var(--text-secondary)' }}>
              College / University Name
            </label>
            <div style={{ position: 'relative' }}>
              <GraduationCap size={15} color="var(--text-muted)" style={{ position: 'absolute', left: '11px', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                id="edit-profile-university"
                type="text"
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
                placeholder="e.g. IIT Bombay, VIT Vellore, BITS Pilani..."
                style={fieldStyle}
              />
            </div>
          </div>

          {/* ── Target Role Field ── */}
          <div>
            <div className="flex-between" style={{ marginBottom: '6px' }}>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                Target Career Role
              </label>
              <span style={{ fontSize: '0.68rem', color: 'var(--accent-indigo)' }}>
                Updates Roadmap & Skill Radar
              </span>
            </div>
            <div style={{ position: 'relative' }}>
              <Target size={15} color="var(--text-muted)" style={{ position: 'absolute', left: '11px', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                id="edit-profile-target-role"
                type="text"
                required
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                placeholder="e.g. AI/ML Engineer, Full Stack Developer..."
                style={fieldStyle}
              />
            </div>

            {/* Quick role suggestion chips */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '8px' }}>
              {COMMON_TARGET_ROLES.map((roleOpt) => (
                <button
                  type="button"
                  key={roleOpt}
                  onClick={() => setTargetRole(roleOpt)}
                  style={{
                    fontSize: '0.7rem',
                    padding: '4px 9px',
                    borderRadius: 'var(--radius-sm)',
                    background: targetRole === roleOpt ? 'var(--accent-indigo)' : 'var(--bg-input)',
                    color: targetRole === roleOpt ? '#fff' : 'var(--text-secondary)',
                    border: `1px solid ${targetRole === roleOpt ? 'var(--accent-indigo)' : 'var(--border-color)'}`,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {roleOpt}
                </button>
              ))}
            </div>
          </div>

          {/* ── Success Banner ── */}
          {saveSuccess && (
            <div style={{
              background: 'rgba(16, 185, 129, 0.15)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              color: 'var(--accent-emerald)',
              padding: '10px 14px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <CheckCircle2 size={16} /> Profile updated! Roadmap and Skill Radar now reflect your new role.
            </div>
          )}
        </form>

        {/* ── Fixed Footer Buttons ── */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'flex-end', 
          gap: '12px', 
          padding: '14px 22px',
          borderTop: '1px solid var(--border-color)',
          background: 'var(--bg-card)',
          flexShrink: 0
        }}>
          <button 
            type="button"
            className="btn btn-secondary"
            onClick={() => setIsEditProfileOpen(false)}
          >
            Cancel
          </button>
          <button 
            id="save-profile-btn"
            type="submit"
            className="btn btn-primary"
            style={{ minWidth: '130px' }}
            form="edit-profile-form"
            onClick={handleSubmit}
          >
            <Save size={16} /> Save Profile
          </button>
        </div>
      </div>
    </div>
  );
}
