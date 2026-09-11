import React, { useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { INITIAL_ROLES } from '../data/mockData';
import { 
  LayoutDashboard, 
  Target, 
  FileCheck2, 
  Briefcase, 
  BookOpen, 
  Building2, 
  FileText, 
  Users, 
  Trophy, 
  Globe2, 
  PlusCircle, 
  TrendingUp, 
  Bell,
  Sparkles,
  Zap
} from 'lucide-react';
import gsap from 'gsap';

export default function Sidebar({ activeTab, setActiveTab }) {
  const { role, currentStudent, interviewInvites } = useApp();
  const sidebarRef = useRef(null);

  // Count unread invites for current student
  const unreadInvites = (interviewInvites || []).filter(
    inv => inv.studentId === currentStudent?.id && !inv.read
  ).length;

  const getNavItems = () => {
    switch (role) {
      case INITIAL_ROLES.STUDENT:
        return [
          { id: 'dashboard',   label: 'Overview & Stats',        icon: LayoutDashboard },
          { id: 'skill_radar', label: 'AI Skill Gap Radar',       icon: Target },
          { id: 'resume_analyzer', label: 'ATS Resume Parser',    icon: FileCheck2 },
          { id: 'internships', label: 'Internships & Placements',  icon: Briefcase },
          { id: 'upskilling',  label: 'Curated Upskilling Path',  icon: BookOpen },
          { id: 'invite_inbox', label: 'Interview Invites',        icon: Bell, badge: unreadInvites }
        ];

      case INITIAL_ROLES.ACADEMIA:
        return [
          { id: 'academia_dash', label: 'TPO Placement Hub', icon: Building2 },
          { id: 'curriculum_harmonizer', label: 'Curriculum Harmonizer', icon: FileText },
          { id: 'placement_drives', label: 'Placement Drives & MoUs', icon: TrendingUp }
        ];

      case INITIAL_ROLES.INDUSTRY:
        return [
          { id: 'industry_dash', label: 'Recruiter Command Hub', icon: LayoutDashboard },
          { id: 'talent_search', label: 'Skill Talent Explorer', icon: Users },
          { id: 'post_job', label: 'Post New Opening', icon: PlusCircle },
          { id: 'challenges', label: 'Corporate Challenges', icon: Trophy }
        ];

      case INITIAL_ROLES.ADMIN:
        return [
          { id: 'national_obs', label: 'Skill Observatory', icon: Globe2 }
        ];

      default:
        return [];
    }
  };

  const navItems = getNavItems();

  useEffect(() => {
    if (sidebarRef.current) {
      const buttons = sidebarRef.current.querySelectorAll('.sidebar-nav-btn');
      gsap.fromTo(
        buttons,
        { opacity: 0, x: -14 },
        { opacity: 1, x: 0, duration: 0.35, stagger: 0.05, ease: 'power2.out' }
      );
    }
  }, [role]);

  return (
    <aside 
      ref={sidebarRef}
      style={{
        width: '260px',
        background: 'var(--bg-secondary)',
        borderRight: 'var(--glass-border)',
        padding: '24px 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        flexShrink: 0,
        transition: 'background-color 0.25s ease, border-color 0.25s ease'
      }}
    >
      <div style={{
        fontSize: '0.72rem',
        fontWeight: 700,
        color: 'var(--text-muted)',
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        paddingLeft: '12px',
        marginBottom: '10px'
      }}>
        WORKSPACE MENU
      </div>

      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            className="sidebar-nav-btn"
            onClick={() => setActiveTab(item.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '11px 15px',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.88rem',
              fontWeight: isActive ? 700 : 500,
              color: isActive ? '#ffffff' : 'var(--text-secondary)',
              background: isActive ? 'linear-gradient(135deg, var(--accent-indigo) 0%, #4f46e5 100%)' : 'transparent',
              border: 'none',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
              boxShadow: isActive ? '0 4px 14px rgba(99, 102, 241, 0.35)' : 'none',
              position: 'relative'
            }}
          >
            <Icon size={18} color={isActive ? '#ffffff' : 'var(--text-muted)'} />
            <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {item.label}
            </span>
            {item.badge > 0 && (
              <span style={{
                background: 'var(--accent-amber)',
                color: '#000000',
                fontSize: '0.65rem',
                fontWeight: 800,
                padding: '1px 7px',
                borderRadius: 'var(--radius-full)',
                lineHeight: '1.4',
                minWidth: '18px',
                textAlign: 'center'
              }}>
                {item.badge}
              </span>
            )}
          </button>
        );
      })}

      {/* Persona Context Card */}
      <div style={{ marginTop: 'auto', paddingTop: '20px' }}>
        <div 
          className="glass-card glass-card-sm" 
          style={{ 
            background: 'var(--bg-input)', 
            border: '1px solid var(--border-color)',
            padding: '14px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
            <Zap size={14} color="var(--accent-cyan)" />
            <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
              ACTIVE PORTAL
            </span>
          </div>
          <div style={{ fontSize: '0.88rem', fontWeight: 700, textTransform: 'capitalize' }} className="gradient-text">
            {role} Workspace
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px', lineHeight: 1.4 }}>
            Switch roles anytime via the top header bar.
          </div>
        </div>
      </div>
    </aside>
  );
}
