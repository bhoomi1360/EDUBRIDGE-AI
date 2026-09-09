import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  BookOpen, CheckSquare, Square, Clock, ExternalLink, Sparkles, 
  Trophy, X, ChevronRight, CheckCircle2, XCircle, AlertCircle
} from 'lucide-react';

// MCQ Quiz data per module — 12 questions each, pass mark 9/12
const MODULE_QUIZZES = {
  m1: {
    title: 'Module 1: Docker & Container Orchestration — Knowledge Check',
    passMark: 9,
    questions: [
      {
        id: 'q1',
        question: 'What command is used to build a Docker image from a Dockerfile?',
        options: ['docker run', 'docker build', 'docker create', 'docker init'],
        correct: 1
      },
      {
        id: 'q2',
        question: 'Which file defines a multi-container Docker application setup?',
        options: ['Dockerfile', 'docker-compose.yml', '.dockerignore', 'container.json'],
        correct: 1
      },
      {
        id: 'q3',
        question: 'What does the -p flag do in "docker run -p 3000:3000"?',
        options: [
          'Sets the container CPU priority',
          'Maps host port 3000 to container port 3000',
          'Pulls a new image',
          'Pauses the container'
        ],
        correct: 1
      },
      {
        id: 'q4',
        question: 'Which base image is recommended for minimal container footprint?',
        options: ['ubuntu:latest', 'debian:buster', 'alpine:latest', 'centos:8'],
        correct: 2
      },
      {
        id: 'q5',
        question: 'In a multi-stage Dockerfile, what is the main benefit?',
        options: [
          'Faster build caching only',
          'Smaller final image by discarding build-time dependencies',
          'Automatic security scanning',
          'GPU workload support'
        ],
        correct: 1
      },
      {
        id: 'q6',
        question: 'What does the COPY instruction do in a Dockerfile?',
        options: [
          'Copies files from the internet into the image',
          'Copies files from the host filesystem into the image',
          'Copies between two running containers',
          'Copies environment variables'
        ],
        correct: 1
      },
      {
        id: 'q7',
        question: 'Which command shows all currently running Docker containers?',
        options: ['docker list', 'docker ps', 'docker show', 'docker status'],
        correct: 1
      },
      {
        id: 'q8',
        question: 'In Docker Compose, which key defines a service\'s port mapping?',
        options: ['expose', 'ports', 'network', 'bind'],
        correct: 1
      },
      {
        id: 'q9',
        question: 'What is a Docker volume primarily used for?',
        options: [
          'Increasing container CPU limits',
          'Persisting data beyond a container\'s lifecycle',
          'Encrypting image layers',
          'Reducing image build time'
        ],
        correct: 1
      },
      {
        id: 'q10',
        question: 'Which instruction sets the working directory inside a Dockerfile?',
        options: ['DIR', 'WORKDIR', 'SETDIR', 'CD'],
        correct: 1
      },
      {
        id: 'q11',
        question: 'What does "docker-compose down" do?',
        options: [
          'Stops and removes containers, networks, and volumes defined in compose file',
          'Only stops containers without removing them',
          'Removes only volumes',
          'Rebuilds all images'
        ],
        correct: 0
      },
      {
        id: 'q12',
        question: 'Which container registry is natively integrated with Docker Hub?',
        options: ['AWS ECR', 'GitHub Container Registry', 'Docker Hub', 'Google Artifact Registry'],
        correct: 2
      }
    ]
  },
  m2: {
    title: 'Module 2: Cloud Infrastructure & Serverless — Knowledge Check',
    passMark: 9,
    questions: [
      {
        id: 'q1',
        question: 'Which AWS service combination is used to host and distribute static React frontends?',
        options: ['AWS EC2 + ELB', 'AWS RDS + S3', 'AWS S3 + CloudFront', 'AWS Lambda + API Gateway'],
        correct: 2
      },
      {
        id: 'q2',
        question: 'What does IAM stand for in AWS?',
        options: ['Internet Access Manager', 'Identity and Access Management', 'Image Asset Manager', 'Infrastructure and Monitoring'],
        correct: 1
      },
      {
        id: 'q3',
        question: 'Which AWS service enables serverless function execution without managing servers?',
        options: ['EC2', 'ECS', 'Lambda', 'Glacier'],
        correct: 2
      },
      {
        id: 'q4',
        question: 'What does VPC stand for in AWS?',
        options: ['Virtual Private Cloud', 'Virtual Public Compute', 'Variable Port Controller', 'Verified Provider Certificate'],
        correct: 0
      },
      {
        id: 'q5',
        question: 'Elastic Beanstalk is primarily used for:',
        options: [
          'Database migrations',
          'Deploying and auto-scaling web applications',
          'Network security monitoring',
          'Static file hosting'
        ],
        correct: 1
      },
      {
        id: 'q6',
        question: 'Which AWS service provides a managed relational database?',
        options: ['DynamoDB', 'ElastiCache', 'RDS', 'Redshift'],
        correct: 2
      },
      {
        id: 'q7',
        question: 'What is the purpose of an AWS Security Group?',
        options: [
          'Manages IAM user permissions',
          'Acts as a virtual firewall to control inbound/outbound traffic',
          'Monitors CloudTrail events',
          'Provisions EC2 instances'
        ],
        correct: 1
      },
      {
        id: 'q8',
        question: 'Which AWS service provides a content delivery network (CDN)?',
        options: ['Route 53', 'CloudFront', 'API Gateway', 'Direct Connect'],
        correct: 1
      },
      {
        id: 'q9',
        question: 'GCP\'s equivalent to AWS Lambda is:',
        options: ['Cloud Run', 'Cloud Functions', 'App Engine', 'Compute Engine'],
        correct: 1
      },
      {
        id: 'q10',
        question: 'What does "auto-scaling" mean in cloud infrastructure?',
        options: [
          'Automatically updating software packages',
          'Dynamically adjusting compute capacity based on demand',
          'Scaling database schemas automatically',
          'Auto-renewing SSL certificates'
        ],
        correct: 1
      },
      {
        id: 'q11',
        question: 'Which AWS service is used for DNS management and domain routing?',
        options: ['CloudFront', 'VPC', 'Route 53', 'ACM'],
        correct: 2
      },
      {
        id: 'q12',
        question: 'Infrastructure as Code (IaC) tools like Terraform are used to:',
        options: [
          'Write frontend code more efficiently',
          'Provision and manage cloud resources through declarative config files',
          'Monitor application performance',
          'Manage Docker container networking'
        ],
        correct: 1
      }
    ]
  },
  m3: {
    title: 'Module 3: Generative AI & Vector Embeddings — Knowledge Check',
    passMark: 9,
    questions: [
      {
        id: 'q1',
        question: 'What does RAG stand for in the context of LLMs?',
        options: [
          'Random Aggregation Generation',
          'Retrieval-Augmented Generation',
          'Recurrent Attention Graph',
          'Residual Attention Grounding'
        ],
        correct: 1
      },
      {
        id: 'q2',
        question: 'ChromaDB is best described as a:',
        options: [
          'SQL relational database',
          'Vector embedding store for semantic search',
          'Message queue system',
          'Image processing library'
        ],
        correct: 1
      },
      {
        id: 'q3',
        question: 'vLLM is used primarily to:',
        options: [
          'Train LLMs from scratch',
          'Visualize model weights',
          'Optimize LLM inference throughput and latency',
          'Convert PyTorch models to ONNX'
        ],
        correct: 2
      },
      {
        id: 'q4',
        question: 'LoRA (Low-Rank Adaptation) is a technique for:',
        options: [
          'Data augmentation during pretraining',
          'Parameter-efficient fine-tuning of LLMs',
          'Compressing tokenizers',
          'Increasing context window size'
        ],
        correct: 1
      },
      {
        id: 'q5',
        question: 'What is the primary purpose of text embeddings in AI systems?',
        options: [
          'To compress audio files for storage',
          'To represent text as dense numerical vectors for semantic similarity',
          'To encrypt sensitive text data',
          'To convert text to speech'
        ],
        correct: 1
      },
      {
        id: 'q6',
        question: 'Which framework is LlamaIndex specifically designed for?',
        options: [
          'Training large language models from scratch',
          'Building data ingestion and query pipelines over LLMs',
          'Generating synthetic training datasets',
          'Running containerized ML workloads'
        ],
        correct: 1
      },
      {
        id: 'q7',
        question: 'What is "prompt engineering" in the context of LLMs?',
        options: [
          'Writing prompts for UI/UX design',
          'Crafting input text to guide an LLM toward desired outputs',
          'Engineering the tokenizer vocabulary',
          'Optimizing GPU memory during inference'
        ],
        correct: 1
      },
      {
        id: 'q8',
        question: 'In a RAG system, the vector store is used to:',
        options: [
          'Store model weights',
          'Cache API responses from the LLM provider',
          'Store and retrieve document embeddings by semantic similarity',
          'Log inference requests for auditing'
        ],
        correct: 2
      },
      {
        id: 'q9',
        question: 'What does "hallucination" mean in the context of LLMs?',
        options: [
          'A visual glitch in the model\'s UI',
          'When the model generates confident but factually incorrect information',
          'Excessive memory usage during inference',
          'A fine-tuning technique for creativity'
        ],
        correct: 1
      },
      {
        id: 'q10',
        question: 'Which vector similarity metric is most commonly used in embedding search?',
        options: [
          'Euclidean distance only',
          'Jaccard similarity',
          'Cosine similarity',
          'Manhattan distance'
        ],
        correct: 2
      },
      {
        id: 'q11',
        question: 'Pinecone is primarily used as a:',
        options: [
          'CI/CD pipeline tool',
          'Managed vector database for production AI applications',
          'Python package manager',
          'LLM training framework'
        ],
        correct: 1
      },
      {
        id: 'q12',
        question: 'What is the role of a "chunking strategy" in a RAG pipeline?',
        options: [
          'Splitting the model into smaller inference units',
          'Dividing documents into smaller segments for effective embedding and retrieval',
          'Batching API calls to reduce latency',
          'Partitioning vector store indexes across servers'
        ],
        correct: 1
      }
    ]
  }
};

function QuizModal({ module, onClose, onPass }) {
  const quiz = MODULE_QUIZZES[module.id];
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);

  if (!quiz) return null;

  const totalQ = quiz.questions.length;
  const question = quiz.questions[currentQ];

  const handleSelect = (optIdx) => {
    if (!submitted) {
      setAnswers(prev => ({ ...prev, [question.id]: optIdx }));
    }
  };

  const handleNext = () => {
    if (currentQ < totalQ - 1) setCurrentQ(prev => prev + 1);
    else setSubmitted(true);
  };

  const handleSubmit = () => setSubmitted(true);

  // Score calculation
  const score = submitted
    ? quiz.questions.reduce((acc, q) => acc + (answers[q.id] === q.correct ? 1 : 0), 0)
    : 0;
  const passed = submitted && score >= quiz.passMark;

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '700px' }}>

        {/* Quiz Header */}
        <div className="flex-between" style={{ marginBottom: '20px' }}>
          <div>
            <div className="badge badge-indigo" style={{ marginBottom: '6px' }}>
              <Trophy size={12} /> Module Completion Quiz
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, lineHeight: 1.3 }}>{quiz.title}</h3>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              Pass {quiz.passMark}/{totalQ} questions to unlock module completion
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        {/* RESULTS VIEW after submission */}
        {submitted ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Score banner */}
            <div style={{
              padding: '20px',
              borderRadius: 'var(--radius-md)',
              background: passed ? 'rgba(16, 185, 129, 0.12)' : 'rgba(244, 63, 94, 0.12)',
              border: `1px solid ${passed ? 'rgba(16, 185, 129, 0.3)' : 'rgba(244, 63, 94, 0.3)'}`,
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '6px' }}>{passed ? '🎉' : '📚'}</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: passed ? 'var(--accent-emerald)' : 'var(--accent-rose)' }}>
                {score} / {totalQ} Correct
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 600, marginTop: '6px' }}>
                {passed ? '✅ Quiz Passed! Module marked as complete.' : `❌ Need ${quiz.passMark} to pass. Review topics and try again.`}
              </div>
            </div>

            {/* Answer Review */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '280px', overflowY: 'auto', paddingRight: '6px' }}>
              {quiz.questions.map((q, idx) => {
                const userAns = answers[q.id];
                const isCorrect = userAns === q.correct;
                return (
                  <div key={q.id} style={{ background: 'var(--bg-input)', padding: '12px', borderRadius: 'var(--radius-md)', borderLeft: `4px solid ${isCorrect ? 'var(--accent-emerald)' : 'var(--accent-rose)'}` }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {isCorrect ? <CheckCircle2 size={16} color="var(--accent-emerald)" /> : <XCircle size={16} color="var(--accent-rose)" />}
                      Q{idx + 1}: {q.question}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: isCorrect ? 'var(--accent-emerald)' : 'var(--text-secondary)' }}>
                      Your answer: <strong>{userAns !== undefined ? q.options[userAns] : 'Not answered'}</strong>
                      {!isCorrect && <span style={{ color: 'var(--accent-emerald)', marginLeft: '8px' }}>✓ Correct: {q.options[q.correct]}</span>}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              {passed ? (
                <button className="btn btn-primary" onClick={() => { onPass(); onClose(); }}>
                  <CheckCircle2 size={16} /> Unlock Module Completion
                </button>
              ) : (
                <>
                  <button className="btn btn-secondary" onClick={onClose}>Close</button>
                  <button className="btn btn-primary" onClick={() => { setSubmitted(false); setAnswers({}); setCurrentQ(0); }}>
                    Retake Quiz
                  </button>
                </>
              )}
            </div>
          </div>

        ) : (
          /* QUIZ QUESTION VIEW */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Progress indicator */}
            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
              {quiz.questions.map((_, idx) => (
                <div key={idx} style={{
                  height: '4px',
                  flex: 1,
                  borderRadius: '2px',
                  background: idx < currentQ
                    ? 'var(--accent-emerald)'
                    : idx === currentQ
                    ? 'var(--accent-indigo)'
                    : 'var(--bg-input)'
                }} />
              ))}
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: '8px', whiteSpace: 'nowrap' }}>
                {currentQ + 1} / {totalQ}
              </span>
            </div>

            {/* Question */}
            <div style={{ background: 'var(--bg-input)', padding: '16px', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', fontWeight: 700, marginBottom: '8px' }}>
                QUESTION {currentQ + 1}
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 700, lineHeight: 1.5 }}>{question.question}</div>
            </div>

            {/* Options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {question.options.map((opt, idx) => {
                const isSelected = answers[question.id] === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelect(idx)}
                    style={{
                      textAlign: 'left',
                      padding: '12px 16px',
                      borderRadius: 'var(--radius-md)',
                      border: isSelected ? '2px solid var(--accent-indigo)' : '1px solid var(--border-color)',
                      background: isSelected ? 'var(--accent-indigo-glow)' : 'var(--bg-input)',
                      color: 'var(--text-primary)',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      fontWeight: isSelected ? 600 : 400,
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <span style={{ color: 'var(--accent-indigo)', fontWeight: 700, marginRight: '10px' }}>
                      {String.fromCharCode(65 + idx)}.
                    </span>
                    {opt}
                  </button>
                );
              })}
            </div>

            {/* Navigation */}
            <div className="flex-between" style={{ paddingTop: '8px' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                <AlertCircle size={14} style={{ display: 'inline', marginRight: '4px' }} />
                Select an answer to continue
              </div>
              <button
                className="btn btn-primary"
                disabled={answers[question.id] === undefined}
                onClick={currentQ < totalQ - 1 ? handleNext : handleSubmit}
              >
                {currentQ < totalQ - 1 ? (
                  <>Next <ChevronRight size={16} /></>
                ) : (
                  'Submit Quiz'
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function UpskillingRoadmap() {
  const { currentStudent } = useApp();

  // ── Role-based module templates ─────────────────────────────────
  function getModulesForRole(targetRole) {
    const role = (targetRole || '').toLowerCase();

    const isAIML      = role.includes('ai') || role.includes('ml') || role.includes('machine learning') || role.includes('data scient');
    const isDevOps    = role.includes('devops') || role.includes('cloud') || role.includes('sre') || (role.includes('architect') && !role.includes('frontend'));
    const isBackend   = role.includes('backend') || role.includes('distributed') || role.includes('system');
    const isSecurity  = role.includes('security') || role.includes('cyber');
    const isFrontend  = role.includes('frontend') || role.includes('front-end') || role.includes('web developer')
                      || role.includes('web dev') || role.includes('ui developer') || role.includes('ui/ux')
                      || role.includes('react') || role.includes('angular') || role.includes('vue')
                      || (role.includes('web') && !isAIML && !isDevOps && !isBackend && !isSecurity);
    const isFullStack = role.includes('full stack') || role.includes('fullstack') || role.includes('full-stack');

    if (isAIML) {
      return [
        {
          id: 'm1',
          title: 'Module 1: Deep Learning & Neural Networks with PyTorch',
          targetSkill: 'Python & PyTorch',
          estHours: '12 Hours',
          completed: false,
          topics: [
            'Building and training CNNs and Transformer architectures',
            'Fine-tuning large pre-trained models (BERT, GPT, LLaMA)',
            'Optimizing inference: quantization, ONNX & TensorRT export'
          ],
          recommendedCourse: 'DeepLearning.AI: Deep Learning Specialization (Coursera)',
          courseUrl: 'https://www.coursera.org/specializations/deep-learning'
        },
        {
          id: 'm2',
          title: 'Module 2: Generative AI, LLMs & RAG Pipelines',
          targetSkill: 'Generative AI & LLMs',
          estHours: '10 Hours',
          completed: false,
          topics: [
            'LangChain & LlamaIndex for Retrieval-Augmented Generation (RAG)',
            'Vector Stores (ChromaDB / Pinecone / Weaviate) integration',
            'Prompt engineering & model evaluation for production AI systems'
          ],
          recommendedCourse: 'DeepLearning.AI: Building Systems with the ChatGPT API',
          courseUrl: 'https://www.deeplearning.ai/short-courses/building-systems-with-chatgpt/'
        },
        {
          id: 'm3',
          title: 'Module 3: MLOps & AI System Deployment',
          targetSkill: 'Cloud (AWS/GCP)',
          estHours: '10 Hours',
          completed: false,
          topics: [
            'Building CI/CD pipelines for ML model retraining and versioning (MLflow)',
            'Serving AI models with FastAPI + Docker on GCP Vertex AI / AWS SageMaker',
            'Monitoring model drift and automated alerting in production'
          ],
          recommendedCourse: 'Coursera: Machine Learning Engineering for Production (MLOps)',
          courseUrl: 'https://www.coursera.org/specializations/machine-learning-engineering-for-production-mlops'
        }
      ];
    }

    if (isDevOps) {
      return [
        {
          id: 'm1',
          title: 'Module 1: Docker & Container Orchestration (Kubernetes)',
          targetSkill: 'Docker & DevOps',
          estHours: '8 Hours',
          completed: false,
          topics: [
            'Writing multi-stage Dockerfiles for React & Node.js',
            'Deploying microservices to Kubernetes (k8s) with Helm charts',
            'Container security scanning & minimal alpine production images'
          ],
          recommendedCourse: 'Coursera: Containerization & Docker Fundamentals (Hands-On)',
          courseUrl: 'https://www.coursera.org/search?query=docker+kubernetes'
        },
        {
          id: 'm2',
          title: 'Module 2: Cloud Infrastructure & Serverless (AWS / GCP)',
          targetSkill: 'Cloud (AWS/GCP)',
          estHours: '12 Hours',
          completed: false,
          topics: [
            'Deploying React frontend to AWS CloudFront & S3 with CI/CD',
            'Setting up Elastic Beanstalk and EC2 auto-scaling policies',
            'IAM Roles, VPC Security Groups & Route53 DNS configuration'
          ],
          recommendedCourse: 'AWS Skill Builder: Cloud Essentials Learning Plan (Free)',
          courseUrl: 'https://skillbuilder.aws/learn/public/learning_plan/view/82/cloud-essentials-learning-plan'
        },
        {
          id: 'm3',
          title: 'Module 3: CI/CD Automation & Infrastructure as Code',
          targetSkill: 'Docker & DevOps',
          estHours: '9 Hours',
          completed: false,
          topics: [
            'Building GitHub Actions pipelines for auto-deploy to staging',
            'Terraform for AWS infrastructure provisioning and state management',
            'Zero-downtime deployments with blue-green & canary release strategies'
          ],
          recommendedCourse: 'HashiCorp Learn: Terraform on AWS (Free Official Docs)',
          courseUrl: 'https://developer.hashicorp.com/terraform/tutorials/aws-get-started'
        }
      ];
    }

    if (isSecurity) {
      return [
        {
          id: 'm1',
          title: 'Module 1: Cloud Security & IAM Best Practices',
          targetSkill: 'Cloud (AWS/GCP)',
          estHours: '9 Hours',
          completed: false,
          topics: [
            'AWS IAM roles, least-privilege policies and SCPs for Organizations',
            'VPC network segmentation, Security Groups & NACLs',
            'CloudTrail, AWS Config & GuardDuty for audit and threat detection'
          ],
          recommendedCourse: 'AWS Security Fundamentals — AWS Skill Builder (Free)',
          courseUrl: 'https://skillbuilder.aws/learn/courses/97/aws-security-fundamentals-second-edition'
        },
        {
          id: 'm2',
          title: 'Module 2: Application Security & OWASP Top 10',
          targetSkill: 'Node.js & APIs',
          estHours: '8 Hours',
          completed: false,
          topics: [
            'Preventing SQL injection, XSS, CSRF and SSRF attacks in APIs',
            'Implementing JWT authentication and OAuth 2.0 securely',
            'Penetration testing basics with Burp Suite and OWASP ZAP'
          ],
          recommendedCourse: 'PortSwigger: Web Security Academy (Free, Hands-On)',
          courseUrl: 'https://portswigger.net/web-security'
        },
        {
          id: 'm3',
          title: 'Module 3: DevSecOps & Secure CI/CD Pipelines',
          targetSkill: 'Docker & DevOps',
          estHours: '8 Hours',
          completed: false,
          topics: [
            'Integrating SAST/DAST tools (Snyk, SonarQube) into GitHub Actions',
            'Container image vulnerability scanning with Trivy & Anchore',
            'Secrets management using HashiCorp Vault and AWS Secrets Manager'
          ],
          recommendedCourse: 'Linux Foundation: DevSecOps Fundamentals',
          courseUrl: 'https://trainingportal.linuxfoundation.org/courses/devsecops-fundamentals'
        }
      ];
    }

    if (isBackend) {
      return [
        {
          id: 'm1',
          title: 'Module 1: Distributed Systems & Microservices Architecture',
          targetSkill: 'Node.js & APIs',
          estHours: '10 Hours',
          completed: false,
          topics: [
            'Event-driven microservices with Kafka and RabbitMQ',
            'gRPC vs REST vs GraphQL API design for distributed systems',
            'Saga pattern, CQRS and event sourcing for data consistency'
          ],
          recommendedCourse: 'Udemy: Microservices with Node.js and React (Stephen Grider)',
          courseUrl: 'https://www.udemy.com/course/microservices-with-node-js-and-react/'
        },
        {
          id: 'm2',
          title: 'Module 2: Database Optimization & Caching Strategies',
          targetSkill: 'Node.js & APIs',
          estHours: '8 Hours',
          completed: false,
          topics: [
            'PostgreSQL performance tuning: indexing, query planning & VACUUM',
            'Redis caching layers: cache invalidation strategies & TTL policies',
            'Database sharding, read replicas & connection pooling with PgBouncer'
          ],
          recommendedCourse: 'Udemy: SQL & PostgreSQL — The Complete Developer Guide',
          courseUrl: 'https://www.udemy.com/course/sql-and-postgresql/'
        },
        {
          id: 'm3',
          title: 'Module 3: System Design & Scalability Engineering',
          targetSkill: 'Data Structures & Alg',
          estHours: '12 Hours',
          completed: false,
          topics: [
            'Designing URL shorteners, rate limiters & notification systems',
            'Load balancing algorithms, CDN strategies and horizontal scaling',
            'CAP theorem, consistency models & leader election in distributed stores'
          ],
          recommendedCourse: 'System Design Interview by Alex Xu (ByteByteGo)',
          courseUrl: 'https://bytebytego.com/courses/system-design-interview'
        }
      ];
    }

    // ── Frontend / Web Developer ──────────────────────────────────
    if (isFrontend) {
      return [
        {
          id: 'm1',
          title: 'Module 1: Advanced React Patterns & Performance',
          targetSkill: 'React & TypeScript',
          estHours: '10 Hours',
          completed: false,
          topics: [
            'React 18 concurrent features: Suspense, useTransition & useDeferredValue',
            'Code-splitting, lazy loading & bundle size optimization with Vite',
            'State management with Zustand, Jotai & React Query for server state'
          ],
          recommendedCourse: 'Epic React by Kent C. Dodds (Advanced Patterns)',
          courseUrl: 'https://epicreact.dev/'
        },
        {
          id: 'm2',
          title: 'Module 2: Modern CSS, Design Systems & Accessibility',
          targetSkill: 'CSS & Design Systems',
          estHours: '8 Hours',
          completed: false,
          topics: [
            'CSS Grid & Container Queries for fully responsive layouts',
            'Building a reusable component library with Storybook',
            'WCAG 2.2 accessibility auditing with Axe & VoiceOver testing'
          ],
          recommendedCourse: 'CSS for JavaScript Developers by Josh Comeau',
          courseUrl: 'https://css-for-js.dev/'
        },
        {
          id: 'm3',
          title: 'Module 3: TypeScript, Testing & CI/CD for Frontend',
          targetSkill: 'TypeScript & Testing',
          estHours: '9 Hours',
          completed: false,
          topics: [
            'Advanced TypeScript generics, discriminated unions & utility types',
            'Testing strategy: Vitest unit tests + Playwright end-to-end testing',
            'GitHub Actions CI/CD pipeline: lint → test → deploy to Vercel / Netlify'
          ],
          recommendedCourse: 'Total TypeScript by Matt Pocock (Free Workshops)',
          courseUrl: 'https://www.totaltypescript.com/'
        }
      ];
    }

    // ── Full Stack AI Engineer ────────────────────────────────────
    if (isFullStack) {
      return [
        {
          id: 'm1',
          title: 'Module 1: Full Stack Architecture with Next.js & TypeScript',
          targetSkill: 'React & TypeScript',
          estHours: '10 Hours',
          completed: false,
          topics: [
            'Next.js 14 App Router: RSC, Server Actions & streaming SSR',
            'Building REST & tRPC APIs with Prisma ORM + PostgreSQL',
            'Authentication with NextAuth.js and role-based access control'
          ],
          recommendedCourse: 'Full Stack Open (University of Helsinki — Free)',
          courseUrl: 'https://fullstackopen.com/en/'
        },
        {
          id: 'm2',
          title: 'Module 2: Docker, Cloud & CI/CD for Full Stack Apps',
          targetSkill: 'Docker & DevOps',
          estHours: '9 Hours',
          completed: false,
          topics: [
            'Dockerizing Next.js + Node.js microservices with multi-stage builds',
            'Deploying to AWS Elastic Beanstalk / GCP Cloud Run with Terraform',
            'GitHub Actions pipeline: test → build → staging → production'
          ],
          recommendedCourse: 'AWS Skill Builder: Cloud Essentials Learning Plan (Free)',
          courseUrl: 'https://skillbuilder.aws/learn/public/learning_plan/view/82/cloud-essentials-learning-plan'
        },
        {
          id: 'm3',
          title: 'Module 3: Integrating AI & LLMs into Full Stack Products',
          targetSkill: 'Generative AI & LLMs',
          estHours: '10 Hours',
          completed: false,
          topics: [
            'Streaming AI responses in Next.js with Vercel AI SDK',
            'Building RAG-powered chatbots with LangChain + Pinecone',
            'Evaluating AI outputs: hallucination detection & prompt safety'
          ],
          recommendedCourse: 'DeepLearning.AI: Building Systems with the ChatGPT API',
          courseUrl: 'https://www.deeplearning.ai/short-courses/building-systems-with-chatgpt/'
        }
      ];
    }

    // ── Catch-all default ─────────────────────────────────────────
    return [
      {
        id: 'm1',
        title: 'Module 1: Docker & Container Orchestration',
        targetSkill: 'Docker & DevOps',
        estHours: '8 Hours',
        completed: false,
        topics: [
          'Writing multi-stage Dockerfiles for React & Node.js applications',
          'Docker Compose for PostgreSQL & Redis local development',
          'Container security best practices & minimal alpine images'
        ],
        recommendedCourse: 'Coursera: Containerization & Docker Fundamentals (Hands-On)',
        courseUrl: 'https://www.coursera.org/search?query=docker+kubernetes'
      },
      {
        id: 'm2',
        title: 'Module 2: Cloud Infrastructure & Serverless (AWS / GCP)',
        targetSkill: 'Cloud (AWS/GCP)',
        estHours: '12 Hours',
        completed: false,
        topics: [
          'Deploying React frontend to AWS CloudFront & S3',
          'Setting up Elastic Beanstalk and EC2 auto-scaling',
          'IAM Roles, VPC Security Groups & Route53 DNS'
        ],
        recommendedCourse: 'AWS Skill Builder: Cloud Foundations (Free Official)',
        courseUrl: 'https://skillbuilder.aws/learn/public/learning_plan/view/82/cloud-essentials-learning-plan'
      },
      {
        id: 'm3',
        title: 'Module 3: Generative AI & Vector Embeddings Integration',
        targetSkill: 'Python & PyTorch',
        estHours: '10 Hours',
        completed: false,
        topics: [
          'LangChain & LlamaIndex for Retrieval-Augmented Generation (RAG)',
          'Vector Stores (ChromaDB / Pinecone) setup & querying',
          'Optimizing inference speed with vLLM for production AI'
        ],
        recommendedCourse: 'DeepLearning.AI: Building Systems with the ChatGPT API',
        courseUrl: 'https://www.deeplearning.ai/short-courses/building-systems-with-chatgpt/'
      }
    ];
  }

  // Recompute base modules whenever target role changes
  const baseModules = useMemo(
    () => getModulesForRole(currentStudent.targetRole),
    [currentStudent.targetRole]
  );

  // Completion state is tracked separately (keyed by role so changing role resets progress)
  const [completionKey, setCompletionKey] = useState(currentStudent.targetRole);
  const [completedIds, setCompletedIds] = useState([]);

  // Reset completion tracking when role changes
  const prevRole = React.useRef(currentStudent.targetRole);
  if (prevRole.current !== currentStudent.targetRole) {
    prevRole.current = currentStudent.targetRole;
    setCompletedIds([]);
  }

  // Build full modules array with live completion status
  const modules = baseModules.map(m => ({
    ...m,
    completed: completedIds.includes(m.id)
  }));

  // Quiz state: which module's quiz is open
  const [activeQuizModuleId, setActiveQuizModuleId] = useState(null);

  // Attempt to mark complete → open quiz gate instead
  const handleCheckboxClick = (modId) => {
    if (completedIds.includes(modId)) {
      setCompletedIds(prev => prev.filter(id => id !== modId));
    } else {
      setActiveQuizModuleId(modId);
    }
  };

  // Called when student passes the quiz
  const handleQuizPass = (modId) => {
    setCompletedIds(prev => [...prev, modId]);
  };

  const activeQuizModule = modules.find(m => m.id === activeQuizModuleId);
  const completedCount = modules.filter(m => m.completed).length;
  const progressPercent = Math.round((completedCount / modules.length) * 100);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

      {/* MCQ Quiz Modal */}
      {activeQuizModule && (
        <QuizModal
          module={activeQuizModule}
          onClose={() => setActiveQuizModuleId(null)}
          onPass={() => handleQuizPass(activeQuizModule.id)}
        />
      )}

      {/* Top Banner */}
      <div className="glass-card flex-between" style={{ gap: '20px', flexWrap: 'wrap' }}>
        <div>
          <span className="badge badge-indigo" style={{ marginBottom: '8px' }}>
            <BookOpen size={12} /> Personalized Learning Path
          </span>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>
            Upskilling Roadmap for <span className="gradient-text">{currentStudent.targetRole}</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
            Complete the knowledge quiz for each module to verify your understanding and track progress.
          </p>
        </div>

        {/* Progress Card */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '200px' }}>
          <div className="glass-card glass-card-sm" style={{ textAlign: 'center', background: 'var(--bg-input)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ROADMAP PROGRESS</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>
              {completedCount} / {modules.length} ({progressPercent}%)
            </div>
          </div>
          {/* Progress bar */}
          <div style={{ height: '6px', background: 'var(--bg-input)', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ width: `${progressPercent}%`, height: '100%', background: 'linear-gradient(90deg, var(--accent-indigo), var(--accent-emerald))', transition: 'width 0.4s ease' }} />
          </div>
        </div>
      </div>

      {/* Modules List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {modules.map((mod) => (
          <div 
            key={mod.id} 
            className="glass-card"
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '12px',
              borderLeft: mod.completed ? '4px solid var(--accent-emerald)' : '4px solid var(--accent-indigo)',
              transition: 'border-color 0.3s ease'
            }}
          >
            <div className="flex-between">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>

                {/* Checkbox button — triggers quiz gate if not completed */}
                <button 
                  onClick={() => handleCheckboxClick(mod.id)}
                  title={mod.completed ? 'Click to unmark module' : 'Take quiz to complete module'}
                  style={{ 
                    background: 'transparent', 
                    border: 'none', 
                    cursor: 'pointer', 
                    display: 'flex', 
                    alignItems: 'center',
                    flexShrink: 0
                  }}
                >
                  {mod.completed ? (
                    <CheckSquare size={24} color="var(--accent-emerald)" />
                  ) : (
                    <Square size={24} color="var(--text-muted)" />
                  )}
                </button>

                <div>
                  <h3 style={{ 
                    fontSize: '1.05rem', 
                    fontWeight: 700, 
                    textDecoration: mod.completed ? 'line-through' : 'none',
                    color: mod.completed ? 'var(--text-muted)' : 'var(--text-primary)'
                  }}>
                    {mod.title}
                  </h3>
                  {!mod.completed && (
                    <div style={{ fontSize: '0.72rem', color: 'var(--accent-amber)', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Trophy size={12} /> Pass the MCQ quiz to unlock completion
                    </div>
                  )}
                  {mod.completed && (
                    <div style={{ fontSize: '0.72rem', color: 'var(--accent-emerald)', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <CheckCircle2 size={12} /> Quiz passed & verified ✓
                    </div>
                  )}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <span className="badge badge-cyan" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={12} /> {mod.estHours}
                </span>
                <span className="badge badge-indigo">{mod.targetSkill}</span>

                {/* Take Quiz button if not completed */}
                {!mod.completed && (
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => setActiveQuizModuleId(mod.id)}
                    style={{ borderRadius: 'var(--radius-full)' }}
                  >
                    <Trophy size={14} /> Take Quiz
                  </button>
                )}
              </div>
            </div>

            {/* Topics */}
            <div style={{ background: 'var(--bg-input)', padding: '12px 16px', borderRadius: 'var(--radius-md)', marginLeft: '36px' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Key Technical Concepts:
              </div>
              <ul style={{ listStyleType: 'disc', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {mod.topics.map((t, idx) => (
                  <li key={idx} style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{t}</li>
                ))}
              </ul>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '10px', paddingTop: '8px', borderTop: '1px solid var(--border-color)', fontSize: '0.8rem' }}>
                <Sparkles size={14} color="var(--accent-indigo)" />
                <span style={{ color: 'var(--text-muted)' }}>Recommended:</span>
                <a
                  href={mod.courseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: 'var(--accent-cyan)',
                    fontWeight: 700,
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    borderBottom: '1px dashed var(--accent-cyan)'
                  }}
                >
                  {mod.recommendedCourse}
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
