import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheck, 
  Users, 
  Briefcase, 
  Bell, 
  BookOpen, 
  Trophy, 
  PlusCircle, 
  Trash2, 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink,
  GraduationCap,
  Building2,
  Calendar,
  DollarSign,
  MapPin,
  Sparkles,
  X,
  Lock,
  UserCheck,
  LogOut,
  Eye,
  EyeOff,
  ArrowLeft,
  KeyRound,
  Layers,
  Database
} from 'lucide-react';

export default function AdminStandalonePage({ onExit }) {
  const {
    students,
    addStudent,
    deleteStudent,
    opportunities,
    addNewJob,
    deleteOpportunity,
    interviewInvites,
    deleteInvite,
    clearAllInvites,
    curricula,
    addCurriculumAudit,
    deleteCurriculum,
    challenges,
    addChallenge,
    deleteChallenge,
    setActiveStudentId,
    activeStudentId
  } = useApp();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('edubridge_admin_authenticated') === 'true';
  });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');

  // Dashboard Tab state
  const [activeSubTab, setActiveSubTab] = useState('students');
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState(null);

  // Modals state
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
  const [isAddJobOpen, setIsAddJobOpen] = useState(false);
  const [isAddCurriculumOpen, setIsAddCurriculumOpen] = useState(false);
  const [isAddChallengeOpen, setIsAddChallengeOpen] = useState(false);

  // New Student Form State
  const [newStudentForm, setNewStudentForm] = useState({
    name: '',
    email: '',
    phone: '',
    university: '',
    department: 'Computer Science & Engineering',
    graduationYear: '2026',
    gpa: '8.5',
    targetRole: 'Full Stack AI Engineer',
    skills: 'React / Next.js, Python, Node.js, Cloud (AWS), Docker',
    resumeATSScore: '85'
  });

  // New Job Form State
  const [newJobForm, setNewJobForm] = useState({
    title: '',
    company: '',
    type: 'INTERNSHIP',
    workMode: 'REMOTE',
    location: 'Bangalore / Remote',
    stipend: '₹45,000 / month',
    duration: '6 Months',
    skills: 'React, Node.js, Python, PostgreSQL',
    applyUrl: 'https://careers.google.com/',
    description: 'We are seeking an ambitious engineer to build high-scale cloud platforms.'
  });

  // New Curriculum Form State
  const [newCurriculumForm, setNewCurriculumForm] = useState({
    department: 'Computer Science & Engineering',
    courseName: '',
    industryGapIndex: '30% Outdated',
    alignmentScore: '75',
    outdatedTopics: 'Legacy SOAP APIs, Flash, jQuery 1.x',
    recommendedTopics: 'GraphQL, FastAPI, Docker Containers, Next.js 14'
  });

  // New Challenge Form State
  const [newChallengeForm, setNewChallengeForm] = useState({
    title: '',
    company: '',
    prize: '₹1,50,000 + Pre-Placement Offer',
    deadline: '2026-12-15',
    difficulty: 'Intermediate',
    domain: 'Full Stack & Cloud Architecture',
    description: 'Build an autonomous multi-modal edge AI pipeline.'
  });

  const showNotification = (msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3500);
  };

  // Login handler
  const handleLogin = (e) => {
    e.preventDefault();
    setAuthError('');
    const u = username.trim().toLowerCase();
    const p = password.trim();

    // Authenticate (admin / admin or admin / admin123)
    if ((u === 'admin' && (p === 'admin' || p === 'admin123' || p === 'password')) || (u === 'root' && p === 'root')) {
      sessionStorage.setItem('edubridge_admin_authenticated', 'true');
      setIsAuthenticated(true);
      showNotification('Signed in as Super Administrator');
    } else {
      setAuthError('Invalid credentials. Use Username: admin | Password: admin or admin123');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('edubridge_admin_authenticated');
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
  };

  const handleReturnToSite = () => {
    if (onExit) {
      onExit();
    } else {
      window.location.href = '/';
    }
  };

  // Handlers for Add Operations
  const handleCreateStudent = (e) => {
    e.preventDefault();
    if (!newStudentForm.name.trim() || !newStudentForm.email.trim()) {
      showNotification('Please enter at least Name and Email.', 'error');
      return;
    }

    const skillsArray = newStudentForm.skills.split(',').map(s => s.trim()).filter(Boolean).map(sk => ({
      name: sk,
      level: Math.floor(Math.random() * 25) + 70,
      benchmark: 85
    }));

    addStudent({
      ...newStudentForm,
      skills: skillsArray.length > 0 ? skillsArray : undefined
    });

    setIsAddStudentOpen(false);
    setNewStudentForm({
      name: '',
      email: '',
      phone: '',
      university: '',
      department: 'Computer Science & Engineering',
      graduationYear: '2026',
      gpa: '8.5',
      targetRole: 'Full Stack AI Engineer',
      skills: 'React / Next.js, Python, Node.js, Cloud (AWS), Docker',
      resumeATSScore: '85'
    });
    showNotification(`Student "${newStudentForm.name}" created successfully!`);
  };

  const handleCreateJob = (e) => {
    e.preventDefault();
    if (!newJobForm.title.trim() || !newJobForm.company.trim()) {
      showNotification('Please enter Job Title and Company Name.', 'error');
      return;
    }

    const skillsArray = newJobForm.skills.split(',').map(s => s.trim()).filter(Boolean);

    addNewJob({
      ...newJobForm,
      skills: skillsArray
    });

    setIsAddJobOpen(false);
    setNewJobForm({
      title: '',
      company: '',
      type: 'INTERNSHIP',
      workMode: 'REMOTE',
      location: 'Bangalore / Remote',
      stipend: '₹45,000 / month',
      duration: '6 Months',
      skills: 'React, Node.js, Python, PostgreSQL',
      applyUrl: 'https://careers.google.com/',
      description: 'We are seeking an ambitious engineer to build high-scale cloud platforms.'
    });
    showNotification(`Job opening "${newJobForm.title}" published successfully!`);
  };

  const handleCreateCurriculum = (e) => {
    e.preventDefault();
    if (!newCurriculumForm.courseName.trim()) {
      showNotification('Please enter Course Name.', 'error');
      return;
    }

    addCurriculumAudit({
      ...newCurriculumForm,
      outdatedTopics: newCurriculumForm.outdatedTopics.split(',').map(s => s.trim()).filter(Boolean),
      recommendedTopics: newCurriculumForm.recommendedTopics.split(',').map(s => s.trim()).filter(Boolean),
      alignmentScore: Number(newCurriculumForm.alignmentScore) || 75
    });

    setIsAddCurriculumOpen(false);
    setNewCurriculumForm({
      department: 'Computer Science & Engineering',
      courseName: '',
      industryGapIndex: '30% Outdated',
      alignmentScore: '75',
      outdatedTopics: 'Legacy SOAP APIs, Flash, jQuery 1.x',
      recommendedTopics: 'GraphQL, FastAPI, Docker Containers, Next.js 14'
    });
    showNotification('Curriculum audit item added successfully!');
  };

  const handleCreateChallenge = (e) => {
    e.preventDefault();
    if (!newChallengeForm.title.trim() || !newChallengeForm.company.trim()) {
      showNotification('Please enter Challenge Title and Company.', 'error');
      return;
    }

    addChallenge(newChallengeForm);
    setIsAddChallengeOpen(false);
    setNewChallengeForm({
      title: '',
      company: '',
      prize: '₹1,50,000 + Pre-Placement Offer',
      deadline: '2026-12-15',
      difficulty: 'Intermediate',
      domain: 'Full Stack & Cloud Architecture',
      description: 'Build an autonomous multi-modal edge AI pipeline.'
    });
    showNotification(`Corporate challenge "${newChallengeForm.title}" created successfully!`);
  };

  // Filtered lists based on search
  const filteredStudents = students.filter(s => 
    s.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.university?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.targetRole?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredOpportunities = opportunities.filter(o => 
    o.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredInvites = (interviewInvites || []).filter(inv =>
    inv.studentName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inv.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inv.role?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCurricula = curricula.filter(c =>
    c.courseName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.department?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredChallenges = challenges.filter(c =>
    c.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.company?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // =========================================================================
  // VIEW 1: ADMIN LOGIN SCREEN (If not authenticated)
  // =========================================================================
  if (!isAuthenticated) {
    return (
      <div style={{
        minHeight: '100vh',
        width: '100vw',
        background: 'radial-gradient(ellipse at top, #1e1b4b 0%, #09090b 70%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        fontFamily: 'Inter, system-ui, sans-serif'
      }}>
        <div className="glass-card" style={{
          width: '100%',
          maxWidth: '460px',
          background: 'rgba(15, 23, 42, 0.85)',
          border: '1px solid rgba(168, 85, 247, 0.3)',
          borderRadius: '20px',
          padding: '36px 32px',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 40px rgba(168, 85, 247, 0.15)',
          backdropFilter: 'blur(20px)'
        }}>
          {/* Logo / Header */}
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #a855f7 0%, #6366f1 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px auto',
              boxShadow: '0 8px 24px rgba(168, 85, 247, 0.4)'
            }}>
              <ShieldCheck size={34} color="#fff" />
            </div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff' }}>
              EduBridge <span className="gradient-text">Admin Portal</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '6px' }}>
              Authorized administrator sign in required.
            </p>
          </div>

          {/* Error Message */}
          {authError && (
            <div style={{
              background: 'rgba(244, 63, 94, 0.15)',
              border: '1px solid rgba(244, 63, 94, 0.4)',
              color: '#fda4af',
              padding: '12px 14px',
              borderRadius: '10px',
              fontSize: '0.82rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '20px'
            }}>
              <AlertCircle size={16} color="#fda4af" style={{ flexShrink: 0 }} />
              <span>{authError}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px', fontWeight: 600 }}>
                Admin Username
              </label>
              <div style={{ position: 'relative' }}>
                <input 
                  type="text" 
                  required
                  placeholder="admin"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '10px',
                    color: '#fff',
                    fontSize: '0.9rem'
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px', fontWeight: 600 }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  required
                  placeholder="admin123"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 42px 12px 14px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '10px',
                    color: '#fff',
                    fontSize: '0.9rem'
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-muted)',
                    cursor: 'pointer'
                  }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Quick Demo Credentials Hint */}
            <div style={{
              background: 'rgba(99, 102, 241, 0.08)',
              border: '1px solid rgba(99, 102, 241, 0.2)',
              borderRadius: '8px',
              padding: '10px 12px',
              fontSize: '0.75rem',
              color: 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <span>Demo Login: <strong>admin</strong> / <strong>admin123</strong></span>
              <button
                type="button"
                onClick={() => { setUsername('admin'); setPassword('admin123'); }}
                style={{
                  background: 'rgba(99, 102, 241, 0.2)',
                  border: 'none',
                  color: 'var(--accent-indigo)',
                  borderRadius: '4px',
                  padding: '3px 8px',
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Auto-fill
              </button>
            </div>

            <button 
              type="submit"
              className="btn btn-primary"
              style={{
                width: '100%',
                padding: '14px',
                fontSize: '0.95rem',
                fontWeight: 700,
                borderRadius: '10px',
                marginTop: '6px',
                background: 'linear-gradient(135deg, #a855f7 0%, #6366f1 100%)',
                boxShadow: '0 4px 14px rgba(168, 85, 247, 0.4)'
              }}
            >
              Sign In to Admin Dashboard
            </button>
          </form>

          {/* Return to Public Website */}
          <div style={{ textAlign: 'center', marginTop: '24px', paddingTop: '20px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <button
              onClick={handleReturnToSite}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-secondary)',
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <ArrowLeft size={16} /> Return to Public Website
            </button>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 2: AUTHENTICATED ADMIN DASHBOARD (Separate Standalone Page)
  // =========================================================================
  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg-primary)',
      color: 'var(--text-primary)',
      display: 'flex',
      flexDirection: 'column'
    }}>
      
      {/* Toast Notification */}
      {notification && (
        <div style={{
          position: 'fixed',
          top: '24px',
          right: '24px',
          zIndex: 9999,
          background: notification.type === 'error' ? 'var(--accent-rose)' : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          color: '#fff',
          padding: '14px 20px',
          borderRadius: 'var(--radius-md)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontWeight: 600,
          animation: 'fadeIn 0.3s ease'
        }}>
          {notification.type === 'error' ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
          <span>{notification.msg}</span>
        </div>
      )}

      {/* Standalone Admin Top Navigation Bar */}
      <header style={{
        background: 'var(--bg-secondary)',
        borderBottom: 'var(--glass-border)',
        padding: '14px 32px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #a855f7 0%, #6366f1 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(168, 85, 247, 0.4)'
          }}>
            <ShieldCheck size={22} color="#fff" />
          </div>
          <div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800 }}>
              EduBridge <span className="gradient-text">Admin Center</span>
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--accent-purple)', fontWeight: 700, letterSpacing: '0.05em' }}>
              MASTER CONTROL PORTAL • /admin
            </div>
          </div>
        </div>

        {/* Right Top Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={handleReturnToSite}
            className="btn"
            style={{
              background: 'var(--bg-input)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.85rem'
            }}
          >
            <ArrowLeft size={16} /> Public Website
          </button>

          <button
            onClick={handleLogout}
            className="btn"
            style={{
              background: 'rgba(244, 63, 94, 0.1)',
              border: '1px solid rgba(244, 63, 94, 0.3)',
              color: 'var(--accent-rose)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.85rem',
              fontWeight: 600
            }}
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </header>

      {/* Main Admin Content Container */}
      <main style={{ flex: 1, padding: '28px 32px', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Top Banner & Search */}
          <div className="glass-card flex-between" style={{ gap: '20px', flexWrap: 'wrap', background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.15) 0%, rgba(99, 102, 241, 0.15) 100%)' }}>
            <div>
              <span className="badge badge-purple" style={{ marginBottom: '8px' }}>
                <ShieldCheck size={12} /> Master Data Controller
              </span>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>
                Standalone <span className="gradient-text">Administration Console</span>
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
                Add new students, opportunities, challenges, or delete live platform data instantly.
              </p>
            </div>

            {/* Global Search Bar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: '280px' }}>
              <div style={{ position: 'relative', width: '100%' }}>
                <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input 
                  type="text" 
                  placeholder={`Search in ${activeSubTab}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px 10px 38px',
                    background: 'var(--bg-input)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--text-primary)',
                    fontSize: '0.85rem'
                  }}
                />
                {searchTerm && (
                  <button 
                    onClick={() => setSearchTerm('')} 
                    style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Summary Stat Cards */}
          <div className="grid-4" style={{ gap: '14px' }}>
            <div 
              onClick={() => setActiveSubTab('students')}
              className="glass-card" 
              style={{ 
                padding: '16px', 
                cursor: 'pointer', 
                border: activeSubTab === 'students' ? '1px solid var(--accent-indigo)' : 'var(--glass-border)',
                background: activeSubTab === 'students' ? 'rgba(99, 102, 241, 0.1)' : 'var(--bg-secondary)',
                transition: 'all 0.2s ease'
              }}
            >
              <div className="flex-between">
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Students</span>
                <Users size={18} color="var(--accent-indigo)" />
              </div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent-indigo)', marginTop: '4px' }}>
                {students.length}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Manage student profiles</div>
            </div>

            <div 
              onClick={() => setActiveSubTab('jobs')}
              className="glass-card" 
              style={{ 
                padding: '16px', 
                cursor: 'pointer', 
                border: activeSubTab === 'jobs' ? '1px solid var(--accent-cyan)' : 'var(--glass-border)',
                background: activeSubTab === 'jobs' ? 'rgba(6, 182, 212, 0.1)' : 'var(--bg-secondary)',
                transition: 'all 0.2s ease'
              }}
            >
              <div className="flex-between">
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Opportunities</span>
                <Briefcase size={18} color="var(--accent-cyan)" />
              </div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent-cyan)', marginTop: '4px' }}>
                {opportunities.length}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Jobs & Internships</div>
            </div>

            <div 
              onClick={() => setActiveSubTab('invites')}
              className="glass-card" 
              style={{ 
                padding: '16px', 
                cursor: 'pointer', 
                border: activeSubTab === 'invites' ? '1px solid var(--accent-amber)' : 'var(--glass-border)',
                background: activeSubTab === 'invites' ? 'rgba(245, 158, 11, 0.1)' : 'var(--bg-secondary)',
                transition: 'all 0.2s ease'
              }}
            >
              <div className="flex-between">
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Interview Invites</span>
                <Bell size={18} color="var(--accent-amber)" />
              </div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent-amber)', marginTop: '4px' }}>
                {interviewInvites.length}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Recruiter Dispatches</div>
            </div>

            <div 
              onClick={() => setActiveSubTab('curriculum')}
              className="glass-card" 
              style={{ 
                padding: '16px', 
                cursor: 'pointer', 
                border: activeSubTab === 'curriculum' ? '1px solid var(--accent-emerald)' : 'var(--glass-border)',
                background: activeSubTab === 'curriculum' ? 'rgba(16, 185, 129, 0.1)' : 'var(--bg-secondary)',
                transition: 'all 0.2s ease'
              }}
            >
              <div className="flex-between">
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Curricula & MoUs</span>
                <BookOpen size={18} color="var(--accent-emerald)" />
              </div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent-emerald)', marginTop: '4px' }}>
                {curricula.length}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Harmonized Courses</div>
            </div>
          </div>

          {/* Sub-Tab Navigation Bar */}
          <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setActiveSubTab('students')}
              className="btn"
              style={{
                background: activeSubTab === 'students' ? 'var(--accent-indigo)' : 'var(--bg-input)',
                color: activeSubTab === 'students' ? '#fff' : 'var(--text-secondary)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                fontSize: '0.85rem'
              }}
            >
              <Users size={16} /> Students ({students.length})
            </button>

            <button
              onClick={() => setActiveSubTab('jobs')}
              className="btn"
              style={{
                background: activeSubTab === 'jobs' ? 'var(--accent-indigo)' : 'var(--bg-input)',
                color: activeSubTab === 'jobs' ? '#fff' : 'var(--text-secondary)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                fontSize: '0.85rem'
              }}
            >
              <Briefcase size={16} /> Opportunities & Jobs ({opportunities.length})
            </button>

            <button
              onClick={() => setActiveSubTab('invites')}
              className="btn"
              style={{
                background: activeSubTab === 'invites' ? 'var(--accent-indigo)' : 'var(--bg-input)',
                color: activeSubTab === 'invites' ? '#fff' : 'var(--text-secondary)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                fontSize: '0.85rem'
              }}
            >
              <Bell size={16} /> Interview Invites ({interviewInvites.length})
            </button>

            <button
              onClick={() => setActiveSubTab('curriculum')}
              className="btn"
              style={{
                background: activeSubTab === 'curriculum' ? 'var(--accent-indigo)' : 'var(--bg-input)',
                color: activeSubTab === 'curriculum' ? '#fff' : 'var(--text-secondary)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                fontSize: '0.85rem'
              }}
            >
              <BookOpen size={16} /> Curriculum Audits ({curricula.length})
            </button>

            <button
              onClick={() => setActiveSubTab('challenges')}
              className="btn"
              style={{
                background: activeSubTab === 'challenges' ? 'var(--accent-indigo)' : 'var(--bg-input)',
                color: activeSubTab === 'challenges' ? '#fff' : 'var(--text-secondary)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                fontSize: '0.85rem'
              }}
            >
              <Trophy size={16} /> Challenges ({challenges.length})
            </button>
          </div>

          {/* SUB-TAB 1: STUDENTS MANAGEMENT */}
          {activeSubTab === 'students' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="flex-between">
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Student Directory & Records</h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Add new student candidates to the database or delete unwanted profiles.
                  </p>
                </div>
                <button 
                  onClick={() => setIsAddStudentOpen(true)}
                  className="btn btn-primary"
                  style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <PlusCircle size={16} /> Add New Student
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '16px' }}>
                {filteredStudents.map((std) => {
                  const isActive = std.id === activeStudentId;
                  return (
                    <div 
                      key={std.id}
                      className="glass-card"
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px',
                        position: 'relative',
                        border: isActive ? '1px solid var(--accent-indigo)' : '1px solid var(--border-color)',
                        background: isActive ? 'rgba(99, 102, 241, 0.05)' : 'var(--bg-secondary)'
                      }}
                    >
                      {/* Header with avatar & delete */}
                      <div className="flex-between" style={{ alignItems: 'flex-start' }}>
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                          <img 
                            src={std.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'} 
                            alt={std.name} 
                            style={{ width: '46px', height: '46px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--accent-indigo)' }}
                          />
                          <div>
                            <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                              {std.name}
                              {isActive && <span className="badge badge-indigo" style={{ fontSize: '0.65rem' }}>Active Persona</span>}
                            </div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{std.email}</div>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            if (window.confirm(`Are you sure you want to delete student "${std.name}"?`)) {
                              deleteStudent(std.id);
                              showNotification(`Student "${std.name}" was removed.`);
                            }
                          }}
                          title="Delete Student"
                          style={{
                            background: 'rgba(244, 63, 94, 0.1)',
                            border: '1px solid rgba(244, 63, 94, 0.3)',
                            color: 'var(--accent-rose)',
                            borderRadius: '8px',
                            padding: '6px 10px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            transition: 'all 0.2s ease'
                          }}
                        >
                          <Trash2 size={14} /> Delete
                        </button>
                      </div>

                      {/* Info tags */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.8rem', background: 'var(--bg-input)', padding: '10px 12px', borderRadius: 'var(--radius-sm)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <GraduationCap size={14} color="var(--accent-indigo)" />
                          <span style={{ color: 'var(--text-secondary)' }}>University:</span>
                          <strong style={{ color: 'var(--text-primary)', marginLeft: 'auto' }}>{std.university || 'Not Specified'}</strong>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Building2 size={14} color="var(--accent-cyan)" />
                          <span style={{ color: 'var(--text-secondary)' }}>Department:</span>
                          <span style={{ color: 'var(--text-primary)', marginLeft: 'auto', textAlign: 'right' }}>{std.department}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Sparkles size={14} color="var(--accent-amber)" />
                          <span style={{ color: 'var(--text-secondary)' }}>Target Role:</span>
                          <strong style={{ color: 'var(--accent-cyan)', marginLeft: 'auto' }}>{std.targetRole}</strong>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px', paddingTop: '6px', borderTop: '1px solid var(--border-color)' }}>
                          <span>GPA: <strong>{std.gpa || '8.5'}</strong></span>
                          <span>Grad: <strong>{std.graduationYear || '2026'}</strong></span>
                          <span>ATS: <strong style={{ color: 'var(--accent-emerald)' }}>{std.resumeATSScore || 85}/100</strong></span>
                        </div>
                      </div>

                      {/* Skills tags */}
                      <div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '4px', fontWeight: 600 }}>KEY SKILLS ({std.skills?.length || 0})</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                          {(std.skills || []).slice(0, 4).map((sk, idx) => (
                            <span key={idx} className="badge" style={{ fontSize: '0.65rem', background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                              {typeof sk === 'string' ? sk : sk.name} ({typeof sk === 'object' ? sk.level : 80}%)
                            </span>
                          ))}
                          {(std.skills || []).length > 4 && (
                            <span className="badge badge-indigo" style={{ fontSize: '0.65rem' }}>
                              +{(std.skills || []).length - 4} more
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Set active student persona */}
                      <button
                        onClick={() => {
                          setActiveStudentId(std.id);
                          showNotification(`Active student set to "${std.name}".`);
                        }}
                        className="btn"
                        style={{
                          background: isActive ? 'var(--accent-indigo)' : 'transparent',
                          border: '1px solid var(--accent-indigo)',
                          color: isActive ? '#fff' : 'var(--accent-indigo)',
                          padding: '6px 12px',
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          borderRadius: 'var(--radius-md)',
                          marginTop: 'auto',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px'
                        }}
                      >
                        <UserCheck size={14} /> {isActive ? 'Currently Active Persona' : 'Set as Active Persona'}
                      </button>
                    </div>
                  );
                })}
              </div>

              {filteredStudents.length === 0 && (
                <div className="glass-card" style={{ textAlign: 'center', padding: '40px' }}>
                  <Users size={36} color="var(--text-muted)" style={{ margin: '0 auto 12px auto' }} />
                  <h4 style={{ color: 'var(--text-primary)' }}>No student records found</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Try clearing your search term or add a new student profile.</p>
                </div>
              )}
            </div>
          )}

          {/* SUB-TAB 2: OPPORTUNITIES & JOBS MANAGEMENT */}
          {activeSubTab === 'jobs' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="flex-between">
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Job & Internship Postings</h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Publish new industrial opportunities or remove expired/unwanted postings.
                  </p>
                </div>
                <button 
                  onClick={() => setIsAddJobOpen(true)}
                  className="btn btn-primary"
                  style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <PlusCircle size={16} /> Post New Opportunity
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '16px' }}>
                {filteredOpportunities.map((opp) => (
                  <div 
                    key={opp.id}
                    className="glass-card"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                      position: 'relative',
                      border: '1px solid var(--border-color)',
                      background: 'var(--bg-secondary)'
                    }}
                  >
                    <div className="flex-between" style={{ alignItems: 'flex-start' }}>
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <div style={{ fontSize: '1.8rem', width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-input)', borderRadius: '10px' }}>
                          {opp.logo || '💼'}
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>{opp.title}</div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--accent-indigo)', fontWeight: 600 }}>{opp.company}</div>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          if (window.confirm(`Are you sure you want to delete job posting "${opp.title}" from ${opp.company}?`)) {
                            deleteOpportunity(opp.id);
                            showNotification(`Job posting "${opp.title}" was deleted.`);
                          }
                        }}
                        title="Delete Job Opportunity"
                        style={{
                          background: 'rgba(244, 63, 94, 0.1)',
                          border: '1px solid rgba(244, 63, 94, 0.3)',
                          color: 'var(--accent-rose)',
                          borderRadius: '8px',
                          padding: '6px 10px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          fontSize: '0.75rem',
                          fontWeight: 600
                        }}
                      >
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>

                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      <span className={`badge ${opp.type === 'INTERNSHIP' ? 'badge-cyan' : 'badge-purple'}`}>
                        {opp.type}
                      </span>
                      <span className="badge badge-emerald">
                        <DollarSign size={11} /> {opp.stipend || opp.salary || 'Competitive'}
                      </span>
                      <span className="badge" style={{ background: 'var(--bg-input)' }}>
                        <MapPin size={11} /> {opp.location}
                      </span>
                    </div>

                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {opp.description}
                    </p>

                    {/* Skills */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                      {(opp.skills || []).map((sk, i) => (
                        <span key={i} className="badge" style={{ fontSize: '0.65rem', background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                          {sk}
                        </span>
                      ))}
                    </div>

                    <div className="flex-between" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', paddingTop: '8px', borderTop: '1px solid var(--border-color)', marginTop: 'auto' }}>
                      <span>Posted: {opp.postedDate || 'Recent'}</span>
                      {opp.applyUrl && opp.applyUrl !== '#' && (
                        <a 
                          href={opp.applyUrl} 
                          target="_blank" 
                          rel="noreferrer"
                          style={{ color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'none' }}
                        >
                          Visit Apply Link <ExternalLink size={12} />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {filteredOpportunities.length === 0 && (
                <div className="glass-card" style={{ textAlign: 'center', padding: '40px' }}>
                  <Briefcase size={36} color="var(--text-muted)" style={{ margin: '0 auto 12px auto' }} />
                  <h4 style={{ color: 'var(--text-primary)' }}>No opportunities found</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Create a new job opportunity to add it to the live platform.</p>
                </div>
              )}
            </div>
          )}

          {/* SUB-TAB 3: INTERVIEW INVITES MANAGEMENT */}
          {activeSubTab === 'invites' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="flex-between">
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Recruiter Interview Invites Log</h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    System-wide record of interview invitations sent from recruiters to candidates.
                  </p>
                </div>
                {interviewInvites.length > 0 && (
                  <button 
                    onClick={() => {
                      if (window.confirm('Are you sure you want to clear all interview invites across the platform?')) {
                        clearAllInvites();
                        showNotification('All interview invites cleared.');
                      }
                    }}
                    className="btn"
                    style={{
                      background: 'rgba(244, 63, 94, 0.1)',
                      border: '1px solid rgba(244, 63, 94, 0.3)',
                      color: 'var(--accent-rose)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <Trash2 size={16} /> Clear All Invites
                  </button>
                )}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {filteredInvites.map((inv) => (
                  <div 
                    key={inv.id}
                    className="glass-card flex-between"
                    style={{
                      padding: '16px 20px',
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-color)',
                      gap: '16px',
                      flexWrap: 'wrap'
                    }}
                  >
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', flex: 1, minWidth: '280px' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(245, 158, 11, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-amber)', flexShrink: 0 }}>
                        <Bell size={20} />
                      </div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                          <strong style={{ fontSize: '0.95rem', color: 'var(--text-primary)' }}>{inv.companyName}</strong>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>via recruiter {inv.recruiterName || 'Talent Lead'}</span>
                          <span className={`badge ${inv.status === 'Accepted' ? 'badge-emerald' : inv.status === 'Declined' ? 'badge-rose' : 'badge-amber'}`}>
                            {inv.status || 'Sent / Pending'}
                          </span>
                        </div>

                        <div style={{ fontSize: '0.85rem', color: 'var(--accent-indigo)', fontWeight: 600, marginTop: '2px' }}>
                          Candidate: {inv.studentName} • Target: {inv.role}
                        </div>

                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '6px', background: 'var(--bg-input)', padding: '8px 12px', borderRadius: '6px' }}>
                          "{inv.message}"
                        </p>

                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                          Sent: {inv.sentAt ? new Date(inv.sentAt).toLocaleString() : 'Recent'}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        deleteInvite(inv.id);
                        showNotification('Invite deleted.');
                      }}
                      style={{
                        background: 'rgba(244, 63, 94, 0.1)',
                        border: '1px solid rgba(244, 63, 94, 0.3)',
                        color: 'var(--accent-rose)',
                        borderRadius: '8px',
                        padding: '8px 12px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '0.8rem',
                        fontWeight: 600
                      }}
                    >
                      <Trash2 size={14} /> Remove
                    </button>
                  </div>
                ))}

                {filteredInvites.length === 0 && (
                  <div className="glass-card" style={{ textAlign: 'center', padding: '40px' }}>
                    <Bell size={36} color="var(--text-muted)" style={{ margin: '0 auto 12px auto' }} />
                    <h4 style={{ color: 'var(--text-primary)' }}>No interview invites logged</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                      Invites sent by industry recruiters in the Industry Portal will appear here.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* SUB-TAB 4: CURRICULUM AUDITS MANAGEMENT */}
          {activeSubTab === 'curriculum' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="flex-between">
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Curriculum & Syllabus Harmonization Audits</h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Add courses for AI gap analysis or delete outdated audits.
                  </p>
                </div>
                <button 
                  onClick={() => setIsAddCurriculumOpen(true)}
                  className="btn btn-primary"
                  style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <PlusCircle size={16} /> Add Course Audit
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '16px' }}>
                {filteredCurricula.map((curr) => (
                  <div 
                    key={curr.id}
                    className="glass-card"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                      border: '1px solid var(--border-color)',
                      background: 'var(--bg-secondary)'
                    }}
                  >
                    <div className="flex-between" style={{ alignItems: 'flex-start' }}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-primary)' }}>{curr.courseName}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{curr.department}</div>
                      </div>

                      <button
                        onClick={() => {
                          if (window.confirm(`Delete curriculum audit for "${curr.courseName}"?`)) {
                            deleteCurriculum(curr.id);
                            showNotification(`Curriculum "${curr.courseName}" deleted.`);
                          }
                        }}
                        style={{
                          background: 'rgba(244, 63, 94, 0.1)',
                          border: '1px solid rgba(244, 63, 94, 0.3)',
                          color: 'var(--accent-rose)',
                          borderRadius: '8px',
                          padding: '6px 10px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          fontSize: '0.75rem',
                          fontWeight: 600
                        }}
                      >
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>

                    <div className="flex-between" style={{ background: 'var(--bg-input)', padding: '8px 12px', borderRadius: '6px', fontSize: '0.8rem' }}>
                      <span>Alignment Score: <strong style={{ color: curr.alignmentScore > 75 ? 'var(--accent-emerald)' : 'var(--accent-amber)' }}>{curr.alignmentScore}%</strong></span>
                      <span className="badge badge-amber">{curr.industryGapIndex}</span>
                    </div>

                    {/* Outdated vs Recommended */}
                    <div style={{ fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <div>
                        <span style={{ color: 'var(--accent-rose)', fontWeight: 600 }}>⚠️ Flagged Topics: </span>
                        <span style={{ color: 'var(--text-secondary)' }}>
                          {Array.isArray(curr.outdatedTopics) ? curr.outdatedTopics.join(', ') : curr.outdatedTopics}
                        </span>
                      </div>
                      <div>
                        <span style={{ color: 'var(--accent-emerald)', fontWeight: 600 }}>✨ AI Recommendations: </span>
                        <span style={{ color: 'var(--text-secondary)' }}>
                          {Array.isArray(curr.recommendedTopics) ? curr.recommendedTopics.join(', ') : curr.recommendedTopics}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredCurricula.length === 0 && (
                <div className="glass-card" style={{ textAlign: 'center', padding: '40px' }}>
                  <BookOpen size={36} color="var(--text-muted)" style={{ margin: '0 auto 12px auto' }} />
                  <h4 style={{ color: 'var(--text-primary)' }}>No curriculum audits found</h4>
                </div>
              )}
            </div>
          )}

          {/* SUB-TAB 5: CORPORATE CHALLENGES MANAGEMENT */}
          {activeSubTab === 'challenges' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="flex-between">
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Corporate Challenges & Hackathons</h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Create new corporate challenges or delete inactive ones.
                  </p>
                </div>
                <button 
                  onClick={() => setIsAddChallengeOpen(true)}
                  className="btn btn-primary"
                  style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <PlusCircle size={16} /> Create New Challenge
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '16px' }}>
                {filteredChallenges.map((ch) => (
                  <div 
                    key={ch.id}
                    className="glass-card"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                      border: '1px solid var(--border-color)',
                      background: 'var(--bg-secondary)'
                    }}
                  >
                    <div className="flex-between" style={{ alignItems: 'flex-start' }}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-primary)' }}>{ch.title}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--accent-indigo)', fontWeight: 600 }}>{ch.company}</div>
                      </div>

                      <button
                        onClick={() => {
                          if (window.confirm(`Delete challenge "${ch.title}"?`)) {
                            deleteChallenge(ch.id);
                            showNotification(`Challenge "${ch.title}" deleted.`);
                          }
                        }}
                        style={{
                          background: 'rgba(244, 63, 94, 0.1)',
                          border: '1px solid rgba(244, 63, 94, 0.3)',
                          color: 'var(--accent-rose)',
                          borderRadius: '8px',
                          padding: '6px 10px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          fontSize: '0.75rem',
                          fontWeight: 600
                        }}
                      >
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>

                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      <span className="badge badge-emerald"><Trophy size={11} /> {ch.prize}</span>
                      <span className="badge badge-amber"><Calendar size={11} /> Deadline: {ch.deadline}</span>
                      <span className="badge badge-purple">{ch.difficulty}</span>
                    </div>

                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                      {ch.description}
                    </p>

                    <div className="flex-between" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', paddingTop: '8px', borderTop: '1px solid var(--border-color)', marginTop: 'auto' }}>
                      <span>Domain: {ch.domain}</span>
                      <span>Teams: {ch.participatingTeams || 0}</span>
                    </div>
                  </div>
                ))}
              </div>

              {filteredChallenges.length === 0 && (
                <div className="glass-card" style={{ textAlign: 'center', padding: '40px' }}>
                  <Trophy size={36} color="var(--text-muted)" style={{ margin: '0 auto 12px auto' }} />
                  <h4 style={{ color: 'var(--text-primary)' }}>No challenges created</h4>
                </div>
              )}
            </div>
          )}

        </div>
      </main>

      {/* ========================================================================= */}
      {/* MODAL 1: ADD NEW STUDENT */}
      {/* ========================================================================= */}
      {isAddStudentOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div className="glass-card" style={{
            width: '100%',
            maxWidth: '560px',
            maxHeight: '90vh',
            overflowY: 'auto',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            padding: '28px',
            borderRadius: 'var(--radius-lg)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <div className="flex-between">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Users size={20} color="var(--accent-indigo)" />
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Add New Student Profile</h3>
              </div>
              <button 
                onClick={() => setIsAddStudentOpen(false)}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateStudent} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Full Name *</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Rahul Verma"
                  value={newStudentForm.name}
                  onChange={e => setNewStudentForm({ ...newStudentForm, name: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Email Address *</label>
                  <input 
                    type="email" 
                    required
                    placeholder="rahul@college.ac.in"
                    value={newStudentForm.email}
                    onChange={e => setNewStudentForm({ ...newStudentForm, email: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Phone Number</label>
                  <input 
                    type="text" 
                    placeholder="+91 98765 00000"
                    value={newStudentForm.phone}
                    onChange={e => setNewStudentForm({ ...newStudentForm, phone: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>College / University</label>
                  <input 
                    type="text" 
                    placeholder="e.g. IIT Delhi, BITS Pilani"
                    value={newStudentForm.university}
                    onChange={e => setNewStudentForm({ ...newStudentForm, university: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Department</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Computer Science"
                    value={newStudentForm.department}
                    onChange={e => setNewStudentForm({ ...newStudentForm, department: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Target Career Role</label>
                <select 
                  value={newStudentForm.targetRole}
                  onChange={e => setNewStudentForm({ ...newStudentForm, targetRole: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)' }}
                >
                  <option value="Full Stack AI Engineer">Full Stack AI Engineer</option>
                  <option value="Data Scientist & ML Engineer">Data Scientist & ML Engineer</option>
                  <option value="Cloud DevOps & SRE">Cloud DevOps & SRE</option>
                  <option value="Cybersecurity Analyst">Cybersecurity Analyst</option>
                  <option value="Frontend Web Architect">Frontend Web Architect</option>
                  <option value="Backend Systems Engineer">Backend Systems Engineer</option>
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>GPA / CGPA</label>
                  <input 
                    type="number" 
                    step="0.1" 
                    min="1" 
                    max="10"
                    value={newStudentForm.gpa}
                    onChange={e => setNewStudentForm({ ...newStudentForm, gpa: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Grad Year</label>
                  <input 
                    type="number" 
                    min="2024" 
                    max="2030"
                    value={newStudentForm.graduationYear}
                    onChange={e => setNewStudentForm({ ...newStudentForm, graduationYear: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>ATS Score</label>
                  <input 
                    type="number" 
                    min="40" 
                    max="100"
                    value={newStudentForm.resumeATSScore}
                    onChange={e => setNewStudentForm({ ...newStudentForm, resumeATSScore: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Skills (comma-separated)</label>
                <input 
                  type="text" 
                  placeholder="React, Python, Node.js, AWS, Docker"
                  value={newStudentForm.skills}
                  onChange={e => setNewStudentForm({ ...newStudentForm, skills: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                <button 
                  type="button" 
                  onClick={() => setIsAddStudentOpen(false)}
                  className="btn"
                  style={{ background: 'var(--bg-input)', color: 'var(--text-secondary)' }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <PlusCircle size={16} /> Save Student Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: ADD NEW JOB OPPORTUNITY */}
      {/* ========================================================================= */}
      {isAddJobOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div className="glass-card" style={{
            width: '100%',
            maxWidth: '560px',
            maxHeight: '90vh',
            overflowY: 'auto',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            padding: '28px',
            borderRadius: 'var(--radius-lg)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <div className="flex-between">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Briefcase size={20} color="var(--accent-cyan)" />
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Publish New Job Opening</h3>
              </div>
              <button 
                onClick={() => setIsAddJobOpen(false)}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateJob} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Job / Internship Title *</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Senior AI Systems Engineer"
                  value={newJobForm.title}
                  onChange={e => setNewJobForm({ ...newJobForm, title: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Company Name *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Microsoft, Google, Zerodha"
                    value={newJobForm.company}
                    onChange={e => setNewJobForm({ ...newJobForm, company: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Opportunity Type</label>
                  <select 
                    value={newJobForm.type}
                    onChange={e => setNewJobForm({ ...newJobForm, type: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)' }}
                  >
                    <option value="INTERNSHIP">Internship</option>
                    <option value="FULL_TIME">Full-time Job</option>
                    <option value="CONTRACT">Contract / Fellowship</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Stipend / Salary</label>
                  <input 
                    type="text" 
                    placeholder="e.g. ₹60,000 / month or 18 LPA"
                    value={newJobForm.stipend}
                    onChange={e => setNewJobForm({ ...newJobForm, stipend: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Location / Mode</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Bangalore (Hybrid) or Remote"
                    value={newJobForm.location}
                    onChange={e => setNewJobForm({ ...newJobForm, location: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Required Skills (comma-separated)</label>
                <input 
                  type="text" 
                  placeholder="React, TypeScript, Python, AWS, Docker"
                  value={newJobForm.skills}
                  onChange={e => setNewJobForm({ ...newJobForm, skills: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>External Apply URL</label>
                <input 
                  type="url" 
                  placeholder="https://careers.company.com/job/123"
                  value={newJobForm.applyUrl}
                  onChange={e => setNewJobForm({ ...newJobForm, applyUrl: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Description</label>
                <textarea 
                  rows="3"
                  placeholder="Provide brief role overview and responsibilities..."
                  value={newJobForm.description}
                  onChange={e => setNewJobForm({ ...newJobForm, description: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)', resize: 'vertical' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                <button 
                  type="button" 
                  onClick={() => setIsAddJobOpen(false)}
                  className="btn"
                  style={{ background: 'var(--bg-input)', color: 'var(--text-secondary)' }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <PlusCircle size={16} /> Publish Opening
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: ADD NEW CURRICULUM AUDIT */}
      {/* ========================================================================= */}
      {isAddCurriculumOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div className="glass-card" style={{
            width: '100%',
            maxWidth: '540px',
            maxHeight: '90vh',
            overflowY: 'auto',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            padding: '28px',
            borderRadius: 'var(--radius-lg)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <div className="flex-between">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <BookOpen size={20} color="var(--accent-emerald)" />
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Add Curriculum Audit</h3>
              </div>
              <button 
                onClick={() => setIsAddCurriculumOpen(false)}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateCurriculum} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Course Title *</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Distributed Cloud Computing (CS402)"
                  value={newCurriculumForm.courseName}
                  onChange={e => setNewCurriculumForm({ ...newCurriculumForm, courseName: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Department</label>
                  <input 
                    type="text" 
                    value={newCurriculumForm.department}
                    onChange={e => setNewCurriculumForm({ ...newCurriculumForm, department: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Alignment Score (%)</label>
                  <input 
                    type="number" 
                    min="10" 
                    max="100"
                    value={newCurriculumForm.alignmentScore}
                    onChange={e => setNewCurriculumForm({ ...newCurriculumForm, alignmentScore: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Outdated / Flagged Topics (comma-separated)</label>
                <input 
                  type="text" 
                  placeholder="Legacy XML-RPC, Flash, ASP.NET 2.0"
                  value={newCurriculumForm.outdatedTopics}
                  onChange={e => setNewCurriculumForm({ ...newCurriculumForm, outdatedTopics: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>AI Recommended Modern Topics (comma-separated)</label>
                <input 
                  type="text" 
                  placeholder="Kubernetes, GraphQL, Kafka, Rust"
                  value={newCurriculumForm.recommendedTopics}
                  onChange={e => setNewCurriculumForm({ ...newCurriculumForm, recommendedTopics: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                <button 
                  type="button" 
                  onClick={() => setIsAddCurriculumOpen(false)}
                  className="btn"
                  style={{ background: 'var(--bg-input)', color: 'var(--text-secondary)' }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <PlusCircle size={16} /> Save Audit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 4: ADD NEW CHALLENGE */}
      {/* ========================================================================= */}
      {isAddChallengeOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div className="glass-card" style={{
            width: '100%',
            maxWidth: '540px',
            maxHeight: '90vh',
            overflowY: 'auto',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            padding: '28px',
            borderRadius: 'var(--radius-lg)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <div className="flex-between">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Trophy size={20} color="var(--accent-amber)" />
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Create Corporate Challenge</h3>
              </div>
              <button 
                onClick={() => setIsAddChallengeOpen(false)}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateChallenge} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Challenge Title *</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Next-Gen Real-time Vector Search Engine"
                  value={newChallengeForm.title}
                  onChange={e => setNewChallengeForm({ ...newChallengeForm, title: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Sponsoring Company *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Tata Consultancy Services"
                    value={newChallengeForm.company}
                    onChange={e => setNewChallengeForm({ ...newChallengeForm, company: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Prize Pool</label>
                  <input 
                    type="text" 
                    placeholder="e.g. ₹2,00,000 + PPO"
                    value={newChallengeForm.prize}
                    onChange={e => setNewChallengeForm({ ...newChallengeForm, prize: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Submission Deadline</label>
                  <input 
                    type="date" 
                    value={newChallengeForm.deadline}
                    onChange={e => setNewChallengeForm({ ...newChallengeForm, deadline: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Difficulty</label>
                  <select 
                    value={newChallengeForm.difficulty}
                    onChange={e => setNewChallengeForm({ ...newChallengeForm, difficulty: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)' }}
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced (Hardcore)</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Technical Domain</label>
                <input 
                  type="text" 
                  placeholder="e.g. AI/ML, Cloud Systems, Blockchain"
                  value={newChallengeForm.domain}
                  onChange={e => setNewChallengeForm({ ...newChallengeForm, domain: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Brief Problem Statement</label>
                <textarea 
                  rows="3"
                  value={newChallengeForm.description}
                  onChange={e => setNewChallengeForm({ ...newChallengeForm, description: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)', resize: 'vertical' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                <button 
                  type="button" 
                  onClick={() => setIsAddChallengeOpen(false)}
                  className="btn"
                  style={{ background: 'var(--bg-input)', color: 'var(--text-secondary)' }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <PlusCircle size={16} /> Create Challenge
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
