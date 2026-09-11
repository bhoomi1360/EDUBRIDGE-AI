import React, { useState, useEffect } from 'react';
import { useApp } from './context/AppContext';
import { INITIAL_ROLES } from './data/mockData';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import AIChatModal from './components/AIChatModal';
import EditProfileModal from './components/EditProfileModal';

// Student Portal Views
import StudentDashboard from './components/StudentPortal/StudentDashboard';
import SkillRadar from './components/StudentPortal/SkillRadar';
import ResumeAnalyzer from './components/StudentPortal/ResumeAnalyzer';
import InternshipBoard from './components/StudentPortal/InternshipBoard';
import UpskillingRoadmap from './components/StudentPortal/UpskillingRoadmap';
import InterviewInvites from './components/StudentPortal/InterviewInvites';

// Academia Portal Views
import AcademiaDashboard from './components/AcademiaPortal/AcademiaDashboard';
import CurriculumHarmonizer from './components/AcademiaPortal/CurriculumHarmonizer';

// Industry Portal Views
import IndustryDashboard from './components/IndustryPortal/IndustryDashboard';
import TalentSearch from './components/IndustryPortal/TalentSearch';
import ChallengeIncubator from './components/IndustryPortal/ChallengeIncubator';

// Admin Observatory View
import NationalObservatory from './components/AdminObservatory/NationalObservatory';
import AdminStandalonePage from './components/AdminObservatory/AdminStandalonePage';

// Helper to check if current URL points to /admin
function checkIsAdminUrl() {
  const p = window.location.pathname.toLowerCase();
  const h = window.location.hash.toLowerCase();
  const s = window.location.search.toLowerCase();
  return p.includes('/admin') || h.includes('#/admin') || h.includes('#admin') || s.includes('admin=true');
}

export default function App() {
  const { role } = useApp();
  
  // Track standalone /admin webpage route
  const [isAdminPage, setIsAdminPage] = useState(() => checkIsAdminUrl());

  useEffect(() => {
    const handleLocationChange = () => {
      setIsAdminPage(checkIsAdminUrl());
    };
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  // Set default tab based on active persona role
  const getDefaultTab = (r) => {
    switch (r) {
      case INITIAL_ROLES.STUDENT: return 'dashboard';
      case INITIAL_ROLES.ACADEMIA: return 'academia_dash';
      case INITIAL_ROLES.INDUSTRY: return 'industry_dash';
      case INITIAL_ROLES.ADMIN: return 'national_obs';
      default: return 'dashboard';
    }
  };

  const [activeTab, setActiveTab] = useState(() => getDefaultTab(role));

  // Reset tab when persona role changes
  useEffect(() => {
    setActiveTab(getDefaultTab(role));
  }, [role]);

  // If user navigated to /admin on the URL, render standalone Admin Portal
  if (isAdminPage) {
    return (
      <AdminStandalonePage 
        onExit={() => {
          window.history.pushState({}, '', '/');
          setIsAdminPage(false);
        }} 
      />
    );
  }

  // View router renderer
  const renderView = () => {
    switch (role) {
      case INITIAL_ROLES.STUDENT:
        switch (activeTab) {
          case 'dashboard': return <StudentDashboard setActiveTab={setActiveTab} />;
          case 'skill_radar': return <SkillRadar />;
          case 'resume_analyzer': return <ResumeAnalyzer />;
          case 'internships': return <InternshipBoard />;
          case 'upskilling': return <UpskillingRoadmap />;
          case 'invite_inbox': return <InterviewInvites />;
          default: return <StudentDashboard setActiveTab={setActiveTab} />;
        }

      case INITIAL_ROLES.ACADEMIA:
        switch (activeTab) {
          case 'academia_dash': return <AcademiaDashboard setActiveTab={setActiveTab} />;
          case 'curriculum_harmonizer': return <CurriculumHarmonizer />;
          case 'placement_drives': return <AcademiaDashboard setActiveTab={setActiveTab} />;
          default: return <AcademiaDashboard setActiveTab={setActiveTab} />;
        }

      case INITIAL_ROLES.INDUSTRY:
        switch (activeTab) {
          case 'industry_dash': return <IndustryDashboard setActiveTab={setActiveTab} />;
          case 'talent_search': return <TalentSearch />;
          case 'post_job': return <IndustryDashboard setActiveTab={setActiveTab} />;
          case 'challenges': return <ChallengeIncubator />;
          default: return <IndustryDashboard setActiveTab={setActiveTab} />;
        }

      case INITIAL_ROLES.ADMIN:
        return <NationalObservatory />;

      default:
        return <StudentDashboard setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="app-container">
      {/* Top sticky navigation bar */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Navbar />

        <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
          {/* Sidebar Navigation */}
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Main Content Area */}
          <main className="main-content">
            <div key={`${role}_${activeTab}`} className="page-wrapper" style={{ animation: 'fadeIn 0.25s ease-out' }}>
              {renderView()}
            </div>
          </main>
        </div>
      </div>

      {/* Floating Interactive AI Advisor Modal */}
      <AIChatModal />

      {/* Interactive Edit Student Profile Modal */}
      <EditProfileModal />
    </div>
  );
}
