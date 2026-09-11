import React, { useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Flame, 
  Sun, 
  Moon, 
  Bot, 
  GraduationCap, 
  Building2, 
  Briefcase, 
  Globe,
  Search,
  Download,
  Plus,
  ChevronDown,
  Sparkles
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
    setIsEditProfileOpen,
    opportunities,
    avgMatchScore
  } = useApp();

  const navRef = useRef(null);

  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { y: -12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }
      );
    }
  }, []);

  return (
    <header 
      ref={navRef}
      style={{
        background: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border-color)',
        padding: '10px 24px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)'
      }}
    >
      <div className="flex-between" style={{ gap: '16px', flexWrap: 'wrap' }}>
        
        {/* Brand Logo - Lumix AI Style */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #ff6600 0%, #ff3b30 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 16px rgba(255, 85, 0, 0.45)',
            flexShrink: 0
          }}>
            <Flame size={20} color="white" />
          </div>
          <div>
            <div style={{ fontSize: '1.15rem', fontWeight: 800, lineHeight: 1.1, fontFamily: 'var(--font-heading)' }}>
              Edu<span style={{ color: 'var(--accent-orange)' }}>Bridge AI</span>
            </div>
          </div>
        </div>

        {/* Integrated Search Bar Pill with Dropdown */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          background: 'var(--bg-input)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-full)',
          padding: '2px 4px 2px 12px',
          gap: '8px',
          minWidth: '280px',
          maxWidth: '420px',
          flex: 1
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, borderRight: '1px solid var(--border-subtle)', paddingRight: '8px', cursor: 'pointer' }}>
            <span>All</span>
            <ChevronDown size={12} />
          </div>
          <Search size={14} color="var(--text-muted)" style={{ flexShrink: 0 }} />
          <input 
            type="text"
            placeholder="Search opportunities, skills, departments..."
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-primary)',
              fontSize: '0.82rem',
              outline: 'none',
              width: '100%',
              padding: '6px 0'
            }}
          />
        </div>

        {/* Top Mini Ticker Stats */}
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', fontSize: '0.75rem' }}>
          <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
            <span style={{ color: 'var(--text-muted)' }}>Opportunities:</span>
            <strong style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>{opportunities.length}</strong>
            <span style={{ color: 'var(--accent-emerald)', fontWeight: 700 }}>+12%</span>
          </div>
          <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
            <span style={{ color: 'var(--text-muted)' }}>Match Rate:</span>
            <strong style={{ color: 'var(--accent-orange)', fontFamily: 'var(--font-mono)' }}>{avgMatchScore}%</strong>
          </div>
        </div>

        {/* Action Controls & User Profile Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          
          {/* Export Data Button */}
          <button 
            className="btn btn-secondary btn-sm"
            onClick={() => alert('Exporting live analytics telemetry report (JSON/CSV)...')}
            style={{ fontSize: '0.78rem', padding: '6px 12px', borderRadius: 'var(--radius-full)' }}
          >
            <Download size={13} />
            <span>Export Data</span>
          </button>

          {/* AI Advisor / Action Button (Glowing Orange) */}
          <button 
            className="btn glowing-btn-orange btn-sm"
            onClick={() => setIsAIChatOpen(!isAIChatOpen)}
            style={{ borderRadius: 'var(--radius-full)', padding: '6px 14px' }}
          >
            <Bot size={14} />
            <span>+ AI Advisor</span>
          </button>

          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            style={{
              background: 'var(--bg-input)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            title="Toggle Light/Dark Theme"
          >
            {theme === 'dark' ? <Sun size={15} color="#fbbf24" /> : <Moon size={15} color="#ff5500" />}
          </button>

          {/* Student Avatar Quick Trigger */}
          <button
            onClick={() => setIsEditProfileOpen(true)}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
            title="Edit Profile"
          >
            <img 
              src={currentStudent?.avatar} 
              alt={currentStudent?.name}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '1.5px solid var(--accent-orange)'
              }}
            />
          </button>

        </div>

      </div>
    </header>
  );
}
