import React, { useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, 
  Sun, 
  Moon, 
  Bot, 
  GraduationCap, 
  Building2, 
  Briefcase, 
  Globe,
  User,
  ChevronDown
} from 'lucide-react';
import { INITIAL_ROLES } from '../data/mockData';
import gsap from 'gsap';

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

  const navRef = useRef(null);

  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { y: -16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, []);

  return (
    <header 
      ref={navRef}
      style={{
        background: 'var(--bg-secondary)',
        borderBottom: 'var(--glass-border)',
        padding: '12px 28px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        transition: 'background-color 0.25s ease, border-color 0.25s ease'
      }}
    >
      <div className="flex-between" style={{ gap: '20px' }}>
        
        {/* Brand Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, var(--accent-indigo) 0%, var(--accent-cyan) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 16px rgba(99, 102, 241, 0.35)',
            position: 'relative'
          }}>
            <Sparkles size={22} color="white" />
          </div>
          <div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, lineHeight: 1.1, fontFamily: 'var(--font-heading)' }}>
              Edu<span className="gradient-text">Bridge AI</span>
            </div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 600 }}>
              Academia • Industry Intelligence
            </div>
          </div>
        </div>

        {/* Stakeholder Persona Role Switcher */}
        <nav className="role-pill" aria-label="Portal Navigation">
          <button 
            className={`role-tab ${role === INITIAL_ROLES.STUDENT ? 'active' : ''}`}
            onClick={() => setRole(INITIAL_ROLES.STUDENT)}
          >
            <GraduationCap size={15} />
            <span>Student Hub</span>
          </button>

          <button 
            className={`role-tab ${role === INITIAL_ROLES.ACADEMIA ? 'active' : ''}`}
            onClick={() => setRole(INITIAL_ROLES.ACADEMIA)}
          >
            <Building2 size={15} />
            <span>Academia & TPO</span>
          </button>

          <button 
            className={`role-tab ${role === INITIAL_ROLES.INDUSTRY ? 'active' : ''}`}
            onClick={() => setRole(INITIAL_ROLES.INDUSTRY)}
          >
            <Briefcase size={15} />
            <span>Industry Recruiter</span>
          </button>

          <button 
            className={`role-tab ${role === INITIAL_ROLES.ADMIN ? 'active' : ''}`}
            onClick={() => setRole(INITIAL_ROLES.ADMIN)}
          >
            <Globe size={15} />
            <span>National Observatory</span>
          </button>
        </nav>

        {/* Action Controls & User Profile Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          
          {/* AI Skill Assistant Button */}
          <button 
            className="btn btn-cyan btn-sm"
            onClick={() => setIsAIChatOpen(!isAIChatOpen)}
            style={{ borderRadius: 'var(--radius-full)', padding: '6px 14px' }}
            title="Open AI Career & Skill Advisor"
          >
            <Bot size={16} />
            <span>AI Advisor</span>
            <span className="pulse-dot" style={{ marginLeft: '2px' }}></span>
          </button>

          {/* Theme Toggle Button */}
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
              transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
            title={theme === 'dark' ? 'Switch to Crisp Light Mode' : 'Switch to Obsidian Dark Mode'}
          >
            {theme === 'dark' ? (
              <Sun size={18} color="#fbbf24" style={{ transition: 'transform 0.3s ease' }} />
            ) : (
              <Moon size={18} color="#4f46e5" style={{ transition: 'transform 0.3s ease' }} />
            )}
          </button>

          {/* Student Profile Quick Select & Edit */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'var(--bg-input)',
            padding: '3px 10px 3px 6px',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--border-color)'
          }}>
            <button
              id="header-profile-btn"
              onClick={() => setIsEditProfileOpen(true)}
              title="Click to view and edit student profile"
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
                  src={currentStudent?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'} 
                  alt={currentStudent?.name} 
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '1.5px solid var(--accent-indigo)'
                  }} 
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
              <div style={{ lineHeight: 1.15 }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  {currentStudent?.name}
                </div>
                <div style={{ fontSize: '0.65rem', color: 'var(--accent-cyan)', fontWeight: 600 }}>
                  {currentStudent?.targetRole}
                </div>
              </div>
            </button>

            <select 
              value={currentStudent?.id}
              onChange={(e) => setActiveStudentId(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                fontSize: '0.75rem',
                fontWeight: 600,
                outline: 'none',
                paddingLeft: '6px'
              }}
              title="Switch active student profile"
            >
              {students.map(s => (
                <option key={s.id} value={s.id} style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

        </div>

      </div>
    </header>
  );
}
