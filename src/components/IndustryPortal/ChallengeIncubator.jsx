import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Trophy, Calendar, Users, Plus, CheckCircle2, Sparkles, Award } from 'lucide-react';

export default function ChallengeIncubator() {
  const { challenges, registeredChallengeIds, registerForChallenge } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Top Banner */}
      <div className="glass-card flex-between" style={{ gap: '20px', flexWrap: 'wrap' }}>
        <div>
          <span className="badge badge-amber" style={{ marginBottom: '8px' }}>
            <Trophy size={12} /> Industry-Academia Hackathon Incubator
          </span>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>
            Live Corporate <span className="gradient-text">Challenges & Capstone Projects</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
            Companies submit real-world industrial problems for academic credit and hiring pipelines.
          </p>
        </div>

        <button 
          className="btn btn-primary"
          onClick={() => alert('New Corporate Challenge Creation Studio opened! Fill in problem requirements, cash prize pool, and evaluation rubric.')}
        >
          <Plus size={16} /> Post Industry Challenge
        </button>
      </div>

      {/* Challenge Cards Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {challenges.map((c) => {
          const isRegistered = registeredChallengeIds.includes(c.id);

          return (
            <div key={c.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              <div className="flex-between" style={{ flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-indigo)' }}>
                    Sponsored by {c.company}
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>{c.title}</h3>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>
                    {c.stipendPrize}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Deadline: {c.deadline}
                  </div>
                </div>
              </div>

              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                {c.description}
              </p>

              {/* Tags */}
              <div style={{ display: 'flex', gap: '8px' }}>
                {c.tags.map(t => (
                  <span key={t} className="badge badge-cyan">{t}</span>
                ))}
              </div>

              <div className="flex-between" style={{ paddingTop: '12px', borderTop: '1px solid var(--border-color)' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Users size={14} /> {c.participatingTeams} University Teams Registered
                </span>

                <button 
                  className={`btn ${isRegistered ? 'btn-secondary' : 'btn-cyan'} btn-sm`}
                  onClick={() => registerForChallenge(c.id)}
                  disabled={isRegistered}
                >
                  {isRegistered ? (
                    <>
                      <CheckCircle2 size={14} color="var(--accent-emerald)" /> Team Registered
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
