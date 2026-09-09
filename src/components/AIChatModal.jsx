import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Bot, Send, X, Sparkles, User, HelpCircle } from 'lucide-react';

export default function AIChatModal() {
  const { isAIChatOpen, setIsAIChatOpen, aiChatMessages, sendAIMessage, currentStudent } = useApp();
  const [inputText, setInputText] = useState('');
  const chatEndRef = useRef(null);

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
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      width: '420px',
      maxHeight: '600px',
      height: '80vh',
      background: 'var(--bg-secondary)',
      border: '1px solid var(--border-color-hover)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 1000,
      overflow: 'hidden',
      backdropFilter: 'blur(16px)',
      animation: 'slideUp 0.25s ease-out'
    }}>
      
      {/* Header */}
      <div className="flex-between" style={{
        padding: '16px 20px',
        background: 'linear-gradient(135deg, var(--accent-indigo) 0%, var(--accent-cyan) 100%)',
        color: 'white'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ background: 'rgba(255, 255, 255, 0.2)', padding: '6px', borderRadius: '8px' }}>
            <Bot size={20} color="white" />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.95rem', lineHeight: 1.2 }}>EduBridge AI Career Advisor</div>
            <div style={{ fontSize: '0.7rem', opacity: 0.9 }}>Online • Skill Alignment Assistant</div>
          </div>
        </div>

        <button 
          onClick={() => setIsAIChatOpen(false)}
          style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', padding: '4px' }}
        >
          <X size={18} />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div style={{
        flex: 1,
        padding: '16px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}>
        {aiChatMessages.map((msg, i) => {
          const isAI = msg.sender === 'ai';
          return (
            <div 
              key={i}
              style={{
                display: 'flex',
                gap: '8px',
                alignSelf: isAI ? 'flex-start' : 'flex-end',
                maxWidth: '85%'
              }}
            >
              {isAI && (
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: 'var(--accent-indigo-glow)',
                  border: '1px solid rgba(99, 102, 241, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: '2px'
                }}>
                  <Bot size={14} color="var(--accent-indigo)" />
                </div>
              )}

              <div style={{
                background: isAI ? 'var(--bg-input)' : 'linear-gradient(135deg, var(--accent-indigo) 0%, #4f46e5 100%)',
                color: isAI ? 'var(--text-primary)' : 'white',
                padding: '10px 14px',
                borderRadius: isAI ? '4px 14px 14px 14px' : '14px 4px 14px 14px',
                fontSize: '0.85rem',
                lineHeight: 1.45,
                border: isAI ? '1px solid var(--border-color)' : 'none',
                whiteSpace: 'pre-line'
              }}>
                {msg.text}
                <div style={{ fontSize: '0.65rem', opacity: 0.6, marginTop: '4px', textAlign: 'right' }}>
                  {msg.timestamp}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={chatEndRef} />
      </div>

      {/* Sample Quick Prompts */}
      <div style={{ padding: '8px 12px', background: 'var(--bg-primary)', display: 'flex', gap: '6px', overflowX: 'auto', borderTop: '1px solid var(--border-color)' }}>
        {[
          'How to boost my ATS score?',
          'Mock interview question',
          'What skills are missing for Fullstack AI?'
        ].map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handlePromptClick(prompt)}
            style={{
              whiteSpace: 'nowrap',
              fontSize: '0.7rem',
              padding: '4px 10px',
              borderRadius: 'var(--radius-full)',
              background: 'var(--bg-input)',
              color: 'var(--accent-cyan)',
              border: '1px solid var(--border-color)',
              cursor: 'pointer'
            }}
          >
            💡 {prompt}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <form onSubmit={handleSend} style={{
        padding: '12px',
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
            padding: '8px 16px',
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
          <Send size={16} />
        </button>
      </form>

    </div>
  );
}
