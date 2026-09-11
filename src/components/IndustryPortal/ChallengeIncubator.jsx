import React, { useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { Trophy, Calendar, Users, Plus, CheckCircle2, Sparkles, Award } from 'lucide-react';
import { useGsapStagger } from '../../utils/animations';

export default function ChallengeIncubator() {
  const { challenges, registeredChallengeIds, registerForChallenge } = useApp();
  const containerRef = useRef(null);
  useGsapStagger(containerRef, '.gsap-chall-card', { y: 18, stagger: 0.08 });

  return (
    <div ref={containerRef} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Top Banner */}
      <div className="glass-card flex-between gsap-chall-card" style={{ gap: '20px', flexWrap: 'wrap' }}>
        <div>
          <span className="badge badge-amber" style={{ marginBottom: '8px' }}>
            <Trophy size={12} /> Industry Hackathon Incubator
          </span>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800 }}>
            Live Corporate <span className="gradient-text">Challenges &amp; Capstone Projects</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
            Companies submit real-world industrial problems for academic credit, cash prize pools, and direct hiring pipelines.
          </p>
        </div>

        <button 
          className="btn btn-primary"
          onClick={() => alert('New Corporate Challenge Studio: Define problem requirements, cash prize pool, and evaluation rubrics.')}
        >
          <Plus size={16} /> Post Industry Challenge
        </button>
      </div>

      {/* Challenge Cards Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        {challenges.map((c) => {
          const isRegistered = registeredChallengeIds.includes(c.id);

          return (
            <div key={c.id} className="glass-card gsap-chall-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              <div className="flex-between" style={{ flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--accent-indigo)' }}>
                    Sponsored by {c.company}
                  </div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginTop: '2px' }}>{c.title}</h3>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-emerald)', fontFamily: 'var(--font-mono)' }}>
                    {c.stipendPrize || c.prize}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Submission Deadline: {c.deadline}
                  </div>
                </div>
              </div>

              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                {c.description}
              </p>

              {/* Tags */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {c.tags.map(t => (
                  <span key={t} className="badge badge-cyan">{t}</span>
                ))}
              </div>

              <div className="flex-between" style={{ paddingTop: '12px', borderTop: '1px solid var(--border-color)', flexWrap: 'wrap', gap: '10px' }}>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Users size={15} color="var(--accent-cyan)" /> {c.participatingTeams} University Teams Registered
                </span>

                <button 
                  className={`btn ${isRegistered ? 'btn-secondary' : 'btn-cyan'} btn-sm`}
                  onClick={() => registerForChallenge(c.id)}
                  disabled={isRegistered}
                  style={{ padding: '7px 16px' }}
                >
                  {isRegistered ? (
                    <>
                      <CheckCircle2 size={15} color="var(--accent-emerald)" /> Team Registered
                    </>
                  ) : (
                    'Register College Team'
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
