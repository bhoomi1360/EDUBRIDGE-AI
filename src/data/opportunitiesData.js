// Curated Opportunity Data Seed conforming to strict SIH Opportunity Data Model

export const OPPORTUNITY_TYPES = {
  JOB: 'JOB',
  INTERNSHIP: 'INTERNSHIP',
  APPRENTICESHIP: 'APPRENTICESHIP'
};

export const WORK_MODES = {
  REMOTE: 'REMOTE',
  HYBRID: 'HYBRID',
  ONSITE: 'ONSITE'
};

export const SOURCES = {
  INDEED: 'INDEED',
  LINKEDIN: 'LINKEDIN',
  COMPANY_WEBSITE: 'COMPANY_WEBSITE',
  DEMO: 'DEMO'
};

export const OPPORTUNITY_STATUSES = {
  ACTIVE: 'ACTIVE',
  EXPIRED: 'EXPIRED'
};

/**
 * Helper to compute an ISO date string (YYYY-MM-DD) for N days ago from today
 */
export function getDaysAgoDate(daysAgo = 0) {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().split('T')[0];
}

/**
 * Helper to format posting date as human readable relative string (e.g., 'Today', '2 days ago')
 */
export function formatPostingDate(dateString) {
  if (!dateString) return 'Recently';
  const postDate = new Date(dateString);
  const today = new Date();
  
  // Normalize both dates to midnight for accurate day difference
  const postMidnight = new Date(postDate.getFullYear(), postDate.getMonth(), postDate.getDate());
  const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  
  const diffTime = todayMidnight.getTime() - postMidnight.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays <= 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 30) return `${diffDays} days ago`;
  if (diffDays < 60) return '1 month ago';
  const months = Math.floor(diffDays / 30);
  return `${months} months ago`;
}

export const SEEDED_OPPORTUNITIES = [
  {
    id: 'opp_google_01',
    title: 'Software Engineering Intern - Summer 2026',
    company: 'Google',
    logo: '🌐',
    type: OPPORTUNITY_TYPES.INTERNSHIP,
    location: 'Bangalore / Hyderabad, India',
    workMode: WORK_MODES.HYBRID,
    stipend: '₹85,000 / month',
    duration: '10-12 Weeks',
    skills: ['Python & PyTorch', 'Data Structures & Alg', 'React / Next.js', 'Node.js & APIs'],
    description: 'Work alongside Google software engineers to develop system design algorithms, scalable cloud architectures, and machine learning features.',
    source: SOURCES.COMPANY_WEBSITE,
    sourceUrl: 'https://careers.google.com/jobs/results/',
    applyUrl: 'https://careers.google.com/jobs/results/',
    postedDate: getDaysAgoDate(0), // Posted Today
    lastVerifiedAt: getDaysAgoDate(0),
    status: OPPORTUNITY_STATUSES.ACTIVE,
    isDemo: false
  },
  {
    id: 'opp_msft_02',
    title: 'Software Development Engineer (SDE 1)',
    company: 'Microsoft',
    logo: '🪟',
    type: OPPORTUNITY_TYPES.JOB,
    location: 'Hyderabad, Telangana, India',
    workMode: WORK_MODES.HYBRID,
    stipend: '₹18.5 LPA + Performance Bonus',
    duration: 'Full Time',
    skills: ['Node.js & APIs', 'Cloud (AWS/GCP)', 'Docker & DevOps', 'Data Structures & Alg'],
    description: 'Design resilient Azure cloud services, high-concurrency RESTful APIs, and distributed microservices platforms.',
    source: SOURCES.LINKEDIN,
    sourceUrl: 'https://www.linkedin.com/jobs/search/?keywords=Microsoft%20Software%20Engineer',
    applyUrl: 'https://careers.microsoft.com/v2/global/en/home.html',
    postedDate: getDaysAgoDate(2), // Posted 2 days ago
    lastVerifiedAt: getDaysAgoDate(1),
    status: OPPORTUNITY_STATUSES.ACTIVE,
    isDemo: false
  },
  {
    id: 'opp_amazon_04',
    title: 'AWS Cloud Solutions Trainee',
    company: 'Amazon Web Services',
    logo: '📦',
    type: OPPORTUNITY_TYPES.INTERNSHIP,
    location: 'Bangalore, Karnataka, India',
    workMode: WORK_MODES.REMOTE,
    stipend: '₹65,000 / month',
    duration: '6 Months',
    skills: ['Cloud (AWS/GCP)', 'Docker & DevOps', 'Python & PyTorch'],
    description: 'Assist AWS enterprise architects in optimizing cloud infrastructure cost, serverless functions, and CI/CD pipelines.',
    source: SOURCES.INDEED,
    sourceUrl: 'https://www.indeed.com/q-Amazon-AWS-jobs.html',
    applyUrl: 'https://www.amazon.jobs/',
    postedDate: getDaysAgoDate(5), // Posted 5 days ago
    lastVerifiedAt: getDaysAgoDate(2),
    status: OPPORTUNITY_STATUSES.ACTIVE,
    isDemo: false
  },
  {
    id: 'opp_tcs_03',
    title: 'TCS Digital Apprenticeship Program',
    company: 'Tata Consultancy Services (TCS)',
    logo: '⚡',
    type: OPPORTUNITY_TYPES.APPRENTICESHIP,
    location: 'Pune / Chennai, India',
    workMode: WORK_MODES.ONSITE,
    stipend: '₹35,000 / month',
    duration: '12 Months (PPO Pathway)',
    skills: ['React / Next.js', 'Node.js & APIs', 'Docker & DevOps'],
    description: 'Structured 1-year apprentice program focused on enterprise modernization, cloud DevOps deployment pipelines, and full-stack web applications.',
    source: SOURCES.COMPANY_WEBSITE,
    sourceUrl: 'https://www.tcs.com/careers',
    applyUrl: 'https://www.tcs.com/careers',
    postedDate: getDaysAgoDate(10), // Posted 10 days ago (shows in 14d & 30d)
    lastVerifiedAt: getDaysAgoDate(3),
    status: OPPORTUNITY_STATUSES.ACTIVE,
    isDemo: false
  },
  {
    id: 'opp_demo_05',
    title: 'Generative AI Research Apprentice (Prototype Demo)',
    company: 'EduBridge AI Labs',
    logo: '🤖',
    type: OPPORTUNITY_TYPES.APPRENTICESHIP,
    location: 'Remote (Global)',
    workMode: WORK_MODES.REMOTE,
    stipend: '₹40,000 / month',
    duration: '6 Months',
    skills: ['Python & PyTorch', 'React / Next.js', 'Cloud (AWS/GCP)'],
    description: 'Sample demonstration listing used to showcase SIH prototype features and upskilling workflows.',
    source: SOURCES.DEMO,
    sourceUrl: '#',
    applyUrl: 'https://github.com/topics/generative-ai',
    postedDate: getDaysAgoDate(20), // Posted 20 days ago (shows in 30d)
    lastVerifiedAt: getDaysAgoDate(4),
    status: OPPORTUNITY_STATUSES.EXPIRED,
    isDemo: true
  }
];
