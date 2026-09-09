// Mock Dataset for EduBridge AI Platform

export const INITIAL_ROLES = {
  STUDENT: 'student',
  ACADEMIA: 'academia',
  INDUSTRY: 'industry',
  ADMIN: 'admin',
  SUPER_ADMIN: 'super_admin'
};

export const MOCK_STUDENTS = [
  {
    id: 'std_101',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@iitd.ac.in',
    phone: '+91 98765 43210',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    university: 'IIT Delhi',
    department: 'Computer Science & Engineering',
    graduationYear: 2026,
    gpa: 8.9,
    targetRole: 'Full Stack AI Engineer',
    skills: [
      { name: 'React / Next.js', level: 85, benchmark: 90 },
      { name: 'Python & PyTorch', level: 78, benchmark: 85 },
      { name: 'Node.js & APIs', level: 82, benchmark: 80 },
      { name: 'Cloud (AWS/GCP)', level: 45, benchmark: 75 },
      { name: 'Docker & DevOps', level: 40, benchmark: 70 },
      { name: 'Data Structures & Alg', level: 88, benchmark: 85 }
    ],
    resumeATSScore: 84,
    verifiedBadges: ['Frontend Architect', 'Python Intermediate', 'React Specialist'],
    completedProjects: [
      { title: 'AI Legal Assistant', tech: ['React', 'Python', 'FastAPI', 'OpenAI'], link: 'https://github.com/aarav/ai-legal' },
      { title: 'Distributed Cache Service', tech: ['Go', 'Redis', 'Docker'], link: 'https://github.com/aarav/dist-cache' }
    ]
  },
  {
    id: 'std_102',
    name: 'Priya Ananya',
    email: 'priya.ananya@pilani.bits-pilani.ac.in',
    phone: '+91 98123 45678',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=250',
    university: 'BITS Pilani',
    department: 'Electronics & Communication',
    graduationYear: 2026,
    gpa: 9.2,
    targetRole: 'Data Scientist & ML Engineer',
    skills: [
      { name: 'React / Next.js', level: 40, benchmark: 70 },
      { name: 'Python & PyTorch', level: 92, benchmark: 90 },
      { name: 'Node.js & APIs', level: 50, benchmark: 75 },
      { name: 'Cloud (AWS/GCP)', level: 75, benchmark: 80 },
      { name: 'Docker & DevOps', level: 60, benchmark: 70 },
      { name: 'Data Structures & Alg', level: 85, benchmark: 85 }
    ],
    resumeATSScore: 91,
    verifiedBadges: ['PyTorch Specialist', 'Data Science Expert', 'AWS Certified Cloud Practitioner'],
    completedProjects: [
      { title: 'Crop Yield Predictor via Satellite', tech: ['Python', 'TensorFlow', 'GIS'], link: 'https://github.com/priya/crop-ai' }
    ]
  },
  {
    id: 'std_103',
    name: 'Rohan Mehta',
    email: 'rohan.mehta@vit.ac.in',
    phone: '+91 98456 78901',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    university: 'VIT Vellore',
    department: 'Information Technology',
    graduationYear: 2025,
    gpa: 8.4,
    targetRole: 'DevOps & Cloud Architect',
    skills: [
      { name: 'React / Next.js', level: 60, benchmark: 65 },
      { name: 'Python & PyTorch', level: 55, benchmark: 70 },
      { name: 'Node.js & APIs', level: 70, benchmark: 75 },
      { name: 'Cloud (AWS/GCP)', level: 88, benchmark: 85 },
      { name: 'Docker & DevOps', level: 90, benchmark: 85 },
      { name: 'Data Structures & Alg', level: 75, benchmark: 80 }
    ],
    resumeATSScore: 78,
    verifiedBadges: ['Kubernetes Master', 'AWS Solution Architect', 'CI/CD Specialist'],
    completedProjects: [
      { title: 'Automated Kubernetes Deployment Pipeline', tech: ['Terraform', 'Kubernetes', 'Github Actions'], link: 'https://github.com/rohan/k8s-pipe' }
    ]
  }
];

export const MOCK_JOBS = [
  {
    id: 'job_1',
    company: 'TechCorp Solutions',
    logo: '⚡',
    title: 'Full Stack AI Developer Intern',
    type: 'Internship',
    stipend: '₹45,000 / month',
    location: 'Bangalore (Hybrid)',
    duration: '6 Months (PPO Potential)',
    requiredSkills: ['React / Next.js', 'Python & PyTorch', 'Node.js & APIs'],
    description: 'Work on generative AI integration with customer facing dashboards.',
    postedDaysAgo: 2,
    matchedScore: 92,
    applicantsCount: 142
  },
  {
    id: 'job_2',
    company: 'CloudMind Systems',
    logo: '☁️',
    title: 'Cloud DevOps Trainee Engineer',
    type: 'Full-time Placement',
    stipend: '₹14.5 LPA',
    location: 'Hyderabad / Remote',
    duration: 'Full Time',
    requiredSkills: ['Cloud (AWS/GCP)', 'Docker & DevOps', 'Node.js & APIs'],
    description: 'Architect scalable cloud infrastructure and automate CI/CD release workflows.',
    postedDaysAgo: 1,
    matchedScore: 78,
    applicantsCount: 98
  },
  {
    id: 'job_3',
    company: 'DataPulse Analytics',
    logo: '📊',
    title: 'Machine Learning Research Intern',
    type: 'Internship',
    stipend: '₹55,000 / month',
    location: 'Gurugram',
    duration: '3 Months',
    requiredSkills: ['Python & PyTorch', 'Data Structures & Alg', 'Cloud (AWS/GCP)'],
    description: 'Fine-tune large language models and optimize inference latency on edge devices.',
    postedDaysAgo: 4,
    matchedScore: 86,
    applicantsCount: 210
  },
  {
    id: 'job_4',
    company: 'Nexus Cyber Security',
    logo: '🛡️',
    title: 'Security & Backend Developer',
    type: 'Full-time Placement',
    stipend: '₹12.0 LPA',
    location: 'Pune',
    duration: 'Full Time',
    requiredSkills: ['Node.js & APIs', 'Docker & DevOps', 'Data Structures & Alg'],
    description: 'Build enterprise OAuth2 authentication gateways and secure microservices.',
    postedDaysAgo: 3,
    matchedScore: 81,
    applicantsCount: 76
  }
];

export const MOCK_CURRICULUM_AUDIT = [
  {
    id: 'curr_1',
    department: 'Computer Science & Engineering',
    courseName: 'CS304: Web Technology & Software Architecture',
    lastUpdatedYear: 2021,
    status: 'Needs Modernization',
    industryGapIndex: '38% Outdated',
    outdatedTopics: ['JSP & Servlets', 'SOAP XML Web Services', 'jQuery Basics'],
    recommendedTopics: ['GraphQL & REST API Design', 'Next.js Server Components', 'Docker Containerization', 'OAuth 2.0 & JWT'],
    alignmentScore: 62
  },
  {
    id: 'curr_2',
    department: 'Data Science & AI',
    courseName: 'AI401: Deep Learning Systems',
    lastUpdatedYear: 2023,
    status: 'Well Aligned',
    industryGapIndex: '12% Outdated',
    outdatedTopics: ['Legacy RNNs without Attention'],
    recommendedTopics: ['Transformer Architectures', 'LLM Fine-tuning (LoRA/PEFT)', 'Vector Databases (Chroma/Pinecone)'],
    alignmentScore: 88
  },
  {
    id: 'curr_3',
    department: 'Information Technology',
    courseName: 'IT302: Cloud Computing & Infrastructure',
    lastUpdatedYear: 2020,
    status: 'Critical Update Required',
    industryGapIndex: '48% Outdated',
    outdatedTopics: ['Basic Bare-metal Server Config', 'Manual FTP Deployments'],
    recommendedTopics: ['Kubernetes Orchestration', 'Terraform Infrastructure as Code', 'AWS Serverless Lambda'],
    alignmentScore: 52
  }
];

export const MOCK_PLACEMENTS_STATS = [
  { month: 'Sep', placed: 45, target: 40, avgPackage: 9.8 },
  { month: 'Oct', placed: 85, target: 80, avgPackage: 10.4 },
  { month: 'Nov', placed: 140, target: 130, avgPackage: 11.2 },
  { month: 'Dec', placed: 210, target: 200, avgPackage: 12.1 },
  { month: 'Jan', placed: 290, target: 270, avgPackage: 12.8 },
  { month: 'Feb', placed: 360, target: 350, avgPackage: 13.2 }
];

export const MOCK_INDUSTRY_CHALLENGES = [
  {
    id: 'chall_1',
    company: 'TechCorp Solutions',
    title: 'Smart Energy Optimizer for Smart Cities',
    stipendPrize: '₹1,50,000 Cash Prize + Direct Interview',
    deadline: '2026-10-15',
    participatingTeams: 24,
    tags: ['IoT', 'AI / ML', 'Green Tech'],
    description: 'Design a predictive AI model to reduce grid power loss during peak hours using real-time smart meter feeds.'
  },
  {
    id: 'chall_2',
    company: 'CloudMind Systems',
    title: 'Zero-Trust API Gateway for Microservices',
    stipendPrize: '₹2,00,000 Cash Prize + Summer Internships',
    deadline: '2026-11-01',
    participatingTeams: 18,
    tags: ['DevOps', 'Cybersecurity', 'Go'],
    description: 'Construct a high-performance HTTP proxy with rate limiting, JWT validation, and eBPF network monitoring.'
  }
];

export const MOCK_NATIONAL_STATS = {
  totalStudentsRegistered: '1,42,500+',
  partnerColleges: '340+',
  recruitingCompanies: '1,250+',
  totalPlacementsDone: '89,400+',
  topSkillDemands: [
    { skill: 'Generative AI & LLMs', demand: 94, supply: 32 },
    { skill: 'Cloud & Kubernetes', demand: 88, supply: 44 },
    { skill: 'Fullstack Next.js/React', demand: 85, supply: 68 },
    { skill: 'Cybersecurity & Zero Trust', demand: 79, supply: 28 },
    { skill: 'Data Engineering & Snowflake', demand: 76, supply: 35 }
  ]
};
