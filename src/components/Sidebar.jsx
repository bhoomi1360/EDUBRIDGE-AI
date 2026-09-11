import React from 'react';
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
  Bot,
  Flame,
  Zap,
  Layers,
  FolderPlus,
  GraduationCap
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const { role, setRole, currentStudent, interviewInvites, setIsAIChatOpen, isAIChatOpen, setIsEditProfileOpen } = useApp();

  const unreadInvites = (interviewInvites || []).filter(
    inv => inv.studentId === currentStudent?.id && !inv.read
  ).length;

  const getNavItems = () => {
    switch (role) {
      case INITIAL_ROLES.STUDENT:
        return [
          { id: 'dashboard', label: 'Overview & Stats', icon: LayoutDashboard },
          { id: 'skill_radar', label: 'AI Skill Gap Radar', icon: Target },
          { id: 'resume_analyzer', label: 'ATS Resume Parser', icon: FileCheck2 },
          { id: 'internships', label: 'Internships & Jobs', icon: Briefcase },
          { id: 'upskilling', label: 'Upskilling Roadmap', icon: BookOpen },
          { id: 'invite_inbox', label: 'Interview Invites', icon: Bell, badge: unreadInvites }
        ];

      case INITIAL_ROLES.ACADEMIA:
        return [
          { id: 'academia_dash', label: 'TPO Placement Hub', icon: Building2 },
          { id: 'curriculum_harmonizer', label: 'Curriculum Harmonizer', icon: FileText },
          { id: 'placement_drives', label: 'Placement Drives', icon: TrendingUp }
        ];

      case INITIAL_ROLES.INDUSTRY:
        return [
          { id: 'industry_dash', label: 'Recruiter Hub', icon: LayoutDashboard },
          { id: 'talent_search', label: 'Talent Explorer', icon: Users },
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

  const portalRoles = [
    { id: INITIAL_ROLES.STUDENT, label: 'Student Hub', icon: GraduationCap },
    { id: INITIAL_ROLES.ACADEMIA, label: 'Academia & TPO', icon: Building2 },
    { id: INITIAL_ROLES.INDUSTRY, label: 'Industry Recruiter', icon: Briefcase },
    { id: INITIAL_ROLES.ADMIN, label: 'National Observatory', icon: Globe2 }
  ];

  return (
    <aside
      style={{
        width: '250px',
        background: 'var(--bg-secondary)',
        borderRight: '1px solid var(--border-color)',
        padding: '20px 14px',
        display: 'flex',
        flexDirection: 'column',
        gap: '18px',
        flexShrink: 0,
        overflowY: 'auto',
        position: 'sticky',
        top: 0,
        height: '100vh',
        alignSelf: 'flex-start'
      }}
    >
      {/* Reference Top Highlighted Action Button */}
      <button
        className="sidebar-action-highlight"
        onClick={() => setIsAIChatOpen(!isAIChatOpen)}
      >
        <Bot size={18} color="#ff5500" />
        <span>+ AI Advisor Chat</span>
      </button>

      {/* Features Section */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <div style={{
          fontSize: '0.7rem',
          fontWeight: 700,
          color: 'var(--text-muted)',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          paddingLeft: '10px',
          marginBottom: '4px'
        }}>
          Features
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '9px 12px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.84rem',
                fontWeight: isActive ? 700 : 500,
                color: isActive ? '#ffffff' : 'var(--text-secondary)',
                background: isActive ? '#1b1c26' : 'transparent',
                border: isActive ? '1px solid rgba(255, 85, 0, 0.35)' : '1px solid transparent',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s ease',
                position: 'relative'
              }}
            >
              <Icon size={16} color={isActive ? 'var(--accent-orange)' : 'var(--text-muted)'} />
              <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {item.label}
              </span>
              {item.badge > 0 && (
                <span style={{
                  background: 'var(--accent-orange)',
                  color: '#ffffff',
                  fontSize: '0.62rem',
                  fontWeight: 800,
                  padding: '1px 6px',
                  borderRadius: 'var(--radius-full)',
                  minWidth: '16px',
                  textAlign: 'center'
                }}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Workspaces (Stakeholder Portals) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <div style={{
          fontSize: '0.7rem',
          fontWeight: 700,
          color: 'var(--text-muted)',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          paddingLeft: '10px',
          marginBottom: '4px'
        }}>
          Workspaces
        </div>

        {portalRoles.map((p) => {
          const Icon = p.icon;
          const isCurrent = role === p.id;
          return (
            <button
              key={p.id}
              onClick={() => setRole(p.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '8px 12px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.82rem',
                fontWeight: isCurrent ? 700 : 500,
                color: isCurrent ? 'var(--accent-orange)' : 'var(--text-muted)',
                background: isCurrent ? 'rgba(255, 85, 0, 0.08)' : 'transparent',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s ease'
              }}
            >
              <Icon size={15} color={isCurrent ? 'var(--accent-orange)' : 'var(--text-muted)'} />
              <span style={{ flex: 1 }}>{p.label}</span>
              {isCurrent && <span className="pulse-dot" style={{ width: '5px', height: '5px' }}></span>}
            </button>
          );
        })}
      </div>

      {/* Bottom Reference Illuminated Card */}
      <div style={{ marginTop: 'auto', paddingTop: '10px' }}>
        <div className="sidebar-promo-card">
          <div className="sidebar-promo-gem">
            <Flame size={24} color="#ff5500" />
          </div>
          <div style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            EduBridge AI
          </div>
          <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', lineHeight: 1.4, margin: 0 }}>
            Active Student: <strong style={{ color: 'var(--text-secondary)' }}>{currentStudent.name}</strong>
          </p>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => setIsEditProfileOpen(true)}
            style={{ width: '100%', fontSize: '0.76rem', padding: '6px 12px', borderRadius: 'var(--radius-sm)' }}
          >
            Edit Profile
          </button>
        </div>
      </div>
    </aside>
  );
}
