import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Bell, Building2, Briefcase, CheckCircle2, XCircle,
  Clock, MailOpen, Mail, Sparkles, CalendarCheck
} from 'lucide-react';

function timeAgo(isoString) {
  const diff = Math.floor((Date.now() - new Date(isoString)) / 1000);
  if (diff < 60) return 'Just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

const STATUS_CONFIG = {
  accepted:  { label: 'Accepted',  color: 'var(--accent-emerald)', icon: <CheckCircle2 size={14} /> },
  declined:  { label: 'Declined',  color: 'var(--accent-rose)',    icon: <XCircle size={14} />     },
  pending:   { label: 'Pending',   color: 'var(--accent-amber)',   icon: <Clock size={14} />        },
};

export default function InterviewInvites() {
  const { currentStudent, interviewInvites, markInviteRead, updateInviteStatus } = useApp();

  // Filter invites for the active student
  const myInvites = interviewInvites.filter(inv => inv.studentId === currentStudent.id);
  const unreadCount = myInvites.filter(inv => !inv.read).length;

  const [expanded, setExpanded] = useState(null);

  const handleExpand = (inv) => {
    setExpanded(expanded?.id === inv.id ? null : inv);
    if (!inv.read) markInviteRead(inv.id);
  };

  const handleRespond = (invId, status) => {
    updateInviteStatus(invId, status);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

      {/* Header Banner */}
      <div className="glass-card flex-between" style={{ gap: '20px', flexWrap: 'wrap' }}>
        <div>
          <span className="badge badge-indigo" style={{ marginBottom: '8px' }}>
            <Bell size={12} /> Interview Invitations
          </span>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>
            Your <span className="gradient-text">Interview Inbox</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
            Interview invites sent directly to you by industry recruiters.
          </p>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <div className="glass-card glass-card-sm" style={{ textAlign: 'center', background: 'var(--bg-input)', minWidth: '90px' }}>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent-indigo)' }}>{myInvites.length}</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>TOTAL</div>
          </div>
          <div className="glass-card glass-card-sm" style={{ textAlign: 'center', background: 'var(--bg-input)', minWidth: '90px' }}>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent-amber)' }}>{unreadCount}</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>UNREAD</div>
          </div>
          <div className="glass-card glass-card-sm" style={{ textAlign: 'center', background: 'var(--bg-input)', minWidth: '90px' }}>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>
              {myInvites.filter(i => i.status === 'accepted').length}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>ACCEPTED</div>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {myInvites.length === 0 && (
        <div className="glass-card" style={{ textAlign: 'center', padding: '48px 24px' }}>
          <div style={{ fontSize: '3rem', marginBottom: '12px' }}>📭</div>
          <h3 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '8px' }}>No interview invites yet</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
            When industry recruiters send you interview invites from the <strong>Industry Recruiter</strong> portal,<br />
            they will appear here instantly.
          </p>
          <div style={{
            marginTop: '16px', display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.25)',
            padding: '10px 18px', borderRadius: 'var(--radius-full)', fontSize: '0.82rem',
            color: 'var(--accent-indigo)', fontWeight: 600
          }}>
            <Sparkles size={14} /> Keep your ATS score high to attract recruiters!
          </div>
        </div>
      )}

      {/* Invite Cards */}
      {myInvites.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {myInvites.map((inv) => {
            const isExpanded = expanded?.id === inv.id;
            const statusCfg = STATUS_CONFIG[inv.status] || STATUS_CONFIG.pending;

            return (
              <div
                key={inv.id}
                className="glass-card"
                style={{
                  borderLeft: `4px solid ${inv.read ? 'var(--accent-indigo)' : 'var(--accent-amber)'}`,
                  cursor: 'pointer',
                  transition: 'border-color 0.2s ease'
                }}
                onClick={() => handleExpand(inv)}
              >
                {/* Collapsed Row */}
                <div className="flex-between" style={{ gap: '12px', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: 0 }}>
                    <div style={{
                      width: '40px', height: '40px', borderRadius: '50%', flexShrink: 0,
                      background: 'linear-gradient(135deg, var(--accent-indigo), var(--accent-cyan))',
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      <Building2 size={20} color="#fff" />
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                        <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>{inv.companyName}</span>
                        {!inv.read && (
                          <span style={{
                            fontSize: '0.65rem', fontWeight: 700, background: 'var(--accent-amber)',
                            color: '#000', padding: '2px 7px', borderRadius: 'var(--radius-full)'
                          }}>NEW</span>
                        )}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--accent-indigo)', fontWeight: 600 }}>
                        <Briefcase size={11} style={{ display: 'inline', marginRight: '4px' }} />
                        {inv.role}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                        From: {inv.recruiterName} • {timeAgo(inv.sentAt)}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
                    <span style={{
                      display: 'flex', alignItems: 'center', gap: '4px',
                      fontSize: '0.75rem', fontWeight: 700, color: statusCfg.color,
                      background: `${statusCfg.color}18`, padding: '4px 10px',
                      borderRadius: 'var(--radius-full)', border: `1px solid ${statusCfg.color}40`
                    }}>
                      {statusCfg.icon} {statusCfg.label}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', transition: 'transform 0.2s' }}>
                      {isExpanded ? '▲' : '▼'}
                    </span>
                  </div>
                </div>

                {/* Expanded Detail */}
                {isExpanded && (
                  <div
                    style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border-color)' }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Message */}
                    <div style={{
                      background: 'var(--bg-input)', borderRadius: 'var(--radius-md)',
                      padding: '14px 16px', fontSize: '0.88rem', lineHeight: 1.7,
                      color: 'var(--text-secondary)', whiteSpace: 'pre-wrap',
                      marginBottom: '14px'
                    }}>
                      <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <MailOpen size={13} /> MESSAGE FROM {inv.recruiterName.toUpperCase()} @ {inv.companyName.toUpperCase()}
                      </div>
                      {inv.message}
                    </div>

                    {/* Action Buttons (only if still pending) */}
                    {!inv.status && (
                      <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => handleRespond(inv.id, 'declined')}
                          style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                        >
                          <XCircle size={14} /> Decline
                        </button>
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => handleRespond(inv.id, 'accepted')}
                          style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'var(--accent-emerald)', borderColor: 'var(--accent-emerald)' }}
                        >
                          <CalendarCheck size={14} /> Accept Invite
                        </button>
                      </div>
                    )}

                    {inv.status === 'accepted' && (
                      <div style={{
                        display: 'flex', alignItems: 'center', gap: '8px',
                        color: 'var(--accent-emerald)', fontSize: '0.85rem', fontWeight: 700,
                        background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)',
                        padding: '10px 14px', borderRadius: 'var(--radius-sm)'
                      }}>
                        <CheckCircle2 size={16} /> You accepted this invite. The recruiter will follow up with interview details.
                      </div>
                    )}

                    {inv.status === 'declined' && (
                      <div style={{
                        display: 'flex', alignItems: 'center', gap: '8px',
                        color: 'var(--accent-rose)', fontSize: '0.85rem', fontWeight: 700,
                        background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.2)',
                        padding: '10px 14px', borderRadius: 'var(--radius-sm)'
                      }}>
                        <XCircle size={16} /> You declined this invite.
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
