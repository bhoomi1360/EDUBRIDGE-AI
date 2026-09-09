import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { calculateMatchScore } from '../../utils/matchEngine';
import { formatPostingDate } from '../../data/opportunitiesData';
import { 
  Briefcase, 
  Search, 
  MapPin, 
  Clock, 
  ExternalLink, 
  CheckCircle2, 
  Sparkles, 
  HelpCircle, 
  Calendar,
  ShieldCheck,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Filter
} from 'lucide-react';

// Date filter constants
const DATE_FILTERS = [
  { id: 'ALL', label: 'All' },
  { id: 'TODAY', label: 'Today', maxDays: 0 },
  { id: '7_DAYS', label: 'Last 7 Days', maxDays: 7 },
  { id: '14_DAYS', label: 'Last 14 Days', maxDays: 14 },
  { id: '30_DAYS', label: 'Last 30 Days', maxDays: 30 }
];

// Calculate day difference between today and post date
function getDaysSincePosted(dateString) {
  if (!dateString) return 999;
  const postDate = new Date(dateString);
  const today = new Date();
  
  const postMidnight = new Date(postDate.getFullYear(), postDate.getMonth(), postDate.getDate());
  const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  
  const diffTime = todayMidnight.getTime() - postMidnight.getTime();
  return Math.max(0, Math.floor(diffTime / (1000 * 60 * 60 * 24)));
}

export default function InternshipBoard() {
  const { 
    opportunities, 
    applications, 
    currentStudent, 
    openedExternalOppIds, 
    openExternalApplyUrl, 
    confirmApplication,
    saveOpportunity
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTypeTab, setSelectedTypeTab] = useState('ALL');
  const [selectedDateFilter, setSelectedDateFilter] = useState('ALL');
  const [expandedMatchId, setExpandedMatchId] = useState(null);

  // Filter opportunities by Search Term, Type Tab, and Date Filter
  const filteredOpportunities = opportunities.filter(opp => {
    // 1. Text Search
    const matchesSearch = opp.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          opp.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          opp.skills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // 2. Category Tab
    let matchesType = true;
    if (selectedTypeTab === 'JOBS') matchesType = opp.type === 'JOB';
    if (selectedTypeTab === 'INTERNSHIPS') matchesType = opp.type === 'INTERNSHIP';
    if (selectedTypeTab === 'APPRENTICESHIPS') matchesType = opp.type === 'APPRENTICESHIP';

    // 3. Dynamic Date Filter (calculated from actual postedDate)
    let matchesDate = true;
    const daysAgo = getDaysSincePosted(opp.postedDate);

    if (selectedDateFilter === 'TODAY') {
      matchesDate = daysAgo === 0;
    } else if (selectedDateFilter === '7_DAYS') {
      matchesDate = daysAgo <= 7;
    } else if (selectedDateFilter === '14_DAYS') {
      matchesDate = daysAgo <= 14;
    } else if (selectedDateFilter === '30_DAYS') {
      matchesDate = daysAgo <= 30;
    }

    return matchesSearch && matchesType && matchesDate;
  });

  const toggleExplainMatch = (oppId) => {
    setExpandedMatchId(prev => prev === oppId ? null : oppId);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Top Banner */}
      <div className="glass-card flex-between" style={{ gap: '20px', flexWrap: 'wrap' }}>
        <div>
          <span className="badge badge-cyan" style={{ marginBottom: '8px' }}>
            <Briefcase size={12} /> Curated Industry Opportunities
          </span>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>
            Skill-Mapped <span className="gradient-text">Jobs, Internships & Apprenticeships</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
            Matched for <strong>{currentStudent.targetRole}</strong> — live opportunities ranked by explainable AI skill matching.
          </p>
        </div>

        {/* Search Bar & Category Filter Tabs */}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', minWidth: '220px' }}>
            <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              id="job-search-input"
              type="text" 
              placeholder="Search title, skill, company..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                background: 'var(--bg-input)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-full)',
                padding: '8px 16px 8px 36px',
                color: 'var(--text-primary)',
                fontSize: '0.85rem',
                outline: 'none'
              }}
            />
          </div>

          {/* Category Tabs */}
          <div className="role-pill">
            {[
              { id: 'ALL', label: 'All Types' },
              { id: 'JOBS', label: 'Jobs' },
              { id: 'INTERNSHIPS', label: 'Internships' },
              { id: 'APPRENTICESHIPS', label: 'Apprenticeships' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedTypeTab(tab.id)}
                className={`role-tab ${selectedTypeTab === tab.id ? 'active' : ''}`}
                style={{ fontSize: '0.75rem', padding: '6px 12px' }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Date-Based Filters Bar */}
      <div className="glass-card" style={{ padding: '12px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
          <Clock size={16} color="var(--accent-cyan)" />
          <span>Freshness & Posting Date:</span>
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
          {DATE_FILTERS.map((dateTab) => {
            const isSelected = selectedDateFilter === dateTab.id;
            return (
              <button
                key={dateTab.id}
                id={`date-filter-${dateTab.id.toLowerCase()}`}
                onClick={() => setSelectedDateFilter(dateTab.id)}
                className={`btn btn-sm ${isSelected ? 'btn-primary' : 'btn-secondary'}`}
                style={{
                  fontSize: '0.78rem',
                  padding: '5px 12px',
                  borderRadius: 'var(--radius-full)',
                  fontWeight: isSelected ? 700 : 500,
                  transition: 'all 0.15s ease'
                }}
              >
                {dateTab.label}
              </button>
            );
          })}
        </div>

        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
          Showing <strong>{filteredOpportunities.length}</strong> of {opportunities.length} opportunities
        </div>
      </div>

      {/* Opportunity Cards List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        {filteredOpportunities.length === 0 ? (
          <div className="glass-card" style={{ textAlign: 'center', padding: '40px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            <Calendar size={36} color="var(--text-muted)" />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>No opportunities match this filter</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', maxWidth: '400px' }}>
              No openings were found for the selected date timeframe. Try choosing <strong>"Last 7 Days"</strong>, <strong>"Last 14 Days"</strong>, or <strong>"All"</strong>.
            </p>
            <button 
              className="btn btn-primary btn-sm"
              onClick={() => { setSelectedDateFilter('ALL'); setSelectedTypeTab('ALL'); setSearchTerm(''); }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredOpportunities.map((opp) => {
            // Calculate Dynamic Match Score & Breakdown
            const { matchScore, matchedSkills, missingSkills, breakdown } = calculateMatchScore(currentStudent, opp);

            // Check if student already has a tracking record for this opportunity
            const existingApp = applications.find(
              a => a.studentId === currentStudent.id && a.opportunityId === opp.id
            );

            const isOpened = openedExternalOppIds.includes(opp.id);
            const isExpanded = expandedMatchId === opp.id;
            const relativeDate = formatPostingDate(opp.postedDate);
            const daysAgo = getDaysSincePosted(opp.postedDate);

            // Format Source Label
            const getSourceLabel = (src) => {
              if (opp.isDemo || src === 'DEMO') return 'DEMO OPPORTUNITY';
              if (src === 'COMPANY_WEBSITE') return 'Company Careers';
              if (src === 'LINKEDIN') return 'LinkedIn';
              if (src === 'INDEED') return 'Indeed';
              return src;
            };

            return (
              <div 
                key={opp.id} 
                className="glass-card"
                style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '16px',
                  borderLeft: opp.isDemo ? '4px solid var(--accent-amber)' : '4px solid var(--accent-indigo)'
                }}
              >
                <div className="flex-between" style={{ gap: '20px', flexWrap: 'wrap' }}>
                  
                  {/* Left Side Info */}
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', flex: 1, minWidth: '300px' }}>
                    <div style={{
                      width: '54px',
                      height: '54px',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--bg-input)',
                      border: '1px solid var(--border-color)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.8rem',
                      flexShrink: 0
                    }}>
                      {opp.logo}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                        <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>{opp.title}</h3>

                        {/* Type Badge */}
                        <span className={`badge ${opp.type === 'JOB' ? 'badge-indigo' : opp.type === 'INTERNSHIP' ? 'badge-cyan' : 'badge-amber'}`}>
                          {opp.type}
                        </span>

                        {/* Work Mode Badge */}
                        <span className="badge badge-indigo" style={{ background: 'var(--bg-input)', color: 'var(--text-secondary)', border: '1px solid var(--border-color)' }}>
                          {opp.workMode}
                        </span>

                        {/* Posting Date Badge (Dynamic relative date) */}
                        <span 
                          className="badge" 
                          style={{ 
                            background: daysAgo === 0 ? 'rgba(16, 185, 129, 0.2)' : 'var(--bg-input)', 
                            color: daysAgo === 0 ? '#34d399' : 'var(--accent-cyan)',
                            border: `1px solid ${daysAgo === 0 ? 'rgba(16, 185, 129, 0.4)' : 'var(--border-color)'}`,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <Clock size={11} /> {relativeDate}
                        </span>

                        {/* Verification Status */}
                        <span className={`badge ${opp.status === 'ACTIVE' ? 'badge-emerald' : 'badge-rose'}`}>
                          <ShieldCheck size={10} /> {opp.status}
                        </span>
                      </div>

                      <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--accent-indigo)' }}>
                        {opp.company} • <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Source: {getSourceLabel(opp.source)} • Verified: {opp.lastVerifiedAt}</span>
                      </div>

                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', maxWidth: '700px' }}>
                        {opp.description}
                      </p>

                      {/* Required Skill Tags */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '4px' }}>
                        {opp.skills.map(sk => {
                          const isMatched = matchedSkills.includes(sk);
                          return (
                            <span 
                              key={sk} 
                              style={{
                                fontSize: '0.75rem',
                                padding: '3px 8px',
                                borderRadius: 'var(--radius-sm)',
                                background: isMatched ? 'rgba(16, 185, 129, 0.15)' : 'var(--bg-input)',
                                color: isMatched ? '#34d399' : 'var(--text-muted)',
                                border: isMatched ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid var(--border-color)',
                                fontWeight: 600
                              }}
                            >
                              {isMatched ? '✓ ' : '× '}{sk}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Right Side Match Score & Application Action */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px', minWidth: '200px' }}>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>
                      {opp.stipend}
                    </div>

                    <div style={{ display: 'flex', gap: '10px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <MapPin size={12} /> {opp.location}
                      </span>
                    </div>

                    {/* DYNAMIC MATCH SCORE BADGE & EXPLAIN BUTTON */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span className="badge badge-emerald" style={{ fontSize: '0.85rem', padding: '6px 12px' }}>
                        <Sparkles size={12} /> {matchScore}% Match
                      </span>

                      <button 
                        onClick={() => toggleExplainMatch(opp.id)}
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '4px 8px', fontSize: '0.75rem' }}
                        title="Explain why this match score was assigned"
                      >
                        Why this match? {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                      </button>
                    </div>

                    {/* 2-STEP EXTERNAL APPLY BUTTON FLOW */}
                    {existingApp ? (
                      <div style={{ textAlign: 'right' }}>
                        <span className="badge badge-emerald" style={{ padding: '6px 14px', fontSize: '0.8rem' }}>
                          <CheckCircle2 size={12} /> {existingApp.status}
                        </span>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                          Applied on {existingApp.appliedAt}
                        </div>
                      </div>
                    ) : isOpened ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'flex-end' }}>
                        <button 
                          onClick={() => confirmApplication(opp)}
                          className="btn btn-cyan btn-sm"
                          style={{ width: '100%' }}
                        >
                          <CheckCircle2 size={14} /> I Applied
                        </button>
                        <div style={{ fontSize: '0.68rem', color: 'var(--accent-amber)' }}>
                          Confirm after completing external application
                        </div>
                      </div>
                    ) : (
                      <button 
                        onClick={() => openExternalApplyUrl(opp)}
                        className="btn btn-primary btn-sm"
                        style={{ width: '100%' }}
                      >
                        Apply Now ↗
                      </button>
                    )}

                  </div>

                </div>

                {/* EXPANDABLE EXPLAINABLE MATCH SCORE BREAKDOWN */}
                {isExpanded && (
                  <div style={{ 
                    background: 'var(--bg-input)', 
                    padding: '16px', 
                    borderRadius: 'var(--radius-md)', 
                    border: '1px solid var(--border-color-hover)',
                    marginTop: '8px',
                    animation: 'fadeIn 0.2s ease-out'
                  }}>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '10px', color: 'var(--text-primary)' }}>
                      📊 AI Match Score Breakdown ({matchScore}% Overall for {currentStudent.targetRole})
                    </div>

                    <div className="grid-2" style={{ gap: '14px' }}>
                      {/* Matched Skills */}
                      <div>
                        <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-emerald)', marginBottom: '6px' }}>
                          ✓ Matched Skills ({matchedSkills.length})
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                          {matchedSkills.length > 0 ? (
                            matchedSkills.map(s => <span key={s} className="badge badge-emerald">✓ {s}</span>)
                          ) : (
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>No direct skill match</span>
                          )}
                        </div>
                      </div>

                      {/* Missing Skills */}
                      <div>
                        <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-rose)', marginBottom: '6px' }}>
                          × Missing Skills to Acquire ({missingSkills.length})
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                          {missingSkills.length > 0 ? (
                            missingSkills.map(s => <span key={s} className="badge badge-rose">× {s}</span>)
                          ) : (
                            <span style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)' }}>All required skills present!</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Weighting Matrix */}
                    <div style={{ display: 'flex', gap: '16px', marginTop: '12px', paddingTop: '10px', borderTop: '1px solid var(--border-color)', flexWrap: 'wrap', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      <span>Skill Weight (60%): <strong>{breakdown.skillScore} pts</strong></span>
                      <span>Project Relevance (15%): <strong>{breakdown.projectScore} pts</strong></span>
                      <span>Academic GPA (10%): <strong>{breakdown.gpaScore} pts</strong></span>
                      <span>Eligibility (10%): <strong>{breakdown.eduScore} pts</strong></span>
                      <span>Location (5%): <strong>{breakdown.locationScore} pts</strong></span>
                    </div>
                  </div>
                )}

              </div>
            );
          })
        )}
      </div>

    </div>
  );
}
