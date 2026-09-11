import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Bot, Send, X, Sparkles, User, HelpCircle, MessageSquare } from 'lucide-react';
import gsap from 'gsap';

export default function AIChatModal() {
  const { isAIChatOpen, setIsAIChatOpen, aiChatMessages, sendAIMessage, currentStudent } = useApp();
  const [inputText, setInputText] = useState('');
  const chatEndRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    if (isAIChatOpen && modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, y: 30, scale: 0.94 },
        { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: 'back.out(1.2)' }
      );
    }
  }, [isAIChatOpen]);

  useEffect(() => {
    if (isAIChatOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [aiChatMessages, isAIChatOpen]);

  if (!isAIChatOpen) return null;

  const handleSend = (e) => {
    e.preventDefault();
    if (inputText.trim()) {
      sendAIMessage(inputText.trim());
      setInputText('');
    }
  };

  const handlePromptClick = (prompt) => {
    sendAIMessage(prompt);
  };

  return (
    <div 
      ref={modalRef}
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        width: '430px',
        maxHeight: '620px',
        height: '82vh',
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-color-hover)',
        borderRadius: 'var(--radius-xl)',
        boxShadow: '0 24px 60px rgba(0, 0, 0, 0.55)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1000,
        overflow: 'hidden',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)'
      }}
    >
      
      {/* Header */}
      <div className="flex-between" style={{
        padding: '16px 20px',
        background: 'linear-gradient(135deg, var(--accent-indigo) 0%, var(--accent-cyan) 100%)',
        color: 'white'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ background: 'rgba(255, 255, 255, 0.22)', padding: '7px', borderRadius: '10px', display: 'flex' }}>
            <Bot size={20} color="white" />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.98rem', lineHeight: 1.2 }}>EduBridge AI Career Advisor</div>
            <div style={{ fontSize: '0.72rem', opacity: 0.92, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span className="pulse-dot" style={{ background: '#34d399', width: '6px', height: '6px' }}></span>
              Online • Realtime Skill Guidance
            </div>
          </div>
        </div>

        <button 
          onClick={() => setIsAIChatOpen(false)}
          style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', padding: '4px' }}
          title="Close advisor"
        >
          <X size={19} />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div style={{
        flex: 1,
        padding: '18px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px'
      }}>
        {aiChatMessages.map((msg, i) => {
          const isAI = msg.sender === 'ai';
          return (
            <div 
              key={i}
              style={{
                display: 'flex',
                gap: '10px',
                alignSelf: isAI ? 'flex-start' : 'flex-end',
                maxWidth: '85%'
              }}
            >
              {isAI && (
                <div style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  background: 'var(--accent-indigo-glow)',
                  border: '1px solid rgba(99, 102, 241, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: '2px'
                }}>
                  <Bot size={15} color="var(--accent-indigo)" />
                </div>
              )}

              <div style={{
                background: isAI ? 'var(--bg-input)' : 'linear-gradient(135deg, var(--accent-indigo) 0%, #4f46e5 100%)',
                color: isAI ? 'var(--text-primary)' : 'white',
                padding: '11px 15px',
                borderRadius: isAI ? '4px 16px 16px 16px' : '16px 4px 16px 16px',
                fontSize: '0.86rem',
                lineHeight: 1.5,
                border: isAI ? '1px solid var(--border-subtle)' : 'none',
                boxShadow: isAI ? '0 2px 8px rgba(0,0,0,0.15)' : '0 4px 12px rgba(99,102,241,0.3)',
                whiteSpace: 'pre-line'
              }}>
                {msg.text}
                <div style={{ fontSize: '0.65rem', opacity: 0.65, marginTop: '5px', textAlign: 'right', fontFamily: 'var(--font-mono)' }}>
                  {msg.timestamp}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={chatEndRef} />
      </div>

      {/* Quick Prompts */}
      <div style={{ padding: '8px 14px', background: 'var(--bg-primary)', display: 'flex', gap: '6px', overflowX: 'auto', borderTop: '1px solid var(--border-color)' }}>
        {[
          'How to boost my ATS score?',
          'Mock interview question',
          'Missing skills for target role?'
        ].map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handlePromptClick(prompt)}
            style={{
              whiteSpace: 'nowrap',
              fontSize: '0.72rem',
              fontWeight: 600,
              padding: '5px 11px',
              borderRadius: 'var(--radius-full)',
              background: 'var(--bg-input)',
              color: 'var(--accent-cyan)',
              border: '1px solid var(--border-color)',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            💡 {prompt}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <form onSubmit={handleSend} style={{
        padding: '12px 14px',
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-color)',
        display: 'flex',
        gap: '8px'
      }}>
        <input 
          type="text" 
          placeholder="Ask AI about skill gaps, resume score, interview prep..." 
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          style={{
            flex: 1,
            background: 'var(--bg-input)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-full)',
            padding: '9px 16px',
            color: 'var(--text-primary)',
            fontSize: '0.85rem',
            outline: 'none'
          }}
        />
        <button 
          type="submit" 
          className="btn btn-primary"
          style={{ width: '38px', height: '38px', borderRadius: '50%', padding: 0 }}
        >
          <Send size={15} />
        </button>
      </form>

    </div>
  );
}
