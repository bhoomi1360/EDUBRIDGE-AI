import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { calculateMatchScore } from '../../utils/matchEngine';
import * as pdfjsLib from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import { 
  FileCheck2, Sparkles, CheckCircle, AlertTriangle, ArrowRight, 
  Upload, FileText, X, Briefcase, ExternalLink, RefreshCw, AlertCircle, Loader2 
} from 'lucide-react';
import { useGsapStagger } from '../../utils/animations';

// Configure PDF.js worker
try {
  pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;
} catch {
  // Fallback if worker setup differs in environment
}

// ── Skill keyword map ────────────────────────────────────────────
const SKILL_KEYWORD_MAP = {
  'React / Next.js':       ['react', 'next.js', 'nextjs', 'jsx', 'tsx', 'frontend', 'javascript', 'typescript', 'tailwind', 'css', 'html'],
  'Python & PyTorch':      ['python', 'pytorch', 'tensorflow', 'keras', 'numpy', 'pandas', 'scikit', 'machine learning', 'deep learning', 'nlp', 'llm', 'data science'],
  'Node.js & APIs':        ['node.js', 'nodejs', 'express', 'fastapi', 'rest api', 'graphql', 'node', 'backend', 'mongodb', 'postgresql', 'sql'],
  'Cloud (AWS/GCP)':       ['aws', 'gcp', 'azure', 'cloud', 's3', 'ec2', 'lambda', 'cloudfront', 'serverless'],
  'Docker & DevOps':       ['docker', 'kubernetes', 'k8s', 'ci/cd', 'jenkins', 'github actions', 'terraform', 'devops', 'linux', 'git'],
  'Data Structures & Alg': ['data structure', 'algorithm', 'leetcode', 'dsa', 'sorting', 'dynamic programming', 'linked list', 'tree', 'system design'],
};

const TRENDING_MISSING = [
  'Docker & Kubernetes', 'AWS / GCP Cloud', 'GraphQL',
  'CI/CD Pipelines', 'Generative AI & LLMs', 'System Design'
];

// ── Sanitize text to prevent regex / perf issues ────────────────
function sanitizeText(rawText) {
  if (typeof rawText !== 'string') return '';
  return rawText
    .slice(0, 100000)
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// ── Core analysis function ───────────────────────────────────────
function analyzeResumeText(text, targetRole = 'Software Engineer') {
  const sanitized = sanitizeText(text);
  const lower = sanitized.toLowerCase();

  const detectedSkills = [];
  for (const [category, keywords] of Object.entries(SKILL_KEYWORD_MAP)) {
    if (keywords.some(kw => lower.includes(kw))) {
      detectedSkills.push(category);
    }
  }

  const missingKeywords = TRENDING_MISSING.filter(kw => {
    const kl = kw.toLowerCase();
    return !kl.split(/[\s/&]+/).some(word => word.length > 3 && lower.includes(word));
  });

  let score = 50;
  score += Math.min(30, detectedSkills.length * 5);
  if (lower.includes('docker') || lower.includes('kubernetes')) score += 6;
  if (lower.includes('aws') || lower.includes('gcp') || lower.includes('cloud')) score += 6;
  if (lower.includes('react') || lower.includes('python')) score += 5;
  if (/\d+%\b|\d+x\b|\d+\s*(?:times|users|requests|ms)/i.test(sanitized)) score += 4;
  if (lower.includes('github') || lower.includes('gitlab') || lower.includes('portfolio')) score += 3;
  
  if (targetRole && lower.includes(targetRole.toLowerCase().split(' ')[0])) {
    score += 4;
  }

  score = Math.min(98, Math.max(45, score));

  const recommendations = [];
  if (!lower.includes('docker') && !lower.includes('kubernetes')) {
    recommendations.push('Add Docker containerization & orchestration to your technical skills.');
  }
  if (!lower.includes('aws') && !lower.includes('gcp') && !lower.includes('azure')) {
    recommendations.push('Include AWS, GCP, or Azure cloud deployment experience or certifications.');
  }
  if (!/\d+%\b|\d+x\b/i.test(sanitized)) {
    recommendations.push('Quantify impact in bullet points (e.g. "Reduced API response time by 35%").');
  }
  if (!lower.includes('github') && !lower.includes('gitlab') && !lower.includes('linkedin')) {
    recommendations.push('Add clickable GitHub and LinkedIn links to verify project implementations.');
  }
  if (!lower.includes('system design') && !lower.includes('architecture')) {
    recommendations.push(`Highlight system design & architectural patterns relevant to ${targetRole}.`);
  }
  if (recommendations.length === 0) {
    recommendations.push(`Tailor keywords directly to match specific ${targetRole} job descriptions.`);
  }

  return { detectedSkills, missingKeywords, score, recommendations };
}

// ── Robust file text extractor (PDF, TXT, DOCX, etc.) ────────────
async function extractTextFromFile(file) {
  if (!file) throw new Error('No file provided');

  if (file.size > 10 * 1024 * 1024) {
    throw new Error('File is too large. Please upload a resume file under 10MB.');
  }

  const fileName = file.name.toLowerCase();
  const isPdf = file.type === 'application/pdf' || fileName.endsWith('.pdf');
  const isTxt = file.type === 'text/plain' || fileName.endsWith('.txt') || fileName.endsWith('.md') || fileName.endsWith('.rtf');
  
  if (isTxt) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = e => resolve(e.target.result || '');
      reader.onerror = () => reject(new Error('Failed to read text file.'));
      reader.readAsText(file);
    });
  }

  if (isPdf) {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({
        data: arrayBuffer,
        useSystemFonts: true,
        disableFontFace: true
      });
      
      const pdf = await loadingTask.promise;
      let fullText = '';
      
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageStrings = textContent.items
          .map(item => (item && item.str ? item.str : ''))
          .filter(Boolean);
        fullText += pageStrings.join(' ') + '\n';
      }

      const cleaned = sanitizeText(fullText);
      if (cleaned.length >= 20) {
        return cleaned;
      }
    } catch (pdfErr) {
      console.warn('Standard PDF parser encountered an issue, trying raw text fallback:', pdfErr);
    }

    try {
      const arrayBuffer = await file.arrayBuffer();
      const bytes = new Uint8Array(arrayBuffer);
      let text = '';
      for (let i = 0; i < bytes.length; i++) {
        const code = bytes[i];
        if ((code >= 32 && code <= 126) || code === 10 || code === 13 || code === 9) {
          text += String.fromCharCode(code);
        }
      }
      
      const words = text.match(/[A-Za-z0-9+#.\-]{3,}/g) || [];
      const filtered = words.filter(w => !['obj', 'endobj', 'stream', 'endstream', 'xref', 'trailer', 'Font', 'Type'].includes(w));
      if (filtered.length >= 25) {
        return filtered.slice(0, 1200).join(' ');
      }
    } catch (streamErr) {
      console.warn('Stream extraction fallback failed:', streamErr);
    }

    throw new Error('Unable to extract text from this PDF. It may be an image scan or password-protected. You can paste your resume text directly into the text box below.');
  }

  const ext = fileName.split('.').pop() || '';
  if (['doc', 'docx', 'odt'].includes(ext)) {
    throw new Error(
      `DOCX/DOC files cannot be parsed directly in the browser. Please open your resume in Word, select all (Ctrl+A), copy (Ctrl+C), and paste the text into the text area below.`
    );
  }

  throw new Error(`Unsupported file type (.${ext}). Please upload a .pdf or .txt file, or paste your resume text below.`);
}

export default function ResumeAnalyzer() {
  const { currentStudent, opportunities } = useApp();

  const containerRef = useRef(null);
  useGsapStagger(containerRef, '.gsap-resume-item', { y: 20, stagger: 0.08 });

  const defaultText = `${currentStudent.name} – ${currentStudent.university} (${currentStudent.department})
Target Role: ${currentStudent.targetRole}
Skills: React, Next.js, Python, Node.js, Express, REST APIs, PostgreSQL, Data Structures, Git, Docker.
Projects: Built AI Legal Assistant using React and Python FastAPI. Distributed Cache Service with Go, Redis, Docker.
Experience: Software Engineering Intern at TechCorp Solutions (Reduced API response latency by 40%).`;

  const [resumeText, setResumeText]             = useState(defaultText);
  const [uploadedFileName, setUploadedFileName] = useState(null);
  const [isProcessing, setIsProcessing]         = useState(false);
  const [loadingStep, setLoadingStep]           = useState('');
  const [errorMessage, setErrorMessage]         = useState(null);
  const [isDragOver, setIsDragOver]             = useState(false);
  const [result, setResult]                     = useState(null);
  const [suggestedJobs, setSuggestedJobs]       = useState([]);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!uploadedFileName && (!result || result.score === currentStudent.resumeATSScore)) {
      setResumeText(`${currentStudent.name} – ${currentStudent.university} (${currentStudent.department})
Target Role: ${currentStudent.targetRole}
Skills: React, Next.js, Python, Node.js, Express, REST APIs, PostgreSQL, Data Structures, Git, Docker.
Projects: Built AI Legal Assistant using React and Python FastAPI. Distributed Cache Service with Go, Redis, Docker.
Experience: Software Engineering Intern at TechCorp Solutions (Reduced API response latency by 40%).`);
    }
  }, [currentStudent, uploadedFileName]);

  const runAnalysis = useCallback((text) => {
    if (!text || !text.trim()) {
      setErrorMessage('Please paste your resume text or upload a resume file to analyze.');
      return;
    }

    setErrorMessage(null);
    setIsProcessing(true);
    setLoadingStep('Analyzing keywords & skill alignment...');

    setTimeout(() => {
      try {
        const analysis = analyzeResumeText(text, currentStudent.targetRole);
        setResult(analysis);

        setLoadingStep('Matching top opportunities...');

        const tempProfile = {
          ...currentStudent,
          skills: Object.keys(SKILL_KEYWORD_MAP).map(name => ({
            name,
            level: analysis.detectedSkills.includes(name) ? 85 : 20,
            benchmark: 80,
          })),
        };

        const opps = Array.isArray(opportunities) ? opportunities : [];
        const ranked = opps
          .filter(o => o.status === 'ACTIVE')
          .map(opp => ({ ...opp, ...calculateMatchScore(tempProfile, opp) }))
          .sort((a, b) => b.matchScore - a.matchScore)
          .slice(0, 3);

        setSuggestedJobs(ranked);
      } catch (err) {
        console.error('ATS Analysis error:', err);
        setErrorMessage('An unexpected error occurred during resume analysis. Please try again.');
      } finally {
        setIsProcessing(false);
        setLoadingStep('');
      }
    }, 600);
  }, [currentStudent, opportunities]);

  const handleFile = useCallback(async (file) => {
    if (!file) return;

    setUploadedFileName(file.name);
    setErrorMessage(null);
    setIsProcessing(true);
    setLoadingStep(`Extracting text from ${file.name}...`);

    try {
      const extractedText = await extractTextFromFile(file);
      setResumeText(extractedText);
      runAnalysis(extractedText);
    } catch (err) {
      console.error('File parsing failed:', err);
      setErrorMessage(err.message || 'Could not parse the uploaded file. Please paste your resume text manually.');
      setIsProcessing(false);
      setLoadingStep('');
    }
  }, [runAnalysis]);

  const handleFileChange = (e) => {
    const f = e.target.files?.[0];
    if (f) handleFile(f);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const f = e.dataTransfer.files?.[0];
    if (f) handleFile(f);
  };

  const clearAll = () => {
    setUploadedFileName(null);
    setResult(null);
    setErrorMessage(null);
    setSuggestedJobs([]);
    setResumeText(defaultText);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const atsScore    = result?.score ?? currentStudent.resumeATSScore ?? 84;
  const scoreGrade  = atsScore >= 85 ? 'Executive Ready' : atsScore >= 70 ? 'Strong Alignment' : atsScore >= 55 ? 'Average Alignment' : 'Needs Optimization';
  const scoreColor  = atsScore >= 85 ? 'var(--accent-emerald)' : atsScore >= 70 ? 'var(--accent-indigo)' : atsScore >= 55 ? 'var(--accent-amber)' : 'var(--accent-rose)';
  const conic       = `conic-gradient(${scoreColor} 0% ${atsScore}%, var(--border-color) ${atsScore}% 100%)`;

  const shownSkills   = result?.detectedSkills   ?? ['React / Next.js', 'Python & PyTorch', 'Node.js & APIs', 'Data Structures & Alg', 'Docker & DevOps'];
  const shownMissing  = result?.missingKeywords  ?? TRENDING_MISSING.slice(0, 3);
  const shownRecs     = result?.recommendations  ?? [
    `Upload your resume above to get personalized ATS optimization tips for ${currentStudent.targetRole}.`,
    'Include quantifiable metrics in project bullet points (e.g. "Reduced API latency by 40%").',
    'Ensure Cloud (AWS/GCP) and CI/CD keywords are clearly highlighted.'
  ];

  const inputStyle = {
    width: '100%',
    background: 'var(--bg-input)',
    border: '1px solid var(--border-color)',
    borderRadius: 'var(--radius-sm)',
    padding: '10px 14px',
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-body)',
    fontSize: '0.875rem',
    outline: 'none',
  };

  return (
    <div ref={containerRef} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

      {/* ── Top Banner ── */}
      <div className="glass-card flex-between gsap-resume-item" style={{ gap: '20px', flexWrap: 'wrap' }}>
        <div>
          <span className="badge badge-indigo" style={{ marginBottom: '8px' }}>
            <FileCheck2 size={12} /> AI Resume Optimizer
          </span>
          <h2 style={{ fontSize: '1.7rem', fontWeight: 800 }}>
            ATS Resume Parser &amp; <span className="gradient-text">Skill Matcher</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
            Tailored for <strong>{currentStudent.targetRole}</strong> — upload your PDF/text resume or paste content to score ATS readiness and unlock matched jobs.
          </p>
        </div>

        {/* Score ring */}
        <div className="glass-card glass-card-sm" style={{ display: 'flex', alignItems: 'center', gap: '16px', background: 'var(--bg-input)', flexShrink: 0 }}>
          <div style={{ width: 68, height: 68, borderRadius: '50%', background: conic, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 16px ${scoreColor}44` }}>
            <div style={{ width: 54, height: 54, borderRadius: '50%', background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.95rem', color: scoreColor, fontFamily: 'var(--font-mono)' }}>
              {atsScore}%
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)' }}>ATS COMPLIANCE</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: scoreColor }}>{scoreGrade}</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Target: {currentStudent.targetRole}</div>
          </div>
        </div>
      </div>

      {/* Error Alert Banner */}
      {errorMessage && (
        <div style={{
          background: 'rgba(244, 63, 94, 0.12)',
          border: '1px solid rgba(244, 63, 94, 0.3)',
          borderRadius: 'var(--radius-md)',
          padding: '14px 18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          color: 'var(--accent-rose)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <AlertCircle size={20} style={{ flexShrink: 0 }} />
            <span style={{ fontSize: '0.88rem' }}>{errorMessage}</span>
          </div>
          <button 
            onClick={() => { setErrorMessage(null); fileInputRef.current?.click(); }}
            className="btn btn-secondary btn-sm"
            style={{ borderColor: 'var(--accent-rose)', color: 'var(--accent-rose)', whiteSpace: 'nowrap' }}
          >
            <RefreshCw size={13} /> Try Again
          </button>
        </div>
      )}

      {/* ── Two column: input | results ── */}
      <div className="grid-2 gsap-resume-item">

        {/* LEFT – Upload & Paste */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

          <div className="flex-between">
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Upload or Paste Resume</h3>
            {uploadedFileName && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--accent-cyan)' }}>
                <FileText size={14} />
                <span style={{ maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: 600 }}>{uploadedFileName}</span>
                <button onClick={clearAll} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: 0, display: 'flex' }} title="Remove file">
                  <X size={14} />
                </button>
              </div>
            )}
          </div>

          {/* Drag-and-drop zone */}
          <div
            onDragOver={e => { e.preventDefault(); setIsDragOver(true); }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={handleDrop}
            onClick={() => !isProcessing && fileInputRef.current?.click()}
            style={{
              border: `2px dashed ${isDragOver ? 'var(--accent-cyan)' : 'var(--border-color)'}`,
              borderRadius: 'var(--radius-md)',
              padding: '22px 16px',
              textAlign: 'center',
              cursor: isProcessing ? 'not-allowed' : 'pointer',
              background: isDragOver ? 'var(--accent-cyan-glow)' : 'var(--bg-input)',
              transition: 'all 0.2s ease',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
              userSelect: 'none',
              opacity: isProcessing ? 0.7 : 1
            }}
          >
            {isProcessing ? (
              <>
                <Loader2 size={30} color="var(--accent-cyan)" style={{ animation: 'spin 1s linear infinite' }} />
                <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--accent-cyan)' }}>
                  {loadingStep || 'Processing Resume...'}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Extracting textual data and evaluating ATS criteria
                </div>
              </>
            ) : (
              <>
                <Upload size={28} color={isDragOver ? 'var(--accent-cyan)' : 'var(--accent-indigo)'} />
                <div style={{ fontSize: '0.95rem', fontWeight: 700 }}>
                  {isDragOver ? 'Drop file to analyze!' : 'Drag & drop resume file (.pdf, .txt)'}
                </div>
                <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                  PDF documents automatically extracted and parsed
                </div>
                <span className="badge badge-indigo" style={{ marginTop: '4px', cursor: 'pointer' }}>
                  <Upload size={12} /> Browse File
                </span>
              </>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept=".txt,.pdf,.doc,.docx,.rtf,.md"
              style={{ display: 'none' }}
              onChange={handleFileChange}
              disabled={isProcessing}
            />
          </div>

          <div style={{ textAlign: 'center', fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>
            — or edit / paste resume text below —
          </div>

          <textarea
            id="resume-text-area"
            rows={8}
            value={resumeText}
            onChange={e => setResumeText(e.target.value)}
            placeholder="Paste your full resume text here..."
            disabled={isProcessing}
            style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6, borderRadius: 'var(--radius-md)', padding: '12px 14px' }}
          />

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button
              id="ats-run-btn"
              className="btn btn-primary"
              onClick={() => runAnalysis(resumeText)}
              disabled={isProcessing}
              style={{ minWidth: '180px' }}
            >
              {isProcessing ? (
                <>
                  <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Sparkles size={16} />
                  <span>Run ATS Analysis</span>
                </>
              )}
            </button>

            {uploadedFileName && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={clearAll}
                disabled={isProcessing}
                style={{ fontSize: '0.82rem' }}
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* RIGHT – Diagnostics Panel */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '4px' }}>AI Scan Diagnostics</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              {result ? 'Results tailored for ' + currentStudent.targetRole + '.' : 'Upload or click "Run ATS Analysis" to evaluate.'}
            </p>
          </div>

          {/* Detected skills */}
          <div>
            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--accent-emerald)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle size={15} /> Detected Skills ({shownSkills.length})
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {shownSkills.length > 0
                ? shownSkills.map(s => <span key={s} className="badge badge-emerald">✓ {s}</span>)
                : <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>No skill categories detected yet.</span>
              }
            </div>
          </div>

          {/* Missing keywords */}
          <div>
            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--accent-rose)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <AlertTriangle size={15} /> Missing High-Demand Keywords ({shownMissing.length})
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {shownMissing.map(kw => <span key={kw} className="badge badge-rose">+ {kw}</span>)}
            </div>
          </div>

          {/* Recommendations */}
          <div style={{ background: 'var(--bg-input)', padding: '16px', borderRadius: 'var(--radius-md)', flex: 1, border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.88rem', fontWeight: 700, marginBottom: '10px' }}>
              💡 Actionable Recommendations for {currentStudent.targetRole}
            </div>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {shownRecs.map((rec, i) => (
                <li key={i} style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'flex-start', gap: '8px', lineHeight: 1.45 }}>
                  <ArrowRight size={14} color="var(--accent-indigo)" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Suggested Jobs (only after analysis) ── */}
      {suggestedJobs.length > 0 && (
        <div className="glass-card gsap-resume-item" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="flex-between" style={{ flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <div className="badge badge-cyan" style={{ marginBottom: '6px' }}>
                <Briefcase size={12} /> Matched from Your Resume
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Top Opportunities for Your Profile</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                Ranked by skill match extracted from your resume against {currentStudent.targetRole} opportunities.
              </p>
            </div>
            <span className="badge badge-indigo">{suggestedJobs.length} Best Matches</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {suggestedJobs.map(job => (
              <div
                key={job.id}
                style={{
                  background: 'var(--bg-input)',
                  padding: '16px 20px',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '14px',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                <div style={{ display: 'flex', gap: '14px', alignItems: 'center', flex: 1, minWidth: '220px' }}>
                  <span style={{ fontSize: '1.8rem', flexShrink: 0 }}>{job.logo}</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.98rem' }}>{job.title}</div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--accent-indigo)', fontWeight: 600 }}>{job.company}</div>
                    <div style={{ display: 'flex', gap: '6px', marginTop: '6px', flexWrap: 'wrap' }}>
                      <span className="badge badge-cyan" style={{ fontSize: '0.7rem' }}>{job.type}</span>
                      <span className="badge badge-indigo" style={{ fontSize: '0.7rem', background: 'var(--bg-card)', color: 'var(--text-muted)', border: '1px solid var(--border-color)' }}>{job.workMode}</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', alignSelf: 'center' }}>{job.location}</span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                  <span className="badge badge-emerald" style={{ fontSize: '0.85rem', padding: '5px 12px' }}>
                    <Sparkles size={12} /> {job.matchScore}% Match
                  </span>
                  <a
                    href={job.applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-sm"
                    style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}
                  >
                    Apply Now <ExternalLink size={13} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
