# Implementation Plan - EduBridge AI (Academia-Industry Collaboration & Skill Mapping Platform)

## Overview
**EduBridge AI** is an innovative, next-generation platform designed to bridge the gap between academic institutions, students, and industry recruiters. It addresses skill mismatches through AI-powered skill mapping, dynamic curriculum alignment, real-time placement tracking, and direct industry-academia project collaboration.

---

## Technical Stack

| Layer | Technology Chosen | Rationale |
| :--- | :--- | :--- |
| **Frontend Framework** | **React 18 + Vite** | Fast development, modular architecture, and lightning-fast render performance. |
| **Styling & Aesthetics** | **Custom Vanilla CSS (Design Tokens)** | High-end visual appeal (Glassmorphism, dark/light themes, glowing accents, smooth micro-animations) without external CSS library bloat. |
| **Data Visualization** | **Recharts** | Rich interactive charts (Radar charts for skill mapping, Bar/Line charts for placement stats, Donut charts for industry demand). |
| **Iconography** | **Lucide-React** | Modern, clean icon suite covering academic, industry, skill, and analytics icons. |
| **State & Persistence** | **React Context API + LocalStorage Engine** | Dynamic state management allowing seamless demoing with realistic pre-populated data and real-time updates. |

---

## Core Features & Innovation Highlights

### 1. Multi-Stakeholder Portal Switcher
Switch smoothly between **Student**, **Industry Recruiter**, **University Faculty/TPO**, and **Admin Observatory** viewports with realistic role-based data.

### 2. AI Skill Gap Radar & Upskilling Engine (Student Hub)
- **Interactive Radar Chart**: Visual comparison between a student's current skill profile vs real-time industry benchmarks for target roles (e.g., Full Stack Engineer, AI/ML Specialist, Cloud Architect).
- **Automated Resume Parser & ATS Matcher**: Extracts skills and scores readiness against target job descriptions.
- **Dynamic Upskilling Pathway**: Step-by-step curated learning modules to bridge missing skill gaps.
- **Smart Internship Matcher**: Calculates percentage skill match (e.g. 92% match) for active industry openings.

### 3. Curriculum Harmonizer & Syllabus Analyzer (Academia Hub)
- **AI Syllabus Audit**: Compares university course syllabi against live industry tech demand.
- **Skill Gap Insights**: Highlights outdated subjects and recommends emerging topics (e.g. Generative AI, Kubernetes, Web3).
- **Placement Drive Manager**: Real-time tracking of upcoming company drives, candidate shortlists, offer letters, and salary packages.
- **MoU & Partnership Hub**: Manages corporate partnerships, guest lecture invites, and capstone project sponsorships.

### 4. Talent Search & Live Industry Challenges (Industry Hub)
- **Skill-Based Talent Finder**: Filters students by verified skill badges, university, and project portfolio.
- **Challenge / Hackathon Incubator**: Corporations post real-world problem statements for academic credit and hiring pipelines.
- **Application Pipeline**: Track candidate applications across Applied, Shortlisted, Interviewing, and Offered stages.

### 5. Interactive Career & AI Skill Assistant
- Integrated AI modal providing mock interview questions, skill roadmap generation, and live assistance.

---

## User Review Required

> [!IMPORTANT]
> **Tech Stack Confirmation**: We are using React + Vite + Custom Vanilla CSS (Design System with variables & glassmorphism) + Recharts + Lucide Icons. This ensures maximum visual flexibility, responsive design, and rich aesthetic output.
> Please review the proposed feature set and confirm if you have any specific extra requirements for your hackathon presentation.

---

## Open Questions

> [!NOTE]
> 1. Are there any specific local target industries or academic streams (e.g. Engineering, Management, Data Science) you'd like highlighted in the pre-populated mock data?
> 2. Would you like a downloadable PDF export feature for candidate resume scorecards and university placement reports?

---

## Proposed Changes

### [New Project Architecture]

We will create a full React web app structure under `e:\jujuuu projects\sih`:

#### [NEW] [`package.json`](file:///e:/jujuuu%20projects/sih/package.json)
Dependencies: `react`, `react-dom`, `lucide-react`, `recharts`. Dev Dependencies: `@vitejs/plugin-react`, `vite`.

#### [NEW] [`src/index.css`](file:///e:/jujuuu%20projects/sih/src/index.css)
Complete design tokens system, color palettes (deep slate indigo dark theme, crisp light theme), typography, glassmorphism utilities, badge styles, and smooth animation keyframes.

#### [NEW] [`src/App.jsx`](file:///e:/jujuuu%20projects/sih/src/App.jsx)
Main navigation, role switcher header, sidebar layout, and view state manager.

#### [NEW] [`src/context/AppContext.jsx`](file:///e:/jujuuu%20projects/sih/src/context/AppContext.jsx)
Global state container managing student profiles, jobs, curriculum audits, applications, industry challenges, and active user role.

#### [NEW] [`src/data/mockData.js`](file:///e:/jujuuu%20projects/sih/src/data/mockData.js)
Rich pre-populated data for students, industry openings, curriculum syllabi, university placement drives, and skill benchmarks.

#### [NEW] Component Architecture:
- [`src/components/Navbar.jsx`](file:///e:/jujuuu%20projects/sih/src/components/Navbar.jsx): Topbar with user profile, role switcher, notification bell, theme toggle.
- [`src/components/Sidebar.jsx`](file:///e:/jujuuu%20projects/sih/src/components/Sidebar.jsx): Navigation links tailored to active stakeholder persona.
- [`src/components/StudentPortal/SkillRadar.jsx`](file:///e:/jujuuu%20projects/sih/src/components/StudentPortal/SkillRadar.jsx): Recharts interactive skill radar comparing candidate skills against industry requirements.
- [`src/components/StudentPortal/StudentDashboard.jsx`](file:///e:/jujuuu%20projects/sih/src/components/StudentPortal/StudentDashboard.jsx): Main dashboard for students with skill gap score, recommended courses, and internship matches.
- [`src/components/StudentPortal/ResumeAnalyzer.jsx`](file:///e:/jujuuu%20projects/sih/src/components/StudentPortal/ResumeAnalyzer.jsx): Interactive AI resume parse & ATS match score tool.
- [`src/components/StudentPortal/InternshipBoard.jsx`](file:///e:/jujuuu%20projects/sih/src/components/StudentPortal/InternshipBoard.jsx): Smart job listing with skill match badges and 1-click apply.
- [`src/components/AcademiaPortal/AcademiaDashboard.jsx`](file:///e:/jujuuu%20projects/sih/src/components/AcademiaPortal/AcademiaDashboard.jsx): TPO/Faculty overview with department readiness, placement stats, and drive management.
- [`src/components/AcademiaPortal/CurriculumHarmonizer.jsx`](file:///e:/jujuuu%20projects/sih/src/components/AcademiaPortal/CurriculumHarmonizer.jsx): AI syllabus analysis tool comparing course curriculum against live tech stack trends.
- [`src/components/IndustryPortal/IndustryDashboard.jsx`](file:///e:/jujuuu%20projects/sih/src/components/IndustryPortal/IndustryDashboard.jsx): Recruiter dashboard to search candidates by skill matrix, post jobs, and track applicants.
- [`src/components/IndustryPortal/ChallengeIncubator.jsx`](file:///e:/jujuuu%20projects/sih/src/components/IndustryPortal/ChallengeIncubator.jsx): Corporate hackathons & live industry problem statement manager.
- [`src/components/AIChatModal.jsx`](file:///e:/jujuuu%20projects/sih/src/components/AIChatModal.jsx): Interactive AI Skill & Career assistant floating window.

---

## Verification Plan

### Automated Verification
- Run `npm install` to install all required dependencies cleanly.
- Run `npm run build` to verify zero build or compilation errors.
- Run `npm run dev` to verify dev server startup.

### Manual Verification & UI Validation
- Verify smooth stakeholder role switching between Student, Industry Recruiter, and Academia TPO.
- Check interactive skill radar charts and placement bar graphs.
- Verify resume analysis tool, job application flow, and curriculum harmonizer functionality.
