import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  INITIAL_ROLES, 
  MOCK_STUDENTS, 
  MOCK_CURRICULUM_AUDIT, 
  MOCK_PLACEMENTS_STATS, 
  MOCK_INDUSTRY_CHALLENGES, 
  MOCK_NATIONAL_STATS 
} from '../data/mockData';
import { SEEDED_OPPORTUNITIES } from '../data/opportunitiesData';
import { activeJobProvider } from '../services/jobProvider';
import { calculateMatchScore } from '../utils/matchEngine';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Current active role persona
  const [role, setRole] = useState(() => {
    return localStorage.getItem('edubridge_role') || INITIAL_ROLES.STUDENT;
  });

  // Theme mode (dark by default)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('edubridge_theme') || 'dark';
  });

  // Active student profiles (persisted to localStorage)
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('edubridge_students');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Merge to ensure email/phone defaults if older storage exists
        return MOCK_STUDENTS.map(mockStd => {
          const match = parsed.find(p => p.id === mockStd.id);
          return match ? { ...mockStd, ...match } : mockStd;
        });
      } catch {
        return MOCK_STUDENTS;
      }
    }
    return MOCK_STUDENTS;
  });

  const [activeStudentId, setActiveStudentId] = useState('std_101');
  const currentStudent = students.find(s => s.id === activeStudentId) || students[0];

  // Edit Profile modal visibility
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  // Opportunities state (backed by ManualJobProvider)
  const [opportunities, setOpportunities] = useState(SEEDED_OPPORTUNITIES);

  // Track which external opportunity URLs were opened by user
  const [openedExternalOppIds, setOpenedExternalOppIds] = useState(() => {
    return JSON.parse(localStorage.getItem('edubridge_opened_opps') || '[]');
  });

  // Real Application Tracker state (Persisted in LocalStorage)
  // Statuses: 'Saved' | 'Applied Externally' | 'Shortlisted' | 'Interview' | 'Selected' | 'Rejected'
  const [applications, setApplications] = useState(() => {
    const saved = localStorage.getItem('edubridge_applications');
    return saved ? JSON.parse(saved) : [];
  });

  // Industry → Student interview invite inbox
  const [interviewInvites, setInterviewInvites] = useState(() => {
    const saved = localStorage.getItem('edubridge_invites');
    return saved ? JSON.parse(saved) : [];
  });

  // Curriculum & Academia state
  const [curricula, setCurricula] = useState(MOCK_CURRICULUM_AUDIT);
  const [placementStats, setPlacementStats] = useState(MOCK_PLACEMENTS_STATS);

  // Industry challenges
  const [challenges, setChallenges] = useState(MOCK_INDUSTRY_CHALLENGES);
  const [registeredChallengeIds, setRegisteredChallengeIds] = useState([]);

  // AI Chat modal state
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [aiChatMessages, setAiChatMessages] = useState([
    {
      sender: 'ai',
      text: 'Hello! I am EduBridge AI Assistant. Ask me about your skill gaps, ATS resume optimization, or interview prep!',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem('edubridge_role', role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem('edubridge_theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('edubridge_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('edubridge_applications', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('edubridge_invites', JSON.stringify(interviewInvites));
  }, [interviewInvites]);

  useEffect(() => {
    localStorage.setItem('edubridge_opened_opps', JSON.stringify(openedExternalOppIds));
  }, [openedExternalOppIds]);

  // Toggle Theme
  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Update student profile details (Name, Email, Phone, Target Role, etc.)
  const updateStudentProfile = (studentId, updatedFields) => {
    setStudents(prev => prev.map(s => {
      if (s.id === studentId) {
        return { ...s, ...updatedFields };
      }
      return s;
    }));
  };

  // Student skill level update (updates radar chart & match score live!)
  const updateStudentSkill = (skillName, newLevel) => {
    setStudents(prev => prev.map(s => {
      if (s.id === activeStudentId) {
        const updatedSkills = s.skills.map(sk => 
          sk.name === skillName ? { ...sk, level: newLevel } : sk
        );
        return { ...s, skills: updatedSkills };
      }
      return s;
    }));
  };

  // Add new skill to student
  const addStudentSkill = (skillName, initialLevel = 70, benchmark = 80) => {
    setStudents(prev => prev.map(s => {
      if (s.id === activeStudentId) {
        if (s.skills.some(sk => sk.name.toLowerCase() === skillName.toLowerCase())) {
          return s;
        }
        return {
          ...s,
          skills: [...s.skills, { name: skillName, level: initialLevel, benchmark }]
        };
      }
      return s;
    }));
  };

  // 1. External Apply Step 1: Open external application URL in new tab
  const openExternalApplyUrl = (opportunity) => {
    if (opportunity.applyUrl && opportunity.applyUrl !== '#') {
      window.open(opportunity.applyUrl, '_blank', 'noopener,noreferrer');
    }
    if (!openedExternalOppIds.includes(opportunity.id)) {
      setOpenedExternalOppIds(prev => [...prev, opportunity.id]);
    }
  };

  // 2. External Apply Step 2: Student clicks "I Applied" -> Creates Application Tracking Record
  const confirmApplication = (opportunity) => {
    const existing = applications.find(
      a => a.studentId === activeStudentId && a.opportunityId === opportunity.id
    );

    if (!existing) {
      const newAppRecord = {
        id: `app_${Date.now()}`,
        studentId: activeStudentId,
        opportunityId: opportunity.id,
        opportunityTitle: opportunity.title,
        company: opportunity.company,
        type: opportunity.type,
        appliedAt: new Date().toISOString().split('T')[0],
        status: 'Applied Externally',
        source: opportunity.source,
        externalUrl: opportunity.applyUrl
      };
      setApplications(prev => [newAppRecord, ...prev]);
    }
  };

  // 3. Manual Application Status Update by Student
  const updateApplicationStatus = (applicationId, newStatus) => {
    setApplications(prev => prev.map(app => 
      app.id === applicationId ? { ...app, status: newStatus } : app
    ));
  };

  // Save an opportunity to "Saved" status
  const saveOpportunity = (opportunity) => {
    const existing = applications.find(
      a => a.studentId === activeStudentId && a.opportunityId === opportunity.id
    );

    if (!existing) {
      const savedRecord = {
        id: `app_${Date.now()}`,
        studentId: activeStudentId,
        opportunityId: opportunity.id,
        opportunityTitle: opportunity.title,
        company: opportunity.company,
        type: opportunity.type,
        appliedAt: new Date().toISOString().split('T')[0],
        status: 'Saved',
        source: opportunity.source,
        externalUrl: opportunity.applyUrl
      };
      setApplications(prev => [savedRecord, ...prev]);
    }
  };

  // Post New Opportunity (Industry Persona -> ManualJobProvider)
  const addNewJob = (newJobData) => {
    const created = activeJobProvider.addOpportunity(newJobData);
    setOpportunities(prev => [created, ...prev]);
  };

  // Admin / Industry: Delete Opportunity
  const deleteOpportunity = (opportunityId) => {
    activeJobProvider.deleteOpportunity(opportunityId);
    setOpportunities(prev => prev.filter(o => o.id !== opportunityId));
  };

  // Admin: Add New Student
  const addStudent = (studentData) => {
    const newStudent = {
      id: `std_${Date.now()}`,
      name: studentData.name || 'New Student',
      email: studentData.email || 'student@university.ac.in',
      phone: studentData.phone || '+91 98000 00000',
      avatar: studentData.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
      university: studentData.university || 'Tech University',
      department: studentData.department || 'Computer Science & Engineering',
      graduationYear: Number(studentData.graduationYear) || 2026,
      gpa: Number(studentData.gpa) || 8.5,
      targetRole: studentData.targetRole || 'Full Stack Developer',
      skills: studentData.skills && studentData.skills.length > 0 ? studentData.skills : [
        { name: 'React / Next.js', level: 75, benchmark: 85 },
        { name: 'JavaScript / TypeScript', level: 80, benchmark: 85 },
        { name: 'Python & Data Analysis', level: 70, benchmark: 80 },
        { name: 'Node.js & APIs', level: 75, benchmark: 80 },
        { name: 'SQL & Database Design', level: 70, benchmark: 75 },
        { name: 'Git & System Design', level: 65, benchmark: 75 }
      ],
      resumeATSScore: Number(studentData.resumeATSScore) || 82,
      verifiedBadges: studentData.verifiedBadges || ['Verified Scholar', 'Skill Certified'],
      completedProjects: studentData.completedProjects || [
        { title: 'Portfolio Project', tech: ['React', 'Node.js'], link: 'https://github.com' }
      ]
    };
    setStudents(prev => [newStudent, ...prev]);
    return newStudent;
  };

  // Admin: Delete Student
  const deleteStudent = (studentId) => {
    setStudents(prev => {
      const filtered = prev.filter(s => s.id !== studentId);
      if (activeStudentId === studentId && filtered.length > 0) {
        setActiveStudentId(filtered[0].id);
      }
      return filtered;
    });
  };

  // Add Curriculum Audit item (Academia Persona)
  const addCurriculumAudit = (auditData) => {
    const createdAudit = {
      id: `curr_${Date.now()}`,
      department: auditData.department,
      courseName: auditData.courseName,
      lastUpdatedYear: new Date().getFullYear(),
      status: auditData.status || 'Under AI Evaluation',
      industryGapIndex: auditData.industryGapIndex || '25% Outdated',
      outdatedTopics: auditData.outdatedTopics || [],
      recommendedTopics: auditData.recommendedTopics || [],
      alignmentScore: auditData.alignmentScore || 70
    };
    setCurricula(prev => [createdAudit, ...prev]);
  };

  // Admin / Academia: Delete Curriculum Audit
  const deleteCurriculum = (curriculumId) => {
    setCurricula(prev => prev.filter(c => c.id !== curriculumId));
  };

  // Send interview invite from industry recruiter to a student
  const sendInterviewInvite = ({ studentId, studentName, companyName, recruiterName, role, message }) => {
    const invite = {
      id: `inv_${Date.now()}`,
      studentId,
      studentName,
      companyName,
      recruiterName,
      role,
      message: message || `We were impressed by your profile and skill set. We would like to invite you for an interview for the ${role} position at ${companyName}.`,
      sentAt: new Date().toISOString(),
      read: false,
      dismissed: false
    };
    setInterviewInvites(prev => [invite, ...prev]);
    return invite;
  };

  // Mark invite as read
  const markInviteRead = (inviteId) => {
    setInterviewInvites(prev => prev.map(inv => inv.id === inviteId ? { ...inv, read: true } : inv));
  };

  // Dismiss / accept an invite
  const updateInviteStatus = (inviteId, status) => {
    setInterviewInvites(prev => prev.map(inv => inv.id === inviteId ? { ...inv, status, read: true } : inv));
  };

  // Admin: Delete invite
  const deleteInvite = (inviteId) => {
    setInterviewInvites(prev => prev.filter(inv => inv.id !== inviteId));
  };

  // Admin: Clear all invites
  const clearAllInvites = () => {
    setInterviewInvites([]);
  };

  // Add Challenge (Industry / Admin)
  const addChallenge = (challengeData) => {
    const newChallenge = {
      id: `ch_${Date.now()}`,
      title: challengeData.title || 'New Industry Challenge',
      company: challengeData.company || 'Enterprise Partner',
      prize: challengeData.prize || '₹1,00,000 + PPO',
      deadline: challengeData.deadline || '2026-11-30',
      difficulty: challengeData.difficulty || 'Intermediate',
      domain: challengeData.domain || 'Full Stack / AI',
      tags: challengeData.tags || ['Innovation', 'Hackathon'],
      participatingTeams: 1,
      description: challengeData.description || 'Solve real-world industrial problem.'
    };
    setChallenges(prev => [newChallenge, ...prev]);
    return newChallenge;
  };

  // Delete Challenge
  const deleteChallenge = (challengeId) => {
    setChallenges(prev => prev.filter(c => c.id !== challengeId));
  };

  // Register for Challenge
  const registerForChallenge = (challengeId) => {
    if (!registeredChallengeIds.includes(challengeId)) {
      setRegisteredChallengeIds(prev => [...prev, challengeId]);
      setChallenges(prev => prev.map(c => c.id === challengeId ? { ...c, participatingTeams: c.participatingTeams + 1 } : c));
    }
  };

  // Send message to AI Assistant
  const sendAIMessage = (text) => {
    const userMsg = {
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setAiChatMessages(prev => [...prev, userMsg]);

    setTimeout(() => {
      let replyText = `Based on current industry demand analysis: To improve your readiness for target roles like "${currentStudent.targetRole}", consider focusing on closing the gap in Docker & Cloud DevOps.`;
      
      const lower = text.toLowerCase();
      if (lower.includes('resume') || lower.includes('ats')) {
        replyText = `Your current ATS score is ${currentStudent.resumeATSScore}/100. Adding keywords like "Kubernetes Orchestration", "CI/CD Pipelines", and "System Architecture" can boost your match!`;
      } else if (lower.includes('interview') || lower.includes('question')) {
        replyText = `Here is a popular senior interview question for your target role:\n\n"How would you handle dynamic traffic spikes in a React + microservices architecture using Redis caching and Docker auto-scaling?"`;
      }

      setAiChatMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: replyText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 600);
  };

  // Compute metrics dynamically for current student (NO HARDCODING!)
  const studentApplications = applications.filter(a => a.studentId === activeStudentId);
  const totalApplicationsCount = studentApplications.filter(a => a.status === 'Applied Externally' || a.status === 'Shortlisted' || a.status === 'Interview' || a.status === 'Selected').length;
  const totalInterviewsCount = studentApplications.filter(a => a.status === 'Interview').length;

  // Calculate average skill match score dynamically across opportunities
  const avgMatchScore = opportunities.length > 0 
    ? Math.round(opportunities.reduce((acc, opp) => acc + calculateMatchScore(currentStudent, opp).matchScore, 0) / opportunities.length)
    : 0;

  return (
    <AppContext.Provider value={{
      role,
      setRole,
      theme,
      toggleTheme,
      students,
      activeStudentId,
      setActiveStudentId,
      currentStudent,
      isEditProfileOpen,
      setIsEditProfileOpen,
      updateStudentProfile,
      updateStudentSkill,
      addStudentSkill,
      opportunities,
      openedExternalOppIds,
      openExternalApplyUrl,
      confirmApplication,
      saveOpportunity,
      applications,
      studentApplications,
      totalApplicationsCount,
      totalInterviewsCount,
      avgMatchScore,
      updateApplicationStatus,
      addNewJob,
      deleteOpportunity,
      addStudent,
      deleteStudent,
      curricula,
      addCurriculumAudit,
      deleteCurriculum,
      placementStats,
      challenges,
      addChallenge,
      deleteChallenge,
      registeredChallengeIds,
      registerForChallenge,
      isAIChatOpen,
      setIsAIChatOpen,
      aiChatMessages,
      sendAIMessage,
      interviewInvites,
      sendInterviewInvite,
      markInviteRead,
      updateInviteStatus,
      deleteInvite,
      clearAllInvites,
      nationalStats: MOCK_NATIONAL_STATS
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
