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
  ShieldCheck
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const { role, currentStudent, interviewInvites } = useApp();

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
          { id: 'academia_dash', label: 'TPO Placement Dashboard', icon: Building2 },
          { id: 'curriculum_harmonizer', label: 'Curriculum Harmonizer', icon: FileText },
          { id: 'placement_drives', label: 'Placement Drives & MoUs', icon: TrendingUp }
        ];

      case INITIAL_ROLES.INDUSTRY:
        return [
          { id: 'industry_dash', label: 'Recruiter Hub Overview', icon: LayoutDashboard },
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

  return (
    <aside style={{
      width: '260px',
      background: 'var(--bg-secondary)',
      borderRight: 'var(--glass-border)',
      padding: '24px 16px',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    }}>
      <div style={{
        fontSize: '0.75rem',
        fontWeight: 700,
        color: 'var(--text-muted)',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        paddingLeft: '12px',
        marginBottom: '12px'
      }}>
        Navigation Menu
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
              gap: '12px',
              padding: '12px 16px',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.9rem',
              fontWeight: isActive ? 700 : 500,
              color: isActive ? 'white' : 'var(--text-secondary)',
              background: isActive ? 'linear-gradient(135deg, var(--accent-indigo) 0%, #4f46e5 100%)' : 'transparent',
              border: 'none',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.2s ease',
              boxShadow: isActive ? '0 4px 12px rgba(99, 102, 241, 0.3)' : 'none'
            }}
          >
            <Icon size={18} color={isActive ? 'white' : 'var(--text-muted)'} />
            <span style={{ flex: 1 }}>{item.label}</span>
            {item.badge > 0 && (
              <span style={{
                background: 'var(--accent-amber)',
                color: '#000',
                fontSize: '0.65rem',
                fontWeight: 800,
                padding: '1px 6px',
                borderRadius: 'var(--radius-full)',
                lineHeight: '1.4',
                minWidth: '18px',
                textAlign: 'center'
              }}>{item.badge}</span>
            )}
          </button>
        );
      })}

      {/* Persona Context Banner */}
      <div style={{ marginTop: 'auto', paddingTop: '20px' }}>
        <div className="glass-card glass-card-sm" style={{ background: 'var(--bg-input)', border: '1px solid var(--border-color)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>ACTIVE MODE</div>
          <div style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'capitalize' }} className="gradient-text">
            {role} Portal Active
          </div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Switch personas anytime using topbar tabs.
          </div>
        </div>
      </div>
    </aside>
  );
}
