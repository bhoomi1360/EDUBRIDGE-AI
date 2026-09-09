import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, 
  Sun, 
  Moon, 
  Bot, 
  Bell, 
  GraduationCap, 
  Building2, 
  Briefcase, 
  Globe,
  ChevronDown,
  ShieldCheck
} from 'lucide-react';
import { INITIAL_ROLES } from '../data/mockData';

export default function Navbar() {
  const { 
    role, 
    setRole, 
    theme, 
    toggleTheme, 
    currentStudent, 
    students, 
    setActiveStudentId, 
    isAIChatOpen, 
    setIsAIChatOpen,
    setIsEditProfileOpen
  } = useApp();

  return (
    <header style={{
      background: 'var(--bg-secondary)',
      borderBottom: 'var(--glass-border)',
      padding: '14px 28px',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backdropFilter: 'blur(16px)'
    }}>
      <div className="flex-between" style={{ gap: '20px' }}>
        
        {/* Brand Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, var(--accent-indigo) 0%, var(--accent-cyan) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 14px rgba(99, 102, 241, 0.4)'
          }}>
            <Sparkles size={22} color="white" />
          </div>
          <div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, lineHeight: 1.1 }}>
              Edu<span className="gradient-text">Bridge AI</span>
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Academia • Industry Skill Mapping
            </div>
          </div>
        </div>

        {/* Stakeholder Persona Role Switcher */}
        <div className="role-pill">
          <button 
            className={`role-tab ${role === INITIAL_ROLES.STUDENT ? 'active' : ''}`}
            onClick={() => setRole(INITIAL_ROLES.STUDENT)}
          >
            <GraduationCap size={14} style={{ display: 'inline', marginRight: '6px' }} />
            Student Hub
          </button>

          <button 
            className={`role-tab ${role === INITIAL_ROLES.ACADEMIA ? 'active' : ''}`}
            onClick={() => setRole(INITIAL_ROLES.ACADEMIA)}
          >
            <Building2 size={14} style={{ display: 'inline', marginRight: '6px' }} />
            Academia & TPO
          </button>

          <button 
            className={`role-tab ${role === INITIAL_ROLES.INDUSTRY ? 'active' : ''}`}
            onClick={() => setRole(INITIAL_ROLES.INDUSTRY)}
          >
            <Briefcase size={14} style={{ display: 'inline', marginRight: '6px' }} />
            Industry Recruiter
          </button>

          <button 
            className={`role-tab ${role === INITIAL_ROLES.ADMIN ? 'active' : ''}`}
            onClick={() => setRole(INITIAL_ROLES.ADMIN)}
          >
            <Globe size={14} style={{ display: 'inline', marginRight: '6px' }} />
            National Observatory
          </button>
        </div>

        {/* Action Icons & User Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          
          {/* AI Skill Assistant Button */}
          <button 
            className="btn btn-cyan btn-sm"
            onClick={() => setIsAIChatOpen(!isAIChatOpen)}
            style={{ borderRadius: 'var(--radius-full)' }}
          >
            <Bot size={16} />
            <span>AI Advisor</span>
            <span className="pulse-dot" style={{ marginLeft: '4px' }}></span>
          </button>

          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            style={{
              background: 'var(--bg-input)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            title="Toggle Light/Dark Theme"
          >
            {theme === 'dark' ? <Sun size={18} color="#fbbf24" /> : <Moon size={18} color="#6366f1" />}
          </button>

          {/* Student Profile Quick Select & Edit — always visible */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--bg-input)', padding: '3px 8px 3px 6px', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-color)' }}>
            <button
              id="header-profile-btn"
              onClick={() => setIsEditProfileOpen(true)}
              title="Click to edit your profile"
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: 'inherit',
                textAlign: 'left'
              }}
            >
              <div style={{ position: 'relative' }}>
                <img 
                  src={currentStudent.avatar} 
                  alt={currentStudent.name} 
                  style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover', border: '1.5px solid var(--accent-indigo)' }} 
                />
                <div style={{
                  position: 'absolute',
                  bottom: -2,
                  right: -2,
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: 'var(--accent-indigo)',
                  border: '1.5px solid var(--bg-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span style={{ fontSize: '8px', color: '#fff', lineHeight: 1 }}>✎</span>
                </div>
              </div>
              <div style={{ lineHeight: 1.2 }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  {currentStudent.name}
                </div>
                <div style={{ fontSize: '0.65rem', color: 'var(--accent-cyan)' }}>
                  {currentStudent.targetRole}
                </div>
              </div>
            </button>

            <select 
              value={currentStudent.id}
              onChange={(e) => setActiveStudentId(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                fontSize: '0.75rem',
                outline: 'none',
                paddingLeft: '4px'
              }}
              title="Switch active student"
            >
              {students.map(s => (
                <option key={s.id} value={s.id} style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>
                  Switch: {s.name}
                </option>
              ))}
            </select>
          </div>


        </div>

      </div>
    </header>
  );
}
